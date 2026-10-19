import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // Ajout pour la redirection
import { tokenStorage } from '@/api/client'
import * as authApi from '@/api/auth'
import type { UserMe, LoginRequest, RegisterRequest } from '@/api/types'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter() // Initialisation du router

  const user = ref<UserMe | null>(null)
  const isReady = ref(false)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const role = computed(() => user.value?.role ?? null)

  /* -------------------- Charger l'utilisateur courant -------------------- */
  const fetchMe = async () => {
    if (!tokenStorage.getAccess()) {
      user.value = null
      isReady.value = true
      return
    }

    try {
      user.value = await authApi.fetchMe()
    } catch (error) {
      console.error(
        'Erreur lors du chargement de l’utilisateur connecté :',
        error,
      )

      user.value = null
      tokenStorage.clear()
    } finally {
      isReady.value = true
    }
  }

  /* -------------------- Login -------------------- */
  const login = async (payload: LoginRequest) => {
    isLoading.value = true

    try {
      const res = await authApi.login(payload)

      if (res.mfa_required) {
        return {
          mfa_required: true,
          mfa_session_token: res.mfa_session_token,
        }
      }

      await fetchMe()

      if (!user.value) {
        throw new Error(
          'Connexion effectuée, mais impossible de récupérer le profil utilisateur.',
        )
      }

      return {
        success: true,
        role: user.value.role,
      }
    } finally {
      isLoading.value = false
    }
  }

  /* -------------------- Register -------------------- */
  const register = async (payload: RegisterRequest) => {
    isLoading.value = true

    try {
      return await authApi.register(payload)
    } finally {
      isLoading.value = false
    }
  }

  /* -------------------- Logout -------------------- */
  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Erreur lors de la déconnexion côté serveur :', error)
    } finally {
      // 1. On nettoie les tokens
      tokenStorage.clear()
      
      // 2. On réinitialise l'état du store
      user.value = null
      
      // 3. On indique que l'état est connu (non connecté)
      isReady.value = true 
      
      // 4. On réinitialise le loader
      isLoading.value = false

      // 5. SÉCURITÉ : On force la redirection vers la page de login
      router.push('/login')
    }
  }

  return {
    user,
    isReady,
    isLoading,
    isAuthenticated,
    role,
    fetchMe,
    login,
    register,
    logout,
  }
})