import { apiClient, tokenStorage } from './client'
import { findMockUser, findMockUserById, MOCK_USERS } from './mockUsers'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOTPRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
  MFALoginRequest,
  UserMe,
} from './types'

/* ============================================================
 * MODE MOCK
 * ============================================================ */
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const MOCK_ACCESS_PREFIX = 'mock-access-'
const MOCK_REFRESH_PREFIX = 'mock-refresh-'

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms))

const buildMockUserMe = (user: (typeof MOCK_USERS)[number]): UserMe => ({
  id: user.id,
  email: user.email,
  phone_number: user.phone_number,
  role: user.role,
  is_active: true,
  is_email_verified: true,
  is_phone_verified: true,
  is_mfa_enabled: false,
  is_suspended: false,
  created_at: new Date().toISOString(),
})

/* ============================================================
 * CONNEXION
 * ============================================================ */
export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  // 🔧 MODE MOCK
  if (USE_MOCK) {
    await delay()
    const user = findMockUser(payload.identifier, payload.password)

    if (!user) {
      const err = new Error('Identifiants incorrects.')
      ;(err as any).response = {
        status: 400,
        data: { detail: 'Identifiants incorrects.' },
      }
      throw err
    }

    const tokens = {
      access: `${MOCK_ACCESS_PREFIX}${user.id}`,
      refresh: `${MOCK_REFRESH_PREFIX}${user.id}`,
    }

    tokenStorage.set(tokens.access, tokens.refresh)

    return {
      message: 'Connexion réussie (mock)',
      tokens,
      user: buildMockUserMe(user),
    }
  }

  // 🌐 APPEL RÉEL
  const { data } = await apiClient.post<LoginResponse>('/auth/login/', payload)

  if (data.tokens?.access) {
    tokenStorage.set(data.tokens.access, data.tokens.refresh)
  }

  return data
}

/* ============================================================
 * 2FA LOGIN
 * ============================================================ */
export const loginMFA = async (
  payload: MFALoginRequest,
): Promise<LoginResponse> => {
  if (USE_MOCK) {
    await delay()
    const err = new Error('2FA non supporté en mode mock.')
    ;(err as any).response = { status: 400, data: { detail: err.message } }
    throw err
  }

  const { data } = await apiClient.post<LoginResponse>(
    '/auth/login/mfa/',
    payload,
  )

  if (data.tokens?.access) {
    tokenStorage.set(data.tokens.access, data.tokens.refresh)
  }

  return data
}

/* ============================================================
 * INSCRIPTION
 * ============================================================ */
export const register = async (
  payload: RegisterRequest,
): Promise<RegisterResponse> => {
  // 🔧 MODE MOCK
  if (USE_MOCK) {
    await delay()

    const alreadyExists = MOCK_USERS.some(
      (u) => u.email === payload.email || u.phone_number === payload.phone_number,
    )
    if (alreadyExists) {
      const err = new Error('Un compte avec cet email ou téléphone existe déjà.')
      ;(err as any).response = {
        status: 400,
        data: { detail: err.message },
      }
      throw err
    }

    return {
      id: crypto.randomUUID(),
      email: payload.email,
      phone_number: payload.phone_number,
      role: payload.role,
    }
  }

  // 🌐 APPEL RÉEL
  const { data } = await apiClient.post<RegisterResponse>(
    '/auth/register/',
    payload,
  )
  return data
}

/* ============================================================
 * VÉRIFICATION OTP
 * ============================================================ */
export const verifyOTP = async (payload: VerifyOTPRequest) => {
  if (USE_MOCK) {
    await delay()

    // Accepte n'importe quel code à 6 chiffres en mode mock
    if (!/^\d{6}$/.test(payload.code)) {
      const err = new Error('Code de vérification invalide.')
      ;(err as any).response = { status: 400, data: { detail: err.message } }
      throw err
    }

    // Retrouve l'utilisateur par identifier
    const user = MOCK_USERS.find(
      (u) => u.email === payload.identifier || u.phone_number === payload.identifier,
    )

    if (!user) {
      const err = new Error('Utilisateur introuvable.')
      ;(err as any).response = { status: 404, data: { detail: err.message } }
      throw err
    }

    const tokens = {
      access: `${MOCK_ACCESS_PREFIX}${user.id}`,
      refresh: `${MOCK_REFRESH_PREFIX}${user.id}`,
    }
    tokenStorage.set(tokens.access, tokens.refresh)

    return { tokens, user: buildMockUserMe(user) }
  }

  const { data } = await apiClient.post('/auth/verify-otp/', payload)
  if (data.tokens?.access) {
    tokenStorage.set(data.tokens.access, data.tokens.refresh)
  }
  return data
}

/* ============================================================
 * MOT DE PASSE OUBLIÉ
 * ============================================================ */
export const requestPasswordReset = async (
  payload: PasswordResetRequest,
): Promise<void> => {
  if (USE_MOCK) {
    await delay()
    return
  }

  await apiClient.post('/auth/password/reset/request/', payload)
}

export const confirmPasswordReset = async (
  payload: PasswordResetConfirm,
): Promise<void> => {
  if (USE_MOCK) {
    await delay()
    if (!/^\d{6}$/.test(payload.code)) {
      const err = new Error('Code de réinitialisation invalide.')
      ;(err as any).response = { status: 400, data: { detail: err.message } }
      throw err
    }
    return
  }

  await apiClient.post('/auth/password/reset/confirm/', payload)
}

/* ============================================================
 * PROFIL CONNECTÉ
 * ============================================================ */
export const fetchMe = async (): Promise<UserMe> => {
  // 🔧 MODE MOCK
  if (USE_MOCK) {
    const access = tokenStorage.getAccess()
    if (!access?.startsWith(MOCK_ACCESS_PREFIX)) {
      const err = new Error('Non authentifié.')
      ;(err as any).response = { status: 401, data: { detail: err.message } }
      throw err
    }

    const userId = access.replace(MOCK_ACCESS_PREFIX, '')
    const user = findMockUserById(userId)
    if (!user) {
      const err = new Error('Utilisateur introuvable.')
      ;(err as any).response = { status: 401, data: { detail: err.message } }
      throw err
    }

    return buildMockUserMe(user)
  }

  // 🌐 APPEL RÉEL
  const { data } = await apiClient.get<UserMe>('/auth/me/')
  return data
}

/* ============================================================
 * DÉCONNEXION (locale)
 * ============================================================ */
export const logout = () => {
  tokenStorage.clear()
}

/* ============================================================
 * 2FA — SETUP & CONFIRM
 * ============================================================ */
export const setupMFA = async () => {
  if (USE_MOCK) {
    await delay()
    return {
      secret: 'MOCKMOCKMOCKMOCK',
      provisioning_uri: 'otpauth://totp/PHOENIX:mock?secret=MOCKMOCKMOCKMOCK',
      backup_codes: ['11111111', '22222222', '33333333'],
    }
  }

  const { data } = await apiClient.post('/auth/mfa/setup/')
  return data as {
    secret: string
    provisioning_uri: string
    backup_codes: string[]
  }
}

export const confirmMFA = async (code: string) => {
  if (USE_MOCK) {
    await delay()
    if (!/^\d{6}$/.test(code)) {
      const err = new Error('Code TOTP invalide.')
      ;(err as any).response = { status: 400, data: { detail: err.message } }
      throw err
    }
    return { message: '2FA activée (mock)' }
  }

  const { data } = await apiClient.post('/auth/mfa/confirm/', { code })
  return data
}