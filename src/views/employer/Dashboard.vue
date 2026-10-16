<template>
  <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Tableau de bord employeur
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
        Bonjour {{ user.fullName.split(' ')[0] }}, bienvenue
      </h1>
      <p class="mt-2 text-sm text-slate-500 sm:text-base">
        Voici un aperçu de votre activité de recrutement chez <span class="font-semibold text-[#101D35]">{{ company.name }}</span>.
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
        </div>
        <p class="relative mt-4 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
          {{ stat.value }}
        </p>
        <p class="relative mt-1 text-xs text-slate-500 sm:text-sm">{{ stat.label }}</p>
      </article>
    </div>

    <!-- Contenu principal -->
    <div class="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">

      <!-- Candidatures récentes -->
      <div class="space-y-6 lg:col-span-2">
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="flex items-center gap-2 text-base font-bold text-[#101D35] sm:text-lg">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <InboxIcon class="h-4 w-4" />
              </div>
              Candidatures récentes
            </h2>
            <RouterLink
              to="/employer/applications"
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
              to="/employer/applications"
              class="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20]/30 hover:bg-orange-50/20 hover:shadow-sm"
            >
              <img
                :src="app.candidateAvatar"
                :alt="app.candidateName"
                class="h-11 w-11 shrink-0 rounded-full border-2 border-white object-cover shadow-sm ring-2 ring-slate-100"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold text-[#101D35] group-hover:text-[#F47B20]">
                  {{ app.candidateName }}
                </p>
                <p class="truncate text-xs text-slate-500">
                  {{ app.jobTitle }} · {{ app.appliedAt }}
                </p>
              </div>
              <div class="flex shrink-0 items-center gap-2">
                <span class="hidden rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 sm:inline-block">
                  {{ app.matchScore }}% match
                </span>
                <span
                  class="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  :class="statusClass(app.status)"
                >
                  {{ statusLabel(app.status) }}
                </span>
              </div>
            </RouterLink>
          </div>

          <div v-else class="rounded-xl border border-dashed border-slate-200 p-6 text-center">
            <p class="text-sm text-slate-500">Aucune candidature récente.</p>
          </div>
        </article>

        <!-- Offres actives -->
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div class="mb-5 flex items-center justify-between">
            <h2 class="flex items-center gap-2 text-base font-bold text-[#101D35] sm:text-lg">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <BriefcaseIcon class="h-4 w-4" />
              </div>
              Mes offres actives
            </h2>
            <RouterLink
              to="/employer/jobs"
              class="group inline-flex items-center gap-1 text-xs font-semibold text-[#F47B20] transition hover:gap-2"
            >
              Gérer
              <ArrowRightIcon class="h-3.5 w-3.5" />
            </RouterLink>
          </div>

          <div v-if="activeJobs.length" class="space-y-3">
            <div
              v-for="job in activeJobs"
              :key="job.id"
              class="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 transition-all duration-300 hover:border-[#F47B20]/30 hover:shadow-sm"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20]">
                <BriefcaseIcon class="h-4 w-4" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-bold text-[#101D35]">{{ job.title }}</p>
                <p class="text-xs text-slate-500">{{ job.location }} · {{ job.postedAt }}</p>
              </div>
              <div class="hidden shrink-0 items-center gap-4 text-xs text-slate-500 sm:flex">
                <span class="inline-flex items-center gap-1">
                  <EyeIcon class="h-3.5 w-3.5" />
                  {{ job.views }}
                </span>
                <span class="inline-flex items-center gap-1 font-semibold text-[#F47B20]">
                  <UsersIcon class="h-3.5 w-3.5" />
                  {{ job.applicants }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Colonne latérale -->
      <div class="space-y-6">

        <!-- CTA Publier -->
        <article class="reveal relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F47B20] via-[#F47B20] to-[#DF6810] p-6 text-white shadow-lg shadow-orange-500/25">
          <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div class="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div class="relative">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
              <PlusIcon class="h-5 w-5" />
            </div>
            <h3 class="mt-4 text-base font-bold">Recrutez dès maintenant</h3>
            <p class="mt-1.5 text-xs leading-5 text-white/90">
              Publiez une offre et atteignez des milliers de talents qualifiés.
            </p>
            <RouterLink
              to="/employer/jobs/new"
              class="group/cta mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#F47B20] transition hover:bg-orange-50"
            >
              Publier une offre
              <ArrowRightIcon class="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
            </RouterLink>
          </div>
        </article>

        <!-- Complétion profil entreprise -->
        <article class="reveal relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
          <div class="relative">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <BuildingIcon class="h-4 w-4" />
              </div>
              <h3 class="text-sm font-bold text-[#101D35]">Profil entreprise</h3>
            </div>

            <p class="mt-4 text-3xl font-bold text-[#101D35]">{{ company.profileCompletion }}%</p>

            <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-gradient-to-r from-[#F47B20] to-[#FF8A24]"
                :style="{ width: company.profileCompletion + '%' }"
              />
            </div>

            <p class="mt-3 text-xs leading-5 text-slate-500">
              Complétez votre profil pour attirer plus de candidats.
            </p>

            <RouterLink
              to="/employer/company"
              class="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20]"
            >
              Compléter
              <ArrowRightIcon class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </RouterLink>
          </div>
        </article>

        <!-- Stats rapides -->
        <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
          <h3 class="flex items-center gap-2 text-sm font-bold text-[#101D35]">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
              <TrendingUpIcon class="h-3.5 w-3.5" />
            </div>
            Cette semaine
          </h3>

          <ul class="mt-4 space-y-3 text-xs">
            <li class="flex items-center justify-between">
              <span class="text-slate-500">Vues des offres</span>
              <span class="font-bold text-[#101D35]">+{{ stats.totalViews }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-slate-500">Nouvelles candidatures</span>
              <span class="font-bold text-[#101D35]">{{ stats.pendingApplications }}</span>
            </li>
            <li class="flex items-center justify-between">
              <span class="text-slate-500">Entretiens planifiés</span>
              <span class="font-bold text-[#101D35]">3</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Inbox as InboxIcon,
  Briefcase as BriefcaseIcon,
  Users as UsersIcon,
  Eye as EyeIcon,
  Plus as PlusIcon,
  ArrowRight as ArrowRightIcon,
  Building2 as BuildingIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  Target as TargetIcon,
} from 'lucide-vue-next'
import { useEmployerStore } from '@/stores/employer'

const employerStore = useEmployerStore()
const user = computed(() => employerStore.user)
const company = computed(() => employerStore.company)
const stats = computed(() => employerStore.stats)
const recentApplications = computed(() => employerStore.applications.slice(0, 4))
const activeJobs = computed(() =>
  employerStore.jobs.filter((j) => j.status === 'active').slice(0, 3),
)

const statCards = computed(() => [
  { icon: BriefcaseIcon, value: stats.value.activeJobs, label: 'Offres actives' },
  { icon: InboxIcon, value: stats.value.totalApplications, label: 'Candidatures reçues' },
  { icon: EyeIcon, value: stats.value.totalViews, label: 'Vues des offres' },
  { icon: CheckCircleIcon, value: stats.value.hires, label: 'Recrutements réussis' },
])

const statusLabel = (s: string) =>
  ({ pending: 'Nouveau', reviewing: 'En examen', interview: 'Entretien', accepted: 'Accepté', rejected: 'Refusé' })[s] ?? s

const statusClass = (s: string) =>
  ({
    pending: 'bg-blue-100 text-blue-700',
    reviewing: 'bg-orange-100 text-[#F47B20]',
    interview: 'bg-purple-100 text-purple-700',
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
  .reveal { opacity: 1 !important; transform: none !important; }
}
</style>