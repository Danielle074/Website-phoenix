<template>
  <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <!-- En-tête -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
          Mes favoris
        </p>
        <h1 class="mt-2 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
          Offres enregistrées
        </h1>
        <p class="mt-2 text-sm text-slate-500">
          Retrouvez ici les offres que vous avez sauvegardées pour plus tard.
        </p>
      </div>

      <RouterLink
        to="/jobs"
        class="group inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#101D35] shadow-sm transition hover:border-[#F47B20] hover:text-[#F47B20] sm:self-end"
      >
        Parcourir les offres
        <ArrowRightIcon class="h-4 w-4 transition group-hover:translate-x-1" />
      </RouterLink>
    </div>

    <!-- Grille -->
    <div v-if="favorites.length" class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="(fav, i) in favorites"
        :key="fav.id"
        class="reveal group relative flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F47B20]/40 hover:shadow-xl hover:shadow-orange-500/10"
        :style="{ transitionDelay: `${i * 60}ms` }"
      >
        <div class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-transform duration-500 group-hover:scale-x-100" />

        <div class="flex items-start justify-between">
          <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2.5">
            <img :src="fav.companyLogo" :alt="fav.company" class="max-h-full max-w-full object-contain" />
          </div>

          <button
            type="button"
            class="rounded-full p-2 text-red-500 transition hover:bg-red-50 active:scale-95"
            aria-label="Retirer des favoris"
            @click="removeFavorite(fav.id)"
          >
            <HeartIcon class="h-5 w-5 fill-current" />
          </button>
        </div>

        <p class="mt-4 text-xs font-semibold text-slate-500">{{ fav.company }}</p>
        <h3 class="mt-1 text-base font-bold leading-snug text-[#101D35] group-hover:text-[#F47B20]">
          {{ fav.jobTitle }}
        </h3>

        <div class="mt-4 space-y-2 border-t border-slate-100 pt-4">
          <div class="flex items-center gap-2 text-xs text-slate-500">
            <MapPinIcon class="h-4 w-4 text-slate-400" />
            <span>{{ fav.location }}</span>
          </div>
          <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <BanknoteIcon class="h-4 w-4 text-slate-400" />
            <span class="truncate">{{ fav.salary }}</span>
          </div>
        </div>

        <div class="mt-5 flex gap-2">
          <RouterLink
            :to="`/jobs/${fav.jobId}`"
            class="group/btn relative flex flex-1 min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] text-sm font-semibold text-white transition hover:bg-[#DF6810]"
          >
            <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <span class="relative">Postuler</span>
            <ArrowUpRightIcon class="relative h-4 w-4" />
          </RouterLink>
        </div>
      </article>
    </div>

    <!-- Vide -->
    <div v-else class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <HeartIcon class="h-8 w-8" />
      </div>
      <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucun favori</h3>
      <p class="mt-2 text-sm text-slate-500">
        Enregistrez des offres pour les retrouver facilement plus tard.
      </p>
      <RouterLink
        to="/jobs"
        class="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F47B20] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
      >
        Découvrir les offres
        <ArrowRightIcon class="h-4 w-4" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  Heart as HeartIcon,
  MapPin as MapPinIcon,
  Banknote as BanknoteIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
} from 'lucide-vue-next'
import { useCandidateStore } from '@/stores/candidate'

const candidateStore = useCandidateStore()
const favorites = computed(() => candidateStore.favorites)

const removeFavorite = (id: number) => {
  candidateStore.favorites = candidateStore.favorites.filter((f) => f.id !== id)
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