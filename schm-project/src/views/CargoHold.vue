<script setup lang="ts">
import NewContractForm from '../components/NewContractForm.vue'
import type { Contract } from '../models/contract'
import { onMounted, ref } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'

const contracts = ref()
const cargo = ref()

onMounted(() => {
  contracts.value = useContractStore().contracts
})
</script>

<style scoped>
.contract-block {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 10px;
}
.contract-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 0.25rem;
}
.contract-block-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}
</style>

<template>
  <main>
    <!--<NewContractForm />-->
  </main>
</template>
