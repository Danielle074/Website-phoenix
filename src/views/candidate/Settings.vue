<template>
  <div class="mx-auto max-w-3xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Paramètres
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Gérer mon compte
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Modifiez vos préférences et la sécurité de votre compte.
      </p>
    </div>

    <div class="space-y-6">

      <!-- Mot de passe -->
      <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <LockIcon class="h-4 w-4" />
          </div>
          Modifier mon mot de passe
        </h3>

        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Mot de passe actuel</label>
            <input
              v-model="password.current"
              type="password"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Nouveau mot de passe</label>
            <input
              v-model="password.new"
              type="password"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Confirmer le mot de passe</label>
            <input
              v-model="password.confirm"
              type="password"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        <button
          type="button"
          class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
          @click="updatePassword"
        >
          <CheckIcon class="h-4 w-4" />
          Mettre à jour
        </button>
      </article>

      <!-- Notifications -->
      <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <BellIcon class="h-4 w-4" />
          </div>
          Notifications
        </h3>

        <ul class="space-y-3">
          <li
            v-for="pref in preferences"
            :key="pref.label"
            class="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
          >
            <div>
              <p class="text-sm font-semibold text-[#101D35]">{{ pref.label }}</p>
              <p class="mt-0.5 text-xs text-slate-500">{{ pref.desc }}</p>
            </div>
            <button
              type="button"
              class="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300"
              :class="pref.enabled ? 'bg-[#F47B20]' : 'bg-slate-300'"
              @click="pref.enabled = !pref.enabled"
            >
              <span
                class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300"
                :class="pref.enabled ? 'translate-x-5' : 'translate-x-0.5'"
              />
            </button>
          </li>
        </ul>
      </article>

      <!-- Langue -->
      <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <GlobeIcon class="h-4 w-4" />
          </div>
          Langue et région
        </h3>

        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Langue de l'interface</label>
          <select
            v-model="language"
            class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20]"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </article>

      <!-- Zone danger -->
      <article class="reveal overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50/40 p-6 sm:p-8">
        <h3 class="mb-3 flex items-center gap-2 text-base font-bold text-red-700">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertTriangleIcon class="h-4 w-4" />
          </div>
          Zone de danger
        </h3>
        <p class="text-sm text-slate-600">
          La suppression de votre compte est définitive. Toutes vos données (candidatures, favoris, alertes) seront perdues.
        </p>
        <button
          type="button"
          class="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-red-300 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
          @click="confirmDelete"
        >
          <TrashIcon class="h-4 w-4" />
          Supprimer mon compte
        </button>
      </article>
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
  Lock as LockIcon,
  Bell as BellIcon,
  Globe as GlobeIcon,
  AlertTriangle as AlertTriangleIcon,
  Trash as TrashIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-vue-next'

const password = reactive({ current: '', new: '', confirm: '' })
const language = ref('fr')
const toast = ref('')

const preferences = reactive([
  { label: 'Nouvelles offres correspondantes', desc: 'Alertes email en temps réel', enabled: true },
  { label: 'Statut de mes candidatures', desc: 'Quand un recruteur traite votre candidature', enabled: true },
  { label: 'Newsletter PHOENIX', desc: 'Conseils carrière et actualités', enabled: false },
  { label: 'Notifications push', desc: 'Notifications sur votre navigateur', enabled: false },
])

const showToast = (msg: string) => {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 3000)
}

const updatePassword = () => {
  if (!password.current || !password.new || password.new !== password.confirm) {
    showToast('Veuillez vérifier les champs')
    return
  }
  showToast('Mot de passe mis à jour')
  password.current = ''
  password.new = ''
  password.confirm = ''
}

const confirmDelete = () => {
  if (confirm('Supprimer définitivement votre compte ? Cette action est irréversible.')) {
    showToast('Compte supprimé')
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