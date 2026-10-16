import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'

/* ============================================================
 * CLÉS DE STOCKAGE
 * ============================================================ */
const ACCESS_KEY = 'phoenix_access_token'
const REFRESH_KEY = 'phoenix_refresh_token'

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

/* ============================================================
 * INSTANCE AXIOS
 * ============================================================ */
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

/* ============================================================
 * INTERCEPTEUR REQUÊTE — injecte le Bearer
 * ============================================================ */
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccess()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/* ============================================================
 * INTERCEPTEUR RÉPONSE — refresh auto sur 401
 * ============================================================ */
let isRefreshing = false
let pendingQueue: Array<(token: string | null) => void> = []

const processQueue = (token: string | null) => {
  pendingQueue.forEach((cb) => cb(token))
  pendingQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Ne pas boucler si c'est déjà un refresh qui échoue
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/token/refresh/')
    ) {
      return Promise.reject(error)
    }

    const refresh = tokenStorage.getRefresh()
    if (!refresh) {
      tokenStorage.clear()
      return Promise.reject(error)
    }

    // 🚫 En mode mock, ne pas tenter de refresh
    const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
    if (USE_MOCK) {
      // Nettoie les tokens mock et redirige
      tokenStorage.clear()
      if (window.location.pathname !== '/login') {
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname,
        )}`
      }
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // Met en file d'attente tant que le refresh est en cours
      return new Promise((resolve) => {
        pendingQueue.push((token) => {
          if (token && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          resolve(apiClient(originalRequest))
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post(
        `${apiClient.defaults.baseURL}/auth/token/refresh/`,
        { refresh },
      )
      const newAccess = data.access as string
      const newRefresh = (data.refresh as string) || refresh

      tokenStorage.set(newAccess, newRefresh)
      processQueue(newAccess)

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
      }
      return apiClient(originalRequest)
    } catch (refreshError) {
      processQueue(null)
      tokenStorage.clear()
      // Redirection propre vers /login
      if (window.location.pathname !== '/login') {
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname,
        )}`
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

/* ============================================================
 * HELPER ERREUR NORMALISÉE
 * ============================================================ */
export interface ApiError {
  status: number
  message: string
  details?: Record<string, unknown>
}

export const parseApiError = (error: unknown): ApiError => {
  // 1. Vraie erreur axios (backend réel)
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0
    const data = error.response?.data as any
    let message = 'Une erreur est survenue.'

    if (typeof data === 'string') message = data
    else if (data?.detail) message = data.detail
    else if (data?.message) message = data.message
    else if (data?.non_field_errors?.[0]) message = data.non_field_errors[0]
    else if (data && typeof data === 'object') {
      const firstKey = Object.keys(data)[0]
      const firstVal = data[firstKey]
      message = Array.isArray(firstVal) ? firstVal[0] : String(firstVal)
    }

    return { status, message, details: data }
  }

  // 2. Erreur mock (objet avec { response: { status, data } } simulé)
  if (
    error &&
    typeof error === 'object' &&
    'response' in error
  ) {
    const err = error as {
      response?: { status?: number; data?: any }
      message?: string
    }
    const data = err.response?.data
    const status = err.response?.status ?? 0

    let message = err.message || 'Une erreur est survenue.'
    if (data) {
      if (typeof data === 'string') message = data
      else if (data.detail) message = data.detail
      else if (data.message) message = data.message
      else if (data.non_field_errors?.[0]) message = data.non_field_errors[0]
    }

    return { status, message, details: data }
  }

  // 3. Erreur JS classique (throw new Error('...'))
  if (error instanceof Error) {
    return { status: 0, message: error.message }
  }

  // 4. Fallback
  return { status: 0, message: 'Erreur réseau.' }
}