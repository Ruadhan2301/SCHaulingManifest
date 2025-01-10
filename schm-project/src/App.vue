<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="screen">
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</div>
</template>

<style scoped>
.screen {
  width:100%;
  min-height: 100vh;
}
</style>
