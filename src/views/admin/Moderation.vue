<template>
  <div class="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div class="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
          <FileCheckIcon class="h-3 w-3" />
          Modération
        </div>
        <h1 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
          Modération des offres
        </h1>
        <p class="mt-2 text-sm text-slate-500">
          Validez ou rejetez les offres soumises par les employeurs.
        </p>
      </div>
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
        class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#F47B20]/40 hover:shadow-lg hover:shadow-orange-500/10"
        :style="{ transitionDelay: `${i * 50}ms` }"
      >
        <div
          v-if="job.flagged"
          class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-red-600"
        />

        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div class="flex flex-1 items-start gap-4">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <img :src="job.companyLogo" :alt="job.company" class="max-h-full max-w-full object-contain" />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-base font-bold text-[#101D35]">{{ job.title }}</h3>
                <span
                  v-if="job.flagged"
                  class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700"
                >
                  <AlertTriangleIcon class="h-2.5 w-2.5" />
                  Signalée
                </span>
                <span
                  class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  :class="statusBadge(job.status)"
                >
                  {{ statusLabel(job.status) }}
                </span>
              </div>

              <p class="mt-1.5 text-xs font-semibold text-slate-500">
                {{ job.company }} · <span class="text-slate-400">{{ job.submittedBy }}</span>
              </p>

              <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span class="inline-flex items-center gap-1">
                  <MapPinIcon class="h-3 w-3" />
                  {{ job.location }}
                </span>
                <span class="text-slate-300">•</span>
                <span>{{ job.contract }}</span>
                <span class="text-slate-300">•</span>
                <span>{{ job.category }}</span>
                <span class="text-slate-300">•</span>
                <span class="font-semibold text-slate-700">{{ job.salary }}</span>
              </div>

              <p v-if="job.flagged && job.reason" class="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700">
                <AlertTriangleIcon class="h-3.5 w-3.5" />
                {{ job.reason }}
              </p>

              <p class="mt-2 text-[11px] text-slate-400">Soumise {{ job.submittedAt }}</p>
            </div>
          </div>

          <div v-if="job.status === 'pending'" class="flex shrink-0 flex-wrap gap-2 lg:flex-col">
            <button
              type="button"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-md lg:flex-none"
              @click="approve(job.id)"
            >
              <CheckIcon class="h-4 w-4" />
              Approuver
            </button>
            <button
              type="button"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-md lg:flex-none"
              @click="reject(job.id)"
            >
              <XIcon class="h-4 w-4" />
              Rejeter
            </button>
            <button
              type="button"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20] lg:flex-none"
            >
              <EyeIcon class="h-4 w-4" />
              Détails
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Vide -->
    <div v-else class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <CheckCircleIcon class="h-8 w-8" />
      </div>
      <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucune offre à modérer</h3>
      <p class="mt-2 text-sm text-slate-500">
        Tout est à jour dans cette catégorie.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  FileCheck as FileCheckIcon,
  AlertTriangle as AlertTriangleIcon,
  MapPin as MapPinIcon,
  Check as CheckIcon,
  X as XIcon,
  Eye as EyeIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-vue-next'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const jobs = computed(() => adminStore.pendingJobs)

const activeTab = ref<'pending' | 'approved' | 'rejected' | 'flagged' | 'all'>('pending')

const tabs = computed(() => [
  { value: 'pending' as const, label: 'En attente', count: jobs.value.filter((j) => j.status === 'pending').length },
  { value: 'flagged' as const, label: 'Signalées', count: jobs.value.filter((j) => j.flagged).length },
  { value: 'approved' as const, label: 'Approuvées', count: jobs.value.filter((j) => j.status === 'approved').length },
  { value: 'rejected' as const, label: 'Rejetées', count: jobs.value.filter((j) => j.status === 'rejected').length },
  { value: 'all' as const, label: 'Toutes', count: jobs.value.length },
])

const filtered = computed(() => {
  if (activeTab.value === 'all') return jobs.value
  if (activeTab.value === 'flagged') return jobs.value.filter((j) => j.flagged)
  return jobs.value.filter((j) => j.status === activeTab.value)
})

const statusLabel = (s: string) =>
  ({ pending: 'En attente', approved: 'Approuvée', rejected: 'Rejetée' })[s] ?? s

const statusBadge = (s: string) =>
  ({
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
  })[s] ?? 'bg-slate-100 text-slate-600'

const approve = (id: number) => {
  const j = adminStore.pendingJobs.find((x) => x.id === id)
  if (j) j.status = 'approved'
}

const reject = (id: number) => {
  if (confirm('Rejeter cette offre ?')) {
    const j = adminStore.pendingJobs.find((x) => x.id === id)
    if (j) j.status = 'rejected'
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