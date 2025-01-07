<script setup lang="ts">
import NewContractForm from '../components/NewContractForm.vue'
import type { Contract } from '../models/contract'
import { computed, onMounted, ref } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'

const { contracts } = useContractStore();

const destinations = computed(() => {
  // create an array of payloads from all contracts, using DestinationID to categorise them
  const dest = contracts.reduce((acc:any, contract:Contract) => {
    contract.payloads.forEach((payload) => {
      if (!acc[payload.destinationID]) {
        acc[payload.destinationID] = []
      }
      acc[payload.destinationID].push(payload)
    })
    return acc
  }, {});
  console.log(dest)
  return dest
})
const origins = computed(() => {
  // create an array of payloads from all contracts, using DestinationID to categorise them
  const dest = contracts.reduce((acc:any, contract:Contract) => {
    contract.payloads.forEach((payload) => {
      if (!acc[payload.originID]) {
        acc[payload.originID] = []
      }
      acc[payload.originID].push(payload)
    })
    return acc
  }, {});
  console.log(dest)
  return dest
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
    Origins
    <div id="main-destination-list">
      <div v-for="destination in origins">
          test {{ destination }}
      </div>
    </div>
    Destinations
    <div id="main-destination-list">
      <div v-for="destination in destinations">
          test {{ destination }}
      </div>
    </div>
  </main>
</template>
