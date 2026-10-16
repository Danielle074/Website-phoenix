<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A1524] px-5 py-12">

    <!-- Décorations -->
    <div class="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent blur-3xl" />
    <div class="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-gradient-to-tr from-[#FF8A24]/15 to-transparent blur-3xl" style="animation-delay: 2s" />
    <div class="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] animate-spin-slow rounded-full border border-white/[0.05]" />
    <div class="pointer-events-none absolute -right-16 top-24 h-[280px] w-[280px] animate-spin-slow-reverse rounded-full border border-white/[0.08]" />
    <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 80px 80px;" />

    <!-- Carte -->
    <div class="relative z-10 w-full max-w-md">
      <div class="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl sm:p-10">

        <!-- Logo -->
        <div class="mb-8 flex justify-center">
          <RouterLink to="/" class="inline-block">
            <img :src="logo" alt="PHOENIX" class="h-10 w-auto" />
          </RouterLink>
        </div>

        <!-- Token invalide -->
        <div v-if="!isTokenValid" class="text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
            <AlertTriangleIcon class="h-8 w-8 text-white" />
          </div>
          <h1 class="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Lien invalide ou expiré
          </h1>
          <p class="mt-3 text-sm leading-6 text-slate-300">
            Ce lien de réinitialisation n'est plus valide. Veuillez en demander un nouveau.
          </p>
          <RouterLink
            to="/forgot-password"
            class="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#DF6810]"
          >
            <KeyRoundIcon class="h-4 w-4" />
            Demander un nouveau lien
          </RouterLink>
        </div>

        <!-- Formulaire de réinitialisation -->
        <Transition
          v-else
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
          mode="out-in"
        >
          <div v-if="!resetDone" key="form">
            <!-- Icône -->
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] shadow-lg shadow-orange-500/30">
              <LockIcon class="h-7 w-7 text-white" />
            </div>

            <h1 class="mt-6 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Nouveau mot de passe
            </h1>
            <p class="mt-3 text-center text-sm leading-6 text-slate-300">
              Choisissez un mot de passe sécurisé pour votre compte PHOENIX.
            </p>

            <!-- Formulaire -->
            <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
              <!-- Nouveau mot de passe -->
              <div>
                <label for="password" class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nouveau mot de passe
                </label>
                <div class="group/field relative">
                  <LockIcon class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within/field:text-[#FF8A24]" />
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    autocomplete="new-password"
                    placeholder="••••••••"
                    class="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#F47B20]/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-orange-500/20"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
                    :aria-label="showPassword ? 'Masquer' : 'Afficher'"
                    @click="showPassword = !showPassword"
                  >
                    <EyeOffIcon v-if="showPassword" class="h-4 w-4" />
                    <EyeIcon v-else class="h-4 w-4" />
                  </button>
                </div>
              </div>

              <!-- Indicateur de force -->
              <div v-if="password">
                <div class="mb-2 flex items-center justify-between text-[11px]">
                  <span class="text-slate-400">Force du mot de passe</span>
                  <span
                    class="font-bold"
                    :class="strength.color"
                  >
                    {{ strength.label }}
                  </span>
                </div>
                <div class="flex gap-1.5">
                  <div
                    v-for="i in 4"
                    :key="i"
                    class="h-1.5 flex-1 rounded-full transition-all duration-300"
                    :class="i <= strength.score ? strength.bar : 'bg-white/10'"
                  />
                </div>
              </div>

              <!-- Confirmation -->
              <div>
                <label for="confirm" class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Confirmer le mot de passe
                </label>
                <div class="group/field relative">
                  <LockIcon class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within/field:text-[#FF8A24]" />
                  <input
                    id="confirm"
                    v-model="confirmPassword"
                    :type="showConfirm ? 'text' : 'password'"
                    required
                    autocomplete="new-password"
                    placeholder="••••••••"
                    class="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#F47B20]/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-orange-500/20"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
                    :aria-label="showConfirm ? 'Masquer' : 'Afficher'"
                    @click="showConfirm = !showConfirm"
                  >
                    <EyeOffIcon v-if="showConfirm" class="h-4 w-4" />
                    <EyeIcon v-else class="h-4 w-4" />
                  </button>
                </div>

                <!-- Match indicator -->
                <Transition
                  enter-active-class="transition duration-200"
                  enter-from-class="opacity-0 -translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                >
                  <p
                    v-if="confirmPassword && password === confirmPassword"
                    class="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-400"
                  >
                    <CheckIcon class="h-3.5 w-3.5" />
                    Les mots de passe correspondent
                  </p>
                  <p
                    v-else-if="confirmPassword && password !== confirmPassword"
                    class="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-400"
                  >
                    <XIcon class="h-3.5 w-3.5" />
                    Les mots de passe ne correspondent pas
                  </p>
                </Transition>
              </div>

              <!-- Erreur -->
              <Transition
                enter-active-class="transition duration-200"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
              >
                <p v-if="error" class="flex items-center gap-1.5 text-xs font-medium text-red-400">
                  <AlertCircleIcon class="h-3.5 w-3.5" />
                  {{ error }}
                </p>
              </Transition>

              <!-- Bouton -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="group/btn relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DF6810] hover:shadow-xl hover:shadow-orange-500/40 focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                <LoaderIcon v-if="isSubmitting" class="relative h-4 w-4 animate-spin" />
                <CheckIcon v-else class="relative h-4 w-4" />
                <span class="relative">{{ isSubmitting ? 'Réinitialisation...' : 'Réinitialiser le mot de passe' }}</span>
              </button>
            </form>

            <!-- Retour connexion -->
            <div class="mt-8 flex items-center justify-center">
              <RouterLink
                to="/login"
                class="group inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-[#FF8A24]"
              >
                <ArrowLeftIcon class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Retour à la connexion
              </RouterLink>
            </div>
          </div>

          <!-- Étape : Succès -->
          <div v-else key="success" class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
              <CheckCircleIcon class="h-8 w-8 text-white" />
            </div>

            <h1 class="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mot de passe modifié
            </h1>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.
            </p>

            <RouterLink
              to="/login"
              class="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#DF6810]"
            >
              <ArrowRightIcon class="h-4 w-4" />
              Se connecter
            </RouterLink>
          </div>
        </Transition>
      </div>

      <!-- Footer -->
      <p class="mt-8 text-center text-xs text-slate-500">
        Besoin d'aide ?
        <RouterLink to="/contact" class="font-semibold text-[#FF8A24] hover:underline">
          Contactez le support
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  Lock as LockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Check as CheckIcon,
  X as XIcon,
  Loader as LoaderIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  KeyRound as KeyRoundIcon,
} from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'

const route = useRoute()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const isSubmitting = ref(false)
const resetDone = ref(false)
const isTokenValid = ref(true)
const error = ref('')

onMounted(() => {
  // 🔌 Vérification du token : à remplacer par un appel API
  const token = route.query.token as string | undefined
  if (!token) {
    isTokenValid.value = false
  }
})

/* Calcul de la force du mot de passe */
const strength = computed(() => {
  const p = password.value
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++
  if (/\d/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++

  const map = {
    0: { label: 'Très faible', color: 'text-red-400', bar: 'bg-red-500' },
    1: { label: 'Faible', color: 'text-red-400', bar: 'bg-red-500' },
    2: { label: 'Moyen', color: 'text-amber-400', bar: 'bg-amber-500' },
    3: { label: 'Bon', color: 'text-emerald-400', bar: 'bg-emerald-500' },
    4: { label: 'Excellent', color: 'text-emerald-400', bar: 'bg-emerald-500' },
  } as const

  return { score, ...map[score as keyof typeof map] }
})

const validate = () => {
  error.value = ''
  if (password.value.length < 8) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères.'
    return false
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  try {
    // 🔌 À REMPLACER par POST /auth/reset-password
    await new Promise((r) => setTimeout(r, 1200))
    resetDone.value = true
    setTimeout(() => router.push('/login'), 3000)
  } catch {
    error.value = 'Une erreur est survenue. Réessayez.'
  } finally {
    isSubmitting.value = false
  }
}
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