<script setup lang="ts">
import { RouterView } from 'vue-router'
import Tabs from '@/components/Tabs.vue'
import Header from '@/components/Header.vue'
</script>

<template>
  <Header></Header>
  <Tabs />
  <RouterView />
</template>

<style scoped></style>
