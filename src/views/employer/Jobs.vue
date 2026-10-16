<template>
  <div class="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
          Mes offres
        </p>
        <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
          Gérer mes offres d'emploi
        </h1>
        <p class="mt-2 text-sm text-slate-500">
          {{ jobs.length }} offre{{ jobs.length > 1 ? 's' : '' }} au total.
        </p>
      </div>
      <RouterLink
        to="/employer/jobs/new"
        class="inline-flex items-center gap-2 self-start rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#DF6810] sm:self-end"
      >
        <PlusIcon class="h-4 w-4" />
        Publier une offre
      </RouterLink>
    </div>

    <!-- Filtres -->
    <div class="reveal mb-6 flex flex-wrap gap-2">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        class="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-xs font-semibold transition"
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
          :class="activeTab === tab.value ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Liste -->
    <div v-if="filtered.length" class="space-y-3">
      <article
        v-for="(job, i) in filtered"
        :key="job.id"
        class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F47B20]/40 hover:shadow-lg hover:shadow-orange-500/10"
        :style="{ transitionDelay: `${i * 50}ms` }"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500"
              :class="statusIconClass(job.status)"
            >
              <BriefcaseIcon class="h-5 w-5" />
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="truncate text-base font-bold text-[#101D35]">{{ job.title }}</h3>
                <span
                  class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  :class="statusBadge(job.status)"
                >
                  {{ statusLabel(job.status) }}
                </span>
              </div>
              <div class="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span class="inline-flex items-center gap-1">
                  <MapPinIcon class="h-3 w-3" />
                  {{ job.location }}
                </span>
                <span class="text-slate-300">•</span>
                <span>{{ job.contract }}</span>
                <span class="text-slate-300">•</span>
                <span>{{ job.postedAt }}</span>
              </div>
              <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span class="inline-flex items-center gap-1">
                  <EyeIcon class="h-3.5 w-3.5" />
                  {{ job.views }} vues
                </span>
                <span class="inline-flex items-center gap-1 font-semibold text-[#F47B20]">
                  <UsersIcon class="h-3.5 w-3.5" />
                  {{ job.applicants }} candidats
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="rounded-xl border-2 border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-[#F47B20] hover:text-[#F47B20]"
              aria-label="Voir"
            >
              <EyeIcon class="h-4 w-4" />
            </button>
            <button
              type="button"
              class="rounded-xl border-2 border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-blue-300 hover:text-blue-500"
              aria-label="Modifier"
            >
              <PencilIcon class="h-4 w-4" />
            </button>
            <button
              v-if="job.status === 'active'"
              type="button"
              class="rounded-xl border-2 border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-orange-300 hover:text-[#F47B20]"
              aria-label="Mettre en pause"
              @click="toggleStatus(job.id, 'paused')"
            >
              <PauseIcon class="h-4 w-4" />
            </button>
            <button
              v-else-if="job.status === 'paused'"
              type="button"
              class="rounded-xl border-2 border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-emerald-300 hover:text-emerald-500"
              aria-label="Réactiver"
              @click="toggleStatus(job.id, 'active')"
            >
              <PlayIcon class="h-4 w-4" />
            </button>
            <button
              type="button"
              class="rounded-xl border-2 border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              aria-label="Supprimer"
              @click="removeJob(job.id)"
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Vide -->
    <div v-else class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <BriefcaseIcon class="h-8 w-8" />
      </div>
      <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucune offre</h3>
      <p class="mt-2 text-sm text-slate-500">Commencez par publier votre première offre.</p>
      <RouterLink
        to="/employer/jobs/new"
        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
      >
        <PlusIcon class="h-4 w-4" />
        Publier une offre
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Briefcase as BriefcaseIcon,
  Plus as PlusIcon,
  MapPin as MapPinIcon,
  Eye as EyeIcon,
  Users as UsersIcon,
  Pencil as PencilIcon,
  Trash as TrashIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
} from 'lucide-vue-next'
import { useEmployerStore } from '@/stores/employer'

const employerStore = useEmployerStore()
const jobs = computed(() => employerStore.jobs)

const activeTab = ref<'all' | 'active' | 'paused' | 'closed'>('all')

const tabs = computed(() => [
  { value: 'all' as const, label: 'Toutes', count: jobs.value.length },
  { value: 'active' as const, label: 'Actives', count: jobs.value.filter((j) => j.status === 'active').length },
  { value: 'paused' as const, label: 'En pause', count: jobs.value.filter((j) => j.status === 'paused').length },
  { value: 'closed' as const, label: 'Fermées', count: jobs.value.filter((j) => j.status === 'closed').length },
])

const filtered = computed(() =>
  activeTab.value === 'all' ? jobs.value : jobs.value.filter((j) => j.status === activeTab.value),
)

const statusLabel = (s: string) =>
  ({ active: 'Active', paused: 'En pause', closed: 'Fermée', draft: 'Brouillon' })[s] ?? s

const statusBadge = (s: string) =>
  ({
    active: 'bg-emerald-100 text-emerald-700',
    paused: 'bg-orange-100 text-[#F47B20]',
    closed: 'bg-slate-100 text-slate-600',
    draft: 'bg-blue-100 text-blue-700',
  })[s] ?? 'bg-slate-100 text-slate-600'

const statusIconClass = (s: string) =>
  ({
    active: 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600',
    paused: 'bg-gradient-to-br from-orange-100 to-orange-200 text-[#F47B20]',
    closed: 'bg-slate-100 text-slate-400',
    draft: 'bg-blue-100 text-blue-500',
  })[s] ?? 'bg-slate-100 text-slate-400'

const toggleStatus = (id: number, status: 'active' | 'paused') => {
  const j = employerStore.jobs.find((x) => x.id === id)
  if (j) j.status = status
}

const removeJob = (id: number) => {
  if (confirm('Supprimer cette offre ?')) {
    employerStore.jobs = employerStore.jobs.filter((j) => j.id !== id)
  }
}

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