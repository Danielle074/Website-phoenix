<template>
  <main class="min-h-screen bg-[#F8FAFC] text-slate-900">

    <!-- ==================================================
         EN-TÊTE DE PAGE (INCHANGÉ)
    =================================================== -->
    <section class="relative overflow-hidden bg-[#101D35] text-white">
      <!-- Décorations animées -->
      <div class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] animate-pulse-slow rounded-full border border-white/[0.06]" />
      <div class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] animate-pulse-slow rounded-full border border-white/[0.08]" style="animation-delay: 1.5s" />
      <div class="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] animate-pulse-slow rounded-full bg-gradient-to-tr from-[#F47B20]/10 to-transparent blur-3xl" style="animation-delay: 3s" />
      <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 80px 80px;" />

      <div class="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <p class="hero-enter hero-enter-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FF9A42]">
          Explorez les opportunités
        </p>

        <h1 class="hero-enter hero-enter-2 mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Trouvez l'emploi
          <span class="bg-gradient-to-r from-[#FF8A24] via-[#FFB067] to-[#FF8A24] bg-clip-text text-transparent">
            qui vous correspond
          </span>
        </h1>

        <p class="hero-enter hero-enter-3 mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Parcourez {{ allJobs.length }}+ offres vérifiées et postulez en quelques clics.
        </p>

        <!-- Barre de recherche rapide -->
        <div class="hero-enter hero-enter-4 mt-7 rounded-2xl border border-white/10 bg-white/[0.07] p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:flex sm:items-center">
          <div class="flex min-w-0 flex-1 items-center gap-3 border-b border-white/10 px-3 py-3 sm:border-b-0 sm:border-r">
            <SearchIcon class="h-5 w-5 shrink-0 text-[#FF8A24]" />
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Poste, entreprise, mot-clé..."
              class="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div class="flex min-w-0 flex-1 items-center gap-3 px-3 py-3">
            <MapPinIcon class="h-5 w-5 shrink-0 text-[#FF8A24]" />
            <select
              v-model="selectedLocation"
              class="w-full cursor-pointer bg-transparent text-sm text-white outline-none [&>option]:bg-[#101D35] [&>option]:text-white"
            >
              <option value="">Toute la Côte d'Ivoire</option>
              <option v-for="loc in locations" :key="loc" :value="loc">
                {{ loc }}
              </option>
            </select>
          </div>

          <button
            class="group/btn relative mt-2 flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] sm:mt-0 sm:w-auto"
          >
            <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <span class="relative">Rechercher</span>
            <ArrowRightIcon class="relative h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CONTENU PRINCIPAL
    =================================================== -->
    <section class="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">

        <!-- SIDEBAR FILTRES (Desktop) -->
        <aside class="hidden lg:col-span-3 lg:block">
          <div class="sticky top-24 space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="flex items-center gap-2 text-base font-bold text-[#101D35]">
                <SlidersIcon class="h-5 w-5 text-[#F47B20]" />
                Filtres
                <span
                  v-if="activeFiltersCount > 0"
                  class="rounded-full bg-[#F47B20] px-2 py-0.5 text-[10px] font-bold text-white"
                >
                  {{ activeFiltersCount }}
                </span>
              </h2>
              <button
                v-if="activeFiltersCount > 0"
                class="text-xs font-semibold text-slate-500 transition hover:text-[#F47B20]"
                @click="resetFilters"
              >
                Réinitialiser
              </button>
            </div>

            <div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#F47B20]/30 hover:shadow-lg hover:shadow-orange-500/10">
              <h3 class="mb-3 text-sm font-bold text-[#101D35]">Catégorie</h3>
              <div class="space-y-2">
                <label
                  v-for="cat in categories"
                  :key="cat"
                  class="flex cursor-pointer items-center gap-2 text-sm text-slate-600 transition hover:text-[#F47B20]"
                >
                  <input
                    v-model="selectedCategory"
                    type="radio"
                    :value="cat"
                    class="h-4 w-4 accent-[#F47B20]"
                  />
                  {{ cat }}
                </label>
                <label class="flex cursor-pointer items-center gap-2 text-sm text-slate-600 transition hover:text-[#F47B20]">
                  <input
                    v-model="selectedCategory"
                    type="radio"
                    value=""
                    class="h-4 w-4 accent-[#F47B20]"
                  />
                  Toutes les catégories
                </label>
              </div>
            </div>

            <div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#F47B20]/30 hover:shadow-lg hover:shadow-orange-500/10">
              <h3 class="mb-3 text-sm font-bold text-[#101D35]">Type de contrat</h3>
              <div class="space-y-2">
                <label
                  v-for="c in contracts"
                  :key="c"
                  class="flex cursor-pointer items-center gap-2 text-sm text-slate-600 transition hover:text-[#F47B20]"
                >
                  <input
                    type="checkbox"
                    :checked="selectedContracts.includes(c)"
                    class="h-4 w-4 accent-[#F47B20]"
                    @change="toggleContract(c)"
                  />
                  {{ c }}
                </label>
              </div>
            </div>

            <div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#F47B20]/30 hover:shadow-lg hover:shadow-orange-500/10">
              <h3 class="mb-3 text-sm font-bold text-[#101D35]">Localisation</h3>
              <select
                v-model="selectedLocation"
                class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-[#F47B20]"
              >
                <option value="">Toutes les villes</option>
                <option v-for="loc in locations" :key="loc" :value="loc">
                  {{ loc }}
                </option>
              </select>
            </div>
          </div>
        </aside>

        <!-- LISTE DES OFFRES -->
        <div class="lg:col-span-9">

          <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-slate-600">
              <span class="font-bold text-[#101D35]">{{ filteredJobs.length }}</span>
              offre{{ filteredJobs.length > 1 ? 's' : '' }} trouvée{{ filteredJobs.length > 1 ? 's' : '' }}
            </p>

            <div class="flex items-center gap-3">
              <button
                class="flex items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-[#101D35] transition hover:border-[#F47B20] hover:text-[#F47B20] lg:hidden"
                @click="showMobileFilters = true"
              >
                <SlidersIcon class="h-4 w-4" />
                Filtres
                <span
                  v-if="activeFiltersCount > 0"
                  class="rounded-full bg-[#F47B20] px-1.5 text-[10px] font-bold text-white"
                >
                  {{ activeFiltersCount }}
                </span>
              </button>

              <div class="relative">
                <select
                  v-model="sortBy"
                  class="appearance-none rounded-lg border-2 border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-semibold text-[#101D35] outline-none transition focus:border-[#F47B20]"
                >
                  <option value="recent">Plus récentes</option>
                  <option value="salary-desc">Salaire (décroissant)</option>
                  <option value="salary-asc">Salaire (croissant)</option>
                </select>
                <ChevronDownIcon class="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          <!-- GRILLE DES OFFRES — CARTES PREMIUM -->
          <TransitionGroup
            v-if="filteredJobs.length"
            tag="div"
            name="job-list"
            class="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <article
              v-for="(job, i) in filteredJobs"
              :key="job.id"
              class="job-card group relative flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md"
              :style="{ '--i': i }"
              @mousemove="handleCardTilt($event)"
              @mouseleave="resetCardTilt($event)"
            >
              <!-- Barre dégradée top -->
              <div class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#F47B20] via-[#FF8A24] to-[#FFB067] transition-transform duration-500 group-hover:scale-x-100" />

              <!-- Halo radial qui suit la souris -->
              <div class="card-halo pointer-events-none absolute -inset-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <!-- Coins décoratifs (accents) -->
              <div class="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-orange-100/0 to-orange-100/0 transition-all duration-700 group-hover:from-orange-100/60 group-hover:to-transparent" />

              <!-- Header carte -->
              <div class="relative flex items-start justify-between">
                <div class="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition-all duration-500 group-hover:-rotate-3 group-hover:border-orange-200 group-hover:bg-orange-50/70 group-hover:shadow-lg group-hover:shadow-orange-500/20">
                  <img
                    :src="job.logo"
                    :alt="`Logo ${job.company}`"
                    class="max-h-full max-w-full object-contain"
                  />
                </div>

                <button
                  class="relative rounded-full p-2 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-red-50 hover:text-red-500 active:scale-95"
                  aria-label="Ajouter aux favoris"
                >
                  <HeartIcon class="h-5 w-5" />
                </button>
              </div>

              <!-- Badges -->
              <div class="relative mt-4 flex flex-wrap gap-2">
                <span
                  v-if="job.isUrgent"
                  class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shadow-red-500/30"
                >
                  <FlameIcon class="h-2.5 w-2.5" />
                  Urgent
                </span>
                <span
                  v-if="job.isVerified"
                  class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/30"
                >
                  <ShieldCheckIcon class="h-2.5 w-2.5" />
                  Vérifiée
                </span>
                <span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 ring-1 ring-slate-200">
                  {{ job.contract }}
                </span>
              </div>

              <!-- Infos entreprise / poste -->
              <p class="relative mt-4 text-xs font-semibold text-slate-500">
                {{ job.company }}
              </p>
              <h3 class="relative mt-1 text-lg font-bold leading-snug text-[#101D35] transition-colors group-hover:text-[#F47B20]">
                {{ job.title }}
              </h3>

              <!-- Métadonnées -->
              <div class="relative mt-4 space-y-2 border-t border-slate-100 pt-4">
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <MapPinIcon class="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[#F47B20]" />
                  <span>{{ job.location }}, Côte d'Ivoire</span>
                </div>

                <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <BanknoteIcon class="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[#F47B20]" />
                  <span>{{ job.salary }}</span>
                </div>

                <div class="flex items-center gap-2 text-xs text-slate-400">
                  <ClockIcon class="h-4 w-4 shrink-0 transition-colors group-hover:text-[#F47B20]" />
                  <span>{{ job.postedAt }}</span>
                </div>
              </div>

              <!-- CTA -->
              <RouterLink
                :to="`/jobs/${job.id}`"
                class="relative mt-6 flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-[#101D35] bg-[#101D35] text-sm font-semibold text-white transition-all duration-300 hover:border-[#F47B20] hover:bg-[#F47B20]"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span class="relative">Consulter l'offre</span>
                <ArrowUpRightIcon class="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </RouterLink>
            </article>
          </TransitionGroup>

          <!-- État vide -->
          <div
            v-else
            class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center"
          >
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <InboxIcon class="h-8 w-8" />
            </div>
            <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucune offre trouvée</h3>
            <p class="mt-2 text-sm text-slate-500">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
            <button
              class="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-5 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
              @click="resetFilters"
            >
              Réinitialiser les filtres
            </button>
          </div>

          <!-- Pagination -->
          <div
            v-if="filteredJobs.length && totalPages > 1"
            class="mt-10 flex items-center justify-center gap-2"
          >
            <button
              class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-white text-slate-600 transition hover:border-[#F47B20] hover:text-[#F47B20] disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="currentPage === 1"
              aria-label="Page précédente"
              @click="goToPage(currentPage - 1)"
            >
              <ChevronLeftIcon class="h-4 w-4" />
            </button>

            <button
              v-for="p in totalPages"
              :key="p"
              class="flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-bold transition"
              :class="
                p === currentPage
                  ? 'border-[#F47B20] bg-[#F47B20] text-white shadow-lg shadow-orange-500/30'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-[#F47B20] hover:text-[#F47B20]'
              "
              @click="goToPage(p)"
            >
              {{ p }}
            </button>

            <button
              class="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-white text-slate-600 transition hover:border-[#F47B20] hover:text-[#F47B20] disabled:cursor-not-allowed disabled:opacity-40"
              :disabled="currentPage === totalPages"
              aria-label="Page suivante"
              @click="goToPage(currentPage + 1)"
            >
              <ChevronRightIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- DRAWER FILTRES MOBILE (INCHANGÉ) -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showMobileFilters"
        class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
        @click="showMobileFilters = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <aside
        v-if="showMobileFilters"
        class="fixed inset-x-0 bottom-0 z-[70] max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl lg:hidden"
      >
        <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />

        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-lg font-bold text-[#101D35]">Filtres</h2>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Fermer"
            @click="showMobileFilters = false"
          >
            <XIcon class="h-5 w-5" />
          </button>
        </div>

        <div class="mb-6">
          <h3 class="mb-3 text-sm font-bold text-[#101D35]">Catégorie</h3>
          <div class="space-y-2">
            <label
              v-for="cat in categories"
              :key="cat"
              class="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            >
              <input
                v-model="selectedCategory"
                type="radio"
                :value="cat"
                class="h-4 w-4 accent-[#F47B20]"
              />
              {{ cat }}
            </label>
            <label class="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                v-model="selectedCategory"
                type="radio"
                value=""
                class="h-4 w-4 accent-[#F47B20]"
              />
              Toutes les catégories
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="mb-3 text-sm font-bold text-[#101D35]">Type de contrat</h3>
          <div class="space-y-2">
            <label
              v-for="c in contracts"
              :key="c"
              class="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                :checked="selectedContracts.includes(c)"
                class="h-4 w-4 accent-[#F47B20]"
                @change="toggleContract(c)"
              />
              {{ c }}
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="mb-3 text-sm font-bold text-[#101D35]">Localisation</h3>
          <select
            v-model="selectedLocation"
            class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#F47B20]"
          >
            <option value="">Toutes les villes</option>
            <option v-for="loc in locations" :key="loc" :value="loc">
              {{ loc }}
            </option>
          </select>
        </div>

        <div class="flex gap-3">
          <button
            class="flex-1 rounded-xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="resetFilters"
          >
            Réinitialiser
          </button>
          <button
            class="flex-1 rounded-xl bg-[#F47B20] py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
            @click="showMobileFilters = false"
          >
            Voir les résultats
          </button>
        </div>
      </aside>
    </Transition>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Search as SearchIcon,
  MapPin as MapPinIcon,
  Banknote as BanknoteIcon,
  SlidersHorizontal as SlidersIcon,
  X as XIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Heart as HeartIcon,
  Clock as ClockIcon,
  Inbox as InboxIcon,
  Flame as FlameIcon,
  ShieldCheck as ShieldCheckIcon,
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

/* ============================================================
 * LOGOS
 * ============================================================ */
import orangeLogo from '@/assets/images/orange.png'
import sanlamLogo from '@/assets/images/sanlam.jpg'
import nestleLogo from '@/assets/images/nestle.png'
import sodeciLogo from '@/assets/images/sodeci.png'
import mtnLogo from '@/assets/images/mtn.png'
import ecobankLogo from '@/assets/images/ecobank.jpg'

/* ============================================================
 * TYPES
 * ============================================================ */
interface Job {
  id: number
  company: string
  logo: string
  title: string
  location: string
  contract: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Alternance'
  category: string
  salary: string
  salaryValue: number
  postedAt: string
  isUrgent?: boolean
  isVerified?: boolean
}

/* ============================================================
 * DONNÉES
 * ============================================================ */
const allJobs: Job[] = [
  {
    id: 1,
    company: "Orange Côte d'Ivoire",
    logo: orangeLogo,
    title: 'Développeur Full Stack',
    location: 'Abidjan',
    contract: 'CDI',
    category: 'Informatique & Télécoms',
    salary: '500 000 - 1 000 000 FCFA',
    salaryValue: 750000,
    postedAt: 'Il y a 2 jours',
    isUrgent: true,
    isVerified: true,
  },
  {
    id: 2,
    company: 'Sanlam Vie CI',
    logo: sanlamLogo,
    title: 'Conseiller Commercial',
    location: 'Abidjan',
    contract: 'CDI',
    category: 'Banque & Assurance',
    salary: '300 000 - 600 000 FCFA',
    salaryValue: 450000,
    postedAt: 'Il y a 5 jours',
    isVerified: true,
  },
  {
    id: 3,
    company: "Nestlé Côte d'Ivoire",
    logo: nestleLogo,
    title: 'Responsable Qualité',
    location: 'Yopougon',
    contract: 'CDI',
    category: 'Industrie & Production',
    salary: '400 000 - 800 000 FCFA',
    salaryValue: 600000,
    postedAt: 'Il y a 1 semaine',
    isVerified: true,
  },
  {
    id: 4,
    company: 'SODECI',
    logo: sodeciLogo,
    title: 'Ingénieur Réseau Eau',
    location: 'Abidjan',
    contract: 'CDI',
    category: 'BTP & Immobilier',
    salary: '600 000 - 1 200 000 FCFA',
    salaryValue: 900000,
    postedAt: 'Il y a 3 jours',
    isVerified: true,
  },
  {
    id: 5,
    company: "MTN Côte d'Ivoire",
    logo: mtnLogo,
    title: 'Chef de Projet Digital',
    location: 'Abidjan',
    contract: 'CDD',
    category: 'Informatique & Télécoms',
    salary: '700 000 - 1 300 000 FCFA',
    salaryValue: 1000000,
    postedAt: 'Il y a 1 jour',
    isUrgent: true,
    isVerified: true,
  },
  {
    id: 6,
    company: 'Ecobank CI',
    logo: ecobankLogo,
    title: 'Analyste Financier',
    location: 'Abidjan',
    contract: 'CDI',
    category: 'Banque & Assurance',
    salary: '500 000 - 900 000 FCFA',
    salaryValue: 700000,
    postedAt: 'Il y a 4 jours',
    isVerified: true,
  },
  {
    id: 7,
    company: "MTN Côte d'Ivoire",
    logo: mtnLogo,
    title: 'Data Analyst',
    location: 'Abidjan',
    contract: 'CDI',
    category: 'Informatique & Télécoms',
    salary: '600 000 - 1 100 000 FCFA',
    salaryValue: 850000,
    postedAt: 'Il y a 6 heures',
    isUrgent: true,
    isVerified: true,
  },
  {
    id: 8,
    company: 'SODECI',
    logo: sodeciLogo,
    title: 'Technicien de Maintenance',
    location: 'Bouaké',
    contract: 'CDD',
    category: 'Industrie & Production',
    salary: '250 000 - 450 000 FCFA',
    salaryValue: 350000,
    postedAt: 'Il y a 2 jours',
    isVerified: true,
  },
]

/* ============================================================
 * ÉTAT DES FILTRES
 * ============================================================ */
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedCategory = ref('')
const selectedContracts = ref<string[]>([])
const sortBy = ref<'recent' | 'salary-asc' | 'salary-desc'>('recent')
const showMobileFilters = ref(false)

const locations = ['Abidjan', 'Yopougon', 'Bouaké', 'Yamoussoukro', 'San-Pédro']
const categories = [
  'Informatique & Télécoms',
  'Banque & Assurance',
  'Industrie & Production',
  'BTP & Immobilier',
  'Services & Conseil',
  'Santé & Social',
  'Commerce & Vente',
  'Transport & Logistique',
]
const contracts = ['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance']

const toggleContract = (contract: string) => {
  const idx = selectedContracts.value.indexOf(contract)
  if (idx >= 0) {
    selectedContracts.value.splice(idx, 1)
  } else {
    selectedContracts.value.push(contract)
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedLocation.value = ''
  selectedCategory.value = ''
  selectedContracts.value = []
  sortBy.value = 'recent'
}

const activeFiltersCount = computed(() => {
  let count = 0
  if (searchQuery.value) count++
  if (selectedLocation.value) count++
  if (selectedCategory.value) count++
  if (selectedContracts.value.length) count++
  return count
})

/* ============================================================
 * FILTRAGE + TRI
 * ============================================================ */
const filteredJobs = computed(() => {
  let result = [...allJobs]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q)
    )
  }

  if (selectedLocation.value) {
    result = result.filter((j) => j.location === selectedLocation.value)
  }

  if (selectedCategory.value) {
    result = result.filter((j) => j.category === selectedCategory.value)
  }

  if (selectedContracts.value.length) {
    result = result.filter((j) => selectedContracts.value.includes(j.contract))
  }

  if (sortBy.value === 'salary-asc') {
    result.sort((a, b) => a.salaryValue - b.salaryValue)
  } else if (sortBy.value === 'salary-desc') {
    result.sort((a, b) => b.salaryValue - a.salaryValue)
  }

  return result
})

/* ============================================================
 * PAGINATION
 * ============================================================ */
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredJobs.value.length / 8)))

const goToPage = (p: number) => {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p
}

/* ============================================================
 * TILT 3D DES CARTES
 * ============================================================ */
const handleCardTilt = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
  const rotateX = ((y / rect.height) - 0.5) * -5
  const rotateY = ((x / rect.width) - 0.5) * 5
  el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
}

const resetCardTilt = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  if (el) el.style.transform = ''
}

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
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* ============================================================
   ANIMATIONS HEADER
============================================================ */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes heroEnter {
  to { opacity: 1; transform: translateY(0); }
}
.hero-enter {
  opacity: 0;
  transform: translateY(24px);
  animation: heroEnter 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hero-enter-1 { animation-delay: 0.1s; }
.hero-enter-2 { animation-delay: 0.25s; }
.hero-enter-3 { animation-delay: 0.4s; }
.hero-enter-4 { animation-delay: 0.55s; }

/* ============================================================
   CARTES OFFRES — TILT 3D + HALO
============================================================ */
.job-card {
  transform-style: preserve-3d;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease,
    border-color 0.3s ease;
  will-change: transform;
}

.job-card:hover {
  border-color: rgb(244 123 32 / 0.55);
  box-shadow:
    0 25px 50px -20px rgb(244 123 32 / 0.28),
    0 15px 30px -15px rgb(0 0 0 / 0.12);
}

/* Halo radial qui suit la souris */
.card-halo {
  background: radial-gradient(
    400px circle at var(--mx, 50%) var(--my, 50%),
    rgba(244, 123, 32, 0.12),
    transparent 40%
  );
}

/* ============================================================
   TRANSITION LISTE (filtrage)
============================================================ */
.job-list-enter-active,
.job-list-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.job-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
}
.job-list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.job-list-move {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

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
  .job-card:hover {
    transform: none !important;
  }
}
</style>