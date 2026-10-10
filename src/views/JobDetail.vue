<template>
  <main class="min-h-screen bg-[#F8FAFC] text-slate-900">

    <!-- ==================================================
         FIL D'ARIANE
    =================================================== -->
    <div class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 text-xs sm:px-8 lg:px-10">
        <RouterLink to="/" class="whitespace-nowrap text-slate-500 transition hover:text-[#F47B20]">
          Accueil
        </RouterLink>
        <ChevronRightIcon class="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <RouterLink to="/jobs" class="whitespace-nowrap text-slate-500 transition hover:text-[#F47B20]">
          Offres d'emploi
        </RouterLink>
        <ChevronRightIcon class="h-3.5 w-3.5 shrink-0 text-slate-400" />
        <span class="truncate font-semibold text-[#101D35]">{{ job.title }}</span>
      </div>
    </div>

    <!-- ==================================================
         HEADER DE L'OFFRE
    =================================================== -->
    <section class="bg-white">
      <!-- Bannière entreprise -->
      <div class="relative h-40 w-full overflow-hidden bg-[#101D35] sm:h-52 lg:h-64">
        <img
          :src="companyCover"
          alt="Bannière entreprise"
          class="h-full w-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#101D35] via-[#101D35]/40 to-transparent" />
      </div>

      <div class="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div class="-mt-16 sm:-mt-20">

          <!-- Carte principale -->
          <div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              <!-- Logo + infos -->
              <div class="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-md sm:h-24 sm:w-24">
                  <img
                    :src="job.logo"
                    :alt="job.company"
                    class="max-h-full max-w-full object-contain"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <!-- Badges -->
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-if="job.isUrgent"
                      class="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase text-red-700"
                    >
                      Urgent
                    </span>
                    <span
                      v-if="job.isVerified"
                      class="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700"
                    >
                      ✓ Vérifiée
                    </span>
                    <span class="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700">
                      {{ job.contract }}
                    </span>
                    <span class="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#F47B20]">
                      {{ job.category }}
                    </span>
                  </div>

                  <!-- Titre -->
                  <h1 class="mt-4 text-2xl font-bold leading-tight text-[#101D35] sm:text-3xl lg:text-4xl">
                    {{ job.title }}
                  </h1>

                  <p class="mt-2 text-sm font-semibold text-slate-500 sm:text-base">
                    {{ job.company }}
                  </p>

                  <!-- Meta infos -->
                  <div class="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 sm:text-sm">
                    <span class="inline-flex items-center gap-1.5">
                      <MapPinIcon class="h-4 w-4 text-[#F47B20]" />
                      {{ job.location }}, Côte d'Ivoire
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <BanknoteIcon class="h-4 w-4 text-[#F47B20]" />
                      {{ job.salary }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <ClockIcon class="h-4 w-4 text-[#F47B20]" />
                      {{ job.postedAt }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <UsersIcon class="h-4 w-4 text-[#F47B20]" />
                      {{ job.applicants }} candidats
                    </span>
                  </div>
                </div>
              </div>

              <!-- Boutons actions -->
              <div class="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                <button
                  class="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] focus:outline-none focus:ring-4 focus:ring-orange-200"
                  @click="openApplyModal"
                >
                  <SendIcon class="h-4 w-4" />
                  Postuler maintenant
                </button>

                <button
                  class="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20]"
                  @click="toggleFavorite"
                >
                  <HeartIcon
                    class="h-4 w-4 transition"
                    :class="isFavorite ? 'fill-red-500 text-red-500' : ''"
                  />
                  {{ isFavorite ? 'Enregistrée' : 'Enregistrer' }}
                </button>

                <button
                  class="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-500"
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
        <div class="space-y-8 lg:col-span-8">

          <!-- Description du poste -->
          <article class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 class="flex items-center gap-2 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <FileTextIcon class="h-4 w-4" />
              </div>
              Description du poste
            </h2>
            <div class="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <p>{{ job.description }}</p>
            </div>
          </article>

          <!-- Missions -->
          <article class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 class="flex items-center gap-2 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <ListChecksIcon class="h-4 w-4" />
              </div>
              Missions principales
            </h2>
            <ul class="mt-5 space-y-3">
              <li
                v-for="(mission, i) in job.missions"
                :key="i"
                class="flex items-start gap-3 text-sm leading-6 text-slate-600"
              >
                <div class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckIcon class="h-3 w-3" />
                </div>
                <span>{{ mission }}</span>
              </li>
            </ul>
          </article>

          <!-- Profil recherché -->
          <article class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 class="flex items-center gap-2 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <UserCheckIcon class="h-4 w-4" />
              </div>
              Profil recherché
            </h2>
            <ul class="mt-5 space-y-3">
              <li
                v-for="(req, i) in job.requirements"
                :key="i"
                class="flex items-start gap-3 text-sm leading-6 text-slate-600"
              >
                <div class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#F47B20]">
                  <StarIcon class="h-3 w-3" />
                </div>
                <span>{{ req }}</span>
              </li>
            </ul>
          </article>

          <!-- Avantages -->
          <article class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 class="flex items-center gap-2 text-lg font-bold text-[#101D35] sm:text-xl">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
                <GiftIcon class="h-4 w-4" />
              </div>
              Ce que nous offrons
            </h2>
            <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                v-for="(benefit, i) in job.benefits"
                :key="i"
                class="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#F47B20] shadow-sm">
                  <component :is="benefit.icon" class="h-4 w-4" />
                </div>
                <span class="text-sm font-medium text-slate-700">{{ benefit.label }}</span>
              </div>
            </div>
          </article>

          <!-- CTA bas de page -->
          <div class="rounded-2xl border-2 border-[#F47B20]/30 bg-orange-50/60 p-6 sm:p-8">
            <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 class="text-base font-bold text-[#101D35] sm:text-lg">
                  Cette offre vous intéresse ?
                </h3>
                <p class="mt-1 text-sm text-slate-600">
                  Postulez en un clic avec votre CV.
                </p>
              </div>
              <button
                class="flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F47B20] px-6 text-sm font-semibold text-white transition hover:bg-[#DF6810] sm:w-auto"
                @click="openApplyModal"
              >
                <SendIcon class="h-4 w-4" />
                Postuler
              </button>
            </div>
          </div>

          <!-- Offres similaires -->
          <article class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div class="mb-5 flex items-center justify-between">
              <h2 class="text-lg font-bold text-[#101D35] sm:text-xl">
                Offres similaires
              </h2>
              <RouterLink
                to="/jobs"
                class="inline-flex items-center gap-1 text-sm font-semibold text-[#F47B20] hover:underline"
              >
                Voir tout
                <ArrowRightIcon class="h-4 w-4" />
              </RouterLink>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <RouterLink
                v-for="similar in similarJobs"
                :key="similar.id"
                :to="`/jobs/${similar.id}`"
                class="group rounded-xl border-2 border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-[#F47B20] hover:shadow-lg"
              >
                <div class="flex items-start gap-3">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-2">
                    <img :src="similar.logo" :alt="similar.company" class="max-h-full max-w-full object-contain" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="text-[11px] font-semibold text-slate-500">{{ similar.company }}</p>
                    <h3 class="mt-0.5 truncate text-sm font-bold text-[#101D35] group-hover:text-[#F47B20]">
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

          <!-- Résumé de l'offre -->
          <div class="sticky top-24 space-y-6">

            <!-- Carte résumé -->
            <div class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
              <h3 class="text-base font-bold text-[#101D35]">
                Résumé de l'offre
              </h3>

              <ul class="mt-5 space-y-4">
                <li
                  v-for="info in jobSummary"
                  :key="info.label"
                  class="flex items-start gap-3"
                >
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#F47B20]">
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
            <div class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
              <h3 class="text-base font-bold text-[#101D35]">
                À propos de l'entreprise
              </h3>

              <div class="mt-5 flex items-center gap-3">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2">
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
                class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#F47B20] hover:underline"
              >
                Voir toutes ses offres
                <ArrowRightIcon class="h-3 w-3" />
              </RouterLink>
            </div>

            <!-- Recruteur -->
            <div class="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm">
              <h3 class="text-base font-bold text-[#101D35]">
                Contact recruteur
              </h3>

              <div class="mt-4 flex items-center gap-3">
                <img
                  :src="recruiterAvatar"
                  alt="Recruteur"
                  class="h-12 w-12 rounded-full border-2 border-slate-200 object-cover"
                />
                <div class="min-w-0">
                  <p class="text-sm font-bold text-[#101D35]">{{ job.recruiter.name }}</p>
                  <p class="text-xs text-slate-500">{{ job.recruiter.role }}</p>
                </div>
              </div>

              <div class="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2">
                <ShieldCheckIcon class="h-4 w-4 shrink-0 text-emerald-600" />
                <p class="text-[11px] font-semibold text-emerald-700">
                  Recruteur vérifié par PHENIX
                </p>
              </div>

              <button
                class="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-[#F47B20] hover:text-[#F47B20]"
                @click="openApplyModal"
              >
                <MailIcon class="h-4 w-4" />
                Contacter via PHENIX
              </button>
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
        class="fixed inset-0 z-[60] bg-black/50"
        @click="showApplyModal = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showApplyModal"
        class="fixed inset-x-4 top-1/2 z-[70] mx-auto max-w-lg -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
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

        <!-- Upload CV -->
        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-semibold text-[#101D35]">
              Votre CV (PDF ou DOCX) <span class="text-red-500">*</span>
            </label>

            <div
              v-if="!cvFile"
              class="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-[#F47B20] hover:bg-orange-50/40"
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-[#F47B20]">
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

            <!-- Fichier sélectionné -->
            <div
              v-else
              class="flex items-center justify-between gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4"
            >
              <div class="flex items-center gap-3 min-w-0">
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

          <!-- Message (optionnel) -->
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

          <!-- Erreur -->
          <p v-if="applyError" class="text-xs font-semibold text-red-500">
            {{ applyError }}
          </p>
        </div>

        <!-- Actions -->
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
        class="fixed inset-0 z-[60] bg-black/50"
        @click="showReportModal = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
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
              Aidez-nous à garder PHENIX fiable pour tous.
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

        <div class="space-y-3">
          <label
            v-for="reason in reportReasons"
            :key="reason"
            class="flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 transition"
            :class="
              reportReason === reason
                ? 'border-[#F47B20] bg-orange-50/50'
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
import { computed, reactive, ref } from 'vue'
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
} from 'lucide-vue-next'

/* ============================================================
 * IMAGES IMPORTÉES DANS LE SCRIPT
 * ============================================================ */
import orangeLogo from '@/assets/images/orange.png'
import sanlamLogo from '@/assets/images/sanlam.jpg'
import nestleLogo from '@/assets/images/nestle.png'
import companyCover from '@/assets/images/abidjan.jpg'
import recruiterAvatar from '@/assets/images/avatar.jpg'

/* ============================================================
 * OFFRE (mock — à remplacer par appel API GET /jobs/:id)
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
    'Optimiser les performances et l\'accessibilité des interfaces',
    'Participer à l\'amélioration continue de nos pratiques',
  ],
  requirements: [
    'Bac+3 minimum en informatique ou équivalent',
    '3+ ans d\'expérience en développement web',
    'Maîtrise de Vue.js, TypeScript et Tailwind CSS',
    'Connaissance de Node.js et des API REST',
    'Bon niveau de français et d\'anglais technique',
    'Esprit d\'équipe et autonomie',
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

/* ============================================================
 * OFFRES SIMILAIRES (mock)
 * ============================================================ */
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

/* ============================================================
 * RÉSUMÉ DE L'OFFRE
 * ============================================================ */
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
      : 'Vous ne la suivez plus.'
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

const triggerFileInput = () => {
  fileInput.value?.click()
}

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
    // 🔌 À REMPLACER par POST /applications
    await new Promise((r) => setTimeout(r, 1200))
    showApplyModal.value = false
    cvFile.value = null
    coverLetter.value = ''
    showToast(
      'Candidature envoyée !',
      'Vous recevrez une réponse sous peu.'
    )
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
</script>