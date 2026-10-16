<template>
  <div class="flex h-full flex-col">
    <!-- Logo -->
    <div class="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
      <RouterLink to="/" class="flex items-center gap-2">
        <img :src="logo" alt="PHOENIX" class="h-9 w-auto" />
      </RouterLink>
      <button
        v-if="closeMobile"
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
        aria-label="Fermer"
        @click="closeMobile"
      >
        <XIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Profil -->
    <div class="border-b border-slate-100 px-6 py-5">
      <div class="flex items-center gap-3">
        <div class="relative">
          <img
            :src="user.avatar"
            :alt="user.fullName"
            class="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md ring-2 ring-orange-100"
          />
          <span class="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
            <span class="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-bold text-[#101D35]">{{ user.fullName }}</p>
          <p class="truncate text-xs text-slate-500">{{ user.title }}</p>
        </div>
      </div>

      <!-- Progression profil -->
      <div class="mt-4">
        <div class="mb-1.5 flex items-center justify-between text-[11px]">
          <span class="font-semibold text-slate-500">Profil complété</span>
          <span class="font-bold text-[#F47B20]">{{ user.profileCompletion }}%</span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-gradient-to-r from-[#F47B20] to-[#FF8A24] transition-all duration-500"
            :style="{ width: user.profileCompletion + '%' }"
          />
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <p class="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Menu principal
      </p>
      <ul class="space-y-1">
        <li v-for="item in menu" :key="item.to">
          <RouterLink
            :to="item.to"
            class="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200"
            :class="
              isActive(item.to)
                ? 'bg-gradient-to-r from-orange-50 to-orange-50/40 text-[#F47B20] shadow-sm'
                : 'hover:bg-slate-50 hover:text-[#101D35]'
            "
            @click="closeMobile?.()"
          >
            <span class="flex items-center gap-3">
              <component
                :is="item.icon"
                class="h-4 w-4 shrink-0"
                :class="isActive(item.to) ? 'text-[#F47B20]' : 'text-slate-400 group-hover:text-[#101D35]'"
              />
              {{ item.label }}
            </span>
            <span
              v-if="item.badge"
              class="rounded-full bg-[#F47B20] px-2 py-0.5 text-[10px] font-bold text-white"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <p class="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Autres
      </p>
      <ul class="space-y-1">
        <li>
          <RouterLink
            to="/jobs"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#101D35]"
            @click="closeMobile?.()"
          >
            <BriefcaseIcon class="h-4 w-4 text-slate-400 group-hover:text-[#101D35]" />
            Parcourir les offres
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/contact"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#101D35]"
            @click="closeMobile?.()"
          >
            <HelpCircleIcon class="h-4 w-4 text-slate-400 group-hover:text-[#101D35]" />
            Aide & support
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer avec déconnexion -->
    <div class="shrink-0 border-t border-slate-100 p-4">
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-500"
        @click="handleLogout"
      >
        <LogOutIcon class="h-4 w-4" />
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
import { useCandidateStore } from '@/stores/candidate'

defineProps<{
  closeMobile?: () => void
}>()

const route = useRoute()
const router = useRouter()
const candidateStore = useCandidateStore()

const user = computed(() => candidateStore.user)

const menu = computed(() => [
  { label: 'Tableau de bord', to: '/candidate/dashboard', icon: DashboardIcon },
  { label: 'Mon profil', to: '/candidate/profile', icon: UserIcon },
  { label: 'Mon CV', to: '/candidate/resume', icon: FileTextIcon },
  {
    label: 'Mes candidatures',
    to: '/candidate/applications',
    icon: SendIcon,
    badge: candidateStore.applicationsCount || undefined,
  },
  {
    label: 'Mes favoris',
    to: '/candidate/favorites',
    icon: HeartIcon,
    badge: candidateStore.favoritesCount || undefined,
  },
  {
    label: 'Alertes emploi',
    to: '/candidate/alerts',
    icon: BellIcon,
    badge: candidateStore.alertsCount || undefined,
  },
  { label: 'Paramètres', to: '/candidate/settings', icon: SettingsIcon },
])

const isActive = (path: string) =>
  route.path === path || route.path.startsWith(path + '/')

const handleLogout = () => {
  candidateStore.logout()
  router.push('/login')
}
</script>