<template>
  <main class="min-h-screen bg-white text-slate-900">

    <!-- ==================================================
         HERO
    =================================================== -->
    <section class="relative overflow-hidden bg-[#101D35] text-white">
      <div class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.06]" />
      <div class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/[0.08]" />

      <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Texte -->
          <div class="relative z-10">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-slate-200">
         
              Nous sommes à votre écoute
            </span>

            <h1 class="mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Contactez
              <span class="mt-2 block text-[#FF8A24]">notre équipe.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Une question, une suggestion, un partenariat ? Écrivez-nous et
              nous vous répondrons dans les plus brefs délais.
            </p>

            <!-- Coordonnées rapides -->
            <div class="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                v-for="item in quickContacts"
                :key="item.label"
                :href="item.href"
                class="group flex items-start gap-3 rounded-2xl border-2 border-white/10 bg-white/[0.05] p-4 transition hover:border-orange-400/40 hover:bg-white/[0.08]"
              >
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/15 text-[#FF9A42]">
                  <component :is="item.icon" class="h-5 w-5" />
                </div>
                <div class="min-w-0">
                  <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {{ item.label }}
                  </p>
                  <p class="mt-1 truncate text-sm font-semibold text-white group-hover:text-[#FF9A42]">
                    {{ item.value }}
                  </p>
                </div>
              </a>
            </div>
          </div>

          <!-- Image -->
          <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl">
              <img
                :src="contactHero"
                alt="Équipe PHENIX à votre écoute"
                class="h-[340px] w-full rounded-[1.5rem] object-cover sm:h-[440px]"
              />
            </div>

            <!-- Carte flottante -->
            <div class="absolute -left-3 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-left-8">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ClockIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">Réponse rapide</p>
                <p class="mt-1 text-xs text-slate-500">Sous 24h ouvrées</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         FORMULAIRE + INFOS
    =================================================== -->
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">

          <!-- ==============================================
               FORMULAIRE
          =============================================== -->
          <div class="lg:col-span-7">
            <div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl sm:p-8">

              <div class="mb-7">
                <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
                  Formulaire de contact
                </p>
                <h2 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
                  Envoyez-nous un message.
                </h2>
                <p class="mt-3 text-sm text-slate-500">
                  Tous les champs marqués d'un <span class="text-red-500">*</span> sont obligatoires.
                </p>
              </div>

              <!-- ✅ Toast succès -->
              <Transition
                enter-active-class="transition duration-300"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="submitted"
                  class="mb-6 flex items-start gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4"
                >
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircleIcon class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-sm font-bold text-emerald-800">
                      Message envoyé avec succès !
                    </p>
                    <p class="mt-1 text-xs text-emerald-700">
                      Nous vous répondrons sous 24h ouvrées.
                    </p>
                  </div>
                </div>
              </Transition>

              <form class="space-y-5" @submit.prevent="handleSubmit">
                <!-- Nom + Email -->
                <div class="grid gap-5 sm:grid-cols-2">
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
                        required
                        placeholder="Ex. Kouassi Yao"
                        class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                      />
                    </div>
                    <p v-if="errors.fullname" class="mt-1 text-xs font-medium text-red-500">
                      {{ errors.fullname }}
                    </p>
                  </div>

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
                        required
                        placeholder="vous@exemple.com"
                        class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                      />
                    </div>
                    <p v-if="errors.email" class="mt-1 text-xs font-medium text-red-500">
                      {{ errors.email }}
                    </p>
                  </div>
                </div>

                <!-- Téléphone + Sujet -->
                <div class="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label for="phone" class="mb-2 block text-sm font-semibold text-[#101D35]">
                      Téléphone
                    </label>
                    <div class="relative">
                      <PhoneIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id="phone"
                        v-model="form.phone"
                        type="tel"
                        placeholder="+225 00 00 00 00"
                        class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="subject" class="mb-2 block text-sm font-semibold text-[#101D35]">
                      Sujet <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <TagIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <select
                        id="subject"
                        v-model="form.subject"
                        required
                        class="w-full appearance-none rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-8 text-sm text-slate-800 outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                      >
                        <option value="">Choisir un sujet</option>
                        <option value="info">Demande d'information</option>
                        <option value="partner">Partenariat</option>
                        <option value="bug">Signaler un problème</option>
                        <option value="support">Support technique</option>
                        <option value="other">Autre</option>
                      </select>
                      <ChevronDownIcon class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <p v-if="errors.subject" class="mt-1 text-xs font-medium text-red-500">
                      {{ errors.subject }}
                    </p>
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="mb-2 block text-sm font-semibold text-[#101D35]">
                    Message <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="6"
                    required
                    placeholder="Décrivez votre demande en quelques lignes..."
                    class="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
                  />
                  <div class="mt-1 flex items-center justify-between">
                    <p v-if="errors.message" class="text-xs font-medium text-red-500">
                      {{ errors.message }}
                    </p>
                    <p class="ml-auto text-[11px] text-slate-400">
                      {{ form.message.length }} / 500
                    </p>
                  </div>
                </div>

                <!-- RGPD -->
                <label class="flex items-start gap-3 text-xs text-slate-600">
                  <input
                    v-model="form.consent"
                    type="checkbox"
                    required
                    class="mt-0.5 h-4 w-4 shrink-0 accent-[#F47B20]"
                  />
                  <span>
                    J'accepte que mes données soient utilisées pour traiter ma demande,
                    conformément à la
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
                  <SendIcon v-else class="h-4 w-4" />
                  {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
                </button>
              </form>
            </div>
          </div>

          <!-- ==============================================
               INFOS LATÉRALES
          =============================================== -->
          <aside class="space-y-6 lg:col-span-5">

            <!-- Bloc coordonnées -->
            <div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md sm:p-7">
              <h3 class="text-base font-bold text-[#101D35]">
                Nos coordonnées
              </h3>

              <ul class="mt-5 space-y-4">
                <li
                  v-for="item in contactDetails"
                  :key="item.label"
                  class="flex items-start gap-3"
                >
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20]">
                    <component :is="item.icon" class="h-5 w-5" />
                  </div>
                  <div>
                    <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {{ item.label }}
                    </p>
                    <p class="mt-0.5 text-sm font-semibold text-[#101D35]">
                      {{ item.value }}
                    </p>
                    <p v-if="item.sub" class="mt-0.5 text-xs text-slate-500">
                      {{ item.sub }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Horaires -->
            <div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md sm:p-7">
              <h3 class="text-base font-bold text-[#101D35]">
                Horaires d'ouverture
              </h3>

              <ul class="mt-5 space-y-3">
                <li
                  v-for="h in hours"
                  :key="h.day"
                  class="flex items-center justify-between border-b border-slate-100 pb-2 text-sm last:border-0"
                >
                  <span class="text-slate-600">{{ h.day }}</span>
                  <span
                    class="font-semibold"
                    :class="h.open ? 'text-[#101D35]' : 'text-slate-400'"
                  >
                    {{ h.hours }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Réseaux sociaux -->
            <div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-md sm:p-7">
              <h3 class="text-base font-bold text-[#101D35]">
                Suivez-nous
              </h3>

              <div class="mt-5 grid grid-cols-3 gap-3">
                <a
                  v-for="s in socials"
                  :key="s.label"
                  :href="s.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="s.label"
                  class="flex h-12 items-center justify-center rounded-xl border-2 border-slate-200 text-slate-600 transition hover:-translate-y-1 hover:border-[#F47B20] hover:bg-[#F47B20] hover:text-white"
                >
                  <component :is="s.icon" class="h-5 w-5" />
                </a>
              </div>
            </div>

            <!-- CTA urgence -->
            <div class="rounded-3xl bg-[#101D35] p-6 text-white shadow-md sm:p-7">
              <div class="flex items-start gap-3">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/15 text-[#FF9A42]">
                  <AlertCircleIcon class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="text-sm font-bold">Besoin d'une réponse rapide ?</h3>
                  <p class="mt-1 text-xs text-slate-300">
                    Appelez-nous directement du lundi au vendredi de 8h à 17h.
                  </p>
                  <a
                    href="tel:+2252722445566"
                    class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#FF9A42] hover:underline"
                  >
                    <PhoneIcon class="h-4 w-4" />
                    +225 27 22 44 55 66
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ==================================================
         FAQ RAPIDE
    =================================================== -->
    <section class="bg-white">
      <div class="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        <div class="mb-10 text-center">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            Questions fréquentes
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
            Vous avez peut-être déjà la réponse.
          </h2>
          <p class="mt-3 text-sm text-slate-500 sm:text-base">
            Consultez notre FAQ pour les questions les plus courantes.
          </p>
        </div>

        <div class="space-y-3">
          <details
            v-for="(faq, i) in faqs"
            :key="i"
            class="group rounded-2xl border-2 border-slate-200 bg-white p-5 transition open:border-[#F47B20] open:shadow-lg hover:border-orange-200"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
              <span class="text-sm font-bold text-[#101D35] sm:text-base">
                {{ faq.question }}
              </span>
              <ChevronDownIcon class="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-[#F47B20]" />
            </summary>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ faq.answer }}
            </p>
          </details>
        </div>

        <div class="mt-10 text-center">
          <RouterLink
            to="/faq"
            class="inline-flex items-center gap-2 text-sm font-semibold text-[#F47B20] hover:underline"
          >
            Voir toutes les questions
            <ArrowRightIcon class="h-4 w-4" />
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Tag as TagIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  ChevronDown as ChevronDownIcon,
  Loader as LoaderIcon,
  ArrowRight as ArrowRightIcon,
  Linkedin as LinkedinIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from 'lucide-vue-next'

/* ============================================================
 * IMAGE IMPORTÉE DANS LE SCRIPT
 * ============================================================ */
import contactHero from '@/assets/images/header-1.jpg'

/* ============================================================
 * CONTACTS RAPIDES (HERO)
 * ============================================================ */
const quickContacts = [
  {
    icon: MailIcon,
    label: 'Email',
    value: 'contact@phenixjobs.ci',
    href: 'mailto:contact@phenixjobs.ci',
  },
  {
    icon: PhoneIcon,
    label: 'Téléphone',
    value: '+225 27 22 44 55 66',
    href: 'tel:+2252722445566',
  },
]

/* ============================================================
 * FORMULAIRE
 * ============================================================ */
const form = reactive({
  fullname: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const submitted = ref(false)

const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!form.fullname.trim()) errors.fullname = 'Le nom est obligatoire.'
  if (!form.email.trim()) {
    errors.email = "L'email est obligatoire."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Format d'email invalide."
  }
  if (!form.subject) errors.subject = 'Veuillez choisir un sujet.'
  if (!form.message.trim()) {
    errors.message = 'Le message ne peut pas être vide.'
  } else if (form.message.length > 500) {
    errors.message = 'Le message ne doit pas dépasser 500 caractères.'
  }
  if (!form.consent) errors.consent = 'Vous devez accepter la politique de confidentialité.'

  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  submitted.value = false

  // 🔌 À remplacer par l'appel API réel
  await new Promise((resolve) => setTimeout(resolve, 1200))

  isSubmitting.value = false
  submitted.value = true

  // Reset
  form.fullname = ''
  form.email = ''
  form.phone = ''
  form.subject = ''
  form.message = ''
  form.consent = false

  // Hide success after 6s
  setTimeout(() => (submitted.value = false), 6000)
}

/* ============================================================
 * COORDONNÉES DÉTAILLÉES
 * ============================================================ */
const contactDetails = [
  {
    icon: MapPinIcon,
    label: 'Adresse',
    value: 'Cocody, Riviera Golf',
    sub: 'Abidjan, Côte d’Ivoire',
  },
  {
    icon: MailIcon,
    label: 'Email',
    value: 'contact@phenixjobs.ci',
    sub: 'Réponse sous 24h ouvrées',
  },
  {
    icon: PhoneIcon,
    label: 'Téléphone',
    value: '+225 27 22 44 55 66',
    sub: 'Lun-Ven · 8h à 17h',
  },
]

/* ============================================================
 * HORAIRES
 * ============================================================ */
const hours = [
  { day: 'Lundi', hours: '8h - 17h', open: true },
  { day: 'Mardi', hours: '8h - 17h', open: true },
  { day: 'Mercredi', hours: '8h - 17h', open: true },
  { day: 'Jeudi', hours: '8h - 17h', open: true },
  { day: 'Vendredi', hours: '8h - 16h', open: true },
  { day: 'Samedi', hours: 'Fermé', open: false },
  { day: 'Dimanche', hours: 'Fermé', open: false },
]

/* ============================================================
 * RÉSEAUX SOCIAUX
 * ============================================================ */
const socials = [
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
]

/* ============================================================
 * FAQ RAPIDE
 * ============================================================ */
const faqs = [
  {
    question: 'Combien de temps pour recevoir une réponse ?',
    answer:
      'Nous répondons généralement sous 24 heures ouvrées. Pour les demandes urgentes, privilégiez l’appel téléphonique.',
  },
  {
    question: 'Comment devenir entreprise partenaire ?',
    answer:
      'Sélectionnez « Partenariat » dans le formulaire ou écrivez directement à partenariats@phenixjobs.ci. Notre équipe vous recontactera.',
  },
  {
    question: 'Puis-je signaler une offre suspecte ?',
    answer:
      'Oui, utilisez le sujet « Signaler un problème » et précisez l’identifiant de l’offre. Nous traitons chaque signalement sérieusement.',
  },
  {
    question: 'Proposez-vous un support technique ?',
    answer:
      'Absolument. Sélectionnez « Support technique » dans le formulaire et décrivez précisément le problème rencontré.',
  },
]
</script>