<template>
  <div class="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

    <div class="mb-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
        <UsersIcon class="h-3 w-3" />
        Utilisateurs
      </div>
      <h1 class="mt-3 text-2xl font-bold tracking-tight text-[#101D35] sm:text-3xl">
        Gestion des utilisateurs
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Consultez, modérez et gérez les comptes de la plateforme.
      </p>
    </div>

    <!-- Barre recherche + filtres -->
    <div class="reveal mb-6 rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-sm sm:flex sm:items-center sm:gap-3">
      <div class="flex flex-1 items-center gap-3 px-3 py-2">
        <SearchIcon class="h-5 w-5 shrink-0 text-[#F47B20]" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Rechercher un utilisateur..."
          class="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <div class="flex flex-1 items-center gap-3 border-t border-slate-100 px-3 py-2 sm:border-l sm:border-t-0 sm:border-slate-200">
        <FilterIcon class="h-5 w-5 shrink-0 text-[#F47B20]" />
        <select v-model="filterRole" class="w-full bg-transparent text-sm outline-none">
          <option value="">Tous les rôles</option>
          <option value="candidate">Candidats</option>
          <option value="employer">Employeurs</option>
          <option value="admin">Administrateurs</option>
        </select>
      </div>
    </div>

    <!-- Tableau -->
    <div v-if="filtered.length" class="reveal overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] text-sm">
          <thead class="border-b border-slate-100 bg-slate-50/50">
            <tr>
              <th class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Utilisateur</th>
              <th class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Rôle</th>
              <th class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Statut</th>
              <th class="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">Localisation</th>
              <th class="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="user in filtered"
              :key="user.id"
              class="group transition hover:bg-orange-50/20"
            >
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="user.avatar"
                    :alt="user.fullName"
                    class="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm ring-2 ring-slate-100"
                  />
                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold text-[#101D35]">{{ user.fullName }}</p>
                    <p class="truncate text-xs text-slate-500">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  :class="roleBadge(user.role)"
                >
                  <component :is="roleIcon(user.role)" class="h-3 w-3" />
                  {{ roleLabel(user.role) }}
                </span>
              </td>
              <td class="px-5 py-4">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  :class="statusBadge(user.status)"
                >
                  {{ statusLabel(user.status) }}
                </span>
              </td>
              <td class="px-5 py-4 text-xs text-slate-500">
                {{ user.location }}
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    class="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-[#F47B20] hover:text-[#F47B20]"
                    aria-label="Voir"
                  >
                    <EyeIcon class="h-3.5 w-3.5" />
                  </button>
                  <button
                    v-if="user.status === 'active'"
                    type="button"
                    class="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
                    aria-label="Suspendre"
                    @click="suspend(user.id)"
                  >
                    <PauseIcon class="h-3.5 w-3.5" />
                  </button>
                  <button
                    v-else
                    type="button"
                    class="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                    aria-label="Réactiver"
                    @click="activate(user.id)"
                  >
                    <PlayIcon class="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    class="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    aria-label="Bannir"
                    @click="ban(user.id)"
                  >
                    <BanIcon class="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Vide -->
    <div v-else class="reveal rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <UsersIcon class="h-8 w-8" />
      </div>
      <h3 class="mt-4 text-lg font-bold text-[#101D35]">Aucun utilisateur trouvé</h3>
      <p class="mt-2 text-sm text-slate-500">Essayez avec d'autres critères.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Users as UsersIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Eye as EyeIcon,
  Pause as PauseIcon,
  Play as PlayIcon,
  Ban as BanIcon,
  User as UserIcon,
  Building2 as BuildingIcon,
  ShieldCheck as ShieldRoleIcon,
} from 'lucide-vue-next'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const users = computed(() => adminStore.users)

const searchQuery = ref('')
const filterRole = ref('')

const filtered = computed(() => {
  let r = users.value
  if (filterRole.value) r = r.filter((u) => u.role === filterRole.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    r = r.filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    )
  }
  return r
})

const roleLabel = (r: string) =>
  ({ candidate: 'Candidat', employer: 'Employeur', admin: 'Admin' })[r] ?? r

const roleBadge = (r: string) =>
  ({
    candidate: 'bg-blue-100 text-blue-700',
    employer: 'bg-purple-100 text-purple-700',
    admin: 'bg-red-100 text-red-700',
  })[r] ?? 'bg-slate-100 text-slate-600'

const roleIcon = (r: string) =>
  ({
    candidate: UserIcon,
    employer: BuildingIcon,
    admin: ShieldRoleIcon,
  })[r] ?? UserIcon

const statusLabel = (s: string) =>
  ({ active: 'Actif', suspended: 'Suspendu', banned: 'Banni' })[s] ?? s

const statusBadge = (s: string) =>
  ({
    active: 'bg-emerald-100 text-emerald-700',
    suspended: 'bg-amber-100 text-amber-700',
    banned: 'bg-red-100 text-red-700',
  })[s] ?? 'bg-slate-100 text-slate-600'

const suspend = (id: number) => {
  const u = adminStore.users.find((x) => x.id === id)
  if (u) u.status = 'suspended'
}
const activate = (id: number) => {
  const u = adminStore.users.find((x) => x.id === id)
  if (u) u.status = 'active'
}
const ban = (id: number) => {
  if (confirm('Bannir cet utilisateur ?')) {
    const u = adminStore.users.find((x) => x.id === id)
    if (u) u.status = 'banned'
  }
}

let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible')
        observer?.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.is-visible { opacity: 1; transform: translateY(0); }
</style>