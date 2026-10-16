<template>
  <div class="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Mes candidatures
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Suivi de vos candidatures
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Retrouvez ici toutes vos candidatures envoyées et leur statut en temps réel.
      </p>
    </div>

    <!-- Filtres statuts -->
    <div class="reveal mb-6 flex flex-wrap gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="group relative inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-xs font-semibold transition"
        :class="
          activeTab === tab.value
            ? 'border-[#F47B20] bg-[#F47B20] text-white shadow-md shadow-orange-500/25'
            : 'border-slate-200 bg-white text-slate-600 hover:border-[#F47B20]/40 hover:text-[#F47B20]'
        "
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
        <span
          class="rounded-full px-1.5 text-[10px] font-bold"
          :class="
            activeTab === tab.value
              ? 'bg-white/25 text-white'
              : 'bg-slate-100 text-slate-600'
          "
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Liste -->
    <div v-if="filtered.length" class="space-y-3">
      <article
        v-for="(app, i) in filtered"
        :key="app.id"
        class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F47B20]/40 hover:shadow-xl hover:shadow-orange-500/10"
        :style="{ transitionDelay: `${i * 50}ms` }"
      >
        <div class="absolute inset-y-0 left-0 w-1" :class="statusBar(app.status)" />

        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <img :src="app.companyLogo" :alt="app.company" class="max-h-full max-w-full object-contain" />
            </div>
            <div class="min-w-0">
              <p class="truncate text-xs font-semibold text-slate-500">{{ app.company }}</p>
              <h3 class="truncate text-base font-bold text-[#101D35] group-hover:text-[#F47B20]">
                {{ app.jobTitle }}
              </h3>
              <div class="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span class="inline-flex items-center gap-1">
                  <MapPinIcon class="h-3 w-3" />
                  {{ app.location }}
                </span>
                <span class="text-slate-300">•</span>
                <span>{{ app.contract }}</span>
                <span class="text-slate-300">•</span>
                <span>{{ app.appliedAt }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
              :class="statusBadge(app.status)"
            >
              <component :is="statusIcon(app.status)" class="h-3 w-3" />
              {{ statusLabel(app.status) }}
            </span>
            <RouterLink
              :to="`/jobs/${app.jobId}`"
              class="inline-flex items-center gap-1 text-xs font-semibold text-[#F47B20] hover:underline"
            >
              Voir l'offre
              <ArrowRightIcon class="h-3 w-3" />
            </RouterLink>
          </div>
        </div>
      </article>
    </div>

    <!-- Vide -->
    <div v-else class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <InboxIcon class="h-8 w-8" />
      </div>
      <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucune candidature</h3>
      <p class="mt-2 text-sm text-slate-500">
        Commencez à postuler et retrouvez ici toutes vos candidatures.
      </p>
      <RouterLink
        to="/jobs"
        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
      >
        Parcourir les offres
        <ArrowRightIcon class="h-4 w-4" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  MapPin as MapPinIcon,
  ArrowRight as ArrowRightIcon,
  Inbox as InboxIcon,
  Clock as ClockIcon,
  Eye as EyeIcon,
  CalendarCheck as CalendarCheckIcon,
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
} from 'lucide-vue-next'
import { useCandidateStore } from '@/stores/candidate'

const candidateStore = useCandidateStore()

const activeTab = ref<'all' | 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'>('all')

const tabs = computed(() => [
  { value: 'all' as const, label: 'Toutes', count: candidateStore.applications.length },
  { value: 'pending' as const, label: 'En attente', count: candidateStore.applications.filter((a) => a.status === 'pending').length },
  { value: 'reviewing' as const, label: 'En examen', count: candidateStore.applications.filter((a) => a.status === 'reviewing').length },
  { value: 'interview' as const, label: 'Entretien', count: candidateStore.applications.filter((a) => a.status === 'interview').length },
  { value: 'accepted' as const, label: 'Acceptées', count: candidateStore.applications.filter((a) => a.status === 'accepted').length },
  { value: 'rejected' as const, label: 'Refusées', count: candidateStore.applications.filter((a) => a.status === 'rejected').length },
])

const filtered = computed(() =>
  activeTab.value === 'all'
    ? candidateStore.applications
    : candidateStore.applications.filter((a) => a.status === activeTab.value),
)

const statusLabel = (s: string) =>
  ({ pending: 'En attente', reviewing: 'En examen', interview: 'Entretien', accepted: 'Acceptée', rejected: 'Refusée' })[s] ?? s

const statusBadge = (s: string) =>
  ({
    pending: 'bg-slate-100 text-slate-700',
    reviewing: 'bg-blue-100 text-blue-700',
    interview: 'bg-orange-100 text-[#F47B20]',
    accepted: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
  })[s] ?? 'bg-slate-100 text-slate-700'

const statusBar = (s: string) =>
  ({
    pending: 'bg-slate-300',
    reviewing: 'bg-blue-400',
    interview: 'bg-gradient-to-b from-[#F47B20] to-[#FF8A24]',
    accepted: 'bg-emerald-500',
    rejected: 'bg-red-400',
  })[s] ?? 'bg-slate-300'

const statusIcon = (s: string) =>
  ({
    pending: ClockIcon,
    reviewing: EyeIcon,
    interview: CalendarCheckIcon,
    accepted: CheckCircleIcon,
    rejected: XCircleIcon,
  })[s] ?? ClockIcon

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
    { threshold: 0.1 },
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
</style>