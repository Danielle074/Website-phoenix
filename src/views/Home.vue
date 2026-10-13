<template>
  <main class="min-h-screen overflow-x-hidden bg-white text-slate-900">
    <!-- ============================================================
         HERO — SLIDER CINÉMATOGRAPHIQUE
    ============================================================= -->
    <section
      ref="heroRef"
      class="relative h-[100svh] min-h-[600px] overflow-hidden bg-[#0A1524] sm:min-h-[680px] lg:h-screen lg:min-h-[720px]"
    >
      <!-- Slides -->
      <div class="absolute inset-0">
        <transition-group name="slide-fade">
          <div
            v-for="(slide, index) in heroSlides"
            v-show="index === currentSlideIndex"
            :key="slide.image"
            class="absolute inset-0"
          >
            <div
              class="absolute inset-0 animate-kenburns"
              :style="{ backgroundImage: `url(${slide.image})` }"
              style="background-size: cover; background-position: center;"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-[#050B16]/90 via-[#0A1524]/70 to-[#050B16]/95 sm:bg-gradient-to-r sm:from-[#050B16] sm:via-[#0A1524]/85 sm:to-[#0A1524]/30" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#050B16] via-transparent to-[#050B16]/40" />
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(244,123,32,0.12),transparent_50%)]" />
          </div>
        </transition-group>
      </div>

      <!-- Grille décorative (masquée sur mobile pour alléger) -->
      <div
        class="pointer-events-none absolute inset-0 hidden opacity-[0.04] sm:block"
        style="
          background-image:
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px);
          background-size: 80px 80px;
        "
      />

      <!-- Cercles lumineux -->
      <div class="pointer-events-none absolute -right-40 -top-40 hidden h-[600px] w-[600px] animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent blur-3xl sm:block" />
      <div class="pointer-events-none absolute -bottom-40 -left-40 hidden h-[500px] w-[500px] animate-pulse-slow rounded-full bg-gradient-to-tr from-[#FF8A24]/15 to-transparent blur-3xl sm:block" style="animation-delay: 2s" />

      <!-- Cercles bordures -->
      <div class="pointer-events-none absolute -right-32 top-10 hidden h-[420px] w-[420px] rounded-full border border-white/[0.07] lg:block" />
      <div class="pointer-events-none absolute -right-16 top-24 hidden h-[280px] w-[280px] rounded-full border border-white/[0.1] lg:block" />
      <div class="pointer-events-none absolute right-40 top-60 hidden h-2 w-2 animate-twinkle rounded-full bg-[#FF8A24] lg:block" />
      <div class="pointer-events-none absolute right-96 top-32 hidden h-1.5 w-1.5 animate-twinkle rounded-full bg-white/60 lg:block" style="animation-delay: 1s" />
      <div class="pointer-events-none absolute right-64 top-96 hidden h-1 w-1 animate-twinkle rounded-full bg-[#FF8A24] lg:block" style="animation-delay: 2s" />

      <!-- Contenu principal -->
      <div class="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pb-40 pt-24 sm:px-8 sm:pb-32 lg:px-10 lg:pb-40 lg:pt-0">
        <div class="max-w-3xl">
          <!-- Badge -->
          <div class="hero-enter hero-enter-1 mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-xl sm:mb-8 sm:px-4 sm:py-2 sm:text-xs">
            
            <span class="tracking-wide">La plateforme de l'emploi en Côte d'Ivoire</span>
          </div>

          <!-- Titre -->
          <div class="relative min-h-[180px] sm:min-h-[220px] lg:min-h-[300px]">
            <transition name="title-swap" mode="out-in">
              <div :key="currentSlideIndex">
                <h1 class="text-[28px] font-bold leading-[1.15] tracking-tight text-white xs:text-3xl sm:text-5xl lg:text-7xl">
                  <span class="block overflow-hidden">
                    <span class="title-line inline-block">{{ heroSlides[currentSlideIndex].title }}</span>
                  </span>
                  <span class="mt-1.5 block overflow-hidden sm:mt-2">
                    <span class="title-line title-line-delay inline-block bg-gradient-to-r from-[#FF8A24] via-[#FFB067] to-[#FF8A24] bg-clip-text text-transparent">
                      {{ heroSlides[currentSlideIndex].highlight }}
                    </span>
                  </span>
                </h1>

                <p class="mt-4 max-w-xl text-sm leading-6 text-slate-300/90 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg">
                  {{ heroSlides[currentSlideIndex].description }}
                </p>
              </div>
            </transition>
          </div>

          <!-- Recherche -->
          <form
            class="hero-enter hero-enter-3 group mt-7 rounded-2xl border border-white/10 bg-white/[0.07] p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl transition focus-within:border-[#F47B20]/50 focus-within:bg-white/[0.1] sm:mt-10 sm:flex sm:items-center"
            @submit.prevent="handleSearch"
          >
            <div class="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.04] sm:border-r sm:border-white/10">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F47B20]/15 text-[#FF8A24]">
                <SearchIcon class="h-4 w-4" />
              </div>
              <div class="min-w-0 flex-1">
                <label for="job-search" class="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Poste recherché
                </label>
                <input
                  id="job-search"
                  v-model="searchQuery"
                  type="search"
                  placeholder="Ex. Développeur Front-End"
                  class="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            <div class="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.04]">
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F47B20]/15 text-[#FF8A24]">
                <MapPinIcon class="h-4 w-4" />
              </div>
              <div class="min-w-0 flex-1">
                <label for="job-location" class="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Localisation
                </label>
                <select
                  id="job-location"
                  v-model="selectedLocation"
                  class="w-full cursor-pointer bg-transparent text-sm text-white outline-none [&>option]:bg-[#0A1524] [&>option]:text-white"
                >
                  <option value="">Toute la Côte d'Ivoire</option>
                  <option value="abidjan">Abidjan</option>
                  <option value="yopougon">Yopougon</option>
                  <option value="bouake">Bouaké</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              class="group/btn relative mt-2 flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] focus:outline-none focus:ring-4 focus:ring-orange-500/30 sm:mt-0 sm:w-auto"
            >
              <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <span class="relative">Rechercher</span>
              <ArrowRightIcon class="relative h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          </form>

          <!-- Tendances -->
          <div class="hero-enter hero-enter-4 mt-5 flex flex-wrap items-center gap-2 text-xs sm:mt-7">
            <span class="mr-1 text-slate-400">Tendances :</span>
            <RouterLink
              v-for="tag in popularTags"
              :key="tag"
              :to="{ path: '/jobs', query: { q: tag } }"
              class="group/tag relative overflow-hidden rounded-full border border-white/15 px-3 py-1.5 text-slate-200 backdrop-blur-sm transition hover:border-[#FF8A24] hover:text-white sm:px-3.5"
            >
              <span class="absolute inset-0 -translate-y-full bg-[#F47B20] transition-transform duration-300 group-hover/tag:translate-y-0" />
              <span class="relative">{{ tag }}</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Statistiques flottantes (desktop uniquement) -->
      <div class="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 space-y-3 lg:right-10 lg:block">
        <div
          v-for="(stat, i) in heroFloatingStats"
          :key="stat.label"
          class="hero-enter flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-xl transition hover:border-[#F47B20]/40 hover:bg-white/[0.08]"
          :style="{ animationDelay: `${0.8 + i * 0.15}s` }"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F47B20]/15 text-[#FF8A24]">
            <component :is="stat.icon" class="h-5 w-5" />
          </div>
          <div>
            <p class="text-base font-bold text-white">{{ stat.value }}</p>
            <p class="text-[11px] text-slate-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Contrôles bas -->
      <div class="absolute inset-x-0 bottom-0 z-10">
        <div class="border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div class="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
            <!-- Bénéfices -->
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-8">
              <div
                v-for="item in heroBenefits"
                :key="item.title"
                class="flex items-center gap-3 sm:justify-center sm:text-left"
              >
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[#FF8A24] sm:h-10 sm:w-10">
                  <component :is="item.icon" class="h-4 w-4" />
                </div>
                <div class="min-w-0">
                  <p class="text-[11px] font-semibold text-white sm:text-xs lg:text-sm">{{ item.title }}</p>
                  <p class="mt-0.5 text-[10px] text-slate-400 sm:text-[11px]">{{ item.description }}</p>
                </div>
              </div>
            </div>

            <!-- Points slider -->
            <div class="flex items-center justify-center gap-2">
              <button
                v-for="(_, index) in heroSlides"
                :key="index"
                type="button"
                :aria-label="`Afficher l'image ${index + 1}`"
                :aria-pressed="index === currentSlideIndex"
                class="h-1.5 rounded-full transition-all duration-500"
                :class="index === currentSlideIndex ? 'w-10 bg-[#FF8A24]' : 'w-4 bg-white/30 hover:bg-white/60'"
                @click="goToSlide(index)"
              />
            </div>
          </div>

          <div class="h-0.5 w-full bg-white/5">
            <div
              class="h-full bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-[width] duration-[6000ms] ease-linear"
              :style="{ width: progress + '%' }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         LOGOS PARTENAIRES
    ============================================================= -->
    <section class="border-b border-slate-100 bg-white py-8 sm:py-10">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p class="reveal mb-5 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 sm:mb-6 sm:text-[11px]">
          Ils recrutent sur PHOENIX
        </p>
        <div class="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div class="flex animate-marquee gap-10 sm:gap-16">
            <div v-for="n in 2" :key="n" class="flex shrink-0 items-center gap-10 sm:gap-16">
              <img v-for="logo in partnerLogos" :key="`${n}-${logo.alt}`" :src="logo.src" :alt="logo.alt" class="h-7 w-auto opacity-40 grayscale transition hover:opacity-70 hover:grayscale-0 sm:h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         AVANTAGES
    ============================================================= -->
    <section class="relative overflow-hidden border-b border-slate-100 bg-white">
      <div class="pointer-events-none absolute -right-40 top-20 hidden h-96 w-96 rounded-full bg-gradient-to-br from-orange-100/60 to-transparent blur-3xl sm:block" />
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div class="mb-10 grid gap-6 sm:mb-14 sm:gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div class="reveal max-w-2xl">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F47B20] sm:text-[11px]">
              <SparklesIcon class="h-3 w-3" />
              Pourquoi PHOENIX ?
            </div>
            <h2 class="text-[26px] font-bold leading-tight tracking-tight text-[#101D35] sm:text-4xl lg:text-5xl">
              Une recherche d'emploi
              <span class="text-[#F47B20]">plus simple.</span>
            </h2>
            <p class="mt-4 text-sm leading-7 text-slate-500 sm:mt-5 sm:text-base">
              Tous les outils essentiels pour vous rapprocher de votre prochain objectif professionnel, pensés pour être clairs, rapides et efficaces.
            </p>
          </div>
          <RouterLink to="/jobs" class="reveal group hidden items-center gap-2 text-sm font-semibold text-[#101D35] transition hover:text-[#F47B20] lg:inline-flex">
            En savoir plus
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <article
            v-for="(feature, i) in features"
            :key="feature.title"
            class="reveal group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[#F47B20]/30 hover:shadow-2xl hover:shadow-orange-500/10 sm:p-7"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <div class="absolute -right-16 -top-16 hidden h-32 w-32 rounded-full bg-gradient-to-br from-orange-100 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block" />
            <div class="relative">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F47B20] shadow-sm transition-all duration-500 group-hover:from-[#F47B20] group-hover:to-[#FF8A24] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30 sm:h-14 sm:w-14">
                <component :is="feature.icon" class="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div class="mt-5 flex items-center gap-2 sm:mt-6">
                <span class="text-[10px] font-bold tracking-[0.15em] text-slate-300">0{{ i + 1 }}</span>
                <span class="h-px flex-1 bg-slate-100" />
              </div>
              <h3 class="mt-3.5 text-base font-bold text-[#101D35] sm:mt-4 sm:text-lg">{{ feature.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-slate-500 sm:mt-2.5">{{ feature.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         OFFRES POPULAIRES
    ============================================================= -->
    <section class="relative bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div class="reveal mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div class="max-w-2xl">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F47B20] shadow-sm sm:text-[11px]">
              <BriefcaseIcon class="h-3 w-3" />
              Les opportunités
            </div>
            <h2 class="text-[26px] font-bold leading-tight tracking-tight text-[#101D35] sm:text-4xl lg:text-5xl">
              Des offres à découvrir.
            </h2>
            <p class="mt-3 text-sm leading-7 text-slate-500 sm:mt-4 sm:text-base">
              Explorez une sélection d'opportunités professionnelles issues d'entreprises de confiance.
            </p>
          </div>
          <RouterLink to="/jobs" class="group inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#101D35] shadow-sm transition hover:border-[#F47B20] hover:text-[#F47B20] sm:self-end">
            Toutes les offres
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          <article
            v-for="(job, i) in jobs"
            :key="job.id"
            class="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[#F47B20]/40 hover:shadow-2xl hover:shadow-orange-500/10 sm:p-6"
            :style="{ transitionDelay: `${i * 70}ms` }"
          >
            <div class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-transform duration-500 group-hover:scale-x-100" />

            <div class="flex items-start justify-between">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-sm transition group-hover:border-orange-100 group-hover:bg-orange-50/50 sm:h-14 sm:w-14 sm:p-2.5">
                <img :src="job.logo" :alt="`Logo ${job.company}`" class="max-h-full max-w-full object-contain" />
              </div>
              <span class="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100 sm:px-3 sm:text-[11px]">
                {{ job.contract }}
              </span>
            </div>

            <p class="mt-4 text-xs font-semibold tracking-wide text-slate-500 sm:mt-5">{{ job.company }}</p>
            <h3 class="mt-1.5 min-h-12 text-base font-bold leading-6 text-[#101D35] transition group-hover:text-[#F47B20] sm:mt-2">
              {{ job.title }}
            </h3>

            <div class="mt-4 space-y-2.5 border-t border-slate-100 pt-4 sm:mt-5 sm:space-y-3 sm:pt-5">
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <MapPinIcon class="h-4 w-4 shrink-0 text-slate-400" />
                <span class="truncate">{{ job.location }}</span>
              </div>
              <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <BanknoteIcon class="h-4 w-4 shrink-0 text-slate-400" />
                <span class="truncate">{{ job.salary }}</span>
              </div>
            </div>

            <RouterLink
              :to="`/jobs/${job.id}`"
              class="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-[#101D35] transition-all duration-300 hover:border-[#F47B20] hover:bg-[#F47B20] hover:text-white sm:mt-6"
            >
              Consulter l'offre
              <ArrowUpRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </RouterLink>
          </article>
        </div>

        <div class="reveal mt-10 text-center sm:mt-12">
          <RouterLink
            to="/jobs"
            class="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#101D35] px-6 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#1D3457] hover:shadow-xl sm:px-7"
          >
            Découvrir toutes les opportunités
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CATÉGORIES
    ============================================================= -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div class="reveal mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F47B20] sm:text-[11px]">
              <GridIcon class="h-3 w-3" />
              Explorez les métiers
            </div>
            <h2 class="text-[26px] font-bold leading-tight tracking-tight text-[#101D35] sm:text-4xl lg:text-5xl">
              Quel secteur vous correspond ?
            </h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:mt-4 sm:text-base">
              Trouvez les opportunités adaptées à votre domaine et à vos ambitions.
            </p>
          </div>
          <RouterLink to="/categories" class="group inline-flex items-center gap-2 text-sm font-semibold text-[#101D35] transition hover:text-[#F47B20]">
            Toutes les catégories
            <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RouterLink
            v-for="(category, i) in categories"
            :key="category.title"
            :to="{ path: '/jobs', query: { category: category.title } }"
            class="reveal group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F47B20]/40 hover:shadow-xl hover:shadow-orange-500/10 sm:gap-4 sm:p-5"
            :style="{ transitionDelay: `${i * 40}ms` }"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-50/0 transition-all duration-300 group-hover:from-orange-50/50 group-hover:to-transparent" />
            <div class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-[#F47B20] group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/30 sm:h-12 sm:w-12">
              <component :is="category.icon" class="h-5 w-5" />
            </div>
            <div class="relative min-w-0 flex-1">
              <h3 class="text-xs font-bold leading-5 text-[#101D35] sm:text-sm">{{ category.title }}</h3>
              <span class="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-400 transition group-hover:text-[#F47B20]">
                Explorer
                <ArrowRightIcon class="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CHIFFRES CLÉS
    ============================================================= -->
    <section class="relative overflow-hidden bg-[#0A1524]">
      <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 40px 40px;" />
      <div class="pointer-events-none absolute -left-40 top-0 hidden h-[500px] w-[500px] animate-pulse-slow rounded-full bg-gradient-to-br from-[#F47B20]/15 to-transparent blur-3xl sm:block" />
      <div class="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] animate-pulse-slow rounded-full bg-gradient-to-tl from-[#FF8A24]/10 to-transparent blur-3xl sm:block" style="animation-delay: 3s" />

      <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div class="reveal">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FF9A42] backdrop-blur sm:text-[11px]">
              <TargetIcon class="h-3 w-3" />
              Notre ambition
            </div>
            <h2 class="max-w-lg text-[26px] font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Rapprocher les talents des opportunités.
            </h2>
            <p class="mt-5 max-w-xl text-sm leading-7 text-slate-300/90 sm:mt-6 sm:text-base sm:leading-8">
              PHOENIX Jobs & Carrières ambitionne de simplifier la rencontre entre les candidats et les recruteurs, en rendant les opportunités professionnelles plus accessibles, plus claires et plus justes.
            </p>
            <div class="mt-7 flex flex-col gap-3 xs:flex-row sm:mt-8">
              <RouterLink to="/jobs" class="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#DF6810]">
                Trouver un emploi
                <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </RouterLink>
              <RouterLink to="/companies" class="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
                Espace recruteurs
                <ArrowUpRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </RouterLink>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <article
              v-for="(stat, i) in stats"
              :key="stat.label"
              class="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#F47B20]/30 hover:bg-white/[0.07] sm:p-6"
              :style="{ transitionDelay: `${i * 80}ms` }"
            >
              <div class="absolute -right-12 -top-12 hidden h-24 w-24 rounded-full bg-gradient-to-br from-[#F47B20]/20 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:block" />
              <div class="relative">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F47B20]/15 text-[#FF9A42] sm:h-11 sm:w-11">
                  <component :is="stat.icon" class="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <p class="mt-4 text-2xl font-bold tracking-tight text-white sm:mt-6 sm:text-3xl lg:text-4xl">
                  {{ stat.value }}
                </p>
                <p class="mt-1.5 text-[11px] leading-5 text-slate-400 sm:mt-2 sm:text-xs lg:text-sm">{{ stat.label }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         PROCESSUS
    ============================================================= -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div class="reveal mb-12 text-center sm:mb-14">
          <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F47B20] sm:text-[11px]">
            <RouteIcon class="h-3 w-3" />
            Le parcours
          </div>
          <h2 class="mx-auto max-w-2xl text-[26px] font-bold leading-tight tracking-tight text-[#101D35] sm:text-4xl lg:text-5xl">
            Trois étapes vers votre prochain emploi.
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:mt-4 sm:text-base">
            Un processus clair pour vous concentrer sur l'essentiel : votre carrière.
          </p>
        </div>

        <div class="relative grid gap-5 sm:gap-6 lg:grid-cols-3">
          <div class="pointer-events-none absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent lg:block" />

          <article
            v-for="(step, i) in steps"
            :key="step.title"
            class="reveal group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#F47B20]/30 hover:shadow-2xl hover:shadow-orange-500/10 sm:p-7"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <div class="absolute -top-5 left-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F47B20] to-[#FF8A24] text-base font-bold text-white shadow-lg shadow-orange-500/30 sm:-top-6 sm:left-7 sm:h-12 sm:w-12 sm:text-lg">
              {{ i + 1 }}
            </div>
            <div class="mt-5 sm:mt-6">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-[#F47B20]/10 group-hover:text-[#F47B20]">
                <component :is="step.icon" class="h-5 w-5" />
              </div>
              <h3 class="mt-4 text-base font-bold text-[#101D35] sm:mt-5 sm:text-lg">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-slate-500 sm:mt-2.5">{{ step.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         TÉMOIGNAGE
    ============================================================= -->
    <section class="bg-[#F8FAFC]">
      <div class="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div class="reveal">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F47B20] shadow-sm sm:text-[11px]">
              <HeartIcon class="h-3 w-3" />
              Ils nous font confiance
            </div>
            <h2 class="max-w-lg text-[26px] font-bold leading-tight tracking-tight text-[#101D35] sm:text-4xl lg:text-5xl">
              Chaque parcours professionnel mérite une opportunité.
            </h2>
            <p class="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:mt-6 sm:text-base sm:leading-8">
              L'accès à la bonne opportunité peut changer une carrière. Notre objectif est de rendre cette recherche plus claire, plus accessible et plus efficace pour tous.
            </p>

            <div class="mt-7 flex items-center gap-6 sm:mt-8">
              <div>
                <p class="text-2xl font-bold text-[#101D35] sm:text-3xl">98%</p>
                <p class="mt-1 text-[11px] text-slate-500 sm:text-xs">Satisfaction candidats</p>
              </div>
              <div class="h-10 w-px bg-slate-200" />
              <div>
                <p class="text-2xl font-bold text-[#101D35] sm:text-3xl">4.9/5</p>
                <p class="mt-1 text-[11px] text-slate-500 sm:text-xs">Note moyenne</p>
              </div>
            </div>
          </div>

          <article class="reveal relative">
            <div class="absolute -inset-4 hidden rounded-[2rem] bg-gradient-to-br from-orange-100/50 to-transparent blur-2xl sm:block" />
            <div class="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
              <QuoteIcon class="h-8 w-8 text-[#F47B20] sm:h-10 sm:w-10" />
              <p class="mt-5 text-base leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-9">
                {{ testimonial.message }}
              </p>
              <div class="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 sm:mt-8 sm:gap-4 sm:pt-7">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-orange-100 sm:h-14 sm:w-14" />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-bold text-[#101D35]">{{ testimonial.name }}</p>
                  <p class="mt-0.5 truncate text-xs text-slate-500 sm:mt-1">{{ testimonial.role }}</p>
                </div>
                <div class="hidden gap-0.5 text-amber-400 xs:flex" aria-label="5 étoiles sur 5">
                  <StarIcon v-for="star in 5" :key="star" class="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CTA FINAL
    ============================================================= -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <div class="reveal relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#F47B20] via-[#F47B20] to-[#DF6810] px-6 py-10 shadow-2xl shadow-orange-500/30 sm:rounded-[2rem] sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        <div class="pointer-events-none absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;" />
        <div class="pointer-events-none absolute -right-24 -top-32 hidden h-96 w-96 rounded-full border border-white/15 sm:block" />
        <div class="pointer-events-none absolute -right-10 -top-20 hidden h-64 w-64 rounded-full border border-white/15 sm:block" />
        <div class="pointer-events-none absolute -bottom-32 -left-24 hidden h-80 w-80 rounded-full border border-white/10 sm:block" />

        <div class="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div class="max-w-2xl">
            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 sm:text-xs">Le prochain chapitre vous appartient</p>
            <h2 class="mt-3 text-2xl font-bold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
              Prêt à faire évoluer votre carrière ?
            </h2>
            <p class="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:mt-5 sm:text-base">
              Découvrez de nouvelles opportunités et faites le premier pas vers votre prochain objectif professionnel.
            </p>
          </div>
          <div class="flex flex-col gap-3 xs:flex-row lg:flex-col">
            <RouterLink to="/jobs" class="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#101D35] shadow-lg transition hover:bg-orange-50 sm:px-7">
              Explorer les offres
              <ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </RouterLink>
            <RouterLink to="/register" class="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-7">
              Créer un compte
              <UserPlusIcon class="h-4 w-4" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

import {
  Search as SearchIcon,
  MapPin as MapPinIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Briefcase as BriefcaseIcon,
  UserCheck as UserCheckIcon,
  ShieldCheck as ShieldCheckIcon,
  Smartphone as SmartphoneIcon,
  Zap as ZapIcon,
  Monitor as MonitorIcon,
  Landmark as LandmarkIcon,
  Factory as FactoryIcon,
  Activity as ActivityIcon,
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Truck as TruckIcon,
  Users as UsersIcon,
  Building2 as Building2Icon,
  Quote as QuoteIcon,
  Star as StarIcon,
  Banknote as BanknoteIcon,
  Sparkles as SparklesIcon,
  Target as TargetIcon,
  Grid as GridIcon,
  Route as RouteIcon,
  Heart as HeartIcon,
  UserPlus as UserPlusIcon,
  FileText as FileTextIcon,
  Send as SendIcon,
  Handshake as HandshakeIcon,
} from 'lucide-vue-next'

import slide1 from '@/assets/images/feature-1.jpg'
import slide2 from '@/assets/images/feature-2.jpg'
import slide3 from '@/assets/images/feature-3.jpg'

import orangeLogo from '@/assets/images/orange.png'
import sanlamLogo from '@/assets/images/sanlam.jpg'
import nestleLogo from '@/assets/images/nestle.png'
import sodeciLogo from '@/assets/images/sodeci.png'

import userAvatar from '@/assets/images/avatar.jpg'

const router = useRouter()

/* -------------------- RECHERCHE -------------------- */
const searchQuery = ref('')
const selectedLocation = ref('')

const handleSearch = () => {
  const query = searchQuery.value.trim()
  router.push({
    path: '/jobs',
    query: {
      ...(query ? { q: query } : {}),
      ...(selectedLocation.value ? { location: selectedLocation.value } : {}),
    },
  })
}

/* -------------------- SLIDER HERO -------------------- */
const heroSlides = [
  {
    image: slide1,
    alt: 'Professionnelle dans un environnement de travail',
    title: 'Votre prochain emploi',
    highlight: 'commence ici.',
    description:
      'Découvrez des opportunités professionnelles, valorisez vos compétences et donnez une nouvelle dimension à votre carrière avec PHOENIX Jobs & Carrières.',
  },
  {
    image: slide2,
    alt: 'Candidat préparant son avenir professionnel',
    title: 'Le talent que vous êtes',
    highlight: 'mérite sa place.',
    description:
      'Explorez des offres sélectionnées, préparez vos candidatures et avancez avec confiance vers votre prochain objectif professionnel.',
  },
  {
    image: slide3,
    alt: 'Équipe dans un environnement professionnel',
    title: 'Construisez la carrière',
    highlight: 'qui vous ressemble.',
    description:
      'Des outils clairs, des opportunités réelles : PHOENIX vous accompagne pour transformer vos ambitions en réussites concrètes.',
  },
]

const currentSlideIndex = ref(0)
const progress = ref(0)

let timer: ReturnType<typeof setInterval> | undefined
let progressTimer: ReturnType<typeof setInterval> | undefined

const startTimers = () => {
  stopTimers()
  progress.value = 0
  progressTimer = setInterval(() => {
    progress.value = Math.min(progress.value + 100 / 60, 100)
  }, 100)
  timer = setInterval(() => nextSlide(), 6000)
}

const stopTimers = () => {
  if (timer) clearInterval(timer)
  if (progressTimer) clearInterval(progressTimer)
  timer = undefined
  progressTimer = undefined
}

const nextSlide = () => {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % heroSlides.length
  startTimers()
}
const goToSlide = (index: number) => {
  currentSlideIndex.value = index
  startTimers()
}

/* -------------------- OBSERVER REVEAL -------------------- */
let observer: IntersectionObserver | undefined

onMounted(() => {
  startTimers()

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
  stopTimers()
  observer?.disconnect()
})

/* -------------------- DONNÉES -------------------- */
const popularTags = ['Développeur', 'Comptable', 'Infirmier', 'Commercial']

const heroBenefits = [
  { icon: ShieldCheckIcon, title: 'Recherche sécurisée', description: 'Pensée pour les candidats' },
  { icon: ZapIcon, title: 'Navigation simple', description: 'Accès rapide aux offres' },
  { icon: SmartphoneIcon, title: 'Accessible partout', description: 'Mobile, tablette, ordinateur' },
]

const heroFloatingStats = [
  { icon: BriefcaseIcon, value: '50K+', label: 'Offres actives' },
  { icon: Building2Icon, value: '15K+', label: 'Entreprises' },
  { icon: UsersIcon, value: '120K+', label: 'Candidats' },
]

const partnerLogos = [
  { src: orangeLogo, alt: "Orange Côte d'Ivoire" },
  { src: sanlamLogo, alt: 'Sanlam Vie' },
  { src: nestleLogo, alt: 'Nestlé' },
  { src: sodeciLogo, alt: 'SODECI' },
]

const features = [
  {
    icon: SearchIcon,
    title: 'Offres à explorer',
    description: 'Parcourez les opportunités selon votre profil et vos objectifs.',
  },
  {
    icon: UserCheckIcon,
    title: 'Candidature simplifiée',
    description: 'Retrouvez les informations essentielles pour préparer vos candidatures.',
  },
  {
    icon: ZapIcon,
    title: 'Recherche intuitive',
    description: 'Utilisez les filtres et les catégories pour affiner votre recherche.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Expérience sécurisée',
    description: 'La protection des informations des candidats reste une priorité.',
  },
]

const jobs = ref([
  {
    id: 1,
    company: "Orange Côte d'Ivoire",
    logo: orangeLogo,
    title: 'Développeur Full Stack',
    location: 'Abidjan, Côte d’Ivoire',
    contract: 'CDI',
    salary: '500 000 - 1 000 000 FCFA',
  },
  {
    id: 2,
    company: 'Sanlam Vie Côte d’Ivoire',
    logo: sanlamLogo,
    title: 'Conseiller Commercial',
    location: 'Abidjan, Côte d’Ivoire',
    contract: 'CDI',
    salary: '300 000 - 600 000 FCFA',
  },
  {
    id: 3,
    company: 'Nestlé Côte d’Ivoire',
    logo: nestleLogo,
    title: 'Responsable Qualité',
    location: 'Yopougon, Abidjan',
    contract: 'CDI',
    salary: '400 000 - 800 000 FCFA',
  },
  {
    id: 4,
    company: 'SODECI',
    logo: sodeciLogo,
    title: 'Ingénieur Réseau Eau',
    location: 'Abidjan, Côte d’Ivoire',
    contract: 'CDI',
    salary: '600 000 - 1 200 000 FCFA',
  },
])

const categories = [
  { icon: MonitorIcon, title: 'Informatique & Télécoms' },
  { icon: BriefcaseIcon, title: 'Services & Conseil' },
  { icon: LandmarkIcon, title: 'Banque & Assurance' },
  { icon: FactoryIcon, title: 'Industrie & Production' },
  { icon: ActivityIcon, title: 'Santé & Social' },
  { icon: ShoppingCartIcon, title: 'Commerce & Vente' },
  { icon: HomeIcon, title: 'BTP & Immobilier' },
  { icon: TruckIcon, title: 'Transport & Logistique' },
]

const stats = [
  { icon: BriefcaseIcon, value: '50 000+', label: 'Offres d’emploi' },
  { icon: Building2Icon, value: '15 000+', label: 'Entreprises partenaires' },
  { icon: UsersIcon, value: '120 000+', label: 'Candidats inscrits' },
  { icon: UserCheckIcon, value: '98 %', label: 'Satisfaction des utilisateurs' },
]

const steps = [
  {
    icon: FileTextIcon,
    title: 'Créez votre profil',
    description: 'Renseignez vos compétences, votre parcours et vos préférences en quelques minutes.',
  },
  {
    icon: SendIcon,
    title: 'Postulez en un clic',
    description: 'Trouvez les offres qui vous correspondent et envoyez votre candidature rapidement.',
  },
  {
    icon: HandshakeIcon,
    title: 'Décrochez le poste',
    description: 'Échangez avec les recruteurs et concrétisez votre prochain objectif professionnel.',
  },
]

const testimonial = computed(() => ({
  name: 'Kouadio Amadou',
  role: 'Développeur Web · Abidjan',
  avatar: userAvatar,
  message:
    "La recherche d'un emploi demande de la méthode et de la persévérance. Une plateforme claire permet de mieux repérer les opportunités et d'organiser ses démarches.",
}))
</script>

<style scoped>
/* Breakpoint xs personnalisé pour petits mobiles */
@media (min-width: 400px) {
  .xs\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .xs\:flex-row { flex-direction: row; }
  .xs\:flex { display: flex; }
}

/* ============================================================
   TRANSITIONS SLIDER
============================================================ */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.title-swap-enter-active,
.title-swap-leave-active {
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.title-swap-enter-from {
  opacity: 0;
  transform: translateY(24px);
}
.title-swap-leave-to {
  opacity: 0;
  transform: translateY(-24px);
}

/* ============================================================
   ANIMATIONS
============================================================ */
@keyframes kenburns {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.12) translate(-1%, -1%); }
}
.animate-kenburns {
  animation: kenburns 8s ease-out forwards;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}

/* ============================================================
   ENTRÉE HERO
============================================================ */
.hero-enter {
  opacity: 0;
  transform: translateY(24px);
  animation: heroEnter 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.hero-enter-1 { animation-delay: 0.2s; }
.hero-enter-3 { animation-delay: 0.55s; }
.hero-enter-4 { animation-delay: 0.75s; }

@keyframes heroEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-line {
  transform: translateY(105%);
  animation: titleReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards;
}
.title-line-delay {
  animation-delay: 0.55s;
}
@keyframes titleReveal {
  to { transform: translateY(0); }
}

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