<template>
  <div class="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Profil entreprise
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Présentez votre entreprise
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Un profil complet attire plus de candidats qualifiés.
      </p>
    </div>

    <!-- Header -->
    <div class="reveal mb-6 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
      <div class="h-32 bg-gradient-to-r from-[#F47B20] via-[#FF8A24] to-[#FFB067]" />

      <div class="px-6 pb-6">
        <div class="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="flex items-end gap-4">
            <div class="relative">
              <img
                :src="company.logo"
                :alt="company.name"
                class="h-24 w-24 rounded-2xl border-4 border-white bg-slate-50 object-contain p-3 shadow-lg"
              />
              <span
                v-if="company.verified"
                class="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white"
              >
                <CheckIcon class="h-3.5 w-3.5 text-white" />
              </span>
            </div>
            <div class="pb-2">
              <h2 class="text-xl font-bold text-[#101D35]">{{ company.name }}</h2>
              <p class="mt-1 text-sm text-slate-500">{{ company.industry }}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-if="!isEditing"
              type="button"
              class="inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
              @click="isEditing = true"
            >
              <PencilIcon class="h-4 w-4" />
              Modifier
            </button>
            <template v-else>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                @click="isEditing = false"
              >
                Annuler
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
                @click="saveCompany"
              >
                <CheckIcon class="h-4 w-4" />
                Enregistrer
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Infos générales -->
    <div class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
          <BuildingIcon class="h-4 w-4" />
        </div>
        Informations générales
      </h3>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Nom de l'entreprise</label>
          <input
            v-model="form.name"
            type="text"
            :disabled="!isEditing"
            class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Secteur d'activité</label>
          <input
            v-model="form.industry"
            type="text"
            :disabled="!isEditing"
            class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Effectif</label>
          <select
            v-model="form.size"
            :disabled="!isEditing"
            class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option>1-10 employés</option>
            <option>11-50 employés</option>
            <option>51-200 employés</option>
            <option>201-500 employés</option>
            <option>500-1 000 employés</option>
            <option>1 000+ employés</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Site web</label>
          <input
            v-model="form.website"
            type="url"
            :disabled="!isEditing"
            class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div class="sm:col-span-2">
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Localisation</label>
          <div class="relative">
            <MapPinIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="form.location"
              type="text"
              :disabled="!isEditing"
              class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Description</label>
          <textarea
            v-model="form.description"
            rows="5"
            :disabled="!isEditing"
            class="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
      </div>
    </div>

    <!-- Bannière et logo -->
    <div class="reveal mt-6 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
          <ImageIcon class="h-4 w-4" />
        </div>
        Logo et bannière
      </h3>

      <div class="space-y-4">
        <div class="flex items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-white p-2">
            <img :src="company.logo" alt="Logo" class="max-h-full max-w-full object-contain" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-[#101D35]">Logo de l'entreprise</p>
            <p class="text-xs text-slate-500">PNG, JPG ou SVG. Max 2 Mo.</p>
          </div>
          <button
            type="button"
            class="rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20]"
          >
            Changer
          </button>
        </div>

        <div class="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-4">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-24 items-center justify-center rounded-xl bg-gradient-to-r from-[#F47B20] to-[#FF8A24]">
              <ImageIcon class="h-6 w-6 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-[#101D35]">Bannière</p>
              <p class="text-xs text-slate-500">Format recommandé : 1600x400px.</p>
            </div>
            <button
              type="button"
              class="rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20]"
            >
              Changer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div
        v-if="toast"
        class="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-2xl border-2 border-emerald-200 bg-white px-5 py-3 shadow-2xl"
      >
        <div class="flex items-center gap-2">
          <CheckCircleIcon class="h-5 w-5 text-emerald-600" />
          <p class="text-sm font-semibold text-[#101D35]">{{ toast }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import {
  Building2 as BuildingIcon,
  MapPin as MapPinIcon,
  Image as ImageIcon,
  Pencil as PencilIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-vue-next'
import { useEmployerStore } from '@/stores/employer'

const employerStore = useEmployerStore()
const company = employerStore.company

const isEditing = ref(false)
const toast = ref('')

const form = reactive({
  name: company.name,
  industry: company.industry,
  size: company.size,
  location: company.location,
  website: company.website,
  description: company.description,
})

const saveCompany = () => {
  Object.assign(employerStore.company, form)
  isEditing.value = false
  toast.value = 'Profil mis à jour'
  setTimeout(() => (toast.value = ''), 3000)
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