<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu } from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'
import MobileMenu from './MobileMenu.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Offres d\'emploi', to: '/jobs' },
  { label: 'À propos', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full transition-all duration-300"
    :class="isScrolled
      ? 'bg-white shadow-md'
      : 'bg-white/90 backdrop-blur-sm md:bg-transparent'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">

        <!-- LOGO -->
        <RouterLink to="/" class="flex items-center gap-2 shrink-0">
          <img
            :src="logo"
            alt="PHENIX Jobs & Carrières"
            class="h-9 md:h-11 w-auto object-contain"
          />
        </RouterLink>

        <!-- LIENS DESKTOP -->
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="text-sm lg:text-base font-medium text-[#1d2849] hover:text-[#ed6732] transition-colors"
              active-class="text-[#ed6732]"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- CTA DESKTOP -->
        <div class="hidden md:flex items-center gap-3">
          <RouterLink
            to="/login"
            class="px-4 py-2 text-sm lg:text-base font-medium text-[#153765] border border-[#153765] rounded-md hover:bg-[#153765] hover:text-white transition-all min-h-[44px] flex items-center"
          >
            Connexion
          </RouterLink>
          <RouterLink
            to="/register"
            class="px-4 py-2 text-sm lg:text-base font-semibold text-white bg-[#ed6732] rounded-md hover:bg-[#f28b3e] transition-all min-h-[44px] flex items-center shadow-sm"
          >
            S'inscrire
          </RouterLink>
        </div>

        <!-- BOUTON HAMBURGER MOBILE -->
        <button
          class="md:hidden p-2 rounded-md text-[#153765] hover:bg-gray-100 transition-colors"
          aria-label="Ouvrir le menu"
          @click="isMobileMenuOpen = true"
        >
          <Menu class="w-6 h-6" />
        </button>
      </div>
    </nav>

    <!-- MENU MOBILE -->
    <MobileMenu v-model:open="isMobileMenuOpen" :links="links" />
  </header>
</template>