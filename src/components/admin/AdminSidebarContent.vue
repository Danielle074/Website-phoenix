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

    <!-- Badge admin -->
    <div class="border-b border-slate-100 px-6 py-5">
      <div class="flex items-center gap-3">
        <div class="relative">
          <img
            :src="user.avatar"
            :alt="user.fullName"
            class="h-12 w-12 rounded-xl border-2 border-white object-cover shadow-md ring-2 ring-red-100"
          />
          <span class="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-white">
            <ShieldIcon class="h-2.5 w-2.5 text-white" />
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-bold text-[#101D35]">{{ user.fullName }}</p>
          <p class="truncate text-xs font-semibold text-red-500">Super administrateur</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <p class="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Administration
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
              class="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <p class="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Raccourcis
      </p>
      <ul class="space-y-1">
        <li>
          <RouterLink
            to="/jobs"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#101D35]"
            @click="closeMobile?.()"
          >
            <ExternalLinkIcon class="h-4 w-4 text-slate-400 group-hover:text-[#101D35]" />
            Voir le site public
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
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
  FileCheck as FileCheckIcon,
  Users as UsersIcon,
  BarChart3 as BarChartIcon,
  ShieldCheck as ShieldIcon,
  LogOut as LogOutIcon,
  X as XIcon,
  ExternalLink as ExternalLinkIcon,
} from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'
import { useAdminStore } from '@/stores/admin'

defineProps<{
  closeMobile?: () => void
}>()

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()

const user = computed(() => adminStore.user)

const menu = computed(() => [
  { label: 'Tableau de bord', to: '/admin/dashboard', icon: DashboardIcon },
  {
    label: 'Modération des offres',
    to: '/admin/moderation',
    icon: FileCheckIcon,
    badge: adminStore.pendingCount || undefined,
  },
  { label: 'Utilisateurs', to: '/admin/users', icon: UsersIcon },
  { label: 'Statistiques', to: '/admin/stats', icon: BarChartIcon },
])

const isActive = (path: string) =>
  route.path === path || route.path.startsWith(path + '/')

const handleLogout = () => {
  adminStore.logout()
  router.push('/login')
}
</script>