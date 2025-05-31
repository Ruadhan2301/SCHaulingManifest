<script setup lang="ts">
import type { Contract } from '../models/contract'
import { computed } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'

const { contracts } = useContractStore()

const destinations = computed(() => {
  // create an array of payloads from all contracts, using DestinationID to categorise them
  const dest = contracts.reduce((acc: any, contract: Contract) => {
    !contract.completed &&
      contract.payloads.forEach((payload) => {
        if (!acc[payload.destinationID]) {
          acc[payload.destinationID] = { name: payload.destinationID, payloads: [] }
        }
        acc[payload.destinationID].payloads.push(payload)
      })
    return acc
  }, {})

  // reorder entries to put those with the most payloads in Collected state first
  const orderedDest = Object.values(dest).sort((a: any, b: any) => {
    const aCollectedCount = a.payloads.filter(
      (payload: any) =>
        payload.status === PayloadStatus.Collected || payload.status === PayloadStatus.Delivered,
    ).length
    const bCollectedCount = b.payloads.filter(
      (payload: any) =>
        payload.status === PayloadStatus.Collected || payload.status === PayloadStatus.Delivered,
    ).length
    return bCollectedCount - aCollectedCount
  })

  return orderedDest as any
})

const origins = computed(() => {
  // create an array of payloads from all contracts, using DestinationID to categorise them
  const dest = contracts.reduce((acc: any, contract: Contract) => {
    !contract.completed &&
      contract.payloads.forEach((payload) => {
        if (!acc[payload.originID]) {
          acc[payload.originID] = { name: payload.originID, payloads: [] }
        }
        acc[payload.originID].payloads.push(payload)
      })
    return acc
  }, {})
  return dest
})
</script>
<style scoped>

</style>

<template>
  <main class="mb-5 md:d-flex mx-auto" style="max-width: 50rem">
    <p class="text-center">This page attempts to produce a viable least-distance route between all destinations</p>
    
  </main>
</template>
