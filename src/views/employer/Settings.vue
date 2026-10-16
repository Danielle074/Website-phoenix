<template>
  <div class="mx-auto max-w-3xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Paramètres
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Paramètres du compte
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Gérez votre compte employeur et vos préférences.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Compte -->
      <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <UserIcon class="h-4 w-4" />
          </div>
          Mon compte
        </h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Nom complet</label>
            <input
              v-model="form.fullName"
              type="text"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Fonction</label>
            <input
              v-model="form.role"
              type="text"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Téléphone</label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>
        <button
          type="button"
          class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
          @click="save"
        >
          <CheckIcon class="h-4 w-4" />
          Enregistrer
        </button>
      </article>

      <!-- Mot de passe -->
      <article class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <LockIcon class="h-4 w-4" />
          </div>
          Mot de passe
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
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">Nouveau</label>
            <input
              v-model="password.new"
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

      <!-- Danger -->
      <article class="reveal overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50/40 p-6 sm:p-8">
        <h3 class="mb-3 flex items-center gap-2 text-base font-bold text-red-700">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertTriangleIcon class="h-4 w-4" />
          </div>
          Zone de danger
        </h3>
        <p class="text-sm text-slate-600">
          Fermer définitivement le compte employeur. Toutes vos offres et candidatures seront supprimées.
        </p>
        <button
          type="button"
          class="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-red-300 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
          @click="confirmDelete"
        >
          <TrashIcon class="h-4 w-4" />
          Supprimer le compte
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
  User as UserIcon,
  Lock as LockIcon,
  Bell as BellIcon,
  AlertTriangle as AlertTriangleIcon,
  Trash as TrashIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-vue-next'
import { useEmployerStore } from '@/stores/employer'

const employerStore = useEmployerStore()
const user = employerStore.user

const form = reactive({
  fullName: user.fullName,
  role: user.role,
  email: user.email,
  phone: user.phone,
})

const password = reactive({ current: '', new: '' })
const toast = ref('')

const preferences = reactive([
  { label: 'Nouvelles candidatures', desc: 'Notifications à chaque nouvelle candidature', enabled: true },
  { label: 'Messages candidats', desc: 'Quand un candidat vous envoie un message', enabled: true },
  { label: 'Offres expirant bientôt', desc: 'Alerte 3 jours avant expiration', enabled: true },
  { label: 'Newsletter employeur', desc: 'Conseils et actualités RH', enabled: false },
])

const showToast = (msg: string) => {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 3000)
}

const save = () => {
  Object.assign(employerStore.user, form)
  showToast('Informations mises à jour')
}

const updatePassword = () => {
  if (!password.current || !password.new) return
  showToast('Mot de passe mis à jour')
  password.current = ''
  password.new = ''
}

const confirmDelete = () => {
  if (confirm('Supprimer définitivement votre compte employeur ?')) {
    showToast('Demande envoyée')
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