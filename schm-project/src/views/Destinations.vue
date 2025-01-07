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

#destination-instance-payload:nth-child(odd) {
  background-color: white;
  padding: 0.25rem 0.5rem;
}
#destination-instance-payload:nth-child(even) {
  background-color: whitesmoke;
  padding: 0.25rem 0.5rem;
}
#destination-instance-payload.disabled {
  opacity: 0.5;
}
.circle-count {
  border-radius: 100%;
  background-color: rgb(0, 135, 189);
  color: white;
  padding: 0.25rem;
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-weight: bold;
  padding-top: 0.65rem;
}
#main-destination-list {
  background: whitesmoke;
  border-left: 5px solid rgb(0, 135, 189);
  border-top: 3px solid rgb(0, 135, 189);
}
.main-destination-heading {
  margin-top: 1rem;
  margin-bottom: 0;
  background: rgb(0, 135, 189);
  color: white;
  padding: 0.5rem;
}
</style>

<template>
  <main>
    <h3 class="main-destination-heading">Origins</h3>
    <div id="main-destination-list">
      <div v-for="destination in origins">
        <h4>{{ destination.name }}</h4>
        <div
          v-for="payload in destination.payloads"
          id="destination-instance-payload"
          :class="[{ disabled: payload.status != PayloadStatus.Ready }]"
        >
          <div class="d-flex">
            <div class="w-100">
              <div class="d-flex" style="position: relative">
                <div class="circle-count">x{{ payload.quantity }}</div>
                <div style="position: relative; width: 100%">
                  <div style="position: relative">
                    <div
                      style="
                        left: 0.25rem;
                        top: -50%;
                        transform: translateY(50%);
                        position: absolute;
                      "
                    >
                      {{ payload.commodityID }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div style="width: auto; text-wrap: nowrap">Status: {{ payload.status }}</div>
              <Button
                class="btn btn-primary ml-auto"
                v-if="payload.status == PayloadStatus.Ready"
                @click="payload.status = PayloadStatus.Collected"
                >Collect</Button
              >
              <Button
                class="btn btn-undo ml-auto"
                v-if="payload.status === PayloadStatus.Collected"
                @click="payload.status = PayloadStatus.Ready"
                >Uncollect</Button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="main-destination-heading">Destinations</h3>
    <div id="main-destination-list">
      <div v-for="destination in destinations">
        <h3>{{ destination.name }}</h3>
        <div
          v-for="payload in destination.payloads"
          id="destination-instance-payload"
          :class="[{ disabled: payload.status == PayloadStatus.Ready }]"
        >
          <div class="d-flex">
            <div class="w-100">
              <div class="d-flex" style="position: relative">
                <div class="circle-count">x{{ payload.quantity }}</div>
                <div style="position: relative; width: 100%">
                  <div style="position: relative">
                    <div
                      style="
                        left: 0.25rem;
                        top: -50%;
                        transform: translateY(50%);
                        position: absolute;
                      "
                    >
                      {{ payload.commodityID }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right">
              <div style="width: auto; text-wrap: nowrap">Status: {{ payload.status }}</div>
              <Button
                class="btn btn-primary ml-auto"
                v-if="payload.status === PayloadStatus.Collected"
                @click="payload.status = PayloadStatus.Delivered"
                >Deliver</Button
              >
              <Button
                class="btn btn-undo ml-auto"
                v-if="payload.status === PayloadStatus.Delivered"
                @click="payload.status = PayloadStatus.Collected"
                >Undeliver</Button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
