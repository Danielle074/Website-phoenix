<template>
  <div class="min-h-screen w-full bg-white lg:grid lg:grid-cols-2">

 
    <aside class="relative hidden overflow-hidden bg-[#101D35] lg:flex lg:flex-col lg:justify-between">

      <!-- Image de fond -->
      <img
        :src="loginHero"
        alt="Travailler en Côte d'Ivoire"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <!-- Overlay dégradé -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#101D35]/90 via-[#101D35]/75 to-[#101D35]/60" />

      <!-- Décorations -->
      <div class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.06]" />
      <div class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/[0.08]" />

      <!-- Contenu -->
      <div class="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">

        <!-- Logo -->
        <RouterLink to="/" class="inline-flex items-center gap-2">
          <img
            :src="logo"
            alt="PHENIX Jobs & Carrières"
            class="h-10 w-auto object-contain brightness-0 invert"
          />
        </RouterLink>

        <!-- Bloc central -->
        <div class="max-w-md">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200">
          
            La plateforme de l'emploi en Côte d'Ivoire
          </span>

          <h2 class="mt-6 text-3xl font-bold leading-tight text-white xl:text-4xl">
            Votre prochain emploi
            <span class="block text-[#FF8A24]">vous attend.</span>
          </h2>

          <p class="mt-5 text-sm leading-7 text-slate-300">
            Connectez-vous pour accéder à votre espace personnel, suivre vos
            candidatures et découvrir de nouvelles opportunités.
          </p>

          <!-- Avantages -->
          <ul class="mt-8 space-y-3">
            <li
              v-for="benefit in benefits"
              :key="benefit"
              class="flex items-start gap-3 text-sm text-slate-200"
            >
              <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                <CheckIcon class="h-3 w-3" />
              </div>
              <span>{{ benefit }}</span>
            </li>
          </ul>
        </div>

        <!-- Témoignage en bas -->
        <div class="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
          <QuoteIcon class="h-5 w-5 text-[#FF9A42]" />
          <p class="mt-3 text-sm leading-6 text-slate-200 italic">
            "Grâce à PHENIX, j'ai trouvé mon premier emploi à Abidjan en moins d'un mois."
          </p>
          <div class="mt-3 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#F47B20] text-sm font-bold text-white">
              KA
            </div>
            <div>
              <p class="text-xs font-bold text-white">Kouadio Amadou</p>
              <p class="text-[10px] text-slate-400">Développeur Web · Abidjan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>


    <main class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-10">

      <div class="w-full max-w-md">

        <!-- Logo mobile -->
        <div class="mb-8 flex justify-center lg:hidden">
          <RouterLink to="/">
            <img
              :src="logo"
              alt="PHENIX Jobs & Carrières"
              class="h-12 w-auto object-contain"
            />
          </RouterLink>
        </div>

        <!-- Titre -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
            Bon retour ! 
          </h1>
          <p class="mt-2 text-sm text-slate-500">
            Connectez-vous pour accéder à votre espace personnel.
          </p>
        </div>

        <!-- Toast succès (après inscription par ex.) -->
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="successMessage"
            class="mb-5 flex items-start gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4"
          >
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircleIcon class="h-5 w-5" />
            </div>
            <p class="text-sm font-semibold text-emerald-800">
              {{ successMessage }}
            </p>
          </div>
        </Transition>

        <!-- Toast erreur API -->
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="apiError"
            class="mb-5 flex items-start gap-3 rounded-2xl border-2 border-red-200 bg-red-50 p-4"
          >
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertCircleIcon class="h-5 w-5" />
            </div>
            <p class="text-sm font-semibold text-red-800">
              {{ apiError }}
            </p>
          </div>
        </Transition>

        <!-- Formulaire -->
        <form class="space-y-5" @submit.prevent="handleSubmit">

          <!-- Email -->
          <div>
            <label for="email" class="mb-2 block text-sm font-semibold text-[#101D35]">
              Email ou téléphone <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <MailIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="email"
                v-model="form.email"
                type="text"
                autocomplete="email"
                required
                placeholder="vous@exemple.com"
                class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-xs font-medium text-red-500">
              {{ errors.email }}
            </p>
          </div>

          <!-- Mot de passe -->
          <div>
            <div class="mb-2 flex items-center justify-between">
              <label for="password" class="text-sm font-semibold text-[#101D35]">
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
              <LockIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
              />
              <button
                type="button"
                :aria-label="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
                class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:text-[#F47B20]"
                @click="showPassword = !showPassword"
              >
                <EyeIcon v-if="!showPassword" class="h-4 w-4" />
                <EyeOffIcon v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs font-medium text-red-500">
              {{ errors.password }}
            </p>
          </div>

          <!-- Se souvenir de moi -->
          <div class="flex items-center justify-between">
            <label class="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 accent-[#F47B20]"
              />
              Se souvenir de moi
            </label>
          </div>

          <!-- Bouton submit -->
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

          <!-- Boutons sociaux -->
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              class="flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <ChromeIcon class="h-4 w-4" />
              Google
            </button>
            <button
              type="button"
              class="flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <LinkedinIcon class="h-4 w-4" />
              LinkedIn
            </button>
          </div>
        </form>

        <!-- Lien inscription -->
        <p class="mt-8 text-center text-sm text-slate-500">
          Pas encore de compte ?
          <RouterLink
            to="/register"
            class="font-semibold text-[#F47B20] hover:underline"
          >
            Créer un compte gratuit
          </RouterLink>
        </p>

        <!-- Retour à l'accueil -->
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
  Linkedin as LinkedinIcon,
} from 'lucide-vue-next'

/* ============================================================
 * IMAGES IMPORTÉES DANS LE SCRIPT
 * ============================================================ */
import loginHero from '@/assets/images/feature-4.jpg'
import logo from '@/assets/images/logophoenix.png'

/* ============================================================
 * ROUTER
 * ============================================================ */
const router = useRouter()
const route = useRoute()

/* ============================================================
 * ÉTAT
 * ============================================================ */
const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const showPassword = ref(false)
const apiError = ref('')
const successMessage = ref('')

// Message succès si on vient de /register
if (route.query.registered === '1') {
  successMessage.value = 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.'
}

/* ============================================================
 * AVANTAGES (panneau gauche)
 * ============================================================ */
const benefits = [
  'Postulez gratuitement à des milliers d\'offres',
  'Suivez vos candidatures en temps réel',
  'Recevez des alertes personnalisées',
  'Accédez à des entreprises vérifiées',
]

/* ============================================================
 * VALIDATION
 * ============================================================ */
const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!form.email.trim()) {
    errors.email = 'L\'email est obligatoire.'
  }
  if (!form.password) {
    errors.password = 'Le mot de passe est obligatoire.'
  } else if (form.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères.'
  }

  return Object.keys(errors).length === 0
}

/* ============================================================
 * SUBMIT
 * ============================================================ */
const handleSubmit = async () => {
  apiError.value = ''

  if (!validate()) return

  isSubmitting.value = true

  try {
    // 🔌 À REMPLACER par l'appel API réel (auth.service.ts)
    // const { token, user } = await authService.login(form.email, form.password)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Simulation : on stocke en localStorage (à remplacer par Pinia plus tard)
    localStorage.setItem('phenix_token', 'demo-token')
    localStorage.setItem('phenix_role', 'candidate')

    // Redirection
    const redirect = (route.query.redirect as string) || '/candidate/dashboard'
    router.push(redirect)
  } catch (err: any) {
    apiError.value = 'Identifiants incorrects. Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}
</script>