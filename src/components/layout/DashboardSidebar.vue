<template>
  <aside
    class="flex h-full w-72 flex-col border-r border-slate-200 bg-white"
    aria-label="Navigation du tableau de bord"
  >
    <!-- Logo -->
    <div class="flex h-16 shrink-0 items-center border-b border-slate-200 px-5">
      <RouterLink to="/" class="flex items-center gap-2">
        <img
          :src="logo"
          alt="PHENIX Jobs & Carrières"
          class="h-9 w-auto object-contain"
        />
      </RouterLink>
    </div>

    <!-- Bloc utilisateur -->
    <div class="border-b border-slate-200 px-5 py-4">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F47B20] text-sm font-bold text-white">
          {{ initials }}
        </div>
        <div class="min-w-0">
          <p class="truncate text-sm font-bold text-[#101D35]">{{ userName }}</p>
          <p class="truncate text-[11px] text-slate-500">{{ roleLabel }}</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto px-3 py-4">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.to">
          <RouterLink
            :to="item.to"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-orange-50 hover:text-[#F47B20]"
            active-class="bg-orange-50 text-[#F47B20]"
          >
            <component
              :is="item.icon"
              class="h-5 w-5 shrink-0 transition group-hover:scale-110"
            />
            <span class="truncate">{{ item.label }}</span>
            <span
              v-if="item.badge"
              class="ml-auto rounded-full bg-[#F47B20] px-2 py-0.5 text-[10px] font-bold text-white"
            >
              {{ item.badge }}
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer sidebar -->
    <div class="border-t border-slate-200 p-3">
      <RouterLink
        to="/jobs"
        class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#101D35]"
      >
        <ArrowLeftIcon class="h-5 w-5" />
        Retour au site
      </RouterLink>

      <button
        class="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
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
  User,
  FileText,
  Heart,
  Building2,
  Briefcase,
  Users,
  Settings,
  LogOut as LogOutIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'

const props = defineProps<{
  role: 'candidate' | 'employer'
  userName?: string
}>()

defineEmits<{ (e: 'logout'): void }>()

const roleLabel = computed(() =>
  props.role === 'candidate' ? 'Candidat' : 'Employeur'
)

const userName = computed(() => props.userName || 'Utilisateur PHENIX')

const initials = computed(() =>
  userName.value
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)

/* Menus contextuels selon le rôle */
const candidateMenu = [
  { label: 'Tableau de bord', to: '/candidate/dashboard', icon: LayoutDashboard },
  { label: 'Mon profil', to: '/candidate/profile', icon: User },
  { label: 'Mes candidatures', to: '/candidate/applications', icon: FileText, badge: '3' },
  { label: 'Mes favoris', to: '/candidate/favorites', icon: Heart },
  { label: 'Paramètres', to: '/candidate/settings', icon: Settings },
]

const employerMenu = [
  { label: 'Tableau de bord', to: '/employer/dashboard', icon: LayoutDashboard },
  { label: 'Mon organisation', to: '/employer/organization', icon: Building2 },
  { label: 'Mes offres', to: '/employer/jobs', icon: Briefcase, badge: '5' },
  { label: 'Candidatures reçues', to: '/employer/applications', icon: Users, badge: '12' },
  { label: 'Paramètres', to: '/employer/settings', icon: Settings },
]

const menuItems = computed(() =>
  props.role === 'candidate' ? candidateMenu : employerMenu
)
</script>