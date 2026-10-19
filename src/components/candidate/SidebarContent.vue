<template>
  <div class="flex h-full flex-col">
    <!-- Logo + bouton fermer sur mobile -->
    <div
      class="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6"
    >
      <RouterLink to="/" class="flex items-center gap-2">
        <img :src="logo" alt="PHOENIX" class="h-9 w-auto" />
      </RouterLink>

      <button
        v-if="closeMobile"
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-95 lg:hidden"
        aria-label="Fermer le menu"
        @click="closeMobile"
      >
        <XIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Profil candidat -->
    <div class="border-b border-slate-100 px-6 py-5">
      <div class="flex items-center gap-3">
        <div class="relative">
          <img
            :src="user.avatar || fallbackAvatar"
            :alt="user.fullName || 'Profil candidat'"
            class="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-orange-100"
          />

          <span
            v-if="user.fullName"
            class="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-bold text-[#101D35]">
            {{ user.fullName || 'Candidat' }}
          </p>
          <p class="truncate text-xs text-slate-500">
            {{ user.title || 'Espace candidat' }}
          </p>
        </div>
      </div>

      <!-- Progression du profil -->
      <div class="mt-4">
        <div class="mb-1.5 flex items-center justify-between text-[11px]">
          <span class="font-semibold text-slate-500">
            Profil complété
          </span>
          <span class="font-bold text-[#F47B20]">
            {{ user.profileCompletion }}%
          </span>
        </div>

        <div class="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-all duration-500"
            :style="{
              width: `${Math.min(100, Math.max(0, user.profileCompletion))}%`,
            }"
          />
        </div>
      </div>
    </div>

    <!-- Navigation principale -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <p
        class="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400"
      >
        Menu principal
      </p>

      <ul class="space-y-1">
        <li v-for="item in menu" :key="item.to">
          <RouterLink
            :to="item.to"
            class="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
            :class="
              isActive(item.to)
                ? 'bg-gradient-to-r from-orange-50 to-orange-50/40 text-[#F47B20] shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-[#101D35]'
            "
            @click="closeMobile?.()"
          >
            <span class="flex min-w-0 items-center gap-3">
              <component
                :is="item.icon"
                class="h-4 w-4 shrink-0"
                :class="
                  isActive(item.to)
                    ? 'text-[#F47B20]'
                    : 'text-slate-400 group-hover:text-[#101D35]'
                "
              />
              <span class="truncate">{{ item.label }}</span>
            </span>

            <span
              v-if="item.badge !== undefined && item.badge > 0"
              class="rounded-full bg-[#F47B20] px-2 py-0.5 text-[10px] font-bold text-white"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <!-- Autres liens -->
      <p
        class="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400"
      >
        Autres
      </p>

      <ul class="space-y-1">
        <li>
          <RouterLink
            to="/jobs"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#101D35]"
            @click="closeMobile?.()"
          >
            <BriefcaseIcon
              class="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#101D35]"
            />
            Parcourir les offres
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/contact"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#101D35]"
            @click="closeMobile?.()"
          >
            <HelpCircleIcon
              class="h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#101D35]"
            />
            Aide &amp; support
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Déconnexion -->
    <div class="shrink-0 border-t border-slate-100 bg-white p-4">
      <button
        type="button"
        :disabled="isLoggingOut"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        @click="handleLogout"
      >
        <LogOutIcon v-if="!isLoggingOut" class="h-4 w-4 shrink-0" />

        <span
          v-else
          class="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-slate-300 border-t-red-500"
        />

        {{ isLoggingOut ? 'Déconnexion...' : 'Se déconnecter' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import {
  LayoutDashboard as DashboardIcon,
  User as UserIcon,
  FileText as FileTextIcon,
  Send as SendIcon,
  Heart as HeartIcon,
  Bell as BellIcon,
  Settings as SettingsIcon,
  Briefcase as BriefcaseIcon,
  HelpCircle as HelpCircleIcon,
  LogOut as LogOutIcon,
  X as XIcon,
} from 'lucide-vue-next'

import logo from '@/assets/images/logophoenix.png'
import fallbackAvatar from '@/assets/images/avatar.jpg'

import { useCandidateStore } from '@/stores/candidate'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  closeMobile?: () => void
}>()

const route = useRoute()
const router = useRouter()

const candidateStore = useCandidateStore()
const authStore = useAuthStore()

const isLoggingOut = ref(false)
const closeMobile = props.closeMobile

const user = computed(() => candidateStore.user)

// Navigation du candidat
const menu = computed(() => [
  { label: 'Tableau de bord', to: '/candidate/dashboard', icon: DashboardIcon },
  { label: 'Mon profil', to: '/candidate/profile', icon: UserIcon },
  { label: 'Mon CV', to: '/candidate/resume', icon: FileTextIcon },
  { label: 'Mes candidatures', to: '/candidate/applications', icon: SendIcon, badge: candidateStore.applicationsCount },
  { label: 'Mes favoris', to: '/candidate/favorites', icon: HeartIcon, badge: candidateStore.favoritesCount },
  { label: 'Alertes emploi', to: '/candidate/alerts', icon: BellIcon, badge: candidateStore.alertsCount },
  { label: 'Paramètres', to: '/candidate/settings', icon: SettingsIcon },
])

// Gestion de la route active
const isActive = (path: string): boolean => {
  return route.path === path || route.path.startsWith(`${path}/`)
}

// Déconnexion
const handleLogout = async (): Promise<void> => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true

  // 1. Nettoyage forcé du localStorage (sécurité)
  localStorage.removeItem('phoenix_access_token')
  localStorage.removeItem('phoenix_refresh_token')

  // 2. Nettoyage des stores
  try {
    await authStore.logout()
    candidateStore.logout()
  } catch (error) {
    console.error('Erreur lors du nettoyage des stores :', error)
  }

  // 3. Fermeture de la sidebar mobile
  closeMobile?.()

  // 4. 🚀 Redirection via Vue Router
  try {
    await router.push('/login')
  } catch (error) {
    // Si le router échoue (par exemple à cause du guard), on force la redirection
    console.error('Erreur de redirection :', error)
    window.location.href = '/login'
  }
}
</script>