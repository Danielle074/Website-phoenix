<script setup lang="ts">
import { Linkedin, Facebook, Twitter, Mail, Phone } from 'lucide-vue-next'
import logo from '@/assets/images/logophoenix.png'

const year = new Date().getFullYear()

const navigation = [
  { label: 'Accueil', to: '/' },
  { label: 'Offres d\'emploi', to: '/jobs' },
  { label: 'À propos', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]

const legal = [
  { label: 'Conditions d\'utilisation', to: '/terms' },
  { label: 'Politique de confidentialité', to: '/privacy' },
  { label: 'Mentions légales', to: '/legal' },
]

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
]
</script>

<template>
  <footer class="bg-[#153765] text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

      <!-- GRILLE PRINCIPALE -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        <!-- LOGO + DESCRIPTION -->
        <div class="sm:col-span-2 lg:col-span-1">
          <img
            :src="logo"
            alt="PHENIX Jobs & Carrières"
            class="h-10 md:h-12 w-auto object-contain mb-4 brightness-0 invert"
          />
          <p class="text-sm text-white/80 leading-relaxed max-w-xs">
            La plateforme de référence pour trouver un emploi fiable en Côte d'Ivoire.
            Des offres vérifiées, des candidatures gratuites.
          </p>

          <!-- RÉSEAUX SOCIAUX -->
          <div class="flex items-center gap-3 mt-6">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.label"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#ed6732] transition-colors"
            >
              <component :is="s.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- NAVIGATION -->
        <div>
          <h3 class="text-base font-semibold mb-4">Navigation</h3>
          <ul class="flex flex-col gap-3">
            <li v-for="link in navigation" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-sm text-white/80 hover:text-[#f28b3e] transition-colors"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- LÉGAL -->
        <div>
          <h3 class="text-base font-semibold mb-4">Informations légales</h3>
          <ul class="flex flex-col gap-3">
            <li v-for="link in legal" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-sm text-white/80 hover:text-[#f28b3e] transition-colors"
              >
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- CONTACT -->
        <div>
          <h3 class="text-base font-semibold mb-4">Contact</h3>
          <ul class="flex flex-col gap-3">
            <li>
              <a
                href="mailto:contact@phenixjobs.ci"
                class="flex items-center gap-2 text-sm text-white/80 hover:text-[#f28b3e] transition-colors"
              >
                <Mail class="w-4 h-4 shrink-0" />
                contact@phenixjobs.ci
              </a>
            </li>
            <li>
              <a
                href="tel:+22500000000"
                class="flex items-center gap-2 text-sm text-white/80 hover:text-[#f28b3e] transition-colors"
              >
                <Phone class="w-4 h-4 shrink-0" />
                +225 00 00 00 00
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- SÉPARATEUR + COPYRIGHT -->
      <div class="border-t border-white/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs sm:text-sm text-white/70 text-center sm:text-left">
          © {{ year }} PHENIX Jobs & Carrières. Tous droits réservés.
        </p>
        <p class="text-xs text-white/60 text-center sm:text-right">
          Fait avec ❤️ en Côte d'Ivoire
        </p>
      </div>
    </div>
  </footer>
</template>