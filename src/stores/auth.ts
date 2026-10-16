import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { tokenStorage } from '@/api/client'
import * as authApi from '@/api/auth'
import type { UserMe, LoginRequest, RegisterRequest } from '@/api/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserMe | null>(null)
  const isReady = ref(false) // vrai une fois le me() tenté
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
    } catch {
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
        return { mfa_required: true, mfa_session_token: res.mfa_session_token }
      }
      await fetchMe()
      return { success: true, role: user.value?.role }
    } finally {
      isLoading.value = false
    }
  }

  /* -------------------- Register -------------------- */
  const register = async (payload: RegisterRequest) => {
    isLoading.value = true
    try {
      const res = await authApi.register(payload)
      return res
    } finally {
      isLoading.value = false
    }
  }

  /* -------------------- Logout -------------------- */
  const logout = () => {
    authApi.logout()
    user.value = null
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