<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A1524] px-5 py-12">

    <!-- Décorations -->
    <div class="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent blur-3xl" />
    <div class="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-gradient-to-tr from-[#FF8A24]/15 to-transparent blur-3xl" style="animation-delay: 2s" />
    <div class="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] animate-spin-slow rounded-full border border-white/[0.05]" />
    <div class="pointer-events-none absolute -right-16 top-24 h-[280px] w-[280px] animate-spin-slow-reverse rounded-full border border-white/[0.08]" />

    <!-- Carte -->
    <div class="relative z-10 w-full max-w-md">
      <div class="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl sm:p-10">

        <!-- Logo -->
        <div class="mb-8 flex justify-center">
          <RouterLink to="/">
            <img :src="logo" alt="PHOENIX" class="h-10 w-auto" />
          </RouterLink>
        </div>

        <!-- Succès -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
          mode="out-in"
        >
          <div v-if="verified" key="success" class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
              <CheckCircleIcon class="h-8 w-8 text-white" />
            </div>

            <h1 class="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Compte vérifié !
            </h1>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Votre compte a été activé avec succès. Redirection en cours...
            </p>

            <div class="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
              <div class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-[width] duration-[3000ms] ease-linear" style="width: 100%" />
            </div>

            <RouterLink
              to="/login"
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#FF8A24] hover:underline"
            >
              Aller à la connexion
              <ArrowRightIcon class="h-4 w-4" />
            </RouterLink>
          </div>

          <!-- Formulaire OTP -->
          <div v-else key="form">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] shadow-lg shadow-orange-500/30">
              <ShieldCheckIcon class="h-7 w-7 text-white" />
            </div>

            <h1 class="mt-6 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Vérifiez votre compte
            </h1>
            <p class="mt-3 text-center text-sm leading-6 text-slate-300">
              Nous avons envoyé un code à 6 chiffres à
            </p>
            <p class="mt-1 break-all text-center text-sm font-bold text-[#FF8A24]">
              {{ identifier }}
            </p>

            <!-- Formulaire -->
            <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
              <div>
                <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Code de vérification
                </label>

                <div class="grid grid-cols-6 gap-2">
                  <input
                    v-for="(_, i) in 6"
                    :key="i"
                    :ref="(el) => (otpInputs[i] = el as HTMLInputElement)"
                    v-model="otp[i]"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    class="aspect-square w-full rounded-xl border-2 border-white/10 bg-white/[0.04] text-center text-lg font-bold text-white outline-none transition focus:border-[#F47B20]/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-orange-500/20"
                    @input="handleInput(i, $event)"
                    @keydown="handleKeydown(i, $event)"
                    @paste="handlePaste"
                  />
                </div>

                <Transition
                  enter-active-class="transition duration-200"
                  enter-from-class="opacity-0 -translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                >
                  <p v-if="error" class="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <AlertCircleIcon class="h-3.5 w-3.5" />
                    {{ error }}
                  </p>
                </Transition>
              </div>

              <button
                type="submit"
                :disabled="!isComplete || isSubmitting"
                class="group/btn relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DF6810] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                <LoaderIcon v-if="isSubmitting" class="relative h-4 w-4 animate-spin" />
                <CheckIcon v-else class="relative h-4 w-4" />
                <span class="relative">{{ isSubmitting ? 'Vérification...' : 'Vérifier' }}</span>
              </button>
            </form>

            <!-- Renvoi -->
            <div class="mt-8 text-center">
              <p class="text-xs text-slate-400">
                Vous n'avez pas reçu le code ?
              </p>
              <button
                type="button"
                :disabled="cooldown > 0 || isResending"
                class="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF8A24] transition hover:gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                @click="resend"
              >
                <LoaderIcon v-if="isResending" class="h-3.5 w-3.5 animate-spin" />
                <RefreshCwIcon v-else class="h-3.5 w-3.5" />
                {{ cooldown > 0 ? `Renvoyer dans ${cooldown}s` : 'Renvoyer le code' }}
              </button>
            </div>

            <!-- Retour -->
            <div class="mt-6 text-center">
              <RouterLink
                to="/register"
                class="group inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-[#FF8A24]"
              >
                <ArrowLeftIcon class="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Modifier mon inscription
              </RouterLink>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  ShieldCheck as ShieldCheckIcon,
  CheckCircle as CheckCircleIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Loader as LoaderIcon,
  RefreshCw as RefreshCwIcon,
} from 'lucide-vue-next'

import logo from '@/assets/images/logophoenix.png'
import { useAuthStore } from '@/stores/auth'
import { verifyOTP, requestPasswordReset } from '@/api/auth'
import { parseApiError } from '@/api/client'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

/* ============================================================
 * IDENTIFIANT (email ou téléphone)
 * ============================================================ */
const identifier = computed(() => (route.query.identifier as string) || '')

/* ============================================================
 * OTP
 * ============================================================ */
const otp = reactive<string[]>(['', '', '', '', '', ''])
const otpInputs = ref<HTMLInputElement[]>([])

const isComplete = computed(() => otp.every((d) => d.length === 1))

/* ============================================================
 * ÉTAT
 * ============================================================ */
const isSubmitting = ref(false)
const isResending = ref(false)
const error = ref('')
const verified = ref(false)
const cooldown = ref(0)

let cooldownTimer: ReturnType<typeof setInterval> | undefined

/* ============================================================
 * GESTIONNAIRES DE SAISIE
 * ============================================================ */
const handleInput = (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')

  if (!value) {
    otp[index] = ''
    return
  }

  // Si l'utilisateur colle plusieurs chiffres dans un seul champ
  if (value.length > 1) {
    const digits = value.slice(0, 6 - index).split('')
    digits.forEach((d, i) => {
      if (index + i < 6) otp[index + i] = d
    })
    const nextIndex = Math.min(index + digits.length, 5)
    otpInputs.value[nextIndex]?.focus()
    return
  }

  otp[index] = value
  if (index < 5) otpInputs.value[index + 1]?.focus()
}

const handleKeydown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace') {
    if (otp[index]) {
      otp[index] = ''
    } else if (index > 0) {
      otp[index - 1] = ''
      otpInputs.value[index - 1]?.focus()
    }
    e.preventDefault()
  } else if (e.key === 'ArrowLeft' && index > 0) {
    otpInputs.value[index - 1]?.focus()
  } else if (e.key === 'ArrowRight' && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

const handlePaste = (e: ClipboardEvent) => {
  const text = e.clipboardData?.getData('text') || ''
  const digits = text.replace(/\D/g, '').slice(0, 6).split('')
  if (!digits.length) return
  digits.forEach((d, i) => (otp[i] = d))
  otpInputs.value[Math.min(digits.length, 5)]?.focus()
  e.preventDefault()
}

/* ============================================================
 * SOUMISSION
 * ============================================================ */
const handleSubmit = async () => {
  error.value = ''
  if (!isComplete.value) return

  isSubmitting.value = true

  try {
    const code = otp.join('')
    const result = await verifyOTP({
      identifier: identifier.value,
      code,
      token_type: 'EMAIL_VERIFY',
    })

    // Si l'API renvoie des tokens → on connecte direct
    if (result?.tokens?.access) {
      await authStore.fetchMe()
    }

    verified.value = true
    setTimeout(() => router.push('/login?registered=1'), 3000)
  } catch (e) {
    error.value = parseApiError(e).message
    otp.fill('')
    otpInputs.value[0]?.focus()
  } finally {
    isSubmitting.value = false
  }
}

/* ============================================================
 * RENVOI
 * ============================================================ */
const resend = async () => {
  if (cooldown.value > 0 || !identifier.value) return

  isResending.value = true
  error.value = ''

  try {
    // ⚠️ L'API n'a pas d'endpoint dédié "resend OTP" → on utilise
    // le password reset comme fallback OU on refait un register.
    // Pour l'instant, on appelle password/reset/request qui envoie
    // un code au même identifiant.
    await requestPasswordReset({ identifier: identifier.value })

    cooldown.value = 60
    cooldownTimer = setInterval(() => {
      cooldown.value--
      if (cooldown.value <= 0 && cooldownTimer) clearInterval(cooldownTimer)
    }, 1000)
  } catch (e) {
    error.value = parseApiError(e).message
  } finally {
    isResending.value = false
  }
}

/* ============================================================
 * LIFECYCLE
 * ============================================================ */
onMounted(() => {
  if (!identifier.value) {
    router.replace('/register')
    return
  }
  otpInputs.value[0]?.focus()
})

onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 50s linear infinite;
}
.animate-spin-slow-reverse {
  animation: spin-slow 70s linear infinite reverse;
}
</style>