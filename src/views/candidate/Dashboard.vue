<template>
  <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Tableau de bord
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
        Bonjour {{ user.fullName.split(' ')[0] }}, bienvenue 👋
      </h1>
      <p class="mt-2 text-sm text-slate-500 sm:text-base">
        Voici un aperçu de votre activité sur PHOENIX.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      <article
        v-for="(stat, i) in statCards"
        :key="stat.label"
        class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-xl hover:shadow-orange-500/15"
        :style="{ transitionDelay: `${i * 60}ms` }"
      >
        <div class="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-orange-100 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

        <div class="relative flex items-start justify-between">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
            <component :is="stat.icon" class="h-5 w-5" />
          </div>
          <span v-if="stat.trend" class="text-[11px] font-bold text-emerald-600">
            {{ stat.trend }}
          </span>
        </div>
        <p class="relative mt-4 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
          {{ stat.value }}
        </p>
        <p class="relative mt-1 text-xs text-slate-500 sm:text-sm">{{ stat.label }}</p>
      </article>
    </div>

    <!-- Sections principales -->
    <div class="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">

      <!-- Colonne principale -->
      <div class="space-y-6 lg:col-span-2">

        <!-- Candidatures récentes -->
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="flex items-center gap-2 text-base font-bold text-[#101D35] sm:text-lg">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <SendIcon class="h-4 w-4" />
              </div>
              Candidatures récentes
            </h2>
            <RouterLink
              to="/candidate/applications"
              class="group inline-flex items-center gap-1 text-xs font-semibold text-[#F47B20] transition hover:gap-2"
            >
              Voir tout
              <ArrowRightIcon class="h-3.5 w-3.5" />
            </RouterLink>
          </div>

          <div v-if="recentApplications.length" class="space-y-3">
            <RouterLink
              v-for="app in recentApplications"
              :key="app.id"
              :to="`/jobs/${app.jobId}`"
              class="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20]/30 hover:bg-orange-50/20 hover:shadow-sm"
            >
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-1.5">
                <img :src="app.companyLogo" :alt="app.company" class="max-h-full max-w-full object-contain" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-xs font-semibold text-slate-500">{{ app.company }}</p>
                <p class="truncate text-sm font-bold text-[#101D35] group-hover:text-[#F47B20]">
                  {{ app.jobTitle }}
                </p>
              </div>
              <span
                class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                :class="statusClass(app.status)"
              >
                {{ statusLabel(app.status) }}
              </span>
            </RouterLink>
          </div>

          <div v-else class="rounded-xl border border-dashed border-slate-200 p-6 text-center">
            <p class="text-sm text-slate-500">Aucune candidature pour le moment.</p>
            <RouterLink
              to="/jobs"
              class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#F47B20] hover:underline"
            >
              Parcourir les offres
              <ArrowRightIcon class="h-4 w-4" />
            </RouterLink>
          </div>
        </article>

        <!-- Favoris -->
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="flex items-center gap-2 text-base font-bold text-[#101D35] sm:text-lg">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <HeartIcon class="h-4 w-4" />
              </div>
              Offres enregistrées
            </h2>
            <RouterLink
              to="/candidate/favorites"
              class="group inline-flex items-center gap-1 text-xs font-semibold text-[#F47B20] transition hover:gap-2"
            >
              Voir tout
              <ArrowRightIcon class="h-3.5 w-3.5" />
            </RouterLink>
          </div>

          <div v-if="recentFavorites.length" class="grid gap-3 sm:grid-cols-2">
            <RouterLink
              v-for="fav in recentFavorites"
              :key="fav.id"
              :to="`/jobs/${fav.jobId}`"
              class="group rounded-xl border border-slate-100 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20]/30 hover:shadow-sm"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-1.5">
                  <img :src="fav.companyLogo" :alt="fav.company" class="max-h-full max-w-full object-contain" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-[11px] font-semibold text-slate-500">{{ fav.company }}</p>
                  <p class="truncate text-sm font-bold text-[#101D35] group-hover:text-[#F47B20]">
                    {{ fav.jobTitle }}
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>

          <div v-else class="rounded-xl border border-dashed border-slate-200 p-6 text-center">
            <p class="text-sm text-slate-500">Aucune offre enregistrée.</p>
          </div>
        </article>
      </div>

      <!-- Colonne latérale -->
      <div class="space-y-6">

        <!-- Complétion du profil -->
        <article class="reveal relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
          <div class="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-transparent blur-2xl" />

          <div class="relative">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <SparklesIcon class="h-4 w-4" />
              </div>
              <h3 class="text-sm font-bold text-[#101D35]">Profil complété</h3>
            </div>

            <div class="mt-5 flex items-end gap-2">
              <p class="text-4xl font-bold text-[#101D35]">{{ user.profileCompletion }}%</p>
            </div>

            <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-all duration-700"
                :style="{ width: user.profileCompletion + '%' }"
              />
            </div>

            <p class="mt-4 text-xs leading-6 text-slate-500">
              Complétez votre profil pour augmenter vos chances d'être remarqué par les recruteurs.
            </p>

            <RouterLink
              to="/candidate/profile"
              class="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#DF6810]"
            >
              Compléter mon profil
              <ArrowRightIcon class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </RouterLink>
          </div>
        </article>

        <!-- Alertes actives -->
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <BellIcon class="h-4 w-4" />
              </div>
              <h3 class="text-sm font-bold text-[#101D35]">Alertes actives</h3>
            </div>
            <RouterLink
              to="/candidate/alerts"
              class="text-xs font-semibold text-[#F47B20] hover:underline"
            >
              Gérer
            </RouterLink>
          </div>

          <div v-if="activeAlerts.length" class="space-y-2">
            <div
              v-for="alert in activeAlerts"
              :key="alert.id"
              class="rounded-xl border border-slate-100 bg-slate-50/50 p-3"
            >
              <p class="text-xs font-bold text-[#101D35]">{{ alert.keywords }}</p>
              <p class="mt-0.5 text-[11px] text-slate-500">
                {{ alert.location }} · {{ alert.frequency === 'daily' ? 'Quotidien' : alert.frequency === 'weekly' ? 'Hebdo' : 'Instantané' }}
              </p>
            </div>
          </div>

          <p v-else class="text-xs text-slate-500">
            Aucune alerte active pour le moment.
          </p>
        </article>

        <!-- CTA Conseils -->
        <article class="reveal relative overflow-hidden rounded-2xl bg-[#0A1524] p-6 text-white shadow-lg">
          <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#F47B20]/30 to-transparent blur-2xl" />

          <div class="relative">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F47B20]/25 to-[#FF8A24]/15 text-[#FF9A42]">
              <SparklesIcon class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-sm font-bold">Conseil du jour</h3>
            <p class="mt-2 text-xs leading-6 text-slate-300">
              Personnalisez votre message de motivation pour chaque candidature. Les recruteurs y sont attentifs.
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Send as SendIcon,
  Heart as HeartIcon,
  Bell as BellIcon,
  ArrowRight as ArrowRightIcon,
  Sparkles as SparklesIcon,
  Briefcase as BriefcaseIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  TrendingUp as TrendingUpIcon,
} from 'lucide-vue-next'
import { useCandidateStore } from '@/stores/candidate'

const candidateStore = useCandidateStore()
const user = computed(() => candidateStore.user)
const recentApplications = computed(() => candidateStore.applications.slice(0, 3))
const recentFavorites = computed(() => candidateStore.favorites.slice(0, 2))
const activeAlerts = computed(() => candidateStore.alerts.filter((a) => a.active))

const statCards = computed(() => [
  { icon: SendIcon, value: candidateStore.stats.applications, label: 'Candidatures envoyées' },
  { icon: CheckCircleIcon, value: candidateStore.stats.interview, label: 'Entretiens' },
  { icon: HeartIcon, value: candidateStore.stats.favorites, label: 'Offres enregistrées' },
  { icon: BellIcon, value: candidateStore.stats.activeAlerts, label: 'Alertes actives' },
])

const statusLabel = (s: string) =>
  ({
    pending: 'En attente',
    reviewing: 'En examen',
    interview: 'Entretien',
    accepted: 'Acceptée',
    rejected: 'Refusée',
  })[s] ?? s

const statusClass = (s: string) =>
  ({
    pending: 'bg-slate-100 text-slate-600',
    reviewing: 'bg-blue-100 text-blue-700',
    interview: 'bg-orange-100 text-[#F47B20]',
    accepted: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
  })[s] ?? 'bg-slate-100 text-slate-600'

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

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>