<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Tabs from './components/Tabs.vue'
import NewContractForm from './components/NewContractForm.vue'
</script>

<template>
  <Tabs />
  <NewContractForm />
  <RouterView />
</template>

<style scoped></style>
