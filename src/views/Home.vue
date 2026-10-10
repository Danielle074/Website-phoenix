<template>
  <main class="min-h-screen bg-white text-slate-900">
    <!-- HERO -->
    <section class="relative overflow-hidden bg-[#101D35]">
      <div
        class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.06]"
      />
      <div
        class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/[0.08]"
      />

      <div
        class="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24"
      >
        <!-- Texte -->
        <div class="relative z-10">
          <div
            class="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-slate-200"
          >
          
            La plateforme de l'emploi en Côte d'Ivoire
          </div>

          <h1
            class="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Votre prochain emploi
            <span class="mt-2 block text-[#FF8A24]">
              commence ici.
            </span>
          </h1>

          <p
            class="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            Découvrez des opportunités professionnelles, valorisez vos
            compétences et donnez une nouvelle dimension à votre carrière
            avec PHENIX Jobs & Carrières.
          </p>

          <!-- Recherche -->
          <form
            class="mt-9 rounded-2xl bg-white p-2 shadow-2xl shadow-black/20 sm:flex sm:items-center"
            @submit.prevent="handleSearch"
          >
            <div
              class="flex min-w-0 flex-1 items-center gap-3 border-b border-slate-100 px-3 py-3 sm:border-b-0 sm:border-r sm:border-slate-200"
            >
              <SearchIcon class="h-5 w-5 shrink-0 text-[#F47B20]" />

              <div class="min-w-0 flex-1">
                <label
                  for="job-search"
                  class="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  Poste recherché
                </label>

                <input
                  id="job-search"
                  v-model="searchQuery"
                  type="search"
                  placeholder="Ex. Développeur Front-End"
                  class="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div class="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
              <MapPinIcon class="h-5 w-5 shrink-0 text-[#F47B20]" />

              <div class="min-w-0 flex-1">
                <label
                  for="job-location"
                  class="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  Localisation
                </label>

                <select
                  id="job-location"
                  v-model="selectedLocation"
                  class="w-full bg-transparent text-sm text-slate-700 outline-none"
                >
                  <option value="">Toute la Côte d'Ivoire</option>
                  <option value="abidjan">Abidjan</option>
                  <option value="yopougon">Yopougon</option>
                  <option value="bouake">Bouaké</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              class="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-5 text-sm font-semibold text-white transition hover:bg-[#DF6810] focus:outline-none focus:ring-4 focus:ring-orange-200 sm:w-auto"
            >
              Rechercher
              <ArrowRightIcon class="h-4 w-4" />
            </button>
          </form>

          <!-- Recherches populaires -->
          <div class="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span class="mr-1 text-slate-400">Tendances :</span>

            <RouterLink
              v-for="tag in popularTags"
              :key="tag"
              :to="{ path: '/jobs', query: { q: tag } }"
              class="rounded-full border border-white/15 px-3 py-1.5 text-slate-200 transition hover:border-orange-400 hover:text-orange-300"
            >
              {{ tag }}
            </RouterLink>
          </div>
        </div>

        <!-- Visuel -->
        <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2">
            <div class="relative h-[340px] overflow-hidden rounded-[1.5rem] sm:h-[440px]">
              <img
                :src="heroSlides[currentSlideIndex].image"
                :alt="heroSlides[currentSlideIndex].alt"
                class="h-full w-full object-cover"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-[#101D35]/90 via-[#101D35]/10 to-transparent" />

              <!-- ✅ Badge "Opportunités professionnelles" SUPPRIMÉ -->
              <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h2 class="max-w-sm text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Le talent que vous êtes mérite la bonne opportunité.
                </h2>

                <p class="mt-3 text-sm text-slate-200">
                  Explorez, postulez et faites avancer votre carrière.
                </p>
              </div>
            </div>
          </div>

          <!-- Navigation des images -->
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                v-for="(_, index) in heroSlides"
                :key="index"
                type="button"
                :aria-label="`Afficher l'image ${index + 1}`"
                :aria-pressed="index === currentSlideIndex"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="
                  index === currentSlideIndex
                    ? 'w-9 bg-[#FF8A24]'
                    : 'w-4 bg-white/30 hover:bg-white/60'
                "
                @click="currentSlideIndex = index"
              />
            </div>

            <div class="flex gap-2">
              <button
                type="button"
                aria-label="Image précédente"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
                @click="prevSlide"
              >
                <ChevronLeftIcon class="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Image suivante"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
                @click="nextSlide"
              >
                <ChevronRightIcon class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Carte flottante -->
          <div
            class="absolute -left-3 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-left-8"
          >
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20]">
              <BriefcaseIcon class="h-5 w-5" />
            </div>

            <div>
              <p class="text-sm font-bold text-slate-900">Votre carrière</p>
              <p class="mt-1 text-xs text-slate-500">Une nouvelle étape commence</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bande inférieure -->
      <div class="border-t border-white/10">
        <div
          class="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-3 sm:px-8 lg:px-10"
        >
          <div
            v-for="item in heroBenefits"
            :key="item.title"
            class="flex items-center gap-3"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-[#FF8A24]">
              <component :is="item.icon" class="h-5 w-5" />
            </div>

            <div>
              <p class="text-sm font-semibold text-white">{{ item.title }}</p>
              <p class="mt-0.5 text-xs text-slate-400">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AVANTAGES -->
    <section class="border-b border-slate-100 bg-white">
      <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div class="mb-8 max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            Pourquoi PHENIX ?
          </p>

          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
            Une recherche d'emploi plus simple.
          </h2>

          <p class="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            Tous les outils essentiels pour vous rapprocher de votre prochain
            objectif professionnel.
          </p>
        </div>

        <!-- ✅ Cartes plus visibles -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="feature in features"
            :key="feature.title"
            class="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20] shadow-sm transition group-hover:bg-[#F47B20] group-hover:text-white group-hover:shadow-orange-500/30">
              <component :is="feature.icon" class="h-6 w-6" />
            </div>

            <h3 class="mt-5 text-lg font-bold text-[#101D35]">
              {{ feature.title }}
            </h3>

            <p class="mt-2 text-sm leading-6 text-slate-500">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- OFFRES POPULAIRES -->
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
              Les opportunités
            </p>

            <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
              Des offres à découvrir.
            </h2>

            <p class="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Explorez une sélection d'opportunités professionnelles.
            </p>
          </div>

          <RouterLink
            to="/jobs"
            class="inline-flex items-center gap-2 text-sm font-semibold text-[#101D35] transition hover:text-[#F47B20]"
          >
            Toutes les offres
            <ArrowRightIcon class="h-4 w-4" />
          </RouterLink>
        </div>

        <!-- ✅ Cartes offres plus visibles -->
        <div class="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="job in jobs"
            :key="job.id"
            class="group flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
          >
            <div class="flex items-start justify-between">
              <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2.5 shadow-sm">
                <img
                  :src="job.logo"
                  :alt="`Logo ${job.company}`"
                  class="max-h-full max-w-full object-contain"
                />
              </div>

              <span
                class="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700"
              >
                {{ job.contract }}
              </span>
            </div>

            <p class="mt-5 text-xs font-semibold text-slate-500">
              {{ job.company }}
            </p>

            <h3 class="mt-2 min-h-12 text-base font-bold leading-6 text-[#101D35] transition group-hover:text-[#F47B20]">
              {{ job.title }}
            </h3>

            <div class="mt-4 space-y-3 border-t border-slate-100 pt-4">
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <MapPinIcon class="h-4 w-4 shrink-0 text-slate-400" />
                <span>{{ job.location }}</span>
              </div>

              <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <BanknoteIcon class="h-4 w-4 shrink-0 text-slate-400" />
                <span>{{ job.salary }}</span>
              </div>
            </div>

            <RouterLink
              :to="`/jobs/${job.id}`"
              class="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 text-sm font-semibold text-[#101D35] transition hover:border-[#F47B20] hover:bg-[#F47B20] hover:text-white"
            >
              Consulter l'offre
              <ArrowUpRightIcon class="h-4 w-4" />
            </RouterLink>
          </article>
        </div>

        <div class="mt-8 text-center">
          <RouterLink
            to="/jobs"
            class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#101D35] px-6 text-sm font-semibold text-white transition hover:bg-[#1D3457]"
          >
            Découvrir toutes les opportunités
            <ArrowRightIcon class="h-4 w-4" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CATÉGORIES -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
              Explorez les métiers
            </p>

            <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
              Quel secteur vous correspond ?
            </h2>

            <p class="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
              Trouvez les opportunités adaptées à votre domaine.
            </p>
          </div>

          <RouterLink
            to="/categories"
            class="inline-flex items-center gap-2 text-sm font-semibold text-[#101D35] transition hover:text-[#F47B20]"
          >
            Toutes les catégories
            <ArrowRightIcon class="h-4 w-4" />
          </RouterLink>
        </div>

        <!-- ✅ Cartes catégories plus visibles -->
        <div class="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <RouterLink
            v-for="category in categories"
            :key="category.title"
            :to="{ path: '/jobs', query: { category: category.title } }"
            class="group flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#F47B20] hover:bg-orange-50/40 hover:shadow-lg sm:gap-4 sm:p-5"
          >
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-[#F47B20] group-hover:text-white sm:h-12 sm:w-12">
              <component :is="category.icon" class="h-5 w-5" />
            </div>

            <div class="min-w-0 flex-1">
              <h3 class="text-xs font-bold leading-5 text-[#101D35] sm:text-sm">
                {{ category.title }}
              </h3>

              <span class="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-400 transition group-hover:text-[#F47B20]">
                Explorer
                <ArrowRightIcon class="h-3 w-3" />
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CHIFFRES CLÉS -->
    <section class="bg-[#101D35]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#FF9A42]">
              Notre ambition
            </p>

            <h2 class="mt-4 max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Rapprocher les talents des opportunités.
            </h2>

            <p class="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              PHENIX Jobs & Carrières ambitionne de simplifier la rencontre
              entre les candidats et les recruteurs, en rendant les
              opportunités professionnelles plus accessibles.
            </p>

            <RouterLink
              to="/jobs"
              class="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
            >
              Trouver un emploi
              <ArrowRightIcon class="h-4 w-4" />
            </RouterLink>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <article
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-2xl border-2 border-white/10 bg-white/[0.05] p-5 shadow-lg transition hover:border-orange-400/30 hover:bg-white/[0.08] sm:p-7"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-400/10 text-[#FF9A42]">
                <component :is="stat.icon" class="h-5 w-5" />
              </div>

              <p class="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {{ stat.value }}
              </p>

              <p class="mt-2 text-xs leading-5 text-slate-400 sm:text-sm">
                {{ stat.label }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- TÉMOIGNAGE -->
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
              Ils nous font confiance
            </p>

            <h2 class="mt-3 max-w-lg text-2xl font-bold leading-tight tracking-tight text-[#101D35] sm:text-4xl">
              Chaque parcours professionnel mérite une opportunité.
            </h2>

            <p class="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
              L'accès à la bonne opportunité peut changer une carrière.
              Notre objectif est de rendre cette recherche plus claire,
              plus accessible et plus efficace.
            </p>
          </div>

          <article class="relative rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-lg sm:p-9">
            <QuoteIcon class="h-9 w-9 text-[#F47B20]" />

            <p class="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              {{ testimonial.message }}
            </p>

            <div class="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="h-12 w-12 rounded-full border border-slate-200 object-cover"
              />

              <div class="min-w-0 flex-1">
                <p class="text-sm font-bold text-[#101D35]">
                  {{ testimonial.name }}
                </p>

                <p class="mt-1 text-xs text-slate-500">
                  {{ testimonial.role }}
                </p>
              </div>

              <div class="flex gap-0.5 text-amber-400" aria-label="5 étoiles sur 5">
                <StarIcon
                  v-for="star in 5"
                  :key="star"
                  class="h-4 w-4 fill-current"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div
        class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#F47B20] px-6 py-12 sm:px-10 sm:py-14 lg:px-16"
      >
        <div
          class="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/15"
        />

        <div
          class="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full border border-white/15"
        />

        <div class="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-2xl">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Le prochain chapitre vous appartient
            </p>

            <h2 class="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Prêt à faire évoluer votre carrière ?
            </h2>

            <p class="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
              Découvrez de nouvelles opportunités et faites le premier pas
              vers votre prochain objectif professionnel.
            </p>
          </div>

          <RouterLink
            to="/jobs"
            class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#101D35] transition hover:bg-orange-50"
          >
            Explorer les offres
            <ArrowRightIcon class="h-4 w-4" />
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

import {
  Search as SearchIcon,
  MapPin as MapPinIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Briefcase as BriefcaseIcon,
  UserCheck as UserCheckIcon,
  ShieldCheck as ShieldCheckIcon,
  Smartphone as SmartphoneIcon,
  Zap as ZapIcon,
  Monitor as MonitorIcon,
  Landmark as LandmarkIcon,
  Factory as FactoryIcon,
  Activity as ActivityIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Truck as TruckIcon,
  Users as UsersIcon,
  Building2 as Building2Icon,
  Quote as QuoteIcon,
  Star as StarIcon,
  Banknote as BanknoteIcon,
} from 'lucide-vue-next'

import slide1 from '@/assets/images/feature-1.jpg'
import slide2 from '@/assets/images/feature-2.jpg'
import slide3 from '@/assets/images/feature-3.jpg'

import orangeLogo from '@/assets/images/orange.png'
import sanlamLogo from '@/assets/images/sanlam.jpg'
import nestleLogo from '@/assets/images/nestle.png'
import sodeciLogo from '@/assets/images/sodeci.png'

import userAvatar from '@/assets/images/avatar.jpg'

const router = useRouter()

// RECHERCHE
const searchQuery = ref('')
const selectedLocation = ref('')

const handleSearch = () => {
  const query = searchQuery.value.trim()

  router.push({
    path: '/jobs',
    query: {
      ...(query ? { q: query } : {}),
      ...(selectedLocation.value
        ? { location: selectedLocation.value }
        : {}),
    },
  })
}

// SLIDES DU HERO
const heroSlides = [
  {
    image: slide1,
    alt: 'Professionnelle dans un environnement de travail',
  },
  {
    image: slide2,
    alt: 'Candidat préparant son avenir professionnel',
  },
  {
    image: slide3,
    alt: 'Équipe dans un environnement professionnel',
  },
]

const currentSlideIndex = ref(0)

const nextSlide = () => {
  currentSlideIndex.value =
    (currentSlideIndex.value + 1) % heroSlides.length
}

const prevSlide = () => {
  currentSlideIndex.value =
    (currentSlideIndex.value - 1 + heroSlides.length) %
    heroSlides.length
}

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(nextSlide, 6000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// RECHERCHES POPULAIRES
const popularTags = [
  'Développeur',
  'Comptable',
  'Infirmier',
  'Commercial',
]

// AVANTAGES
const heroBenefits = [
  {
    icon: ShieldCheckIcon,
    title: 'Une recherche sécurisée',
    description: 'Une expérience pensée pour les candidats',
  },
  {
    icon: ZapIcon,
    title: 'Une navigation simple',
    description: 'Accédez rapidement aux opportunités',
  },
  {
    icon: SmartphoneIcon,
    title: 'Accessible partout',
    description: 'Sur ordinateur, tablette et mobile',
  },
]

const features = [
  {
    icon: SearchIcon,
    title: 'Offres à explorer',
    description:
      'Parcourez les opportunités selon votre profil et vos objectifs.',
  },
  {
    icon: UserCheckIcon,
    title: 'Candidature simplifiée',
    description:
      'Retrouvez les informations essentielles pour préparer vos candidatures.',
  },
  {
    icon: ZapIcon,
    title: 'Recherche intuitive',
    description:
      'Utilisez les filtres et les catégories pour affiner votre recherche.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Expérience sécurisée',
    description:
      'La protection des informations des candidats doit rester une priorité.',
  },
]

// OFFRES D'EMPLOI
const jobs = ref([
  {
    id: 1,
    company: "Orange Côte d'Ivoire",
    logo: orangeLogo,
    title: 'Développeur Full Stack',
    location: 'Abidjan, Côte d’Ivoire',
    contract: 'CDI',
    salary: '500 000 - 1 000 000 FCFA',
  },
  {
    id: 2,
    company: 'Sanlam Vie Côte d’Ivoire',
    logo: sanlamLogo,
    title: 'Conseiller Commercial',
    location: 'Abidjan, Côte d’Ivoire',
    contract: 'CDI',
    salary: '300 000 - 600 000 FCFA',
  },
  {
    id: 3,
    company: 'Nestlé Côte d’Ivoire',
    logo: nestleLogo,
    title: 'Responsable Qualité',
    location: 'Yopougon, Abidjan',
    contract: 'CDI',
    salary: '400 000 - 800 000 FCFA',
  },
  {
    id: 4,
    company: 'SODECI',
    logo: sodeciLogo,
    title: 'Ingénieur Réseau Eau',
    location: 'Abidjan, Côte d’Ivoire',
    contract: 'CDI',
    salary: '600 000 - 1 200 000 FCFA',
  },
])

// CATÉGORIES
const categories = [
  { icon: MonitorIcon, title: 'Informatique & Télécoms' },
  { icon: BriefcaseIcon, title: 'Services & Conseil' },
  { icon: LandmarkIcon, title: 'Banque & Assurance' },
  { icon: FactoryIcon, title: 'Industrie & Production' },
  { icon: ActivityIcon, title: 'Santé & Social' },
  { icon: ShoppingCartIcon, title: 'Commerce & Vente' },
  { icon: HomeIcon, title: 'BTP & Immobilier' },
  { icon: TruckIcon, title: 'Transport & Logistique' },
]

// STATISTIQUES
const stats = [
  {
    icon: BriefcaseIcon,
    value: '50 000+',
    label: 'Offres d’emploi',
  },
  {
    icon: Building2Icon,
    value: '15 000+',
    label: 'Entreprises partenaires',
  },
  {
    icon: UsersIcon,
    value: '120 000+',
    label: 'Candidats inscrits',
  },
  {
    icon: UserCheckIcon,
    value: '98 %',
    label: 'Satisfaction des utilisateurs',
  },
]

// TÉMOIGNAGE
const testimonial = computed(() => ({
  name: 'Kouadio Amadou',
  role: 'Développeur Web · Abidjan',
  avatar: userAvatar,
  message:
    "La recherche d'un emploi demande de la méthode et de la persévérance. Une plateforme claire permet de mieux repérer les opportunités et d'organiser ses démarches.",
}))
</script>