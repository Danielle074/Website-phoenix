<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'

const props = defineProps<{
  open: boolean
  links: { label: string; to: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const close = () => emit('update:open', false)

// Empêche le scroll du body quand le menu est ouvert
watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <!-- OVERLAY — fond sombre + flou pour bien isoler le menu -->
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
      class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
      @click="close"
    />
  </Transition>

  <!-- PANNEAU LATÉRAL — fond 100% opaque -->
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
      class="fixed top-0 right-0 z-[70] flex h-full w-[92%] max-w-sm flex-col bg-white shadow-2xl md:hidden"
      style="background-color: #ffffff;"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      <!-- HEADER DU MENU -->
      <div class="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-5">
        <img :src="logo" alt="PHOENIX" class="h-9 w-auto object-contain" />
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg text-[#153765] transition-colors hover:bg-slate-100 active:bg-slate-200"
          aria-label="Fermer le menu"
          @click="close"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <!-- LIENS -->
      <nav class="flex-1 overflow-y-auto bg-white px-5 py-6">
        <p class="mb-4 px-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
          Navigation
        </p>
        <ul class="flex flex-col gap-2">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="block rounded-xl border border-slate-100 bg-white px-5 py-4 text-base font-semibold text-[#1d2849] transition-colors hover:border-[#ed6732]/30 hover:bg-[#F9FAFB] hover:text-[#ed6732] active:bg-slate-100"
              active-class="border-[#ed6732]/40 bg-[#FFF5EF] text-[#ed6732]"
              @click="close"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- CTA EN BAS -->
      <div class="shrink-0 border-t border-slate-100 bg-white px-5 py-5">
        <div class="flex flex-col gap-3">
          <RouterLink
            to="/login"
            class="flex min-h-[48px] w-full items-center justify-center rounded-xl border border-[#153765] py-3 text-base font-medium text-[#153765] transition-all hover:bg-[#153765] hover:text-white active:scale-[0.98]"
            @click="close"
          >
            Connexion
          </RouterLink>
          <RouterLink
            to="/register"
            class="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#ed6732] py-3 text-base font-semibold text-white shadow-sm shadow-orange-500/20 transition-all hover:bg-[#f28b3e] active:scale-[0.98]"
            @click="close"
          >
            S'inscrire
          </RouterLink>
        </div>
      </div>
    </aside>
  </Transition>
</template>