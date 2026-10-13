<template>
  <main class="min-h-screen bg-white text-slate-900">

    <!-- ==================================================
         HERO
    =================================================== -->
    <section class="relative overflow-hidden bg-[#0A1524] text-white">
      <!-- Cercles lumineux -->
      <div class="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent blur-3xl" />
      <div class="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-gradient-to-tr from-[#FF8A24]/15 to-transparent blur-3xl" style="animation-delay: 2s" />

      <!-- Cercles concentriques -->
      <div class="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] animate-spin-slow rounded-full border border-white/[0.05]" />
      <div class="pointer-events-none absolute -right-16 top-24 h-[280px] w-[280px] animate-spin-slow-reverse rounded-full border border-white/[0.08]" />

      <!-- Grille décorative -->
      <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 80px 80px;" />

      <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Texte -->
          <div class="relative z-10">
            <span class="hero-enter hero-enter-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-md">
              <span class="h-1.5 w-1.5 rounded-full bg-[#FF8A24]" />
              Centre d'aide PHOENIX
            </span>

            <h1 class="hero-enter hero-enter-2 mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Questions
              <span class="mt-2 block bg-gradient-to-r from-[#FF8A24] via-[#FFB067] to-[#FF8A24] bg-clip-text text-transparent">
                fréquentes.
              </span>
            </h1>

            <p class="hero-enter hero-enter-3 mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Trouvez rapidement les réponses aux questions les plus posées
              par les candidats et les employeurs sur PHOENIX Jobs & Carrières.
            </p>

            <!-- Barre de recherche -->
            <div class="hero-enter hero-enter-4 group relative mt-9 max-w-2xl">
              <div class="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#F47B20]/40 via-[#FF8A24]/30 to-[#F47B20]/40 opacity-50 blur-xl transition-opacity duration-500 group-focus-within:opacity-90" />

              <div class="relative rounded-2xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur-2xl transition-all duration-300 group-focus-within:border-[#F47B20]/40 group-focus-within:bg-white/[0.08] sm:flex sm:items-center">
                <div class="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
                  <SearchIcon class="h-5 w-5 shrink-0 text-[#FF8A24]" />
                  <input
                    v-model="searchQuery"
                    type="search"
                    placeholder="Rechercher une question..."
                    class="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <button
                  class="group/btn relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] sm:w-auto"
                >
                  <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  <span class="relative">Rechercher</span>
                  <ArrowRightIcon class="relative h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Image -->
          <div class="hero-enter hero-enter-5 relative mx-auto w-full max-w-xl lg:max-w-none">
            <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl">
              <div class="relative overflow-hidden rounded-[1.5rem]">
                <img
                  :src="faqHero"
                  alt="Centre d'aide PHOENIX Jobs & Carrières"
                  class="h-[340px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[440px]"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0A1524]/60 via-transparent to-transparent" />
              </div>
            </div>

            <!-- Carte flottante -->
            <div class="absolute -left-3 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-left-8">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] shadow-sm">
                <HelpCircleIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">{{ totalQuestions }} questions</p>
                <p class="mt-1 text-xs text-slate-500">Toutes les réponses ici</p>
              </div>
            </div>

            <!-- Carte flottante bas droite -->
            <div class="absolute -bottom-5 right-4 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-right-6">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 shadow-sm">
                <CheckCircleIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">Réponse 24h</p>
                <p class="mt-1 text-xs text-slate-500">Support garanti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CATÉGORIES
    =================================================== -->
    <section class="border-b border-slate-100 bg-white">
      <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div class="reveal mb-8 max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            Parcourir par thème
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
            Trouvez votre réponse par catégorie.
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <button
            v-for="(cat, i) in categories"
            :key="cat.id"
            class="reveal group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-xl hover:shadow-orange-500/15"
            :class="{ 'border-[#F47B20] bg-orange-50/40 shadow-lg shadow-orange-500/15': activeCategory === cat.id }"
            :style="{ transitionDelay: `${i * 50}ms` }"
            @click="filterByCategory(cat.id)"
          >
            <!-- Halo radial au survol -->
            <div class="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-br from-[#F47B20]/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div
              class="relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500"
              :class="
                activeCategory === cat.id
                  ? 'bg-gradient-to-br from-[#F47B20] to-[#FF8A24] text-white shadow-lg shadow-orange-500/30'
                  : 'bg-orange-50 text-[#F47B20] group-hover:bg-gradient-to-br group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30'
              "
            >
              <component :is="cat.icon" class="h-5 w-5" />
            </div>
            <span class="relative text-xs font-bold leading-tight text-[#101D35]">
              {{ cat.label }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- ==================================================
         LISTE DES QUESTIONS
    =================================================== -->
    <section class="relative overflow-hidden bg-[#F8FAFC]">
      <div class="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-orange-100/50 to-transparent blur-3xl" />

      <div class="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        <!-- Résultat de recherche -->
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <p
            v-if="searchQuery || activeCategory"
            class="mb-6 flex items-center justify-center gap-2 text-sm text-slate-500"
          >
            <span class="font-bold text-[#101D35]">{{ filteredFaqs.length }}</span>
            résultat{{ filteredFaqs.length > 1 ? 's' : '' }} trouvé{{ filteredFaqs.length > 1 ? 's' : '' }}
            <button
              class="font-semibold text-[#F47B20] transition hover:gap-3 hover:underline"
              @click="resetFilters"
            >
              Réinitialiser
            </button>
          </p>
        </Transition>

        <!-- Accordéon -->
        <TransitionGroup
          v-if="filteredFaqs.length"
          tag="div"
          name="faq-list"
          class="space-y-3"
        >
          <details
            v-for="(faq, i) in filteredFaqs"
            :key="faq.question"
            class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 open:border-[#F47B20] open:bg-orange-50/20 open:shadow-xl open:shadow-orange-500/10 hover:border-orange-200"
            :style="{ transitionDelay: `${i * 40}ms` }"
          >
            <!-- Liseré dégradé gauche -->
            <div class="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-[#F47B20] to-[#FF8A24] transition-transform duration-500 group-open:scale-y-100" />

            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
              <div class="flex items-start gap-3">
                <span
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#F47B20] transition-all duration-300 group-open:bg-gradient-to-br group-open:from-[#F47B20] group-open:to-[#FF8A24] group-open:text-white group-open:shadow-md group-open:shadow-orange-500/30"
                >
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="pt-1 text-sm font-bold text-[#101D35] transition group-hover:text-[#F47B20] sm:text-base">
                  {{ faq.question }}
                </span>
              </div>
              <ChevronDownIcon class="h-5 w-5 shrink-0 text-slate-400 transition duration-300 group-open:rotate-180 group-open:text-[#F47B20]" />
            </summary>

            <div class="mt-0 border-t border-slate-100 px-5 pb-5 pt-4 pl-16">
              <p class="text-sm leading-7 text-slate-600">
                {{ faq.answer }}
              </p>
              <div class="mt-4 flex items-center gap-2">
                <span class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F47B20] ring-1 ring-orange-100">
                  <span class="h-1 w-1 rounded-full bg-[#F47B20]" />
                  {{ getCategoryLabel(faq.category) }}
                </span>
              </div>
            </div>
          </details>
        </TransitionGroup>

        <!-- État vide -->
        <div
          v-else
          class="reveal rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center"
        >
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <SearchXIcon class="h-8 w-8" />
          </div>
          <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucune question trouvée</h3>
          <p class="mt-2 text-sm text-slate-500">
            Essayez avec d'autres mots-clés ou changez de catégorie.
          </p>
          <button
            class="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-5 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
            @click="resetFilters"
          >
            Réinitialiser la recherche
          </button>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CONTACT SUPPORT
    =================================================== -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div class="reveal relative overflow-hidden rounded-3xl bg-[#0A1524] p-8 text-white shadow-2xl sm:p-12">
          <!-- Décorations -->
          <div class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/25 to-transparent blur-3xl" />
          <div class="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 animate-pulse-slow rounded-full bg-gradient-to-tr from-[#FF8A24]/20 to-transparent blur-3xl" style="animation-delay: 2s" />
          <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 40px 40px;" />

          <div class="relative grid items-center gap-8 lg:grid-cols-2">

            <div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#FF9A42]">
                Vous n'avez pas trouvé ?
              </p>
              <h2 class="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Notre équipe est là pour vous aider.
              </h2>
              <p class="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Écrivez-nous directement et nous vous répondrons sous 24h ouvrées.
                Notre support est 100% gratuit.
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <RouterLink
                to="/contact"
                class="group/cta relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DF6810] hover:shadow-xl"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
                <MailIcon class="relative h-4 w-4" />
                <span class="relative">Nous contacter</span>
              </RouterLink>

              <a
                href="tel:+2252722445566"
                class="group/tel inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.12]"
              >
                <PhoneIcon class="h-4 w-4 transition-transform group-hover/tel:rotate-12" />
                Appeler
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         AUTRES RESSOURCES
    =================================================== -->
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

        <div class="reveal mb-10 max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            Ressources utiles
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
            D'autres liens qui pourraient vous aider.
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <RouterLink
            v-for="(res, i) in resources"
            :key="res.title"
            :to="res.to"
            class="reveal group relative flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <!-- Barre top gradient -->
            <div class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-transform duration-500 group-hover:scale-x-100" />

            <!-- Halo radial -->
            <div class="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div class="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
              <component :is="res.icon" class="h-6 w-6" />
            </div>
            <h3 class="relative mt-5 text-lg font-bold text-[#101D35] transition group-hover:text-[#F47B20]">{{ res.title }}</h3>
            <p class="relative mt-2 text-sm leading-6 text-slate-500">{{ res.description }}</p>
            <span class="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#F47B20] transition group-hover:gap-2">
              En savoir plus
              <ArrowRightIcon class="h-4 w-4" />
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Search as SearchIcon,
  ArrowRight as ArrowRightIcon,
  ChevronDown as ChevronDownIcon,
  HelpCircle as HelpCircleIcon,
  SearchX as SearchXIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  ShieldCheck as ShieldCheckIcon,
  CreditCard as CreditCardIcon,
  Building2 as Building2Icon,
  FileText as FileTextIcon,
  Sparkles as SparklesIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-vue-next'

/* ============================================================
 * IMAGE
 * ============================================================ */
import faqHero from '@/assets/images/header-2.jpg'

/* ============================================================
 * ÉTAT
 * ============================================================ */
const searchQuery = ref('')
const activeCategory = ref<string>('')

/* ============================================================
 * CATÉGORIES
 * ============================================================ */
const categories = [
  { id: 'candidat', label: 'Candidats', icon: UserIcon },
  { id: 'employeur', label: 'Employeurs', icon: Building2Icon },
  { id: 'compte', label: 'Mon compte', icon: ShieldCheckIcon },
  { id: 'candidature', label: 'Candidatures', icon: FileTextIcon },
  { id: 'paiement', label: 'Paiement', icon: CreditCardIcon },
  { id: 'general', label: 'Général', icon: SparklesIcon },
]

/* ============================================================
 * QUESTIONS FRÉQUENTES
 * ============================================================ */
const faqs = [
  {
    category: 'candidat',
    question: 'Comment créer un compte candidat sur PHOENIX ?',
    answer:
      'Rendez-vous sur la page Inscription, choisissez le rôle "Candidat", puis remplissez le formulaire avec votre email ou votre numéro de téléphone. Vous recevrez un lien de confirmation pour activer votre compte.',
  },
  {
    category: 'candidat',
    question: 'La candidature est-elle vraiment gratuite ?',
    answer:
      "Oui, à 100 %. PHOENIX Jobs & Carrières ne facture aucun frais aux candidats, ni à l'inscription, ni à la candidature, ni au suivi des démarches.",
  },
  {
    category: 'candidat',
    question: 'Comment postuler à une offre ?',
    answer:
      'Ouvrez l\'offre qui vous intéresse, vérifiez qu\'elle correspond à votre profil, puis cliquez sur "Postuler". Vous pourrez joindre votre CV (PDF ou DOCX) et envoyer votre candidature en un clic.',
  },
  {
    category: 'candidat',
    question: 'Puis-je modifier mon CV après avoir postulé ?',
    answer:
      'Oui, vous pouvez mettre à jour votre CV à tout moment depuis votre espace candidat. Les recruteurs verront toujours la version la plus récente.',
  },
  {
    category: 'candidature',
    question: 'Comment suivre mes candidatures ?',
    answer:
      'Depuis votre tableau de bord candidat, un onglet "Mes candidatures" vous permet de voir le statut de chaque candidature : En attente, En cours d\'examen, Entretien, Acceptée ou Refusée.',
  },
  {
    category: 'candidature',
    question: 'Puis-je annuler une candidature ?',
    answer:
      'Oui, tant que le recruteur n\'a pas encore traité votre candidature. Une fois qu\'elle est en phase d\'entretien, contactez directement l\'entreprise.',
  },
  {
    category: 'employeur',
    question: 'Comment publier une offre d\'emploi ?',
    answer:
      'Créez un compte Employeur, faites vérifier votre entreprise par notre équipe, puis accédez à votre tableau de bord pour publier une offre en quelques minutes. La publication est gratuite.',
  },
  {
    category: 'employeur',
    question: 'Combien de temps prend la vérification de mon entreprise ?',
    answer:
      'La vérification prend généralement entre 24 et 48 heures ouvrées. Vous recevrez une notification dès que votre compte sera validé.',
  },
  {
    category: 'employeur',
    question: 'Puis-je gérer plusieurs offres simultanément ?',
    answer:
      'Oui. Votre tableau de bord employeur vous permet de gérer plusieurs offres, de suivre les candidatures reçues et de communiquer avec les candidats.',
  },
  {
    category: 'compte',
    question: 'J\'ai oublié mon mot de passe, que faire ?',
    answer:
      'Cliquez sur "Mot de passe oublié" sur la page Connexion, saisissez votre email. Vous recevrez un lien sécurisé pour réinitialiser votre mot de passe.',
  },
  {
    category: 'compte',
    question: 'Comment supprimer mon compte ?',
    answer:
      'Depuis votre profil, section "Paramètres du compte", cliquez sur "Supprimer mon compte". Cette action est définitive et supprime toutes vos données.',
  },
  {
    category: 'paiement',
    question: 'Est-ce que PHOENIX demande des frais cachés ?',
    answer:
      'Non, jamais. La plateforme est entièrement gratuite pour les candidats. Aucune somme d\'argent ne vous sera jamais demandée pour postuler.',
  },
  {
    category: 'general',
    question: 'Dans quelles villes les offres sont-elles disponibles ?',
    answer:
      'Les offres couvrent toute la Côte d\'Ivoire : Abidjan, Yamoussoukro, Bouaké, San-Pédro, Korhogo et d\'autres villes. Utilisez les filtres de localisation pour affiner votre recherche.',
  },
  {
    category: 'general',
    question: 'Comment contacter l\'équipe PHOENIX ?',
    answer:
      'Vous pouvez nous joindre via la page Contact, par email à contact@phoenixjobs.ci, ou par téléphone au +225 27 22 44 55 66 du lundi au vendredi.',
  },
]

/* ============================================================
 * CALCULS
 * ============================================================ */
const totalQuestions = computed(() => faqs.length)

const filteredFaqs = computed(() => {
  let result = faqs

  if (activeCategory.value) {
    result = result.filter((f) => f.category === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q),
    )
  }

  return result
})

const getCategoryLabel = (id: string) =>
  categories.find((c) => c.id === id)?.label ?? ''

const filterByCategory = (id: string) => {
  activeCategory.value = activeCategory.value === id ? '' : id
}

const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = ''
}

/* ============================================================
 * RESSOURCES
 * ============================================================ */
const resources = [
  {
    icon: UserIcon,
    title: 'Guide du candidat',
    description: "Tout ce qu'il faut savoir pour réussir votre recherche d'emploi.",
    to: '/about',
  },
  {
    icon: Building2Icon,
    title: 'Espace employeur',
    description: 'Publiez vos offres et gérez vos candidatures efficacement.',
    to: '/employer/dashboard',
  },
  {
    icon: BriefcaseIcon,
    title: 'Découvrir les offres',
    description: "Parcourez des milliers d'opportunités vérifiées.",
    to: '/jobs',
  },
]

/* ============================================================
 * OBSERVER REVEAL
 * ============================================================ */
let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* ============================================================
   ANIMATIONS
============================================================ */
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

@keyframes heroEnter {
  to { opacity: 1; transform: translateY(0); }
}
.hero-enter {
  opacity: 0;
  transform: translateY(24px);
  animation: heroEnter 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hero-enter-1 { animation-delay: 0.05s; }
.hero-enter-2 { animation-delay: 0.2s; }
.hero-enter-3 { animation-delay: 0.35s; }
.hero-enter-4 { animation-delay: 0.5s; }
.hero-enter-5 { animation-delay: 0.4s; }

/* ============================================================
   REVEAL AU SCROLL
============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================
   TRANSITION LISTE FAQ
============================================================ */
.faq-list-enter-active,
.faq-list-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-list-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.faq-list-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
.faq-list-move {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ============================================================
   DETAILS MARKER
============================================================ */
details summary::-webkit-details-marker {
  display: none;
}

/* ============================================================
   ACCESSIBILITÉ
============================================================ */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal,
  .hero-enter {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>