<template>
  <main class="flex min-h-[80vh] items-center justify-center bg-[#F8FAFC] px-5 py-16 sm:px-8">

    <div class="w-full max-w-2xl text-center">

      <!-- Illustration 404 -->
      <div class="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-orange-100/60" />
        <div class="absolute inset-4 rounded-full bg-orange-200/60" />
        <span class="relative z-10 text-6xl font-black text-[#F47B20] sm:text-7xl">
          404
        </span>
      </div>

      <h1 class="text-3xl font-bold tracking-tight text-[#101D35] sm:text-4xl lg:text-5xl">
        Oups, page introuvable
      </h1>

      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
        La page que vous cherchez a peut-être été déplacée, supprimée
        ou n'a jamais existé. Pas de panique, on vous ramène sur le bon chemin.
      </p>

      <!-- Actions -->
      <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <RouterLink
          to="/"
          class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] sm:w-auto"
        >
          <HomeIcon class="h-4 w-4" />
          Retour à l'accueil
        </RouterLink>

        <RouterLink
          to="/jobs"
          class="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20] sm:w-auto"
        >
          <BriefcaseIcon class="h-4 w-4" />
          Voir les offres
        </RouterLink>
      </div>

      <!-- Liens utiles -->
      <div class="mt-12 border-t border-slate-200 pt-8">
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Liens utiles
        </p>

        <div class="mt-4 flex flex-wrap items-center justify-center gap-3">
          <RouterLink
            v-for="link in usefulLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-[#F47B20] hover:text-[#F47B20]"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Home as HomeIcon,
  Briefcase as BriefcaseIcon,
} from 'lucide-vue-next'

const usefulLinks = [
  { label: 'Offres d\'emploi', to: '/jobs' },
  { label: 'À propos', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Connexion', to: '/login' },
  { label: 'Inscription', to: '/register' },
]
</script>