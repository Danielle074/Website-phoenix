<template>
  <main class="min-h-screen bg-[#F8FAFC] text-slate-900">

    <!-- ==================================================
         FIL D'ARIANE
    =================================================== -->
    <div class="border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3.5 text-xs sm:px-8 lg:px-10">
        <RouterLink to="/" class="group inline-flex items-center gap-1.5 whitespace-nowrap text-slate-500 transition hover:text-[#F47B20]">
          <HomeIcon class="h-3.5 w-3.5" />
          Accueil
        </RouterLink>
        <ChevronRightIcon class="h-3.5 w-3.5 shrink-0 text-slate-300" />
        <RouterLink to="/jobs" class="whitespace-nowrap text-slate-500 transition hover:text-[#F47B20]">
          Offres d'emploi
        </RouterLink>
        <ChevronRightIcon class="h-3.5 w-3.5 shrink-0 text-slate-300" />
        <span class="truncate font-semibold text-[#101D35]">{{ job.title }}</span>
      </div>
    </div>

    <!-- ==================================================
         HEADER DE L'OFFRE — CINÉMATOGRAPHIQUE
    =================================================== -->
    <section class="relative bg-white">
      <!-- Bannière avec effets -->
      <div class="relative h-48 w-full overflow-hidden bg-[#0A1524] sm:h-60 lg:h-72">
        <img
          :src="companyCover"
          alt="Bannière entreprise"
          class="h-full w-full object-cover opacity-50 transition-transform duration-[20000ms] ease-out"
        />

        <!-- Overlays multicouches -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#0A1524] via-[#0A1524]/50 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0A1524]/70 via-transparent to-transparent" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(244,123,32,0.15),transparent_60%)]" />

        <!-- Grille décorative -->
        <div class="pointer-events-none absolute inset-0 opacity-[0.05]" style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 60px 60px;" />

        <!-- Cercles animés -->
        <div class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 animate-spin-slow rounded-full border border-white/[0.06]" />
        <div class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-spin-slow-reverse rounded-full border border-white/[0.08]" />
      </div>

      <div class="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div class="-mt-20 sm:-mt-24">

          <!-- Carte principale -->
          <div class="hero-card relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8">
            <!-- Liseré supérieur dégradé -->
            <div class="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#F47B20] via-[#FF8A24] to-[#FFB067]" />

            <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              <!-- Logo + infos -->
              <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div class="group/logo relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-md transition-all duration-500 hover:-rotate-3 hover:border-[#F47B20]/40 hover:shadow-lg hover:shadow-orange-500/20 sm:h-24 sm:w-24">
                  <img
                    :src="job.logo"
                    :alt="job.company"
                    class="max-h-full max-w-full object-contain"
                  />
                  <span class="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/40 ring-2 ring-white">
                    <ShieldCheckIcon class="h-3 w-3" />
                  </span>
                </div>

                <div class="min-w-0 flex-1">
                  <!-- Badges -->
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-if="job.isUrgent"
                      class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shadow-red-500/30"
                    >
                      <FlameIcon class="h-2.5 w-2.5" />
                      Urgent
                    </span>
                    <span
                      v-if="job.isVerified"
                      class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm shadow-emerald-500/30"
                    >
                      <ShieldCheckIcon class="h-2.5 w-2.5" />
                      Vérifiée
                    </span>
                    <span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 ring-1 ring-slate-200">
                      {{ job.contract }}
                    </span>
                    <span class="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#F47B20] ring-1 ring-orange-100">
                      {{ job.category }}
                    </span>
                  </div>

                  <!-- Titre -->
                  <h1 class="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#101D35] sm:text-3xl lg:text-4xl">
                    {{ job.title }}
                  </h1>

                  <p class="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500 sm:text-base">
                    {{ job.company }}
                    <span class="inline-flex h-1 w-1 rounded-full bg-slate-300" />
                    <span class="text-xs font-medium text-slate-400">Publiée {{ job.postedAt.toLowerCase() }}</span>
                  </p>

                  <!-- Meta infos -->
                  <div class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-500 sm:flex sm:flex-wrap sm:items-center sm:gap-4 sm:text-sm">
                    <span class="inline-flex items-center gap-1.5">
                      <MapPinIcon class="h-4 w-4 shrink-0 text-[#F47B20]" />
                      {{ job.location }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <BanknoteIcon class="h-4 w-4 shrink-0 text-[#F47B20]" />
                      <span class="truncate">{{ job.salary }}</span>
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <ClockIcon class="h-4 w-4 shrink-0 text-[#F47B20]" />
                      {{ job.postedAt }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <UsersIcon class="h-4 w-4 shrink-0 text-[#F47B20]" />
                      {{ job.applicants }} candidats
                    </span>
                  </div>
                </div>
              </div>

              <!-- Boutons actions -->
              <div class="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                <button
                  class="group/apply relative flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DF6810] hover:shadow-xl hover:shadow-orange-500/40 focus:outline-none focus:ring-4 focus:ring-orange-200 active:translate-y-0"
                  @click="openApplyModal"
                >
                  <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/apply:translate-x-full" />
                  <SendIcon class="relative h-4 w-4 transition-transform group-hover/apply:translate-x-0.5" />
                  <span class="relative">Postuler maintenant</span>
                </button>

                <button
                  class="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20] hover:text-[#F47B20] active:translate-y-0"
                  @click="toggleFavorite"
                >
                  <HeartIcon
                    class="h-4 w-4 transition-all duration-300"
                    :class="isFavorite ? 'scale-110 fill-red-500 text-red-500' : ''"
                  />
                  {{ isFavorite ? 'Enregistrée' : 'Enregistrer' }}
                </button>

                <button
                  class="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:text-red-500 active:translate-y-0"
                  @click="openReportModal"
                >
                  <FlagIcon class="h-4 w-4" />
                  Signaler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================================================
         CONTENU PRINCIPAL
    =================================================== -->
    <section class="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div class="grid gap-8 lg:grid-cols-12 lg:gap-10">

        <!-- ==============================================
             COLONNE PRINCIPALE
        =============================================== -->
        <div class="space-y-6 lg:col-span-8">

          <!-- Description du poste -->
          <article class="reveal group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:border-[#F47B20]/30 hover:shadow-xl hover:shadow-orange-500/10 sm:p-8">
            <h2 class="flex items-center gap-3 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-md group-hover:shadow-orange-500/30">
                <FileTextIcon class="h-4 w-4" />
              </div>
              Description du poste
            </h2>
            <div class="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>{{ job.description }}</p>
            </div>
          </article>

          <!-- Missions -->
          <article class="reveal group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:border-[#F47B20]/30 hover:shadow-xl hover:shadow-orange-500/10 sm:p-8">
            <h2 class="flex items-center gap-3 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-md group-hover:shadow-orange-500/30">
                <ListChecksIcon class="h-4 w-4" />
              </div>
              Missions principales
            </h2>
            <ul class="mt-5 space-y-3">
              <li
                v-for="(mission, i) in job.missions"
                :key="i"
                class="flex items-start gap-3 text-sm leading-6 text-slate-600 transition-transform duration-300 hover:translate-x-1"
              >
                <div class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600">
                  <CheckIcon class="h-3 w-3" />
                </div>
                <span>{{ mission }}</span>
              </li>
            </ul>
          </article>

          <!-- Profil recherché -->
          <article class="reveal group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:border-[#F47B20]/30 hover:shadow-xl hover:shadow-orange-500/10 sm:p-8">
            <h2 class="flex items-center gap-3 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-md group-hover:shadow-orange-500/30">
                <UserCheckIcon class="h-4 w-4" />
              </div>
              Profil recherché
            </h2>
            <ul class="mt-5 space-y-3">
              <li
                v-for="(req, i) in job.requirements"
                :key="i"
                class="flex items-start gap-3 text-sm leading-6 text-slate-600 transition-transform duration-300 hover:translate-x-1"
              >
                <div class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-[#F47B20]">
                  <StarIcon class="h-3 w-3" />
                </div>
                <span>{{ req }}</span>
              </li>
            </ul>
          </article>

          <!-- Avantages -->
          <article class="reveal group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:border-[#F47B20]/30 hover:shadow-xl hover:shadow-orange-500/10 sm:p-8">
            <h2 class="flex items-center gap-3 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-md group-hover:shadow-orange-500/30">
                <GiftIcon class="h-4 w-4" />
              </div>
              Ce que nous offrons
            </h2>
            <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                v-for="(benefit, i) in job.benefits"
                :key="i"
                class="group/benefit flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20]/30 hover:bg-orange-50/40 hover:shadow-md"
              >
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#F47B20] shadow-sm transition-all duration-300 group-hover/benefit:scale-110 group-hover/benefit:bg-gradient-to-br group-hover/benefit:from-[#F47B20] group-hover/benefit:to-[#FF8A24] group-hover/benefit:text-white">
                  <component :is="benefit.icon" class="h-4 w-4" />
                </div>
                <span class="text-sm font-medium text-slate-700">{{ benefit.label }}</span>
              </div>
            </div>
          </article>

          <!-- CTA bas de page -->
          <div class="reveal relative overflow-hidden rounded-2xl border-2 border-[#F47B20]/30 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm sm:p-8">
            <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent blur-2xl" />

            <div class="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] text-white shadow-lg shadow-orange-500/30">
                  <SparklesIcon class="h-5 w-5" />
                </div>
                <div>
                  <h3 class="text-base font-bold text-[#101D35] sm:text-lg">
                    Cette offre vous intéresse ?
                  </h3>
                  <p class="mt-1 text-sm text-slate-600">
                    Postulez en un clic avec votre CV.
                  </p>
                </div>
              </div>
              <button
                class="group/cta relative flex min-h-12 w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DF6810] hover:shadow-xl sm:w-auto"
                @click="openApplyModal"
              >
                <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
                <SendIcon class="relative h-4 w-4 transition-transform group-hover/cta:translate-x-0.5" />
                <span class="relative">Postuler</span>
              </button>
            </div>
          </div>

          <!-- Offres similaires -->
          <article class="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div class="mb-5 flex items-center justify-between">
              <h2 class="flex items-center gap-3 text-lg font-bold text-[#101D35] sm:text-xl">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20]">
                  <BriefcaseIcon class="h-4 w-4" />
                </div>
                Offres similaires
              </h2>
              <RouterLink
                to="/jobs"
                class="group inline-flex items-center gap-1 text-sm font-semibold text-[#F47B20] transition hover:gap-2"
              >
                Voir tout
                <ArrowRightIcon class="h-4 w-4" />
              </RouterLink>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <RouterLink
                v-for="(similar, i) in similarJobs"
                :key="similar.id"
                :to="`/jobs/${similar.id}`"
                class="group/similar relative overflow-hidden rounded-xl border-2 border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#F47B20] hover:shadow-lg hover:shadow-orange-500/15"
                :style="{ transitionDelay: `${i * 60}ms` }"
              >
                <div class="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-transform duration-500 group-hover/similar:scale-x-100" />

                <div class="flex items-start gap-3">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2 transition-all duration-300 group-hover/similar:border-orange-100 group-hover/similar:bg-orange-50/50">
                    <img :src="similar.logo" :alt="similar.company" class="max-h-full max-w-full object-contain" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-[11px] font-semibold text-slate-500">{{ similar.company }}</p>
                    <h3 class="mt-0.5 truncate text-sm font-bold text-[#101D35] transition group-hover/similar:text-[#F47B20]">
                      {{ similar.title }}
                    </h3>
                    <div class="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                      <MapPinIcon class="h-3 w-3" />
                      <span>{{ similar.location }}</span>
                      <span class="text-slate-300">•</span>
                      <span>{{ similar.contract }}</span>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </article>
        </div>

        <!-- ==============================================
             SIDEBAR
        =============================================== -->
        <aside class="space-y-6 lg:col-span-4">

          <div class="sticky top-24 space-y-6">

            <!-- Carte résumé -->
            <div class="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 class="flex items-center gap-2 text-base font-bold text-[#101D35]">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                  <ListChecksIcon class="h-3.5 w-3.5" />
                </div>
                Résumé de l'offre
              </h3>

              <ul class="mt-5 space-y-4">
                <li
                  v-for="info in jobSummary"
                  :key="info.label"
                  class="group/sum flex items-start gap-3 rounded-lg p-1 transition hover:bg-orange-50/30"
                >
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20] transition-all duration-300 group-hover/sum:bg-gradient-to-br group-hover/sum:from-[#F47B20] group-hover/sum:to-[#FF8A24] group-hover/sum:text-white">
                    <component :is="info.icon" class="h-4 w-4" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {{ info.label }}
                    </p>
                    <p class="mt-0.5 text-sm font-semibold text-[#101D35]">
                      {{ info.value }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Entreprise -->
            <div class="reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 class="flex items-center gap-2 text-base font-bold text-[#101D35]">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                  <Building2Icon class="h-3.5 w-3.5" />
                </div>
                À propos de l'entreprise
              </h3>

              <div class="mt-5 flex items-center gap-3">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:scale-105 hover:border-orange-200 hover:bg-orange-50/50">
                  <img :src="job.logo" :alt="job.company" class="max-h-full max-w-full object-contain" />
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-bold text-[#101D35]">{{ job.company }}</p>
                  <p class="text-xs text-slate-500">{{ job.industry }}</p>
                </div>
              </div>

              <p class="mt-4 text-xs leading-6 text-slate-500">
                {{ job.companyBio }}
              </p>

              <div class="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Effectif
                  </p>
                  <p class="mt-0.5 text-sm font-semibold text-[#101D35]">{{ job.companySize }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Secteur
                  </p>
                  <p class="mt-0.5 text-sm font-semibold text-[#101D35]">{{ job.category }}</p>
                </div>
              </div>

              <RouterLink
                to="/jobs"
                class="group/link mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#F47B20] transition hover:gap-2"
              >
                Voir toutes ses offres
                <ArrowRightIcon class="h-3 w-3" />
              </RouterLink>
            </div>

            <!-- Recruteur -->
            <div class="reveal relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-50 to-transparent blur-2xl" />

              <div class="relative">
                <h3 class="flex items-center gap-2 text-base font-bold text-[#101D35]">
                  <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                    <UsersIcon class="h-3.5 w-3.5" />
                  </div>
                  Contact recruteur
                </h3>

                <div class="mt-4 flex items-center gap-3">
                  <div class="relative">
                    <img
                      :src="recruiterAvatar"
                      alt="Recruteur"
                      class="h-12 w-12 rounded-full border-2 border-slate-200 object-cover"
                    />
                    <span class="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                      <span class="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-bold text-[#101D35]">{{ job.recruiter.name }}</p>
                    <p class="text-xs text-slate-500">{{ job.recruiter.role }}</p>
                  </div>
                </div>

                <div class="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                  <ShieldCheckIcon class="h-4 w-4 shrink-0 text-emerald-600" />
                  <p class="text-[11px] font-semibold text-emerald-700">
                    Recruteur vérifié par PHOENIX
                  </p>
                </div>

                <button
                  class="group/contact mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20] hover:text-[#F47B20] active:translate-y-0"
                  @click="openApplyModal"
                >
                  <MailIcon class="h-4 w-4 transition-transform group-hover/contact:scale-110" />
                  Contacter via PHOENIX
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ==================================================
         MODALE CANDIDATURE
    =================================================== -->
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showApplyModal"
        class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        @click="showApplyModal = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="showApplyModal"
        class="fixed inset-x-4 top-1/2 z-[70] mx-auto max-h-[90vh] max-w-lg -translate-y-1/2 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div class="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold text-[#101D35] sm:text-xl">
              Postuler à cette offre
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              {{ job.title }} · {{ job.company }}
            </p>
          </div>
          <button
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Fermer"
            @click="showApplyModal = false"
          >
            <XIcon class="h-4 w-4" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">
              Votre CV (PDF ou DOCX) <span class="text-red-500">*</span>
            </label>

            <div
              v-if="!cvFile"
              class="group/upload cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition-all duration-300 hover:border-[#F47B20] hover:bg-orange-50/40"
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-[#F47B20] transition-all duration-300 group-hover/upload:scale-110 group-hover/upload:bg-gradient-to-br group-hover/upload:from-[#F47B20] group-hover/upload:to-[#FF8A24] group-hover/upload:text-white group-hover/upload:shadow-lg group-hover/upload:shadow-orange-500/30">
                <UploadIcon class="h-5 w-5" />
              </div>
              <p class="mt-3 text-sm font-semibold text-[#101D35]">
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

            <div
              v-else
              class="flex items-center justify-between gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <FileTextIcon class="h-5 w-5" />
                </div>
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-emerald-800">
                    {{ cvFile.name }}
                  </p>
                  <p class="text-xs text-emerald-600">
                    {{ formatFileSize(cvFile.size) }}
                  </p>
                </div>
              </div>
              <button
                class="shrink-0 rounded-full p-2 text-emerald-600 transition hover:bg-emerald-100"
                aria-label="Supprimer le fichier"
                @click="cvFile = null"
              >
                <XIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label for="cover" class="mb-2 block text-sm font-semibold text-[#101D35]">
              Message de motivation (optionnel)
            </label>
            <textarea
              id="cover"
              v-model="coverLetter"
              rows="4"
              placeholder="Expliquez en quelques lignes pourquoi vous êtes le bon candidat..."
              class="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F47B20] focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <p v-if="applyError" class="text-xs font-semibold text-red-500">
            {{ applyError }}
          </p>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="showApplyModal = false"
          >
            Annuler
          </button>
          <button
            :disabled="isSubmittingApplication"
            class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#F47B20] text-sm font-semibold text-white transition hover:bg-[#DF6810] disabled:cursor-not-allowed disabled:opacity-60"
            @click="submitApplication"
          >
            <LoaderIcon v-if="isSubmittingApplication" class="h-4 w-4 animate-spin" />
            <SendIcon v-else class="h-4 w-4" />
            {{ isSubmittingApplication ? 'Envoi...' : 'Envoyer ma candidature' }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- ==================================================
         MODALE SIGNALER
    =================================================== -->
    <Transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showReportModal"
        class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        @click="showReportModal = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="showReportModal"
        class="fixed inset-x-4 top-1/2 z-[70] mx-auto max-w-md -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-bold text-[#101D35]">
              Signaler cette offre
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Aidez-nous à garder PHOENIX fiable pour tous.
            </p>
          </div>
          <button
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Fermer"
            @click="showReportModal = false"
          >
            <XIcon class="h-4 w-4" />
          </button>
        </div>

        <div class="space-y-2.5">
          <label
            v-for="reason in reportReasons"
            :key="reason"
            class="flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 transition-all duration-200"
            :class="
              reportReason === reason
                ? 'border-[#F47B20] bg-orange-50/50 shadow-sm'
                : 'border-slate-200 hover:border-slate-300'
            "
          >
            <input
              v-model="reportReason"
              type="radio"
              :value="reason"
              class="mt-0.5 h-4 w-4 accent-[#F47B20]"
            />
            <span class="text-sm text-slate-700">{{ reason }}</span>
          </label>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            class="flex min-h-12 flex-1 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            @click="showReportModal = false"
          >
            Annuler
          </button>
          <button
            :disabled="!reportReason"
            class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            @click="submitReport"
          >
            Envoyer le signalement
          </button>
        </div>
      </div>
    </Transition>

    <!-- ==================================================
         TOAST SUCCÈS
    =================================================== -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div
        v-if="toast.message"
        class="fixed bottom-6 left-1/2 z-[80] flex max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border-2 border-emerald-200 bg-white p-4 shadow-2xl"
      >
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircleIcon class="h-5 w-5" />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-bold text-[#101D35]">{{ toast.title }}</p>
          <p class="mt-0.5 text-xs text-slate-500">{{ toast.message }}</p>
        </div>
      </div>
    </Transition>

  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  MapPin as MapPinIcon,
  Banknote as BanknoteIcon,
  Clock as ClockIcon,
  Users as UsersIcon,
  Send as SendIcon,
  Heart as HeartIcon,
  Flag as FlagIcon,
  ChevronRight as ChevronRightIcon,
  ArrowRight as ArrowRightIcon,
  FileText as FileTextIcon,
  ListChecks as ListChecksIcon,
  Check as CheckIcon,
  UserCheck as UserCheckIcon,
  Star as StarIcon,
  Gift as GiftIcon,
  Briefcase as BriefcaseIcon,
  Building2 as Building2Icon,
  Calendar as CalendarIcon,
  Award as AwardIcon,
  ShieldCheck as ShieldCheckIcon,
  Mail as MailIcon,
  Upload as UploadIcon,
  X as XIcon,
  Loader as LoaderIcon,
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
  Laptop as LaptopIcon,
  Coffee as CoffeeIcon,
  GraduationCap as GraduationCapIcon,
  Flame as FlameIcon,
  Sparkles as SparklesIcon,
} from 'lucide-vue-next'

/* ============================================================
 * IMAGES
 * ============================================================ */
import orangeLogo from '@/assets/images/orange.png'
import sanlamLogo from '@/assets/images/sanlam.jpg'
import nestleLogo from '@/assets/images/nestle.png'
import companyCover from '@/assets/images/abidjan.jpg'
import recruiterAvatar from '@/assets/images/avatar.jpg'

/* ============================================================
 * OFFRE
 * ============================================================ */
const job = {
  id: 1,
  company: "Orange Côte d'Ivoire",
  logo: orangeLogo,
  title: 'Développeur Full Stack',
  location: 'Abidjan',
  contract: 'CDI',
  category: 'Informatique & Télécoms',
  salary: '500 000 - 1 000 000 FCFA',
  postedAt: 'Il y a 2 jours',
  applicants: 47,
  isUrgent: true,
  isVerified: true,
  industry: 'Télécommunications',
  companySize: '1 000+ employés',
  companyBio:
    "Orange Côte d'Ivoire est un opérateur de télécommunications majeur, engagé dans le développement du numérique et de l'innovation en Afrique de l'Ouest.",
  description:
    "Nous recherchons un Développeur Full Stack passionné pour rejoindre notre équipe Digital. Vous participerez à la conception et au développement d'applications web modernes destinées à nos millions d'utilisateurs en Côte d'Ivoire.",
  missions: [
    'Concevoir et développer des applications web performantes (Vue.js / Node.js)',
    'Collaborer avec les équipes design, produit et backend',
    'Assurer la qualité du code (tests, revues, documentation)',
    "Optimiser les performances et l'accessibilité des interfaces",
    "Participer à l'amélioration continue de nos pratiques",
  ],
  requirements: [
    'Bac+3 minimum en informatique ou équivalent',
    "3+ ans d'expérience en développement web",
    'Maîtrise de Vue.js, TypeScript et Tailwind CSS',
    'Connaissance de Node.js et des API REST',
    "Bon niveau de français et d'anglais technique",
    "Esprit d'équipe et autonomie",
  ],
  benefits: [
    { icon: LaptopIcon, label: 'Matériel fourni' },
    { icon: CoffeeIcon, label: 'Tickets repas' },
    { icon: GraduationCapIcon, label: 'Formations continues' },
    { icon: HomeIcon, label: 'Télétravail partiel' },
    { icon: AwardIcon, label: 'Bonus annuel' },
    { icon: UsersIcon, label: 'Mutuelle santé' },
  ],
  recruiter: {
    name: 'Mariam Konaté',
    role: 'Talent Acquisition Manager',
  },
}

const similarJobs = [
  {
    id: 2,
    company: 'Sanlam Vie CI',
    logo: sanlamLogo,
    title: 'Conseiller Commercial',
    location: 'Abidjan',
    contract: 'CDI',
  },
  {
    id: 3,
    company: "Nestlé Côte d'Ivoire",
    logo: nestleLogo,
    title: 'Responsable Qualité',
    location: 'Yopougon',
    contract: 'CDI',
  },
]

const jobSummary = computed(() => [
  { icon: BriefcaseIcon, label: 'Type de contrat', value: job.contract },
  { icon: MapPinIcon, label: 'Localisation', value: `${job.location}, CI` },
  { icon: BanknoteIcon, label: 'Salaire', value: job.salary },
  { icon: Building2Icon, label: 'Secteur', value: job.category },
  { icon: CalendarIcon, label: 'Publiée', value: job.postedAt },
  { icon: UsersIcon, label: 'Candidats', value: `${job.applicants} postulants` },
])

/* ============================================================
 * ÉTAT UI
 * ============================================================ */
const isFavorite = ref(false)
const showApplyModal = ref(false)
const showReportModal = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  showToast(
    isFavorite.value ? 'Offre enregistrée' : 'Offre retirée',
    isFavorite.value
      ? 'Retrouvez-la dans vos favoris.'
      : 'Vous ne la suivez plus.',
  )
}

/* ============================================================
 * CANDIDATURE
 * ============================================================ */
const fileInput = ref<HTMLInputElement | null>(null)
const cvFile = ref<File | null>(null)
const coverLetter = ref('')
const isSubmittingApplication = ref(false)
const applyError = ref('')

const openApplyModal = () => {
  showApplyModal.value = true
  applyError.value = ''
}

const triggerFileInput = () => fileInput.value?.click()

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) validateAndSetFile(file)
}

const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files?.[0]
  if (file) validateAndSetFile(file)
}

const validateAndSetFile = (file: File) => {
  applyError.value = ''
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  if (!validTypes.includes(file.type)) {
    applyError.value = 'Format non supporté. Utilisez PDF ou DOCX.'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    applyError.value = 'Le fichier ne doit pas dépasser 5 Mo.'
    return
  }
  cvFile.value = file
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / 1024 / 1024).toFixed(1)} Mo`
}

const submitApplication = async () => {
  applyError.value = ''
  if (!cvFile.value) {
    applyError.value = 'Veuillez joindre votre CV.'
    return
  }

  isSubmittingApplication.value = true
  try {
    await new Promise((r) => setTimeout(r, 1200))
    showApplyModal.value = false
    cvFile.value = null
    coverLetter.value = ''
    showToast('Candidature envoyée !', 'Vous recevrez une réponse sous peu.')
  } catch {
    applyError.value = 'Une erreur est survenue. Réessayez.'
  } finally {
    isSubmittingApplication.value = false
  }
}

/* ============================================================
 * SIGNALEMENT
 * ============================================================ */
const reportReason = ref('')
const reportReasons = [
  'Offre frauduleuse ou suspecte',
  'Demande de paiement',
  'Informations trompeuses',
  'Offre expirée',
  'Contenu inapproprié',
  'Autre',
]

const openReportModal = () => {
  showReportModal.value = true
  reportReason.value = ''
}

const submitReport = () => {
  showReportModal.value = false
  showToast('Signalement envoyé', 'Merci, notre équipe va vérifier.')
}

/* ============================================================
 * TOAST
 * ============================================================ */
const toast = reactive({ title: '', message: '' })

const showToast = (title: string, message: string) => {
  toast.title = title
  toast.message = message
  setTimeout(() => {
    toast.title = ''
    toast.message = ''
  }, 4000)
}

/* ============================================================
 * OBSERVER REVEAL
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
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
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
@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 50s linear infinite;
}
.animate-spin-slow-reverse {
  animation: spin-slow 70s linear infinite reverse;
}

/* ============================================================
   CARTE PRINCIPALE HERO
============================================================ */
.hero-card {
  animation: heroCardEnter 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes heroCardEnter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================================
   REVEAL AU SCROLL
============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
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
  .hero-card {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>