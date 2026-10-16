<template>
  <div class="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Candidatures reçues
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Gérer les candidatures
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Évaluez, contactez et suivez chaque candidat.
      </p>
    </div>

    <!-- Filtres statuts -->
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
        v-for="(app, i) in filtered"
        :key="app.id"
        class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#F47B20]/40 hover:shadow-lg hover:shadow-orange-500/10"
        :style="{ transitionDelay: `${i * 40}ms` }"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-start gap-4">
            <div class="relative shrink-0">
              <img
                :src="app.candidateAvatar"
                :alt="app.candidateName"
                class="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-slate-100"
              />
              <span
                class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-[9px] font-bold text-white ring-2 ring-white"
              >
                {{ app.matchScore }}
              </span>
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-bold text-[#101D35]">{{ app.candidateName }}</h3>
              <p class="text-xs text-slate-500">{{ app.candidateTitle }}</p>
              <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span class="inline-flex items-center gap-1">
                  <MapPinIcon class="h-3 w-3" />
                  {{ app.candidateLocation }}
                </span>
                <span class="text-slate-300">•</span>
                <span>{{ app.appliedAt }}</span>
                <span class="text-slate-300">•</span>
                <span class="font-semibold text-[#101D35]">Pour : {{ app.jobTitle }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <select
              v-model="app.status"
              class="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-xs font-semibold outline-none transition focus:border-[#F47B20]"
              :class="statusSelectClass(app.status)"
            >
              <option value="pending">Nouveau</option>
              <option value="reviewing">En examen</option>
              <option value="interview">Entretien</option>
              <option value="accepted">Accepté</option>
              <option value="rejected">Refusé</option>
            </select>

            <button
              type="button"
              class="rounded-xl border-2 border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-[#F47B20] hover:text-[#F47B20]"
              aria-label="Voir CV"
            >
              <FileTextIcon class="h-4 w-4" />
            </button>
            <button
              type="button"
              class="rounded-xl bg-[#F47B20] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#DF6810]"
            >
              Contacter
            </button>
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
      <p class="mt-2 text-sm text-slate-500">Vous n'avez pas encore de candidature pour ces critères.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  MapPin as MapPinIcon,
  FileText as FileTextIcon,
  Inbox as InboxIcon,
} from 'lucide-vue-next'
import { useEmployerStore } from '@/stores/employer'

const employerStore = useEmployerStore()
const applications = computed(() => employerStore.applications)

const activeTab = ref<'all' | 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'>('all')

const tabs = computed(() => [
  { value: 'all' as const, label: 'Toutes', count: applications.value.length },
  { value: 'pending' as const, label: 'Nouveaux', count: applications.value.filter((a) => a.status === 'pending').length },
  { value: 'reviewing' as const, label: 'En examen', count: applications.value.filter((a) => a.status === 'reviewing').length },
  { value: 'interview' as const, label: 'Entretien', count: applications.value.filter((a) => a.status === 'interview').length },
  { value: 'accepted' as const, label: 'Acceptés', count: applications.value.filter((a) => a.status === 'accepted').length },
  { value: 'rejected' as const, label: 'Refusés', count: applications.value.filter((a) => a.status === 'rejected').length },
])

const filtered = computed(() =>
  activeTab.value === 'all'
    ? applications.value
    : applications.value.filter((a) => a.status === activeTab.value),
)

const statusSelectClass = (s: string) =>
  ({
    pending: 'text-blue-600',
    reviewing: 'text-[#F47B20]',
    interview: 'text-purple-600',
    accepted: 'text-emerald-600',
    rejected: 'text-red-600',
  })[s] ?? 'text-slate-600'

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