<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#F9FAFB]">
    <Navbar />

    <main class="flex-1 w-full">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>