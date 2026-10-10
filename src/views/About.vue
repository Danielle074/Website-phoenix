<template>
  <main class="min-h-screen bg-white text-slate-900">

    <!-- ==================================================
         HERO
    =================================================== -->
    <section class="relative overflow-hidden bg-[#101D35] text-white">
      <!-- Décorations -->
      <div class="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.06]" />
      <div class="pointer-events-none absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full border border-white/[0.08]" />

      <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Texte -->
          <div class="relative z-10">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium text-slate-200">
           
              À propos de PHENIX
            </span>

            <h1 class="mt-7 max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Nous rapprochons les talents
              <span class="mt-2 block text-[#FF8A24]">des opportunités.</span>
            </h1>

            <p class="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              PHENIX Jobs & Carrières est une plateforme ivoirienne qui a pour mission de rendre
              l'accès à l'emploi plus simple, plus transparent et plus accessible à tous les
              talents du pays.
            </p>

            <div class="mt-9 flex flex-col gap-3 sm:flex-row">
              <RouterLink
                to="/jobs"
                class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
              >
                Découvrir les offres
                <ArrowRightIcon class="h-4 w-4" />
              </RouterLink>

              <RouterLink
                to="/contact"
                class="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/[0.06] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
              >
                Nous contacter
              </RouterLink>
            </div>
          </div>

          <!-- Image -->
          <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl">
              <img
                :src="aboutHero"
                alt="Équipe PHENIX Jobs & Carrières"
                class="h-[340px] w-full rounded-[1.5rem] object-cover sm:h-[440px]"
              />
            </div>

            <!-- Carte flottante -->
            <div class="absolute -left-3 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex lg:-left-8">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20]">
                <SparklesIcon class="h-5 w-5" />
              </div>
              <div>
                <p class="text-sm font-bold text-slate-900">Depuis 2024</p>
                <p class="mt-1 text-xs text-slate-500">Au service de l'emploi ivoirien</p>
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
      <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col items-center rounded-2xl border-2 border-slate-200 bg-white p-5 text-center shadow-md transition hover:-translate-y-1 hover:border-[#F47B20] hover:shadow-xl hover:shadow-orange-500/15 sm:p-7"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20] sm:h-14 sm:w-14">
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
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <!-- Image -->
          <div class="relative order-2 lg:order-1">
            <div class="overflow-hidden rounded-3xl border-2 border-slate-200 shadow-xl">
              <img
                :src="missionBg"
                alt="Abidjan, Côte d'Ivoire"
                class="h-[320px] w-full object-cover sm:h-[420px]"
              />
            </div>

            <div class="absolute -bottom-6 -right-4 hidden max-w-xs rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-2xl sm:block lg:-right-8">
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F47B20] text-white">
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
          <div class="order-1 lg:order-2">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#F47B20]">
              Notre histoire
            </p>

            <h2 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
              Une plateforme pensée pour la Côte d'Ivoire.
            </h2>

            <p class="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Chaque année, des milliers de jeunes diplômés et professionnels
              ivoiriens cherchent un emploi fiable, tandis que des entreprises
              peinent à trouver les bons talents. PHENIX Jobs & Carrières est né
              de la volonté de combler ce fossé.
            </p>

            <p class="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Nous offrons une plateforme moderne, rapide et accessible sur mobile,
              où les candidats peuvent postuler gratuitement et les employeurs vérifiés
              recruter efficacement.
            </p>

            <!-- Liste de valeurs -->
            <ul class="mt-7 space-y-3">
              <li
                v-for="value in values"
                :key="value"
                class="flex items-start gap-3 text-sm text-slate-700"
              >
                <div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        <div class="mb-10 max-w-2xl">
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
            v-for="v in coreValues"
            :key="v.title"
            class="group rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20] shadow-sm transition group-hover:bg-[#F47B20] group-hover:text-white">
              <component :is="v.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-lg font-bold text-[#101D35]">{{ v.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-500">{{ v.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ==================================================
         ÉQUIPE
    =================================================== -->
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        <div class="mb-10 max-w-2xl">
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
            v-for="member in team"
            :key="member.name"
            class="group overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-[#F47B20] hover:shadow-2xl hover:shadow-orange-500/15"
          >
            <div class="aspect-square overflow-hidden">
              <img
                :src="member.photo"
                :alt="member.name"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div class="p-5 text-center">
              <h3 class="text-base font-bold text-[#101D35]">{{ member.name }}</h3>
              <p class="mt-1 text-xs font-semibold text-[#F47B20]">{{ member.role }}</p>
              <p class="mt-2 text-xs text-slate-500">{{ member.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ==================================================
         POURQUOI NOUS CHOISIR
    =================================================== -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <div>
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
                v-for="reason in reasons"
                :key="reason.title"
                class="flex items-start gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#F47B20] hover:shadow-md"
              >
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#F47B20]">
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
          <div class="rounded-3xl bg-[#101D35] p-7 text-white shadow-2xl sm:p-10">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-[#FF9A42]">
              Impact depuis notre lancement
            </p>

            <h3 class="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
              Ensemble, construisons l'emploi de demain.
            </h3>

            <div class="mt-8 grid grid-cols-2 gap-5">
              <div
                v-for="item in impact"
                :key="item.label"
                class="rounded-2xl border-2 border-white/10 bg-white/[0.05] p-5 shadow-lg transition hover:border-orange-400/30 hover:bg-white/[0.08]"
              >
                <component :is="item.icon" class="h-6 w-6 text-[#FF9A42]" />
                <p class="mt-3 text-2xl font-black">{{ item.value }}</p>
                <p class="mt-1 text-xs text-slate-400">{{ item.label }}</p>
              </div>
            </div>

            <RouterLink
              to="/register"
              class="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810]"
            >
              Rejoindre PHENIX
              <ArrowRightIcon class="h-4 w-4" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CTA FINAL
    =================================================== -->
    <section class="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#F47B20] px-6 py-12 sm:px-10 sm:py-14 lg:px-16">
        <div class="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/15" />
        <div class="pointer-events-none absolute -right-8 -top-20 h-56 w-56 rounded-full border border-white/15" />

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
            class="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#101D35] transition hover:bg-orange-50"
          >
            Créer un compte gratuit
            <ArrowRightIcon class="h-4 w-4" />
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  ArrowRight as ArrowRightIcon,
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
 * IMAGES IMPORTÉES DANS LE SCRIPT
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
 * VALEURS (liste à puces)
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
    bio: 'Experte en stratégie digitale et emploi, elle pilote la croissance de PHENIX.',
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
</script>