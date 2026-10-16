<template>
  <div class="mx-auto max-w-3xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Nouvelle offre
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Publier une offre d'emploi
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Remplissez les informations ci-dessous pour attirer les meilleurs talents.
      </p>
    </div>

    <!-- Étapes -->
    <div class="reveal mb-6 flex items-center gap-2 overflow-x-auto pb-1">
      <div
        v-for="(s, i) in steps"
        :key="s"
        class="flex shrink-0 items-center gap-2"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
          :class="
            i <= currentStep
              ? 'bg-gradient-to-br from-[#F47B20] to-[#FF8A24] text-white shadow-md shadow-orange-500/30'
              : 'bg-slate-100 text-slate-400'
          "
        >
          {{ i + 1 }}
        </div>
        <span
          class="text-xs font-semibold"
          :class="i <= currentStep ? 'text-[#101D35]' : 'text-slate-400'"
        >
          {{ s }}
        </span>
        <ChevronRightIcon v-if="i < steps.length - 1" class="h-3 w-3 text-slate-300" />
      </div>
    </div>

    <!-- Formulaire -->
    <div class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <!-- Étape 1 : Infos de base -->
      <div v-show="currentStep === 0" class="space-y-5">
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">
            Titre du poste <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Ex. Développeur Full Stack Senior"
            class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">
              Catégorie <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20]"
            >
              <option value="">Choisir...</option>
              <option v-for="c in categories" :key="c">{{ c }}</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">
              Type de contrat <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.contract"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20]"
            >
              <option value="">Choisir...</option>
              <option>CDI</option>
              <option>CDD</option>
              <option>Stage</option>
              <option>Freelance</option>
              <option>Alternance</option>
            </select>
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">
              Localisation <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.location"
              type="text"
              placeholder="Ex. Abidjan"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Salaire</label>
            <input
              v-model="form.salary"
              type="text"
              placeholder="Ex. 500 000 - 1 000 000 FCFA"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>
      </div>

      <!-- Étape 2 : Description -->
      <div v-show="currentStep === 1" class="space-y-5">
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">
            Description du poste <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Décrivez le poste, le contexte et les enjeux..."
            class="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">
            Missions principales
          </label>
          <textarea
            v-model="form.missions"
            rows="5"
            placeholder="Une mission par ligne..."
            class="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">
            Profil recherché
          </label>
          <textarea
            v-model="form.requirements"
            rows="5"
            placeholder="Une exigence par ligne..."
            class="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
          />
        </div>
      </div>

      <!-- Étape 3 : Options -->
      <div v-show="currentStep === 2" class="space-y-5">
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Date d'expiration</label>
          <input
            v-model="form.expiresAt"
            type="date"
            class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
          />
        </div>

        <div class="space-y-3">
          <label class="flex items-start gap-3 rounded-xl border-2 border-slate-200 p-4 transition hover:border-[#F47B20]/30">
            <input
              v-model="form.features.urgent"
              type="checkbox"
              class="mt-0.5 h-4 w-4 accent-[#F47B20]"
            />
            <div>
              <p class="text-sm font-bold text-[#101D35]">Marquer comme urgent</p>
              <p class="mt-0.5 text-xs text-slate-500">Votre offre sera mise en avant en haut de la liste.</p>
            </div>
          </label>

          <label class="flex items-start gap-3 rounded-xl border-2 border-slate-200 p-4 transition hover:border-[#F47B20]/30">
            <input
              v-model="form.features.featured"
              type="checkbox"
              class="mt-0.5 h-4 w-4 accent-[#F47B20]"
            />
            <div>
              <p class="text-sm font-bold text-[#101D35]">Offre mise en avant</p>
              <p class="mt-0.5 text-xs text-slate-500">Augmentez la visibilité de votre offre (option payante).</p>
            </div>
          </label>

          <label class="flex items-start gap-3 rounded-xl border-2 border-slate-200 p-4 transition hover:border-[#F47B20]/30">
            <input
              v-model="form.features.remote"
              type="checkbox"
              class="mt-0.5 h-4 w-4 accent-[#F47B20]"
            />
            <div>
              <p class="text-sm font-bold text-[#101D35]">Télétravail possible</p>
              <p class="mt-0.5 text-xs text-slate-500">Indiquez que le poste peut être effectué à distance.</p>
            </div>
          </label>
        </div>
      </div>

      <!-- Navigation -->
      <div class="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
        <button
          v-if="currentStep > 0"
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          @click="currentStep--"
        >
          <ChevronLeftIcon class="h-4 w-4" />
          Précédent
        </button>
        <div class="flex-1" />
        <button
          v-if="currentStep < steps.length - 1"
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
          @click="currentStep++"
        >
          Suivant
          <ChevronRightIcon class="h-4 w-4" />
        </button>
        <button
          v-else
          type="button"
          :disabled="isSubmitting"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810] disabled:opacity-60"
          @click="publish"
        >
          <LoaderIcon v-if="isSubmitting" class="h-4 w-4 animate-spin" />
          <CheckCircleIcon v-else class="h-4 w-4" />
          {{ isSubmitting ? 'Publication...' : "Publier l'offre" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  Loader as LoaderIcon,
} from 'lucide-vue-next'
import { useEmployerStore } from '@/stores/employer'

const router = useRouter()
const employerStore = useEmployerStore()

const steps = ['Informations', 'Description', 'Options']
const currentStep = ref(0)
const isSubmitting = ref(false)

const categories = [
  'Informatique & Télécoms',
  'Banque & Assurance',
  'Industrie & Production',
  'BTP & Immobilier',
  'Services & Conseil',
  'Santé & Social',
  'Commerce & Vente',
  'Transport & Logistique',
]

const form = reactive({
  title: '',
  category: '',
  contract: '',
  location: '',
  salary: '',
  description: '',
  missions: '',
  requirements: '',
  expiresAt: '',
  features: { urgent: false, featured: false, remote: false },
})

const publish = async () => {
  if (!form.title || !form.category || !form.contract || !form.location) {
    currentStep.value = 0
    return
  }
  isSubmitting.value = true
  await new Promise((r) => setTimeout(r, 1200))

  employerStore.jobs.unshift({
    id: Date.now(),
    title: form.title,
    location: form.location,
    contract: form.contract as any,
    category: form.category,
    salary: form.salary || 'À négocier',
    status: 'active',
    applicants: 0,
    views: 0,
    postedAt: "À l'instant",
    expiresAt: form.expiresAt || 'Dans 30 jours',
  })

  isSubmitting.value = false
  router.push('/employer/jobs')
}
</script>