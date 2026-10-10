<script setup lang="ts">
import { X } from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'

defineProps<{
  open: boolean
  links: { label: string; to: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const close = () => emit('update:open', false)
</script>

<template>
  <!-- OVERLAY -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[60] bg-black/50 md:hidden"
      @click="close"
    />
  </Transition>

  <!-- PANNEAU LATÉRAL -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="open"
      class="fixed top-0 right-0 z-[70] h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col md:hidden"
      role="dialog"
      aria-label="Menu de navigation"
    >
      <!-- HEADER DU MENU -->
      <div class="flex items-center justify-between px-5 h-16 border-b border-gray-100">
        <img :src="logo" alt="PHENIX" class="h-9 w-auto object-contain" />
        <button
          class="p-2 rounded-md text-[#153765] hover:bg-gray-100 transition-colors"
          aria-label="Fermer le menu"
          @click="close"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- LIENS -->
      <nav class="flex-1 overflow-y-auto px-5 py-6">
        <ul class="flex flex-col gap-1">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="block px-4 py-3 rounded-md text-base font-medium text-[#1d2849] hover:bg-[#F9FAFB] hover:text-[#ed6732] transition-colors"
              active-class="bg-[#F9FAFB] text-[#ed6732]"
              @click="close"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- CTA EN BAS -->
      <div class="px-5 py-5 border-t border-gray-100 flex flex-col gap-3">
        <RouterLink
          to="/login"
          class="w-full py-3 text-center text-base font-medium text-[#153765] border border-[#153765] rounded-md hover:bg-[#153765] hover:text-white transition-all min-h-[48px] flex items-center justify-center"
          @click="close"
        >
          Connexion
        </RouterLink>
        <RouterLink
          to="/register"
          class="w-full py-3 text-center text-base font-semibold text-white bg-[#ed6732] rounded-md hover:bg-[#f28b3e] transition-all min-h-[48px] flex items-center justify-center shadow-sm"
          @click="close"
        >
          S'inscrire
        </RouterLink>
      </div>
    </aside>
  </Transition>
</template>