<template>
  <div class="footer">
    <div id="title">
      <p>V1.2 Ruadhan2300 (2024)</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import NewContractForm from '@/components/NewContractForm.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.footer{
    bottom: 0;
    background: white;
    left:0;
    right:0;
    position:fixed;
}
#title {
  padding: 0.15rem 0.5rem;
  background-color: #2c5768;
  color:white;
}
#title h4 {
  font-weight:bold;
  font-size: larger;
}
#title p {
  font-size: xx-small;
  font-weight: bold;
  color: #ffd400;
  margin-bottom: 0;
}

@media (min-width: 1024px) {
  #title {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
