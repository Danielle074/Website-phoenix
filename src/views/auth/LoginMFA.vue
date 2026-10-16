<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A1524] px-5 py-12">
    <div class="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent blur-3xl" />
    <div class="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] shadow-lg shadow-orange-500/30">
        <ShieldCheckIcon class="h-7 w-7 text-white" />
      </div>
      <h1 class="mt-6 text-center text-2xl font-bold tracking-tight text-white">
        Vérification 2FA
      </h1>
      <p class="mt-3 text-center text-sm leading-6 text-slate-300">
        Saisissez le code à 6 chiffres de votre application d'authentification.
      </p>
      <p class="mt-6 text-center text-xs text-slate-500">
        (Page à implémenter — placeholder)
      </p>
      <RouterLink to="/login" class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#F47B20] hover:bg-white/[0.08]">
        Retour à la connexion
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ShieldCheck as ShieldCheckIcon } from 'lucide-vue-next'
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
.animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
</style>
