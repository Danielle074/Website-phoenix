<template>
  <main class="min-h-screen bg-white text-slate-900">

    <!-- ==================================================
         HERO
    =================================================== -->
    <section class="relative overflow-hidden bg-[#101D35] text-white">
      <!-- Décorations animées -->
      <div class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] animate-pulse-slow rounded-full border border-white/[0.06]" />
      <div class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] animate-pulse-slow rounded-full border border-white/[0.08]" style="animation-delay: 1.5s" />
      <div class="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] animate-pulse-slow rounded-full bg-gradient-to-tr from-[#F47B20]/10 to-transparent blur-3xl" style="animation-delay: 3s" />
      <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 80px 80px;" />

      <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-28">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Texte -->
          <div class="relative z-10">
            <span class="hero-enter hero-enter-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-md">
              <SparklesIcon class="h-3.5 w-3.5 text-[#FF8A24]" />
              À propos de PHOENIX
            </span>

            <h1 class="hero-enter hero-enter-2 mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Nous rapprochons les talents
              <span class="mt-2 block bg-gradient-to-r from-[#FF8A24] via-[#FFB067] to-[#FF8A24] bg-clip-text text-transparent">
                des opportunités.
              </span>
            </h1>

            <p class="hero-enter hero-enter-3 mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              PHOENIX Jobs & Carrières est une plateforme ivoirienne qui a pour mission de rendre
              l'accès à l'emploi plus simple, plus transparent et plus accessible à tous les
              talents du pays.
            </p>

            <div class="hero-enter hero-enter-4 mt-9 flex flex-col gap-3 sm:flex-row">
              <RouterLink
                to="/jobs"
                class="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span class="relative">Découvrir les offres</span>
                <ArrowRightIcon class="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </RouterLink>

              <RouterLink
                to="/contact"
                class="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/[0.12]"
              >
                Nous contacter
                <ArrowUpRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </RouterLink>
            </div>
          </div>

          <!-- Image -->
          <div class="hero-enter hero-enter-5 relative mx-auto w-full max-w-xl lg:max-w-none">
            <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl">
              <div class="relative overflow-hidden rounded-[1.5rem]">
                <img
                  :src="aboutHero"
                  alt="Équipe PHOENIX Jobs & Carrières"
                  class="h-[340px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[440px]"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#101D35]/40 via-transparent to-transparent" />
              </div>
            </div>

            <!-- Carte flottante -->
            <div class="absolute -left-3 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl backdrop-blur-sm sm:flex lg:-left-8">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] shadow-sm">
                <SparklesIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">Depuis 2024</p>
                <p class="mt-1 text-xs text-slate-500">Au service de l'emploi ivoirien</p>
              </div>
            </div>

            <!-- Carte flottante bas droite -->
            <div class="absolute -bottom-5 right-4 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-right-6">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 shadow-sm">
                <TrendingUpIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">120 000+</p>
                <p class="mt-1 text-xs text-slate-500">Talents inscrits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CHIFFRES CLÉS
    =================================================== -->
    <section class="border-b border-slate-100 bg-white">
      <div class="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="reveal group flex flex-col items-center rounded-2xl border-2 border-slate-200 bg-white p-5 text-center shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15 sm:p-7"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:scale-110 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30 sm:h-14 sm:w-14">
              <component :is="stat.icon" class="h-6 w-6" />
            </div>
            <p class="mt-4 text-2xl font-black text-[#101D35] sm:text-3xl">
              {{ stat.value }}
            </p>
            <p class="mt-1 text-xs text-slate-500 sm:text-sm">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         NOTRE MISSION
    =================================================== -->
    <section class="relative overflow-hidden bg-[#F8FAFC]">
      <div class="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-orange-100/50 to-transparent blur-3xl" />

      <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Image -->
          <div class="reveal relative order-2 lg:order-1">
            <div class="overflow-hidden rounded-3xl border-2 border-slate-200 shadow-xl">
              <img
                :src="missionBg"
                alt="Abidjan, Côte d'Ivoire"
                class="h-[320px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[420px]"
              />
            </div>

            <div class="absolute -bottom-6 -right-4 hidden max-w-xs rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-2xl sm:block lg:-right-8">
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] text-white shadow-lg shadow-orange-500/30">
                  <TargetIcon class="h-5 w-5" />
                </div>
                <div>
                  <p class="text-xs font-bold uppercase tracking-wider text-[#F47B20]">Notre mission</p>
                  <p class="mt-1 text-sm font-semibold text-[#101D35]">
                    Rendre l'emploi accessible à tous les Ivoiriens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Texte -->
          <div class="reveal order-1 lg:order-2">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
              Notre histoire
            </p>

            <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
              Une plateforme pensée pour la Côte d'Ivoire.
            </h2>

            <p class="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Chaque année, des milliers de jeunes diplômés et professionnels
              ivoiriens cherchent un emploi fiable, tandis que des entreprises
              peinent à trouver les bons talents. PHOENIX Jobs & Carrières est né
              de la volonté de combler ce fossé.
            </p>

            <p class="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Nous offrons une plateforme moderne, rapide et accessible sur mobile,
              où les candidats peuvent postuler gratuitement et les employeurs vérifiés
              recruter efficacement.
            </p>

            <ul class="mt-7 space-y-3">
              <li
                v-for="(value, i) in values"
                :key="value"
                class="reveal flex items-start gap-3 text-sm text-slate-700"
                :style="{ transitionDelay: `${i * 60}ms` }"
              >
                <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600">
                  <CheckIcon class="h-3 w-3" />
                </div>
                <span>{{ value }}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- ==================================================
         NOS VALEURS
    =================================================== -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

        <div class="reveal mb-12 max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            Ce qui nous guide
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
            Nos valeurs fondamentales.
          </h2>
          <p class="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            Des principes simples qui orientent chacune de nos décisions.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(v, i) in coreValues"
            :key="v.title"
            class="reveal group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
            :style="{ transitionDelay: `${i * 60}ms` }"
          >
            <div class="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div class="relative">
              <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] shadow-sm transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
                <component :is="v.icon" class="h-6 w-6" />
              </div>
              <h3 class="mt-5 text-lg font-bold text-[#101D35]">{{ v.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-slate-500">{{ v.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ==================================================
         ÉQUIPE
    =================================================== -->
    <section class="relative overflow-hidden bg-[#F8FAFC]">
      <div class="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-100/40 to-transparent blur-3xl" />

      <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

        <div class="reveal mb-12 max-w-2xl">
          <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
            L'équipe
          </p>
          <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
            Les visages derrière PHOENIX.
          </h2>
          <p class="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            Une équipe passionnée au service de l'emploi en Côte d'Ivoire.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(member, i) in team"
            :key="member.name"
            class="reveal group overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="relative aspect-square overflow-hidden">
              <img
                :src="member.photo"
                :alt="member.name"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#101D35]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div class="p-5 text-center">
              <h3 class="text-base font-bold text-[#101D35]">{{ member.name }}</h3>
              <p class="mt-1 text-xs font-semibold text-[#F47B20]">{{ member.role }}</p>
              <p class="mt-2 text-xs leading-5 text-slate-500">{{ member.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ==================================================
         POURQUOI NOUS CHOISIR
    =================================================== -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div class="reveal">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
              Notre différence
            </p>
            <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
              Pourquoi les Ivoiriens nous font confiance.
            </h2>
            <p class="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Nous mettons l'accent sur la qualité des offres, la simplicité
              d'utilisation et la sécurité des données de chaque utilisateur.
            </p>

            <div class="mt-8 space-y-4">
              <div
                v-for="(reason, i) in reasons"
                :key="reason.title"
                class="reveal group flex items-start gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F47B20] hover:shadow-lg hover:shadow-orange-500/10"
                :style="{ transitionDelay: `${i * 60}ms` }"
              >
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30">
                  <component :is="reason.icon" class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="text-sm font-bold text-[#101D35]">{{ reason.title }}</h3>
                  <p class="mt-1 text-xs leading-6 text-slate-500">{{ reason.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Carte statistiques -->
          <div class="reveal relative overflow-hidden rounded-3xl bg-[#101D35] p-7 text-white shadow-2xl sm:p-10">
            <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent blur-3xl" />
            <div class="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 animate-pulse-slow rounded-full bg-gradient-to-tr from-[#FF8A24]/15 to-transparent blur-3xl" style="animation-delay: 2s" />

            <div class="relative">
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#FF9A42]">
                Impact depuis notre lancement
              </p>

              <h3 class="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                Ensemble, construisons l'emploi de demain.
              </h3>

              <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
                <div
                  v-for="(item, i) in impact"
                  :key="item.label"
                  class="group rounded-2xl border-2 border-white/10 bg-white/[0.05] p-5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-orange-400/30 hover:bg-white/[0.08]"
                  :style="{ transitionDelay: `${i * 60}ms` }"
                >
                  <component :is="item.icon" class="h-6 w-6 text-[#FF9A42] transition-transform duration-500 group-hover:scale-110" />
                  <p class="mt-3 text-2xl font-black">{{ item.value }}</p>
                  <p class="mt-1 text-xs text-slate-400">{{ item.label }}</p>
                </div>
              </div>

              <RouterLink
                to="/register"
                class="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#DF6810]"
              >
                Rejoindre PHOENIX
                <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CTA FINAL
    =================================================== -->
    <section class="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div class="reveal relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#F47B20] via-[#F47B20] to-[#DF6810] px-6 py-12 shadow-2xl shadow-orange-500/30 sm:px-10 sm:py-16 lg:px-16">
        <div class="pointer-events-none absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;" />
        <div class="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/15" />
        <div class="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full border border-white/15" />
        <div class="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-white/10" />

        <div class="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-2xl">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Rejoignez l'aventure
            </p>
            <h2 class="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Votre carrière mérite le meilleur.
            </h2>
            <p class="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
              Créez votre compte gratuitement et accédez à des milliers d'opportunités
              vérifiées partout en Côte d'Ivoire.
            </p>
          </div>

          <RouterLink
            to="/register"
            class="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#101D35] shadow-lg transition hover:bg-orange-50"
          >
            Créer un compte gratuit
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Sparkles as SparklesIcon,
  Target as TargetIcon,
  Check as CheckIcon,
  Users as UsersIcon,
  Briefcase as BriefcaseIcon,
  Building2 as Building2Icon,
  Award as AwardIcon,
  ShieldCheck as ShieldCheckIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Eye as EyeIcon,
  HandHeart as HandHeartIcon,
  Smartphone as SmartphoneIcon,
  TrendingUp as TrendingUpIcon,
} from 'lucide-vue-next'

/* ============================================================
 * IMAGES
 * ============================================================ */
import aboutHero from '@/assets/images/feature-1.jpg'
import missionBg from '@/assets/images/feature-2.jpg'
import team1 from '@/assets/images/feature-3.jpg'
import team2 from '@/assets/images/header-1.jpg'
import team3 from '@/assets/images/header-2.jpg'
import team4 from '@/assets/images/header-3.jpg'

/* ============================================================
 * CHIFFRES CLÉS
 * ============================================================ */
const stats = [
  { icon: UsersIcon, value: '120 000+', label: 'Candidats inscrits' },
  { icon: BriefcaseIcon, value: '50 000+', label: 'Offres publiées' },
  { icon: Building2Icon, value: '15 000+', label: 'Entreprises partenaires' },
  { icon: AwardIcon, value: '98 %', label: 'Satisfaction utilisateurs' },
]

/* ============================================================
 * VALEURS
 * ============================================================ */
const values = [
  'Candidatures 100 % gratuites pour tous les talents',
  'Entreprises vérifiées pour garantir la fiabilité des offres',
  'Accessibilité optimisée pour les réseaux instables',
  'Protection stricte des données personnelles',
]

/* ============================================================
 * NOS VALEURS FONDAMENTALES
 * ============================================================ */
const coreValues = [
  {
    icon: ShieldCheckIcon,
    title: 'Confiance',
    description:
      'Chaque entreprise est vérifiée pour offrir aux candidats des opportunités réelles et fiables.',
  },
  {
    icon: ZapIcon,
    title: 'Simplicité',
    description:
      'Une interface claire et rapide, pensée pour fonctionner même sur les connexions instables.',
  },
  {
    icon: HeartIcon,
    title: 'Accessibilité',
    description:
      'Postuler doit être gratuit pour tous les talents, sans barrière ni frais cachés.',
  },
  {
    icon: EyeIcon,
    title: 'Transparence',
    description:
      'Des informations claires sur les offres, les entreprises et le suivi des candidatures.',
  },
  {
    icon: HandHeartIcon,
    title: 'Engagement',
    description:
      'Nous œuvrons chaque jour pour renforcer l’employabilité des jeunes Ivoiriens.',
  },
  {
    icon: SmartphoneIcon,
    title: 'Modernité',
    description:
      'Une plateforme PWA accessible sur tous les appareils, du mobile au desktop.',
  },
]

/* ============================================================
 * ÉQUIPE
 * ============================================================ */
const team = [
  {
    name: 'Jean-Louis Billon',
    role: 'Fondateur & Président',
    bio: 'Visionnaire engagé pour le développement économique de la Côte d’Ivoire.',
    photo: team1,
  },
  {
    name: 'Aïcha Traoré',
    role: 'Directrice Générale',
    bio: 'Experte en stratégie digitale et emploi, elle pilote la croissance de PHOENIX.',
    photo: team2,
  },
  {
    name: 'Kouassi Yao',
    role: 'Directeur Technique',
    bio: 'Architecte de la plateforme, garant d’une expérience rapide et sécurisée.',
    photo: team3,
  },
  {
    name: 'Mariam Konaté',
    role: 'Responsable Partenariats',
    bio: 'Elle tisse des liens solides avec les entreprises et les institutions.',
    photo: team4,
  },
]

/* ============================================================
 * POURQUOI NOUS CHOISIR
 * ============================================================ */
const reasons = [
  {
    icon: ShieldCheckIcon,
    title: 'Offres vérifiées',
    description:
      'Chaque entreprise est contrôlée avant publication de ses offres.',
  },
  {
    icon: ZapIcon,
    title: 'Recherche rapide',
    description:
      'Filtres puissants et navigation fluide pour trouver l’offre idéale.',
  },
  {
    icon: SmartphoneIcon,
    title: '100 % mobile',
    description:
      'Postulez depuis votre téléphone, même avec une connexion lente.',
  },
  {
    icon: HeartIcon,
    title: 'Candidature gratuite',
    description:
      'Aucun frais, aucune limite, aucune inscription payante.',
  },
]

/* ============================================================
 * IMPACT
 * ============================================================ */
const impact = [
  { icon: UsersIcon, value: '120k+', label: 'Candidats' },
  { icon: BriefcaseIcon, value: '50k+', label: 'Offres' },
  { icon: Building2Icon, value: '15k+', label: 'Entreprises' },
  { icon: TrendingUpIcon, value: '98%', label: 'Satisfaction' },
]

/* ============================================================
 * OBSERVER REVEAL AU SCROLL
 * ============================================================ */
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
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* ============================================================
   ANIMATIONS
============================================================ */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes heroEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.hero-enter {
  opacity: 0;
  transform: translateY(24px);
  animation: heroEnter 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hero-enter-1 { animation-delay: 0.1s; }
.hero-enter-2 { animation-delay: 0.25s; }
.hero-enter-3 { animation-delay: 0.4s; }
.hero-enter-4 { animation-delay: 0.55s; }
.hero-enter-5 { animation-delay: 0.35s; }

/* ============================================================
   REVEAL AU SCROLL
============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================
   ACCESSIBILITÉ
============================================================ */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal,
  .hero-enter {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>