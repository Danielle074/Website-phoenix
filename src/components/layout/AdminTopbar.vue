<template>
  <header class="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
    <button
      class="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
      aria-label="Ouvrir le menu"
      @click="$emit('toggle-sidebar')"
    >
      <MenuIcon class="h-5 w-5" />
    </button>

    <div class="flex-1 lg:ml-2">
      <div class="flex items-center gap-2">
        <h1 class="truncate text-base font-bold text-[#101D35] sm:text-lg">
          {{ title }}
        </h1>
        <span class="hidden rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600 sm:inline">
          Espace Admin
        </span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <button
        class="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100"
        aria-label="Notifications"
      >
        <BellIcon class="h-5 w-5" />
        <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      </button>

      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#101D35] text-xs font-bold text-white">
        {{ initials }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Menu as MenuIcon, Bell as BellIcon } from 'lucide-vue-next'

const props = defineProps<{
  title?: string
  userName?: string
}>()

defineEmits<{ (e: 'toggle-sidebar'): void }>()

const initials = computed(() =>
  (props.userName || 'AD')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>