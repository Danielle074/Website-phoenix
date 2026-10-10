<template>
  <aside
    class="flex h-full w-72 flex-col border-r border-slate-800 bg-[#101D35] text-white"
    aria-label="Navigation administrateur"
  >
    <!-- Logo -->
    <div class="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
      <RouterLink to="/" class="flex items-center gap-2">
        <img
          :src="logo"
          alt="PHENIX"
          class="h-9 w-auto object-contain brightness-0 invert"
        />
        <span class="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-300">
          Admin
        </span>
      </RouterLink>
    </div>

    <!-- Bloc admin -->
    <div class="border-b border-white/10 px-5 py-4">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F47B20] text-sm font-bold text-white">
          {{ initials }}
        </div>
        <div class="min-w-0">
          <p class="truncate text-sm font-bold">{{ userName }}</p>
          <p class="truncate text-[11px] text-slate-400">{{ roleLabel }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.to">
          <RouterLink
            :to="item.to"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            active-class="bg-[#F47B20] text-white shadow-lg shadow-orange-500/20"
          >
            <component :is="item.icon" class="h-5 w-5 shrink-0" />
            <span class="truncate">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="border-t border-white/10 p-3">
      <RouterLink
        to="/"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        <ArrowLeftIcon class="h-5 w-5" />
        Retour au site
      </RouterLink>

      <button
        class="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
        @click="$emit('logout')"
      >
        <LogOutIcon class="h-5 w-5" />
        Se déconnecter
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  LayoutDashboard,
  ShieldCheck,
  Flag,
  Users,
  BarChart3,
  Settings,
  FileText,
  LogOut as LogOutIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'

const props = defineProps<{
  role?: 'admin' | 'superadmin'
  userName?: string
}>()

defineEmits<{ (e: 'logout'): void }>()

const userName = computed(() => props.userName || 'Administrateur')
const roleLabel = computed(() =>
  props.role === 'superadmin' ? 'Super Administrateur' : 'Administrateur'
)
const initials = computed(() =>
  userName.value
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)

const menuItems = [
  { label: 'Tableau de bord', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Vérifications', to: '/admin/verifications', icon: ShieldCheck, badge: '8' },
  { label: 'Modération', to: '/admin/moderation', icon: Flag, badge: '3' },
  { label: 'Utilisateurs', to: '/admin/users', icon: Users },
  { label: 'Offres', to: '/admin/jobs', icon: FileText },
  { label: 'Statistiques', to: '/admin/stats', icon: BarChart3 },
  { label: 'Paramètres', to: '/admin/settings', icon: Settings },
]
</script>