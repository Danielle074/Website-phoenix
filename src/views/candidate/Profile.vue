<template>
  <div class="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Mon profil
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Informations personnelles
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Un profil complet multiplie vos chances d'être remarqué par les recruteurs.
      </p>
    </div>

    <!-- Carte avatar + header -->
    <div class="reveal relative mb-6 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
      <div class="h-32 bg-gradient-to-r from-[#F47B20] via-[#FF8A24] to-[#FFB067]" />

      <div class="px-6 pb-6">
        <div class="-mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="flex items-end gap-4">
            <div class="relative">
              <img
                :src="form.avatar"
                alt="Avatar"
                class="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg"
              />
              <button
                type="button"
                class="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F47B20] text-white shadow-lg shadow-orange-500/30 transition hover:bg-[#DF6810]"
                aria-label="Changer la photo"
              >
                <CameraIcon class="h-4 w-4" />
              </button>
            </div>
            <div class="pb-2">
              <h2 class="text-xl font-bold text-[#101D35]">{{ form.fullName }}</h2>
              <p class="mt-1 text-sm text-slate-500">{{ form.title }}</p>
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
                @click="cancelEdit"
              >
                Annuler
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
                @click="saveProfile"
              >
                <CheckIcon class="h-4 w-4" />
                Enregistrer
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Informations personnelles -->
    <div class="reveal rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
          <UserIcon class="h-4 w-4" />
        </div>
        Informations personnelles
      </h3>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Nom complet</label>
          <input
            v-model="form.fullName"
            type="text"
            :disabled="!isEditing"
            class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Titre professionnel</label>
          <input
            v-model="form.title"
            type="text"
            :disabled="!isEditing"
            class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Email</label>
          <div class="relative">
            <MailIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="form.email"
              type="email"
              :disabled="!isEditing"
              class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Téléphone</label>
          <div class="relative">
            <PhoneIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="form.phone"
              type="tel"
              :disabled="!isEditing"
              class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>
        <div>
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
        <div>
          <label class="mb-2 block text-sm font-semibold text-[#101D35]">Date de naissance</label>
          <input
            v-model="form.birthday"
            type="date"
            :disabled="!isEditing"
            class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
          />
        </div>
      </div>

      <div class="mt-5">
        <label class="mb-2 block text-sm font-semibold text-[#101D35]">Bio</label>
        <textarea
          v-model="form.bio"
          rows="4"
          :disabled="!isEditing"
          placeholder="Décrivez votre parcours, vos ambitions..."
          class="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"
        />
      </div>
    </div>

    <!-- Compétences -->
    <div class="reveal mt-6 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 class="mb-5 flex items-center gap-2 text-base font-bold text-[#101D35]">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
          <SparklesIcon class="h-4 w-4" />
        </div>
        Compétences
      </h3>

      <!-- Tags compétences -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(skill, i) in form.skills"
          :key="skill"
          class="group inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-[#F47B20] transition hover:border-[#F47B20] hover:bg-[#F47B20] hover:text-white"
        >
          {{ skill }}
          <button
            v-if="isEditing"
            type="button"
            class="rounded-full opacity-60 transition hover:opacity-100"
            @click="removeSkill(i)"
          >
            <XIcon class="h-3 w-3" />
          </button>
        </span>
      </div>

      <!-- Ajout compétence -->
      <div v-if="isEditing" class="mt-4 flex gap-2">
        <input
          v-model="newSkill"
          type="text"
          placeholder="Ajouter une compétence..."
          class="flex-1 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
          @keyup.enter="addSkill"
        />
        <button
          type="button"
          :disabled="!newSkill.trim()"
          class="inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-4 text-sm font-semibold text-white transition hover:bg-[#DF6810] disabled:cursor-not-allowed disabled:opacity-50"
          @click="addSkill"
        >
          <PlusIcon class="h-4 w-4" />
          Ajouter
        </button>
      </div>
    </div>

    <!-- Expériences -->
    <div class="reveal mt-6 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="mb-5 flex items-center justify-between">
        <h3 class="flex items-center gap-2 text-base font-bold text-[#101D35]">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
            <BriefcaseIcon class="h-4 w-4" />
          </div>
          Expériences professionnelles
        </h3>
        <button
          v-if="isEditing"
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-[#F47B20] transition hover:bg-orange-100"
          @click="addExperience"
        >
          <PlusIcon class="h-3.5 w-3.5" />
          Ajouter
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(exp, i) in form.experiences"
          :key="i"
          class="group relative rounded-xl border border-slate-200 bg-slate-50/40 p-4 transition hover:border-[#F47B20]/30 hover:bg-orange-50/20"
        >
          <button
            v-if="isEditing"
            type="button"
            class="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
            @click="removeExperience(i)"
          >
            <TrashIcon class="h-3.5 w-3.5" />
          </button>

          <div class="grid gap-3 sm:grid-cols-2">
            <input
              v-model="exp.role"
              type="text"
              placeholder="Poste occupé"
              :disabled="!isEditing"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F47B20] disabled:bg-slate-100/50 disabled:text-slate-500"
            />
            <input
              v-model="exp.company"
              type="text"
              placeholder="Entreprise"
              :disabled="!isEditing"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F47B20] disabled:bg-slate-100/50 disabled:text-slate-500"
            />
            <input
              v-model="exp.period"
              type="text"
              placeholder="Période (ex. 2022 - 2024)"
              :disabled="!isEditing"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F47B20] disabled:bg-slate-100/50 disabled:text-slate-500"
            />
            <input
              v-model="exp.location"
              type="text"
              placeholder="Localisation"
              :disabled="!isEditing"
              class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F47B20] disabled:bg-slate-100/50 disabled:text-slate-500"
            />
          </div>
          <textarea
            v-model="exp.description"
            rows="2"
            placeholder="Description des missions..."
            :disabled="!isEditing"
            class="mt-3 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#F47B20] disabled:bg-slate-100/50 disabled:text-slate-500"
          />
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
  User as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Sparkles as SparklesIcon,
  Briefcase as BriefcaseIcon,
  Camera as CameraIcon,
  Pencil as PencilIcon,
  Check as CheckIcon,
  Plus as PlusIcon,
  X as XIcon,
  Trash as TrashIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-vue-next'
import { useCandidateStore } from '@/stores/candidate'

const candidateStore = useCandidateStore()
const user = candidateStore.user

const isEditing = ref(false)
const newSkill = ref('')
const toast = ref('')

const form = reactive({
  fullName: user.fullName,
  title: user.title,
  email: user.email,
  phone: user.phone,
  location: user.location,
  birthday: '1995-06-15',
  bio: user.bio,
  avatar: user.avatar,
  skills: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'Figma'],
  experiences: [
    {
      role: 'Développeur Front-End',
      company: 'Tech Africa',
      period: '2022 - 2024',
      location: 'Abidjan',
      description: 'Développement d\'applications web modernes pour des clients locaux et internationaux.',
    },
    {
      role: 'Développeur Junior',
      company: 'StartupCI',
      period: '2020 - 2022',
      location: 'Abidjan',
      description: 'Participation à la conception et au développement d\'une plateforme SaaS.',
    },
  ],
})

const showToast = (msg: string) => {
  toast.value = msg
  setTimeout(() => (toast.value = ''), 3000)
}

const saveProfile = () => {
  candidateStore.user.fullName = form.fullName
  candidateStore.user.title = form.title
  candidateStore.user.email = form.email
  candidateStore.user.phone = form.phone
  candidateStore.user.location = form.location
  candidateStore.user.bio = form.bio
  isEditing.value = false
  showToast('Profil mis à jour avec succès')
}

const cancelEdit = () => {
  form.fullName = candidateStore.user.fullName
  form.title = candidateStore.user.title
  form.bio = candidateStore.user.bio
  isEditing.value = false
}

const addSkill = () => {
  if (newSkill.value.trim() && !form.skills.includes(newSkill.value.trim())) {
    form.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

const removeSkill = (i: number) => form.skills.splice(i, 1)

const addExperience = () => {
  form.experiences.push({ role: '', company: '', period: '', location: '', description: '' })
}

const removeExperience = (i: number) => form.experiences.splice(i, 1)

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
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
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
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>