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

<template>
  <main>
    <!--<NewContractForm />-->
  </main>
</template>
