<template>
  <div class="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Mon CV
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Gérez votre curriculum vitæ
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Uploadez votre CV une seule fois et postulez en un clic à toutes les offres.
      </p>
    </div>

    <!-- CV actuel -->
    <div v-if="currentResume" class="reveal mb-6 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
      <div class="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20]">
            <FileTextIcon class="h-6 w-6" />
          </div>
          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-[#101D35]">{{ currentResume.name }}</p>
            <div class="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span>{{ currentResume.size }}</span>
              <span class="text-slate-300">•</span>
              <span>{{ currentResume.uploadedAt }}</span>
            </div>
            <div class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
              <CheckIcon class="h-3 w-3" />
              CV actif
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20]"
          >
            <EyeIcon class="h-4 w-4" />
            Aperçu
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20]"
            @click="isUploading = true"
          >
            <RefreshCwIcon class="h-4 w-4" />
            Remplacer
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border-2 border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
            @click="deleteResume"
          >
            <TrashIcon class="h-4 w-4" />
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <!-- Zone upload -->
    <div v-else-if="!isUploading" class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20]">
        <UploadIcon class="h-7 w-7" />
      </div>
      <h3 class="mt-5 text-lg font-bold text-[#101D35]">Aucun CV uploadé</h3>
      <p class="mt-2 text-sm text-slate-500">
        Ajoutez votre CV pour postuler plus rapidement.
      </p>
      <button
        type="button"
        class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
        @click="isUploading = true"
      >
        <UploadIcon class="h-4 w-4" />
        Uploader mon CV
      </button>
    </div>

    <!-- Formulaire upload -->
    <div v-if="isUploading" class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 class="mb-5 text-base font-bold text-[#101D35]">Uploader un nouveau CV</h3>

      <div
        class="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-[#F47B20] hover:bg-orange-50/40"
        @click="triggerFileInput"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-[#F47B20]">
          <UploadIcon class="h-6 w-6" />
        </div>
        <p class="mt-4 text-sm font-semibold text-[#101D35]">
          Cliquez ou glissez votre fichier ici
        </p>
        <p class="mt-1 text-xs text-slate-500">
          Formats acceptés : PDF, DOCX (max 5 Mo)
        </p>
        <input
          ref="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          class="hidden"
          @change="handleFileChange"
        />
      </div>

      <div v-if="selectedFile" class="mt-4 flex items-center justify-between gap-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4">
        <div class="flex min-w-0 items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <FileTextIcon class="h-5 w-5" />
          </div>
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-emerald-800">{{ selectedFile.name }}</p>
            <p class="text-xs text-emerald-600">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
        </div>
        <button
          type="button"
          class="rounded-full p-2 text-emerald-600 transition hover:bg-emerald-100"
          @click="selectedFile = null"
        >
          <XIcon class="h-4 w-4" />
        </button>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          class="flex-1 rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          @click="cancelUpload"
        >
          Annuler
        </button>
        <button
          type="button"
          :disabled="!selectedFile || isSubmitting"
          class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F47B20] py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810] disabled:cursor-not-allowed disabled:opacity-60"
          @click="submitUpload"
        >
          <LoaderIcon v-if="isSubmitting" class="h-4 w-4 animate-spin" />
          <UploadIcon v-else class="h-4 w-4" />
          {{ isSubmitting ? 'Envoi...' : 'Enregistrer le CV' }}
        </button>
      </div>
    </div>

    <!-- Conseils -->
    <div class="reveal mt-6 relative overflow-hidden rounded-2xl border-2 border-orange-200 bg-orange-50/40 p-6">
      <div class="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-orange-200/40 to-transparent blur-2xl" />

      <div class="relative flex items-start gap-3">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] text-white shadow-md shadow-orange-500/30">
          <LightbulbIcon class="h-5 w-5" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-[#101D35]">Conseil CV</h4>
          <p class="mt-1 text-xs leading-6 text-slate-600">
            Un CV clair, concis (1-2 pages) et à jour augmente vos chances de 60 %. Pensez à mentionner vos réalisations concrètes.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  FileText as FileTextIcon,
  Upload as UploadIcon,
  Trash as TrashIcon,
  Eye as EyeIcon,
  RefreshCw as RefreshCwIcon,
  Check as CheckIcon,
  X as XIcon,
  Loader as LoaderIcon,
  Lightbulb as LightbulbIcon,
} from 'lucide-vue-next'

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const isUploading = ref(false)
const isSubmitting = ref(false)

const currentResume = ref<{ name: string; size: string; uploadedAt: string } | null>({
  name: 'CV_Kouassi_Yao_2025.pdf',
  size: '324 Ko',
  uploadedAt: 'Mis à jour il y a 3 jours',
})

const triggerFileInput = () => fileInput.value?.click()

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) selectedFile.value = file
}

const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files?.[0]
  if (file) selectedFile.value = file
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`
}

const cancelUpload = () => {
  isUploading.value = false
  selectedFile.value = null
}

const submitUpload = async () => {
  if (!selectedFile.value) return
  isSubmitting.value = true
  await new Promise((r) => setTimeout(r, 1200))
  currentResume.value = {
    name: selectedFile.value.name,
    size: formatFileSize(selectedFile.value.size),
    uploadedAt: "À l'instant",
  }
  isSubmitting.value = false
  isUploading.value = false
  selectedFile.value = null
}

const deleteResume = () => {
  if (confirm('Supprimer votre CV ?')) currentResume.value = null
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