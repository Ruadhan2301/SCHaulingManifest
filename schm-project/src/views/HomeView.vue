<script setup lang="ts">
import type { Contract } from '../models/contract'
import { computed } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'
import { useRoute } from 'vue-router'

const route = useRoute()

const { contracts } = useContractStore()

const displayContracts = computed(() => {
  return contracts.filter((contract) => !!contract.completed == (route.path === '/history'))
})

const contractCompleted = (contract: Contract) => {
  return contract.payloads.every((payload) => payload.status === PayloadStatus.Delivered)
}
const contractPayout = (contract: Contract) => {
  return new Intl.NumberFormat().format(contract.price ?? 0);//contract.price?.toLocaleString('en');
}

</script>

<style scoped>
h2{
  color:#2c5768;
  font-weight:bold;
  padding-left:0.5rem;
  padding-right:0.5rem;
}
.contract-block {
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.25rem grey;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}
</style>

<template>
  <main class="mb-5">
    <div id="main-contract-list" class="mx-auto text-center" style="max-width: 50rem">
      <div v-for="contract in displayContracts" id="destination-instance" class="contract-block">
        <div id="destination-instance-header" class="contract-block-header d-flex">
          <h2>{{ contract.name }}</h2>
          <h2>{{ contractPayout(contract) }}<span class="bold" style="font-size: medium"> auec</span></h2>
        </div>
        
        <div
          v-for="payload in contract.payloads"
          class="contract-block-body"
        >
          <div id="destination-instance-payload" class="d-flex">
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
                <div>
                  <div class="cursor-pointer" @click="payload.status = PayloadStatus.Cancelled">
                    <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">                      
                      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div style="width: auto; text-wrap: nowrap">Status: {{ payload.status }}</div>
            </div>
          </div>
          <p>{{ payload.originID }} -> {{ payload.destinationID }}</p>
          <div
          v-if="!contract.completed && !contract.cancelled" class="d-flex text-center gap-2">
            <button
              class="btn btn-primary w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Ready"
              @click="payload.status = PayloadStatus.Collected"
              >Collect</button
            >
            <button
              class="btn btn-primary w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Collected"
              @click="payload.status = PayloadStatus.Delivered"
              >Deliver</button
            >
            <button
              class="btn btn-undo w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Collected"
              @click="payload.status = PayloadStatus.Ready"
              >Uncollect</button
            >
            <button
              class="btn btn-undo w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Delivered"
              @click="payload.status = PayloadStatus.Collected"
              >Undeliver</button
            >
          </div>
        </div>

        <div>
          <button
            class="btn btn-primary w-100 mx-auto mt-3"
            v-if="contractCompleted(contract) && !contract.completed"
            @click="contract.completed = true"
            >Complete Contract</button
          >
        </div>
        <div v-if="contract.completed || contract.cancelled">
          <div>
            <button class="btn btn-undo w-100 mx-auto" @click="contract.completed = false"
              >Resume Contract</button
            >
          </div>
        </div>
      </div>
    </div>
    <div id="main-destination-list"></div>
  </main>
</template>
