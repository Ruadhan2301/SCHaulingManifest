<template>
  <div class="header">
    <div id="title">
      <h4 >Star Citizen Hauling Manifest</h4>
    </div>
    <Tabs v-if="route.path!='/calculator'" />
    <NewContractForm v-if="route.path == '/'" style="z-index: 10000;" />
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
#title {
  padding: 0.5rem 0.5rem;
  background-color: #2c5768;
  color:white;
  margin-bottom:2px;
}
#title h4 {
  font-weight:bold;
  font-size: larger;
}
#title p {
  font-size: small;
  color: #ffd400;
  margin-bottom: 0.25rem;
}

@media (min-width: 1024px) {
  #title {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
