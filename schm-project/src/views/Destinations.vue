<script setup lang="ts">
import type { Contract } from '../models/contract'
import { computed } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'
import { calculatePayload } from '@/utils/payload-calculator.ts';

const { contracts } = useContractStore()

const destinations = computed(() => {
  // create an array of payloads from all contracts, using DestinationID to categorise them
  const dest = contracts.reduce((acc: any, contract: Contract) => {
    !contract.completed &&
      contract.payloads.forEach((payload) => {
        if (!acc[payload.destinationID]) {
          acc[payload.destinationID] = { name: payload.destinationID, payloads: [], containerSize: contract.containerSize }
        }
        acc[payload.destinationID].payloads.push(payload);
        //acc[payload.destinationID].payloads.push({...payload, containerSize: contract.containerSize})
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
          acc[payload.originID] = { name: payload.originID, payloads: [], containerSize: contract.containerSize }
        }
        acc[payload.originID].payloads.push(payload);
      })    
    return acc
  }, {})
  return dest
})
</script>

<style scoped>

#destination-instance-payload:nth-child(even) {
  background-color: white;
  padding: 0.25rem 0.5rem;
}
#destination-instance-payload:nth-child(odd) {
  background-color: whitesmoke;
  padding: 0.25rem 0.5rem;
}
#destination-instance-payload.disabled {
  opacity: 0.5;
}
#main-destination-list {
  background: whitesmoke;
  border-left: 5px solid rgb(0, 135, 189);
  border-top: 5px solid rgb(0, 135, 189);
  border-top-left-radius: 0.5rem;
  padding-left:0.25rem;
  padding-top:0.25rem;
  margin-left:0.25rem;
  margin-right:0.25rem;
}
.main-destination-heading {
  margin-top: 1rem;
  margin-bottom: 0;
  background: #0087bd;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-left:0.25rem;
  margin-right:0.25rem;
}
</style>

<template>
  <main class="mb-5 md:d-flex mx-auto" style="max-width: 50rem">
    <div style="min-width: 49%;">
    <h3 class="main-destination-heading">Origins</h3>
    <div>
      <div id="main-destination-list" v-for="destination in origins" class="mt-2">
        <h4 class="">{{ destination.name }}</h4>
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
          <div class="d-flex gap-1 my-3">
                    <div
                      v-for="(container, index) in calculatePayload(payload.quantity ?? 0, destination.containerSize)"
                      :key="index"
                      class="d-flex flex-column align-items-center mx-1" style="background:gainsboro; width:3rem; border-radius: 0.5rem;"
                    >
                      <div class="circle-count-sm-tan">x{{ container.quantity }}</div>
                      <div class="bold">{{ container.size }} scu</div>
                    </div>
                  </div>
          <p class="text-sm">{{ payload.originID }} -> {{ payload.destinationID }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="d-none md:d-block" style="height:100%; width:2%;"></div>
  <div style="min-width: 49%;">
    <h3 class="main-destination-heading">Destinations</h3>
    <div>
      <div id="main-destination-list" v-for="destination in destinations" class="mt-2">
        <h3>{{ destination.name }}</h3>
        <div
          v-for="payload in destination.payloads"
          id="destination-instance-payload"
          :class="[{ disabled: payload.status == PayloadStatus.Ready }]"
        >
        <div class="d-inline">
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
          <div class="d-flex gap-1 my-3">
                    <div
                      v-for="(container, index) in calculatePayload(payload.quantity ?? 0, destination.containerSize)"
                      :key="index"
                      class="d-flex flex-column align-items-center mx-1" style="background:gainsboro; width:3rem; border-radius: 0.5rem;"
                    >
                      <div class="circle-count-sm-tan">x{{ container.quantity }}</div>
                      <div class="bold">{{ container.size }} scu</div>
                    </div>
                  </div>
          <p class="text-sm">{{ payload.originID }} -> {{ payload.destinationID }}</p>
        </div>
      </div>
    </div>
  </div>
  </main>
</template>
