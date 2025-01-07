<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Tabs from './components/Tabs.vue'
import NewContractForm from './components/NewContractForm.vue'
</script>

<template>
  <Tabs />
  <RouterView />
  <NewContractForm style="z-index: 10000" />
</template>

<style scoped></style>
