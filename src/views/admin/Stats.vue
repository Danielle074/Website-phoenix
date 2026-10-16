<template>
  <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
        <BarChartIcon class="h-3 w-3" />
        Statistiques
      </div>
      <h1 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Statistiques de la plateforme
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Analyse des performances et de l'activité de PHOENIX.
      </p>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      <article
        v-for="(kpi, i) in kpis"
        :key="kpi.label"
        class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-xl hover:shadow-orange-500/15"
        :style="{ transitionDelay: `${i * 60}ms` }"
      >
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
          <component :is="kpi.icon" class="h-5 w-5" />
        </div>
        <p class="mt-4 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
          {{ kpi.value }}
        </p>
        <p class="mt-1 text-xs text-slate-500 sm:text-sm">{{ kpi.label }}</p>
        <p
          class="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
          :class="kpi.change >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'"
        >
          <component :is="kpi.change >= 0 ? TrendingUpIcon : TrendingDownIcon" class="h-3 w-3" />
          {{ kpi.change > 0 ? '+' : '' }}{{ kpi.change }}%
        </p>
      </article>
    </div>

    <!-- Graphique trafic -->
    <article class="reveal mt-8 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="flex items-center gap-2 text-base font-bold text-[#101D35] sm:text-lg">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <ActivityIcon class="h-4 w-4" />
          </div>
          Trafic de la semaine
        </h2>
        <span class="text-xs text-slate-500">
          {{ totalTraffic.toLocaleString('fr-FR') }} visites totales
        </span>
      </div>

      <!-- Graphique barres -->
      <div class="flex items-end justify-between gap-2 sm:gap-4">
        <div
          v-for="(point, i) in trafficData"
          :key="point.label"
          class="group flex flex-1 flex-col items-center gap-2"
        >
          <div class="relative flex w-full items-end justify-center" style="height: 180px;">
            <div
              class="w-full max-w-[60px] rounded-t-xl bg-gradient-to-t from-[#F47B20] to-[#FFB067] shadow-md shadow-orange-500/20 transition-all duration-700 group-hover:from-[#DF6810] group-hover:to-[#F47B20]"
              :style="{
                height: (point.value / maxTraffic) * 100 + '%',
                transitionDelay: `${i * 100}ms`,
              }"
            />
            <span
              class="pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-[#101D35] px-2 py-1 text-[10px] font-bold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              {{ point.value.toLocaleString('fr-FR') }}
            </span>
          </div>
          <p class="text-xs font-semibold text-slate-500">{{ point.label }}</p>
        </div>
      </div>
    </article>

    <!-- Répartition -->
    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <UsersIcon class="h-4 w-4" />
          </div>
          Répartition des utilisateurs
        </h3>

        <ul class="space-y-4">
          <li
            v-for="(item, i) in userBreakdown"
            :key="item.label"
            class="group"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="mb-1.5 flex items-center justify-between text-sm">
              <span class="font-semibold text-slate-700">{{ item.label }}</span>
              <span class="font-bold text-[#101D35]">{{ item.value.toLocaleString('fr-FR') }}</span>
            </div>
            <div class="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full transition-all duration-1000"
                :class="item.barClass"
                :style="{ width: (item.value / totalUsers) * 100 + '%' }"
              />
            </div>
          </li>
        </ul>
      </article>

      <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <BriefcaseIcon class="h-4 w-4" />
          </div>
          Top catégories
        </h3>

        <ul class="space-y-4">
          <li v-for="(cat, i) in topCategories" :key="cat.label" class="flex items-center gap-3">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 text-xs font-bold text-[#F47B20]">
              {{ i + 1 }}
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-[#101D35]">{{ cat.label }}</p>
              <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-[#F47B20] to-[#FF8A24]"
                  :style="{ width: (cat.jobs / topCategories[0].jobs) * 100 + '%' }"
                />
              </div>
            </div>
            <span class="shrink-0 text-xs font-bold text-[#101D35]">{{ cat.jobs }}</span>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import {
  BarChart3 as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon,
  Users as UsersIcon,
  Briefcase as BriefcaseIcon,
  Eye as EyeIcon,
  Send as SendIcon,
} from 'lucide-vue-next'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()

const trafficData = computed(() => adminStore.trafficData)
const maxTraffic = computed(() => Math.max(...trafficData.value.map((p) => p.value)))
const totalTraffic = computed(() =>
  trafficData.value.reduce((sum, p) => sum + p.value, 0),
)

const kpis = computed(() => [
  { icon: UsersIcon, value: adminStore.stats.totalUsers.toLocaleString('fr-FR'), label: 'Utilisateurs', change: 12.4 },
  { icon: BriefcaseIcon, value: adminStore.stats.totalJobs.toLocaleString('fr-FR'), label: 'Offres', change: 8.2 },
  { icon: SendIcon, value: adminStore.stats.totalApplications.toLocaleString('fr-FR'), label: 'Candidatures', change: 15.6 },
  { icon: EyeIcon, value: '184K', label: 'Visites ce mois', change: -2.3 },
])

const totalUsers = computed(() => adminStore.stats.totalUsers)

const userBreakdown = computed(() => [
  {
    label: 'Candidats',
    value: adminStore.stats.totalCandidates,
    barClass: 'bg-gradient-to-r from-[#F47B20] to-[#FF8A24]',
  },
  {
    label: 'Employeurs',
    value: adminStore.stats.totalEmployers,
    barClass: 'bg-gradient-to-r from-blue-500 to-blue-400',
  },
])

const topCategories = [
  { label: 'Informatique & Télécoms', jobs: 1245 },
  { label: 'Commerce & Vente', jobs: 986 },
  { label: 'Banque & Assurance', jobs: 742 },
  { label: 'Industrie & Production', jobs: 512 },
  { label: 'BTP & Immobilier', jobs: 358 },
]

let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible')
        observer?.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
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
.reveal.is-visible { opacity: 1; transform: translateY(0); }
</style>