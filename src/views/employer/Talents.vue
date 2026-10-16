<template>
  <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8">
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
        Recherche de talents
      </p>
      <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Trouvez les meilleurs profils
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Explorez des candidats qualifiés et contactez-les directement.
      </p>
    </div>

    <!-- Barre de recherche -->
    <div class="reveal mb-6 rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-sm sm:flex sm:items-center">
      <div class="flex flex-1 items-center gap-3 px-3 py-2">
        <SearchIcon class="h-5 w-5 text-[#F47B20]" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Nom, compétence, poste..."
          class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <div class="flex flex-1 items-center gap-3 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:border-slate-200">
        <MapPinIcon class="h-5 w-5 text-[#F47B20]" />
        <select v-model="selectedLocation" class="w-full bg-transparent text-sm outline-none">
          <option value="">Toute la Côte d'Ivoire</option>
          <option>Abidjan</option>
          <option>Bouaké</option>
          <option>Yamoussoukro</option>
        </select>
      </div>
    </div>

    <!-- Grille de candidats -->
    <div v-if="filtered.length" class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="(c, i) in filtered"
        :key="c.id"
        class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F47B20]/40 hover:shadow-xl hover:shadow-orange-500/10"
        :style="{ transitionDelay: `${i * 60}ms` }"
      >
        <div class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-transform duration-500 group-hover:scale-x-100" />

        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <img
              :src="c.avatar"
              :alt="c.name"
              class="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-slate-100"
            />
            <div>
              <h3 class="text-base font-bold text-[#101D35]">{{ c.name }}</h3>
              <p class="text-xs text-slate-500">{{ c.title }}</p>
            </div>
          </div>
          <button
            type="button"
            class="rounded-full p-2 text-slate-400 transition hover:bg-orange-50 hover:text-[#F47B20]"
            aria-label="Enregistrer le profil"
          >
            <BookmarkIcon class="h-4 w-4" />
          </button>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="skill in c.skills.slice(0, 3)"
            :key="skill"
            class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600"
          >
            {{ skill }}
          </span>
        </div>

        <div class="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <div class="flex items-center gap-2">
            <MapPinIcon class="h-3.5 w-3.5" />
            {{ c.location }}
          </div>
          <div class="flex items-center gap-2">
            <BriefcaseIcon class="h-3.5 w-3.5" />
            {{ c.experience }} d'expérience
          </div>
        </div>

        <button
          type="button"
          class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
        >
          <MailIcon class="h-4 w-4" />
          Contacter
        </button>
      </article>
    </div>

    <!-- Vide -->
    <div v-else class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <UsersIcon class="h-8 w-8" />
      </div>
      <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucun candidat trouvé</h3>
      <p class="mt-2 text-sm text-slate-500">Essayez avec d'autres mots-clés.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Search as SearchIcon,
  MapPin as MapPinIcon,
  Briefcase as BriefcaseIcon,
  Bookmark as BookmarkIcon,
  Mail as MailIcon,
  Users as UsersIcon,
} from 'lucide-vue-next'
import candidate1 from '@/assets/images/feature-1.jpg'
import candidate2 from '@/assets/images/feature-2.jpg'
import candidate3 from '@/assets/images/feature-3.jpg'

const talents = [
  { id: 1, name: 'Kouassi Yao', title: 'Développeur Full Stack', avatar: candidate1, location: 'Abidjan', experience: '4 ans', skills: ['Vue.js', 'Node.js', 'TypeScript'] },
  { id: 2, name: 'Aïcha Traoré', title: 'Data Analyst Senior', avatar: candidate2, location: 'Abidjan', experience: '6 ans', skills: ['Python', 'SQL', 'Power BI'] },
  { id: 3, name: 'Jean-Marc Diabaté', title: 'Chef de Projet Digital', avatar: candidate3, location: 'Abidjan', experience: '8 ans', skills: ['Agile', 'Scrum', 'Jira'] },
  { id: 4, name: 'Fatou Bamba', title: 'Développeuse Front-End', avatar: candidate1, location: 'Yopougon', experience: '3 ans', skills: ['React', 'Tailwind', 'Figma'] },
  { id: 5, name: 'Ibrahim Coulibaly', title: 'Ingénieur DevOps', avatar: candidate2, location: 'Abidjan', experience: '5 ans', skills: ['Docker', 'AWS', 'CI/CD'] },
  { id: 6, name: 'Mariam Sylla', title: 'UX/UI Designer', avatar: candidate3, location: 'Abidjan', experience: '4 ans', skills: ['Figma', 'Adobe XD', 'Prototypage'] },
]

const searchQuery = ref('')
const selectedLocation = ref('')

const filtered = computed(() => {
  let r = talents
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    r = r.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.skills.some((s) => s.toLowerCase().includes(q)),
    )
  }
  if (selectedLocation.value) r = r.filter((t) => t.location === selectedLocation.value)
  return r
})
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