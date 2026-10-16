<template>
  <div class="min-h-screen bg-[#F8FAFC]">
    <!-- Barre mobile -->
    <div class="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
      <RouterLink to="/" class="flex items-center gap-2">
        <img :src="logo" alt="PHOENIX" class="h-8 w-auto" />
      </RouterLink>
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-[#F47B20] hover:text-[#F47B20]"
        aria-label="Ouvrir le menu"
        @click="sidebarOpen = true"
      >
        <MenuIcon class="h-5 w-5" />
      </button>
    </div>

    <div class="mx-auto flex max-w-[1600px]">
      <!-- Sidebar desktop -->
      <aside class="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
        <EmployerSidebarContent />
      </aside>

      <!-- Overlay mobile -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="sidebarOpen"
          class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
          @click="sidebarOpen = false"
        />
      </Transition>

      <!-- Sidebar mobile -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <aside
          v-if="sidebarOpen"
          class="fixed left-0 top-0 z-[70] h-screen w-80 max-w-[85%] overflow-y-auto bg-white shadow-2xl lg:hidden"
        >
          <EmployerSidebarContent :close-mobile="() => (sidebarOpen = false)" />
        </aside>
      </Transition>

      <!-- Contenu -->
      <main class="min-w-0 flex-1">
        <RouterView v-slot="{ Component }">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
            mode="out-in"
          >
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Menu as MenuIcon } from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'
import EmployerSidebarContent from '@/components/employer/EmployerSidebarContent.vue'

const sidebarOpen = ref(false)
</script>