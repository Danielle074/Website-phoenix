<template>
  <div class="flex min-h-screen bg-[#F8FAFC]">

    <!-- ==================================================
         SIDEBAR DESKTOP
    =================================================== -->
    <div class="hidden lg:block">
      <div class="sticky top-0 h-screen">
        <DashboardSidebar :role="role" :user-name="userName" @logout="handleLogout" />
      </div>
    </div>

    <!-- ==================================================
         SIDEBAR MOBILE — DRAWER
    =================================================== -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-[60] bg-black/50 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="sidebarOpen"
        class="fixed inset-y-0 left-0 z-[70] lg:hidden"
      >
        <DashboardSidebar :role="role" :user-name="userName" @logout="handleLogout" />
      </div>
    </Transition>

    <!-- ==================================================
         CONTENU PRINCIPAL
    =================================================== -->
    <div class="flex min-w-0 flex-1 flex-col">
      <DashboardTopbar
        :title="pageTitle"
        :user-name="userName"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import DashboardTopbar from '@/components/layout/DashboardTopbar.vue'

/* ============================================================
 * ÉTAT
 * ============================================================ */
const sidebarOpen = ref(false)
const route = useRoute()
const router = useRouter()

/* ============================================================
 * RÔLE (mock — à brancher sur Pinia plus tard)
 * ============================================================ */
const role = computed<'candidate' | 'employer'>(() => {
  const stored = localStorage.getItem('phenix_role')
  return stored === 'employer' ? 'employer' : 'candidate'
})

const userName = computed(() => 'Kouassi Yao')

/* ============================================================
 * TITRE DYNAMIQUE
 * ============================================================ */
const pageTitle = computed(() => {
  const path = route.path
  if (path.includes('profile')) return 'Mon profil'
  if (path.includes('applications')) {
    return role.value === 'candidate' ? 'Mes candidatures' : 'Candidatures reçues'
  }
  if (path.includes('favorites')) return 'Mes favoris'
  if (path.includes('organization')) return 'Mon organisation'
  if (path.includes('jobs')) return 'Mes offres'
  if (path.includes('settings')) return 'Paramètres'
  return 'Tableau de bord'
})

/* ============================================================
 * DÉCONNEXION
 * ============================================================ */
const handleLogout = () => {
  localStorage.removeItem('phenix_token')
  localStorage.removeItem('phenix_role')
  router.push('/login')
}
</script>