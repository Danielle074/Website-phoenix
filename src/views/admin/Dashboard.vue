<template>
  <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
          <ShieldIcon class="h-3 w-3" />
          Administration PHOENIX
        </div>
        <h1 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
          Tableau de bord
        </h1>
        <p class="mt-2 text-sm text-slate-500 sm:text-base">
          Vue d'ensemble de la plateforme et activité récente.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <RouterLink
          to="/admin/moderation"
          class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-[#F47B20] hover:text-[#F47B20]"
        >
          <FileCheckIcon class="h-4 w-4" />
          Modération
          <span
            v-if="stats.pendingModeration"
            class="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white"
          >
            {{ stats.pendingModeration }}
          </span>
        </RouterLink>
      </div>
    </div>

    <!-- Stats principales -->
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
          <span
            v-if="stat.trend"
            class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700"
          >
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

      <!-- Modération en attente -->
      <div class="space-y-6 lg:col-span-2">
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="flex items-center gap-2 text-base font-bold text-[#101D35] sm:text-lg">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <FileCheckIcon class="h-4 w-4" />
              </div>
              Offres à modérer
            </h2>
            <RouterLink
              to="/admin/moderation"
              class="group inline-flex items-center gap-1 text-xs font-semibold text-[#F47B20] transition hover:gap-2"
            >
              Voir tout
              <ArrowRightIcon class="h-3.5 w-3.5" />
            </RouterLink>
          </div>

          <div v-if="pendingJobs.length" class="space-y-3">
            <RouterLink
              v-for="job in pendingJobs"
              :key="job.id"
              to="/admin/moderation"
              class="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20]/30 hover:bg-orange-50/20 hover:shadow-sm"
            >
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-1.5">
                <img :src="job.companyLogo" :alt="job.company" class="max-h-full max-w-full object-contain" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                  <p class="truncate text-sm font-bold text-[#101D35] group-hover:text-[#F47B20]">
                    {{ job.title }}
                  </p>
                  <span
                    v-if="job.flagged"
                    class="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-red-700"
                  >
                    Signalée
                  </span>
                </div>
                <p class="truncate text-xs text-slate-500">
                  {{ job.company }} · {{ job.location }} · {{ job.submittedAt }}
                </p>
              </div>
              <ArrowRightIcon class="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#F47B20]" />
            </RouterLink>
          </div>

          <div v-else class="rounded-xl border border-dashed border-slate-200 p-6 text-center">
            <p class="text-sm text-slate-500">Aucune offre en attente de modération.</p>
          </div>
        </article>

        <!-- Activité récente -->
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35] sm:text-lg">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
              <ActivityIcon class="h-4 w-4" />
            </div>
            Activité récente
          </h2>

          <ul class="space-y-3">
            <li
              v-for="(activity, i) in recentActivity"
              :key="i"
              class="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3"
            >
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                :class="activity.iconBg"
              >
                <component :is="activity.icon" class="h-4 w-4" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm text-slate-700">
                  <span class="font-bold text-[#101D35]">{{ activity.subject }}</span>
                  {{ ' ' }}{{ activity.action }}
                </p>
                <p class="mt-0.5 text-xs text-slate-400">{{ activity.time }}</p>
              </div>
            </li>
          </ul>
        </article>
      </div>

      <!-- Colonne latérale -->
      <div class="space-y-6">

        <!-- Actions rapides -->
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="mb-4 flex items-center gap-2 text-sm font-bold text-[#101D35]">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
              <ZapIcon class="h-3.5 w-3.5" />
            </div>
            Actions rapides
          </h3>

          <ul class="space-y-2">
            <li v-for="(action, i) in quickActions" :key="i">
              <RouterLink
                :to="action.to"
                class="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white p-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F47B20]/30 hover:bg-orange-50/30 hover:text-[#F47B20]"
              >
                <span class="flex items-center gap-2.5">
                  <component :is="action.icon" class="h-4 w-4 text-slate-400 group-hover:text-[#F47B20]" />
                  {{ action.label }}
                </span>
                <ArrowRightIcon class="h-3.5 w-3.5 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#F47B20]" />
              </RouterLink>
            </li>
          </ul>
        </article>

        <!-- Santé plateforme -->
        <article class="reveal relative overflow-hidden rounded-2xl bg-[#0A1524] p-6 text-white shadow-lg">
          <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-2xl" />

          <div class="relative">
            <div class="flex items-center gap-2">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <ActivityIcon class="h-4 w-4" />
              </div>
              <h3 class="text-sm font-bold">État de la plateforme</h3>
            </div>

            <ul class="mt-5 space-y-3 text-xs">
              <li class="flex items-center justify-between border-b border-white/10 pb-2.5 last:border-0">
                <span class="text-slate-400">API Backend</span>
                <span class="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Opérationnel
                </span>
              </li>
              <li class="flex items-center justify-between border-b border-white/10 pb-2.5 last:border-0">
                <span class="text-slate-400">Base de données</span>
                <span class="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Opérationnel
                </span>
              </li>
              <li class="flex items-center justify-between">
                <span class="text-slate-400">Service emails</span>
                <span class="inline-flex items-center gap-1.5 font-semibold text-amber-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Ralenti
                </span>
              </li>
            </ul>
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
  ShieldCheck as ShieldIcon,
  FileCheck as FileCheckIcon,
  Users as UsersIcon,
  Briefcase as BriefcaseIcon,
  TrendingUp as TrendingUpIcon,
  ArrowRight as ArrowRightIcon,
  Activity as ActivityIcon,
  Zap as ZapIcon,
  BarChart3 as BarChartIcon,
  AlertTriangle as AlertTriangleIcon,
  UserPlus as UserPlusIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-vue-next'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const stats = computed(() => adminStore.stats)
const pendingJobs = computed(() =>
  adminStore.pendingJobs.filter((j) => j.status === 'pending').slice(0, 4),
)

const statCards = computed(() => [
  {
    icon: UsersIcon,
    value: stats.value.totalUsers.toLocaleString('fr-FR'),
    label: 'Utilisateurs inscrits',
    trend: `+${stats.value.monthlyGrowth}%`,
  },
  {
    icon: BriefcaseIcon,
    value: stats.value.totalJobs.toLocaleString('fr-FR'),
    label: 'Offres publiées',
    trend: '+8.2%',
  },
  {
    icon: FileCheckIcon,
    value: stats.value.pendingModeration,
    label: 'À modérer',
  },
  {
    icon: TrendingUpIcon,
    value: stats.value.totalApplications.toLocaleString('fr-FR'),
    label: 'Candidatures',
    trend: '+15.6%',
  },
])

const recentActivity = [
  {
    icon: UserPlusIcon,
    iconBg: 'bg-emerald-50 text-emerald-600',
    subject: 'Orange CI',
    action: 'a publié une nouvelle offre',
    time: 'Il y a 12 minutes',
  },
  {
    icon: CheckCircleIcon,
    iconBg: 'bg-blue-50 text-blue-600',
    subject: 'Aïcha Traoré',
    action: 'a créé un compte candidat',
    time: 'Il y a 34 minutes',
  },
  {
    icon: AlertTriangleIcon,
    iconBg: 'bg-red-50 text-red-500',
    subject: 'FastMoney SARL',
    action: 'a été signalée par un utilisateur',
    time: 'Il y a 1 heure',
  },
  {
    icon: BriefcaseIcon,
    iconBg: 'bg-orange-50 text-[#F47B20]',
    subject: 'MTN CI',
    action: 'a mis à jour une offre existante',
    time: 'Il y a 2 heures',
  },
]

const quickActions = [
  { icon: FileCheckIcon, label: 'Modérer les offres', to: '/admin/moderation' },
  { icon: UsersIcon, label: 'Gérer les utilisateurs', to: '/admin/users' },
  { icon: BarChartIcon, label: 'Voir les statistiques', to: '/admin/stats' },
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