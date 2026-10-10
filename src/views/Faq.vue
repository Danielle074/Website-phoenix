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
       
              Centre d'aide PHOENIX
            </span>

            <h1 class="mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Questions
              <span class="mt-2 block text-[#FF8A24]">fréquentes.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Trouvez rapidement les réponses aux questions les plus posées
              par les candidats et les employeurs sur PHOENIX Jobs & Carrières.
            </p>

            <!-- Barre de recherche -->
            <div class="mt-9 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20 sm:flex sm:items-center">
              <div class="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
                <SearchIcon class="h-5 w-5 shrink-0 text-[#F47B20]" />
                <input
                  v-model="searchQuery"
                  type="search"
                  placeholder="Rechercher une question..."
                  class="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <button
                class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] sm:w-auto"
              >
                Rechercher
                <ArrowRightIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Image -->
          <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl">
              <img
                :src="faqHero"
                alt="Centre d'aide PHENIX Jobs & Carrières"
                class="h-[340px] w-full rounded-[1.5rem] object-cover sm:h-[440px]"
              />
            </div>

            <!-- Carte flottante -->
            <div class="absolute -left-3 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-left-8">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20]">
                <HelpCircleIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">{{ totalQuestions }} questions</p>
                <p class="mt-1 text-xs text-slate-500">Toutes les réponses ici</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CATÉGORIES RAPIDES
    =================================================== -->
    <section class="border-b border-slate-100 bg-white">
      <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div class="mb-8 max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            Parcourir par thème
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
            Trouvez votre réponse par catégorie.
          </h2>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="group flex flex-col items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#F47B20] hover:shadow-lg"
            :class="{ 'border-[#F47B20] bg-orange-50/40': activeCategory === cat.id }"
            @click="filterByCategory(cat.id)"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20] transition group-hover:bg-[#F47B20] group-hover:text-white"
              :class="{ 'bg-[#F47B20] text-white': activeCategory === cat.id }"
            >
              <component :is="cat.icon" class="h-5 w-5" />
            </div>
            <span class="text-xs font-bold leading-tight text-[#101D35]">
              {{ cat.label }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- ==================================================
         LISTE DES QUESTIONS
    =================================================== -->
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        <!-- Résultat de recherche -->
        <p
          v-if="searchQuery || activeCategory"
          class="mb-6 text-center text-sm text-slate-500"
        >
          <span class="font-bold text-[#101D35]">{{ filteredFaqs.length }}</span>
          résultat{{ filteredFaqs.length > 1 ? 's' : '' }} trouvé{{ filteredFaqs.length > 1 ? 's' : '' }}
          <button
            class="ml-2 font-semibold text-[#F47B20] hover:underline"
            @click="resetFilters"
          >
            Réinitialiser
          </button>
        </p>

        <!-- Accordéon -->
        <div v-if="filteredFaqs.length" class="space-y-3">
          <details
            v-for="(faq, i) in filteredFaqs"
            :key="i"
            class="group rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition open:border-[#F47B20] open:shadow-lg hover:border-orange-200"
          >
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
              <div class="flex items-start gap-3">
                <span
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#F47B20] group-open:bg-[#F47B20] group-open:text-white"
                >
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="pt-1 text-sm font-bold text-[#101D35] sm:text-base">
                  {{ faq.question }}
                </span>
              </div>
              <ChevronDownIcon class="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-[#F47B20]" />
            </summary>

            <div class="mt-4 border-t border-slate-100 pt-4 pl-11">
              <p class="text-sm leading-7 text-slate-600">
                {{ faq.answer }}
              </p>
              <div class="mt-3 flex items-center gap-2">
                <span class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-600">
                  {{ getCategoryLabel(faq.category) }}
                </span>
              </div>
            </div>
          </details>
        </div>

        <!-- État vide -->
        <div
          v-else
          class="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center"
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
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="rounded-3xl bg-[#101D35] p-8 text-white shadow-2xl sm:p-12">
          <div class="grid items-center gap-8 lg:grid-cols-2">

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
                class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
              >
                <MailIcon class="h-4 w-4" />
                Nous contacter
              </RouterLink>

              <a
                href="tel:+2252722445566"
                class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
              >
                <PhoneIcon class="h-4 w-4" />
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
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        <div class="mb-10 max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            Ressources utiles
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
            D'autres liens qui pourraient vous aider.
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <RouterLink
            v-for="res in resources"
            :key="res.title"
            :to="res.to"
            class="group flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20] shadow-sm transition group-hover:bg-[#F47B20] group-hover:text-white">
              <component :is="res.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-lg font-bold text-[#101D35]">{{ res.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-500">{{ res.description }}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#F47B20]">
              En savoir plus
              <ArrowRightIcon class="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
} from 'lucide-vue-next'

/* ============================================================
 * IMAGE IMPORTÉE DANS LE SCRIPT
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
      'Oui, à 100 %. PHENIX Jobs & Carrières ne facture aucun frais aux candidats, ni à l\'inscription, ni à la candidature, ni au suivi des démarches.',
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
    question: 'Comment contacter l\'équipe PHENIX ?',
    answer:
      'Vous pouvez nous joindre via la page Contact, par email à contact@phenixjobs.ci, ou par téléphone au +225 27 22 44 55 66 du lundi au vendredi.',
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
        f.answer.toLowerCase().includes(q)
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
    description: 'Tout ce qu\'il faut savoir pour réussir votre recherche d\'emploi.',
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
    description: 'Parcourez des milliers d\'opportunités vérifiées.',
    to: '/jobs',
  },
]
</script>