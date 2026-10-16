<template>
  <div class="min-h-screen w-full bg-white lg:grid lg:grid-cols-2">

    <!-- ==================================================
         PANNEAU GAUCHE (DESKTOP)
    =================================================== -->
    <aside class="relative hidden overflow-hidden bg-[#101D35] lg:flex lg:flex-col lg:justify-between">

      <img
        :src="registerHero"
        alt="Rejoindre PHOENIX Jobs & Carrières"
        class="absolute inset-0 h-full w-full object-cover"
      />

      <div class="absolute inset-0 bg-gradient-to-br from-[#101D35]/90 via-[#101D35]/75 to-[#101D35]/60" />

      <div class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.06]" />
      <div class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/[0.08]" />

      <div class="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">

        <RouterLink to="/" class="inline-flex items-center gap-2">
          <img
            :src="logo"
            alt="PHOENIX Jobs & Carrières"
            class="h-10 w-auto object-contain brightness-0 invert"
          />
        </RouterLink>

        <div class="max-w-md">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200">
            Inscription 100% gratuite
          </span>

          <h2 class="mt-6 text-3xl font-bold leading-tight text-white xl:text-4xl">
            Rejoignez
            <span class="block text-[#FF8A24]">la communauté PHOENIX.</span>
          </h2>

          <p class="mt-5 text-sm leading-7 text-slate-300">
            Créez votre compte en 1 minute et accédez à des milliers
            d'opportunités vérifiées partout en Côte d'Ivoire.
          </p>

          <ul class="mt-8 space-y-4">
            <li
              v-for="(stepItem, i) in steps"
              :key="i"
              class="flex items-start gap-3 text-sm text-slate-200"
            >
              <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F47B20] text-xs font-bold text-white">
                {{ i + 1 }}
              </div>
              <span>{{ stepItem }}</span>
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
          <div v-for="stat in miniStats" :key="stat.label">
            <p class="text-xl font-black text-white">{{ stat.value }}</p>
            <p class="mt-1 text-[10px] uppercase tracking-wider text-slate-400">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </aside>

    <!-- ==================================================
         PANNEAU DROIT — FORMULAIRE
    =================================================== -->
    <main class="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-10">

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
          <h1 class="text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
            Créer un compte
          </h1>
          <p class="mt-2 text-sm text-slate-500">
            Rejoignez PHOENIX en quelques secondes. C'est gratuit.
          </p>
        </div>

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

        <!-- ==============================================
             ÉTAPE 1 — CHOIX DU RÔLE
        =============================================== -->
        <div v-if="step === 1" class="space-y-6">

          <div>
            <h2 class="text-base font-bold text-[#101D35]">
              Je m'inscris en tant que :
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Choisissez votre profil pour continuer.
            </p>
          </div>

          <div class="space-y-3">
            <button
              v-for="r in roles"
              :key="r.value"
              type="button"
              class="flex w-full items-start gap-4 rounded-2xl border-2 p-5 text-left transition"
              :class="
                form.role === r.value
                  ? 'border-[#F47B20] bg-orange-50/50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              "
              @click="form.role = r.value"
            >
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition"
                :class="
                  form.role === r.value
                    ? 'bg-[#F47B20] text-white'
                    : 'bg-slate-100 text-slate-600'
                "
              >
                <component :is="r.icon" class="h-6 w-6" />
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="text-sm font-bold text-[#101D35] sm:text-base">
                    {{ r.label }}
                  </h3>
                  <div
                    class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition"
                    :class="
                      form.role === r.value
                        ? 'border-[#F47B20] bg-[#F47B20]'
                        : 'border-slate-300'
                    "
                  >
                    <CheckIcon
                      v-if="form.role === r.value"
                      class="h-3 w-3 text-white"
                    />
                  </div>
                </div>
                <p class="mt-1 text-xs leading-5 text-slate-500">
                  {{ r.description }}
                </p>
              </div>
            </button>
          </div>

          <p v-if="errors.role" class="text-xs font-medium text-red-500">
            {{ errors.role }}
          </p>

          <button
            type="button"
            :disabled="!form.role"
            class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] disabled:cursor-not-allowed disabled:opacity-60"
            @click="goToStep2"
          >
            Continuer
            <ArrowRightIcon class="h-4 w-4" />
          </button>

          <p class="text-center text-sm text-slate-500">
            Déjà un compte ?
            <RouterLink
              to="/login"
              class="font-semibold text-[#F47B20] hover:underline"
            >
              Se connecter
            </RouterLink>
          </p>
        </div>

        <!-- ==============================================
             ÉTAPE 2 — FORMULAIRE
        =============================================== -->
        <div v-else class="space-y-5">

          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-[#F47B20]"
            @click="step = 1"
          >
            <ArrowLeftIcon class="h-3.5 w-3.5" />
            Retour au choix du rôle
          </button>

          <div class="flex items-center gap-3 rounded-2xl border-2 border-orange-200 bg-orange-50/50 p-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F47B20] text-white">
              <component :is="currentRoleIcon" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-[10px] font-bold uppercase tracking-wider text-[#F47B20]">
                Je m'inscris en tant que
              </p>
              <p class="text-sm font-bold text-[#101D35]">
                {{ currentRoleLabel }}
              </p>
            </div>
          </div>

          <!-- Formulaire -->
          <form class="space-y-5" @submit.prevent="handleSubmit">

            <!-- Nom complet -->
            <div>
              <label for="fullname" class="mb-2 block text-sm font-semibold text-[#101D35]">
                Nom complet <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <UserIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="fullname"
                  v-model="form.fullname"
                  type="text"
                  autocomplete="name"
                  required
                  placeholder="Ex. Kouassi Yao"
                  class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <p v-if="errors.fullname" class="mt-1 text-xs font-medium text-red-500">
                {{ errors.fullname }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="mb-2 block text-sm font-semibold text-[#101D35]">
                Email <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <MailIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
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

            <!-- Téléphone -->
            <div>
              <label for="phone" class="mb-2 block text-sm font-semibold text-[#101D35]">
                Téléphone <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <PhoneIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  required
                  placeholder="+225 00 00 00 00"
                  class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <p v-if="errors.phone" class="mt-1 text-xs font-medium text-red-500">
                {{ errors.phone }}
              </p>
            </div>

            <!-- Nom entreprise (si employeur) -->
            <div v-if="form.role === 'EMPLOYER'">
              <label for="company" class="mb-2 block text-sm font-semibold text-[#101D35]">
                Nom de l'entreprise <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <Building2Icon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  required
                  placeholder="Ex. Orange Côte d'Ivoire"
                  class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <p v-if="errors.company" class="mt-1 text-xs font-medium text-red-500">
                {{ errors.company }}
              </p>
              <p class="mt-2 text-xs text-slate-500">
                La fiche entreprise complète se remplira dans votre espace employeur.
              </p>
            </div>

            <!-- Mot de passe -->
            <div>
              <label for="password" class="mb-2 block text-sm font-semibold text-[#101D35]">
                Mot de passe <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <LockIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  placeholder="Au moins 6 caractères"
                  class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                />
                <button
                  type="button"
                  :aria-label="showPassword ? 'Masquer' : 'Afficher'"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:text-[#F47B20]"
                  @click="showPassword = !showPassword"
                >
                  <EyeIcon v-if="!showPassword" class="h-4 w-4" />
                  <EyeOffIcon v-else class="h-4 w-4" />
                </button>
              </div>

              <div v-if="form.password" class="mt-2">
                <div class="flex gap-1">
                  <div
                    v-for="n in 4"
                    :key="n"
                    class="h-1 flex-1 rounded-full transition"
                    :class="passwordStrength.bars >= n ? passwordStrength.color : 'bg-slate-200'"
                  />
                </div>
                <p class="mt-1 text-[11px] font-semibold" :class="passwordStrength.textColor">
                  {{ passwordStrength.label }}
                </p>
              </div>

              <p v-if="errors.password" class="mt-1 text-xs font-medium text-red-500">
                {{ errors.password }}
              </p>
            </div>

            <!-- Confirmation -->
            <div>
              <label for="confirm" class="mb-2 block text-sm font-semibold text-[#101D35]">
                Confirmer le mot de passe <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <LockIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirm"
                  v-model="form.confirm"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  placeholder="Retapez le mot de passe"
                  class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <p v-if="errors.confirm" class="mt-1 text-xs font-medium text-red-500">
                {{ errors.confirm }}
              </p>
            </div>

            <!-- CGU -->
            <label class="flex items-start gap-3 text-xs text-slate-600">
              <input
                v-model="form.consent"
                type="checkbox"
                required
                class="mt-0.5 h-4 w-4 shrink-0 accent-[#F47B20]"
              />
              <span>
                J'accepte les
                <RouterLink to="/terms" class="font-semibold text-[#F47B20] hover:underline">
                  conditions d'utilisation
                </RouterLink>
                et la
                <RouterLink to="/privacy" class="font-semibold text-[#F47B20] hover:underline">
                  politique de confidentialité
                </RouterLink>.
              </span>
            </label>
            <p v-if="errors.consent" class="text-xs font-medium text-red-500">
              {{ errors.consent }}
            </p>

            <!-- Bouton submit -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LoaderIcon v-if="isSubmitting" class="h-4 w-4 animate-spin" />
              <UserPlusIcon v-else class="h-4 w-4" />
              {{ isSubmitting ? 'Création du compte...' : 'Créer mon compte' }}
            </button>
          </form>

          <p class="text-center text-sm text-slate-500">
            Déjà un compte ?
            <RouterLink
              to="/login"
              class="font-semibold text-[#F47B20] hover:underline"
            >
              Se connecter
            </RouterLink>
          </p>
        </div>

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
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  User as UserIcon,
  Building2 as Building2Icon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  UserPlus as UserPlusIcon,
  Loader as LoaderIcon,
  AlertCircle as AlertCircleIcon,
  Check as CheckIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'lucide-vue-next'

import registerHero from '@/assets/images/header-2.jpg'
import logo from '@/assets/images/logophoenix.png'

import { useAuthStore } from '@/stores/auth'
import { parseApiError } from '@/api/client'

/* ============================================================
 * ROUTER + STORE
 * ============================================================ */
const router = useRouter()
const authStore = useAuthStore()

/* ============================================================
 * ÉTAPE
 * ============================================================ */
const step = ref<1 | 2>(1)

/* ============================================================
 * RÔLES
 * ============================================================ */
type Role = 'CANDIDATE' | 'EMPLOYER'

const roles: Array<{
  value: Role
  label: string
  description: string
  icon: typeof UserIcon
}> = [
  {
    value: 'CANDIDATE',
    label: 'Candidat',
    description: "Je cherche un emploi et je souhaite postuler à des offres vérifiées.",
    icon: UserIcon,
  },
  {
    value: 'EMPLOYER',
    label: 'Employeur',
    description: "Je recrute et je souhaite publier des offres et gérer les candidatures.",
    icon: Building2Icon,
  },
]

const currentRoleIcon = computed(
  () => roles.find((r) => r.value === form.role)?.icon ?? UserIcon,
)
const currentRoleLabel = computed(
  () => roles.find((r) => r.value === form.role)?.label ?? '',
)

/* ============================================================
 * FORMULAIRE
 * ============================================================ */
const form = reactive<{
  role: Role | ''
  fullname: string
  email: string
  phone: string
  company: string
  password: string
  confirm: string
  consent: boolean
}>({
  role: '',
  fullname: '',
  email: '',
  phone: '',
  company: '',
  password: '',
  confirm: '',
  consent: false,
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const showPassword = ref(false)
const apiError = ref('')

/* ============================================================
 * ÉTAPES
 * ============================================================ */
const goToStep2 = () => {
  if (!form.role) {
    errors.role = 'Veuillez choisir un profil pour continuer.'
    return
  }
  delete errors.role
  step.value = 2
}

/* ============================================================
 * FORCE DU MOT DE PASSE
 * ============================================================ */
const passwordStrength = computed(() => {
  const pwd = form.password
  let score = 0
  if (pwd.length >= 6) score++
  if (pwd.length >= 10) score++
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
  if (/\d/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++

  const map = [
    { label: 'Très faible', color: 'bg-red-500', textColor: 'text-red-500' },
    { label: 'Faible', color: 'bg-red-500', textColor: 'text-red-500' },
    { label: 'Moyen', color: 'bg-amber-500', textColor: 'text-amber-500' },
    { label: 'Bon', color: 'bg-emerald-500', textColor: 'text-emerald-500' },
    { label: 'Excellent', color: 'bg-emerald-600', textColor: 'text-emerald-600' },
  ]

  return {
    bars: score,
    label: map[score].label,
    color: map[score].color,
    textColor: map[score].textColor,
  }
})

/* ============================================================
 * VALIDATION CLIENT
 * ============================================================ */
const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!form.fullname.trim()) errors.fullname = 'Le nom est obligatoire.'

  if (!form.email.trim()) {
    errors.email = "L'email est obligatoire."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Format d'email invalide."
  }

  if (!form.phone.trim()) errors.phone = 'Le téléphone est obligatoire.'

  if (form.role === 'EMPLOYER' && !form.company.trim()) {
    errors.company = "Le nom de l'entreprise est obligatoire."
  }

  if (!form.password) {
    errors.password = 'Le mot de passe est obligatoire.'
  } else if (form.password.length < 6) {
    errors.password = 'Au moins 6 caractères.'
  }

  if (!form.confirm) {
    errors.confirm = 'Veuillez confirmer le mot de passe.'
  } else if (form.confirm !== form.password) {
    errors.confirm = 'Les mots de passe ne correspondent pas.'
  }

  if (!form.consent) {
    errors.consent = 'Vous devez accepter les conditions.'
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
    await authStore.register({
      email: form.email,
      phone_number: form.phone,
      role: form.role as Role,
      password: form.password,
      cgu_accepted: form.consent,
      data_protection_accepted: form.consent,
    })

    // L'API envoie un OTP (email ou SMS)
    router.push({
      name: 'verify-otp',
      query: { identifier: form.email || form.phone },
    })
  } catch (e) {
    apiError.value = parseApiError(e).message
  } finally {
    isSubmitting.value = false
  }
}

/* ============================================================
 * ÉTAPES (panneau gauche)
 * ============================================================ */
const steps = [
  'Choisissez votre profil (Candidat ou Employeur)',
  'Remplissez le formulaire en 1 minute',
  'Commencez à postuler ou à recruter immédiatement',
]

const miniStats = [
  { value: '120k+', label: 'Candidats' },
  { value: '15k+', label: 'Entreprises' },
  { value: '50k+', label: 'Offres' },
]
</script>