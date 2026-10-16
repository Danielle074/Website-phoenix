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

        <!-- Étape 1 : Saisie email -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
          mode="out-in"
        >
          <div v-if="!emailSent" key="form">
            <!-- Icône -->
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] shadow-lg shadow-orange-500/30">
              <KeyRoundIcon class="h-7 w-7 text-white" />
            </div>

            <h1 class="mt-6 text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Mot de passe oublié ?
            </h1>
            <p class="mt-3 text-center text-sm leading-6 text-slate-300">
              Saisissez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            <!-- Formulaire -->
            <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
              <div>
                <label for="email" class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Adresse email
                </label>
                <div class="group/field relative">
                  <MailIcon class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within/field:text-[#FF8A24]" />
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    autocomplete="email"
                    placeholder="vous@exemple.com"
                    class="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#F47B20]/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-orange-500/20"
                  />
                </div>
                <Transition
                  enter-active-class="transition duration-200"
                  enter-from-class="opacity-0 -translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition duration-150"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-1"
                >
                  <p v-if="error" class="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <AlertCircleIcon class="h-3.5 w-3.5" />
                    {{ error }}
                  </p>
                </Transition>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="group/btn relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DF6810] hover:shadow-xl hover:shadow-orange-500/40 focus:outline-none focus:ring-4 focus:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                <LoaderIcon v-if="isSubmitting" class="relative h-4 w-4 animate-spin" />
                <SendIcon v-else class="relative h-4 w-4" />
                <span class="relative">{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien' }}</span>
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

          <!-- Étape 2 : Succès -->
          <div v-else key="success" class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
              <CheckCircleIcon class="h-8 w-8 text-white" />
            </div>

            <h1 class="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Email envoyé
            </h1>
            <p class="mt-3 text-sm leading-6 text-slate-300">
              Un lien de réinitialisation a été envoyé à
            </p>
            <p class="mt-1 break-all text-sm font-bold text-[#FF8A24]">
              {{ email }}
            </p>

            <div class="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
              <div class="flex items-start gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-[#FF8A24]">
                  <InfoIcon class="h-4 w-4" />
                </div>
                <div>
                  <p class="text-xs font-semibold text-white">Vous ne l'avez pas reçu ?</p>
                  <ul class="mt-2 space-y-1 text-xs text-slate-400">
                    <li>• Vérifiez votre dossier spam</li>
                    <li>• Patientez quelques minutes</li>
                    <li>• Vérifiez que l'adresse est correcte</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="mt-8 space-y-3">
              <button
                type="button"
                :disabled="isResending"
                class="group/btn relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#F47B20] hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
                @click="resend"
              >
                <LoaderIcon v-if="isResending" class="h-4 w-4 animate-spin" />
                <RefreshCwIcon v-else class="h-4 w-4" />
                {{ isResending ? 'Renvoi...' : "Renvoyer l'email" }}
              </button>

              <RouterLink
                to="/login"
                class="group inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-[#FF8A24]"
              >
                <ArrowLeftIcon class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Retour à la connexion
              </RouterLink>
            </div>
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  KeyRound as KeyRoundIcon,
  Mail as MailIcon,
  Send as SendIcon,
  Loader as LoaderIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  ArrowLeft as ArrowLeftIcon,
  RefreshCw as RefreshCwIcon,
  Info as InfoIcon,
} from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'

const email = ref('')
const error = ref('')
const isSubmitting = ref(false)
const isResending = ref(false)
const emailSent = ref(false)

const validate = () => {
  error.value = ''
  if (!email.value.trim()) {
    error.value = "L'email est obligatoire."
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = "Format d'email invalide."
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  error.value = ''

  try {
    // 🔌 À REMPLACER par POST /auth/forgot-password
    await new Promise((r) => setTimeout(r, 1200))
    emailSent.value = true
  } catch {
    error.value = 'Une erreur est survenue. Réessayez.'
  } finally {
    isSubmitting.value = false
  }
}

const resend = async () => {
  isResending.value = true
  await new Promise((r) => setTimeout(r, 1000))
  isResending.value = false
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