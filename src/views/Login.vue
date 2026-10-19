
<template>
  <div class="min-h-screen w-full bg-white lg:grid lg:grid-cols-2">
    <!-- PANNEAU GAUCHE : DESKTOP -->
    <aside
      class="relative hidden overflow-hidden bg-[#101D35] lg:flex lg:flex-col lg:justify-between"
    >
      <img
        :src="loginHero"
        alt="Travailler en Côte d'Ivoire"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div
        class="absolute inset-0 bg-gradient-to-br from-[#101D35]/90 via-[#101D35]/75 to-[#101D35]/60"
      />

      <div
        class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.06]"
      />
      <div
        class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/[0.08]"
      />

      <div
        class="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14"
      >
        <RouterLink to="/" class="inline-flex items-center gap-2">
          <img
            :src="logo"
            alt="PHOENIX Jobs & Carrières"
            class="h-10 w-auto object-contain brightness-0 invert"
          />
        </RouterLink>

        <div class="max-w-md">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200"
          >
            La plateforme de l'emploi en Côte d'Ivoire
          </span>

          <h2
            class="mt-6 text-3xl font-bold leading-tight text-white xl:text-4xl"
          >
            Votre prochain emploi
            <span class="block text-[#FF8A24]">vous attend.</span>
          </h2>

          <p class="mt-5 text-sm leading-7 text-slate-300">
            Connectez-vous pour accéder à votre espace personnel, suivre vos
            candidatures et découvrir de nouvelles opportunités.
          </p>

          <ul class="mt-8 space-y-3">
            <li
              v-for="benefit in benefits"
              :key="benefit"
              class="flex items-start gap-3 text-sm text-slate-200"
            >
              <div
                class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300"
              >
                <CheckIcon class="h-3 w-3" />
              </div>
              <span>{{ benefit }}</span>
            </li>
          </ul>
        </div>

        <div
          class="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm"
        >
          <QuoteIcon class="h-5 w-5 text-[#FF9A42]" />

          <p class="mt-3 text-sm italic leading-6 text-slate-200">
            « Grâce à PHOENIX, j'ai trouvé mon premier emploi à Abidjan en
            moins d'un mois. »
          </p>

          <div class="mt-3 flex items-center gap-3">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-[#F47B20] text-sm font-bold text-white"
            >
              KA
            </div>

            <div>
              <p class="text-xs font-bold text-white">Kouadio Amadou</p>
              <p class="text-[10px] text-slate-400">
                Développeur Web · Abidjan
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- FORMULAIRE DE CONNEXION -->
    <main
      class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-10"
    >
      <div class="w-full max-w-md">
        <!-- Logo mobile -->
        <div class="mb-8 flex justify-center lg:hidden">
          <RouterLink to="/">
            <img
              :src="logo"
              alt="PHOENIX Jobs & Carrières"
              class="h-12 w-auto object-contain"
            />
          </RouterLink>
        </div>

        <!-- Titre -->
        <div class="mb-8">
          <h1
            class="text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl"
          >
            Bon retour !
          </h1>
          <p class="mt-2 text-sm text-slate-500">
            Connectez-vous pour accéder à votre espace personnel.
          </p>
        </div>

        <!-- Message de succès -->
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="successMessage"
            class="mb-5 flex items-start gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4"
            role="status"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
            >
              <CheckCircleIcon class="h-5 w-5" />
            </div>

            <p class="text-sm font-semibold text-emerald-800">
              {{ successMessage }}
            </p>
          </div>
        </Transition>

        <!-- Message d'erreur API -->
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="apiError"
            class="mb-5 flex items-start gap-3 rounded-2xl border-2 border-red-200 bg-red-50 p-4"
            role="alert"
          >
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
            >
              <AlertCircleIcon class="h-5 w-5" />
            </div>

            <p class="text-sm font-semibold text-red-800">
              {{ apiError }}
            </p>
          </div>
        </Transition>

        <!-- Formulaire -->
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <!-- Email ou téléphone -->
          <div>
            <label
              for="identifier"
              class="mb-2 block text-sm font-semibold text-[#101D35]"
            >
              Email ou téléphone <span class="text-red-500">*</span>
            </label>

            <div class="relative">
              <MailIcon
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />

              <input
                id="identifier"
                v-model.trim="form.identifier"
                type="text"
                name="identifier"
                autocomplete="username"
                required
                placeholder="vous@exemple.com"
                :aria-invalid="Boolean(errors.identifier)"
                aria-describedby="identifier-error"
                class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                @input="clearFieldError('identifier')"
              />
            </div>

            <p
              v-if="errors.identifier"
              id="identifier-error"
              class="mt-1 text-xs font-medium text-red-500"
            >
              {{ errors.identifier }}
            </p>
          </div>

          <!-- Mot de passe -->
          <div>
            <div class="mb-2 flex items-center justify-between gap-3">
              <label
                for="password"
                class="text-sm font-semibold text-[#101D35]"
              >
                Mot de passe <span class="text-red-500">*</span>
              </label>

              <RouterLink
                to="/forgot-password"
                class="text-xs font-semibold text-[#F47B20] hover:underline"
              >
                Mot de passe oublié ?
              </RouterLink>
            </div>

            <div class="relative">
              <LockIcon
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                :aria-invalid="Boolean(errors.password)"
                aria-describedby="password-error"
                class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                @input="clearFieldError('password')"
              />

              <button
                type="button"
                :aria-label="
                  showPassword
                    ? 'Masquer le mot de passe'
                    : 'Afficher le mot de passe'
                "
                :aria-pressed="showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:text-[#F47B20]"
                @click="showPassword = !showPassword"
              >
                <EyeIcon v-if="!showPassword" class="h-4 w-4" />
                <EyeOffIcon v-else class="h-4 w-4" />
              </button>
            </div>

            <p
              v-if="errors.password"
              id="password-error"
              class="mt-1 text-xs font-medium text-red-500"
            >
              {{ errors.password }}
            </p>
          </div>

          <!-- Se souvenir de moi -->
          <div class="flex items-center justify-between">
            <label
              for="remember"
              class="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            >
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                name="remember"
                class="h-4 w-4 accent-[#F47B20]"
              />
              Se souvenir de moi
            </label>
          </div>

          <!-- Bouton de connexion -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LoaderIcon v-if="isSubmitting" class="h-4 w-4 animate-spin" />
            <LogInIcon v-else class="h-4 w-4" />

            {{ isSubmitting ? 'Connexion...' : 'Se connecter' }}
          </button>

          <!-- Séparateur -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200" />
            </div>

            <div class="relative flex justify-center">
              <span class="bg-white px-3 text-xs font-medium text-slate-400">
                Ou continuer avec
              </span>
            </div>
          </div>

          <!-- Connexion sociale -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              title="La connexion Google n'est pas encore configurée"
              class="flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-400"
            >
              <ChromeIcon class="h-4 w-4" />
              Google
            </button>

            <button
              type="button"
              disabled
              title="La connexion Apple n'est pas encore configurée"
              class="flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-400"
            >
              <AppleIcon class="h-4 w-4" />
              Apple
            </button>
          </div>
        </form>

        <!-- Inscription -->
        <p class="mt-8 text-center text-sm text-slate-500">
          Pas encore de compte ?

          <RouterLink
            to="/register"
            class="font-semibold text-[#F47B20] hover:underline"
          >
            Créer un compte gratuit
          </RouterLink>
        </p>

        <!-- Retour accueil -->
        <div class="mt-6 text-center">
          <RouterLink
            to="/"
            class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-[#101D35]"
          >
            <ArrowLeftIcon class="h-3.5 w-3.5" />
            Retour à l'accueil
          </RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import {
  Mail as MailIcon,
  Lock as LockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  LogIn as LogInIcon,
  Loader as LoaderIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Check as CheckIcon,
  Quote as QuoteIcon,
  ArrowLeft as ArrowLeftIcon,
  Chrome as ChromeIcon,
  Apple as AppleIcon,
} from 'lucide-vue-next'

import loginHero from '@/assets/images/feature-4.jpg'
import logo from '@/assets/images/logophoenix.png'

import { useAuthStore } from '@/stores/auth'
import { parseApiError } from '@/api/client'

/* ROUTER ET STORE */
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

/* FORMULAIRE */
const form = reactive({
  identifier: '',
  password: '',
  remember: false,
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const showPassword = ref(false)
const apiError = ref('')
const successMessage = ref('')

/* MESSAGE DE SUCCÈS */
if (route.query.registered === '1') {
  successMessage.value =
    'Compte créé avec succès ! Vous pouvez maintenant vous connecter.'
} else if (route.query.reset === '1') {
  successMessage.value =
    'Mot de passe réinitialisé avec succès. Connectez-vous avec votre nouveau mot de passe.'
}

/* AVANTAGES */
const benefits = [
  "Postulez gratuitement à des milliers d'offres",
  'Suivez vos candidatures en temps réel',
  'Recevez des alertes personnalisées',
  'Accédez à des entreprises vérifiées',
]

/* VALIDATION */
const validate = (): boolean => {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!form.identifier.trim()) {
    errors.identifier = "L'email ou le téléphone est obligatoire."
  }

  if (!form.password) {
    errors.password = 'Le mot de passe est obligatoire.'
  } else if (form.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères.'
  }

  return Object.keys(errors).length === 0
}

/* EFFACER UNE ERREUR QUAND LE CHAMP EST MODIFIÉ */
const clearFieldError = (field: string): void => {
  if (field in errors) {
    delete errors[field]
  }

  apiError.value = ''
}

/* REDIRECTION APRÈS CONNEXION */
const redirectAfterLogin = async (): Promise<void> => {
  const redirect = route.query.redirect

  // Accepter uniquement un chemin interne à l'application.
  if (
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('//') &&
    !redirect.startsWith('/login')
  ) {
    await router.replace(redirect)
    return
  }

  switch (authStore.role) {
    case 'CANDIDATE':
      await router.replace({ name: 'candidate-dashboard' })
      break

    case 'EMPLOYER':
      await router.replace({ name: 'employer-dashboard' })
      break

    case 'ADMIN':
    case 'SUPERADMIN':
      await router.replace({ name: 'admin-dashboard' })
      break

    default:
      await router.replace({ name: 'home' })
      break
  }
}

/* SOUMISSION DU FORMULAIRE */
const handleSubmit = async (): Promise<void> => {
  // Empêcher les soumissions multiples.
  if (isSubmitting.value) return

  apiError.value = ''

  if (!validate()) return

  isSubmitting.value = true

  try {
    const result = await authStore.login({
      identifier: form.identifier.trim(),
      password: form.password,
    })

    // Authentification à deux facteurs.
    if ('mfa_required' in result && result.mfa_required) {
      await router.replace({
        name: 'login-mfa',
        query: {
          token: result.mfa_session_token,
        },
      })
      return
    }

    // Ne pas rediriger si le store n'a pas confirmé l'utilisateur.
    if (!authStore.isAuthenticated) {
      throw new Error(
        'La connexion n’a pas pu être confirmée. Vérifiez vos identifiants et réessayez.',
      )
    }

    await redirectAfterLogin()
  } catch (error: unknown) {
    apiError.value = parseApiError(error).message
  } finally {
    isSubmitting.value = false
  }
}
</script>
