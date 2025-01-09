<template>
  <div class="header">
    <h3>Star Citizen Hauling Manager</h3>
    <Tabs />
    <NewContractForm v-if="route.path == '/'" style="z-index: 10000" />
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import NewContractForm from '@/components/NewContractForm.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.header{
    position: sticky;
    top: 0;
    background: white;
    z-index: 1000;
}
h3 {
  padding: 0.25rem;
  color: #0087bd;
}
</style>
