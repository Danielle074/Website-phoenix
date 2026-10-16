<template>
  <div class="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
          Alertes emploi
        </p>
        <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
          Soyez notifié en premier
        </h1>
        <p class="mt-2 text-sm text-slate-500">
          Créez des alertes et recevez les nouvelles offres directement par email.
        </p>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-2 self-start rounded-xl bg-[#F47B20] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#DF6810] hover:shadow-lg sm:self-end"
        @click="openCreate"
      >
        <PlusIcon class="h-4 w-4" />
        Nouvelle alerte
      </button>
    </div>

    <!-- Liste -->
    <div v-if="alerts.length" class="space-y-3">
      <article
        v-for="(alert, i) in alerts"
        :key="alert.id"
        class="reveal group relative flex flex-col gap-4 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#F47B20]/40 hover:shadow-lg hover:shadow-orange-500/10 sm:flex-row sm:items-center sm:justify-between"
        :style="{ transitionDelay: `${i * 60}ms` }"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500"
            :class="
              alert.active
                ? 'bg-gradient-to-br from-[#F47B20] to-[#FF8A24] text-white shadow-md shadow-orange-500/30'
                : 'bg-slate-100 text-slate-400'
            "
          >
            <BellIcon class="h-5 w-5" />
          </div>

          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="text-base font-bold text-[#101D35]">{{ alert.keywords }}</h3>
              <span
                class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                :class="alert.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'"
              >
                {{ alert.active ? 'Active' : 'En pause' }}
              </span>
            </div>
            <div class="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span class="inline-flex items-center gap-1">
                <MapPinIcon class="h-3 w-3" />
                {{ alert.location }}
              </span>
              <span class="text-slate-300">•</span>
              <span>{{ alert.category }}</span>
              <span class="text-slate-300">•</span>
              <span class="inline-flex items-center gap-1">
                <ClockIcon class="h-3 w-3" />
                {{ frequencyLabel(alert.frequency) }}
              </span>
            </div>
            <p class="mt-2 text-[11px] text-slate-400">{{ alert.createdAt }}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Toggle -->
          <button
            type="button"
            class="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300"
            :class="alert.active ? 'bg-[#F47B20]' : 'bg-slate-300'"
            :aria-label="alert.active ? 'Désactiver' : 'Activer'"
            @click="toggleAlert(alert.id)"
          >
            <span
              class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300"
              :class="alert.active ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </button>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            aria-label="Supprimer l'alerte"
            @click="deleteAlert(alert.id)"
          >
            <TrashIcon class="h-4 w-4" />
          </button>
        </div>
      </article>
    </div>

    <!-- Vide -->
    <div v-else class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <BellIcon class="h-8 w-8" />
      </div>
      <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucune alerte</h3>
      <p class="mt-2 text-sm text-slate-500">
        Créez une alerte pour recevoir les offres qui vous correspondent.
      </p>
      <button
        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
        @click="openCreate"
      >
        <PlusIcon class="h-4 w-4" />
        Créer ma première alerte
      </button>
    </div>

    <!-- Modal création -->
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isCreating" class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" @click="isCreating = false" />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="isCreating"
        class="fixed inset-x-4 top-1/2 z-[70] mx-auto max-w-lg -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold text-[#101D35]">Créer une alerte</h2>
            <p class="mt-1 text-sm text-slate-500">Recevez les offres qui vous correspondent.</p>
          </div>
          <button
            class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            @click="isCreating = false"
          >
            <XIcon class="h-4 w-4" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Mots-clés *</label>
            <input
              v-model="newAlert.keywords"
              type="text"
              placeholder="Ex. Développeur Vue.js"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Localisation</label>
            <input
              v-model="newAlert.location"
              type="text"
              placeholder="Ex. Abidjan"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Fréquence</label>
            <select
              v-model="newAlert.frequency"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20]"
            >
              <option value="instant">Instantané (à chaque nouvelle offre)</option>
              <option value="daily">Quotidien</option>
              <option value="weekly">Hebdomadaire</option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="flex-1 rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="isCreating = false"
          >
            Annuler
          </button>
          <button
            type="button"
            :disabled="!newAlert.keywords.trim()"
            class="flex-1 rounded-xl bg-[#F47B20] py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810] disabled:cursor-not-allowed disabled:opacity-60"
            @click="createAlert"
          >
            Créer l'alerte
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import {
  Bell as BellIcon,
  Plus as PlusIcon,
  Trash as TrashIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  X as XIcon,
} from 'lucide-vue-next'
import { useCandidateStore } from '@/stores/candidate'

const candidateStore = useCandidateStore()
const alerts = computed(() => candidateStore.alerts)

const isCreating = ref(false)
const newAlert = reactive({
  keywords: '',
  location: '',
  category: '',
  frequency: 'weekly',
})

const frequencyLabel = (f: string) =>
  ({ instant: 'Instantané', daily: 'Quotidien', weekly: 'Hebdomadaire' })[f] ?? f

const openCreate = () => {
  isCreating.value = true
  newAlert.keywords = ''
  newAlert.location = ''
  newAlert.category = ''
  newAlert.frequency = 'weekly'
}

const createAlert = () => {
  if (!newAlert.keywords.trim()) return
  candidateStore.alerts.unshift({
    id: Date.now(),
    keywords: newAlert.keywords,
    location: newAlert.location || 'Toute la Côte d’Ivoire',
    category: newAlert.category || 'Toutes',
    frequency: newAlert.frequency as any,
    active: true,
    createdAt: "Créée à l'instant",
  })
  isCreating.value = false
}

const toggleAlert = (id: number) => {
  const a = candidateStore.alerts.find((x) => x.id === id)
  if (a) a.active = !a.active
}

const deleteAlert = (id: number) => {
  if (confirm('Supprimer cette alerte ?')) {
    candidateStore.alerts = candidateStore.alerts.filter((x) => x.id !== id)
  }
}

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