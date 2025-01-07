<script setup lang="ts">
import type { Contract } from '../models/contract'
import { computed, onMounted } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'
import { useRoute } from 'vue-router'
import NewContractForm from '@/components/NewContractForm.vue'

const route = useRoute()

const { contracts } = useContractStore()

const displayContracts = computed(() => {
  return contracts.filter((contract) => !!contract.completed == (route.path === '/history'))
})

const contractCompleted = (contract: Contract) => {
  return contract.payloads.every((payload) => payload.status === PayloadStatus.Delivered)
}
</script>

<style scoped>
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
</style>

<template>
  <main>
    <div id="main-contract-list">
      <div v-for="contract in displayContracts" id="destination-instance" class="contract-block">
        <div id="destination-instance-header" class="contract-block-header d-flex">
          <h2>{{ contract.name }}</h2>
          <h2>{{ contract.price }}<span class="bold" style="font-size: medium"> auec</span></h2>
        </div>
        <div v-if="contract.completed">
          <div>
            <Button class="btn btn-undo w-100 mx-auto" @click="contract.completed = false"
              >Resume Contract</Button
            >
          </div>
        </div>
        <div
          v-if="!contract.completed"
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
              </div>
            </div>
            <div>
              <div style="width: auto; text-wrap: nowrap">Status: {{ payload.status }}</div>
            </div>
          </div>
          <p>{{ payload.originID }} -> {{ payload.destinationID }}</p>
          <div class="d-flex text-center">
            <Button
              class="btn btn-primary w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Ready"
              @click="payload.status = PayloadStatus.Collected"
              >Collect</Button
            >
            <Button
              class="btn btn-primary w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Collected"
              @click="payload.status = PayloadStatus.Delivered"
              >Delivered</Button
            >
            <Button
              class="btn btn-undo w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Collected"
              @click="payload.status = PayloadStatus.Ready"
              >Uncollect</Button
            >
            <Button
              class="btn btn-undo w-50 ml-auto"
              v-if="payload.status === PayloadStatus.Delivered"
              @click="payload.status = PayloadStatus.Collected"
              >Undeliver</Button
            >
          </div>
        </div>

        <div>
          <Button
            class="btn btn-primary w-100 mx-auto mt-3"
            v-if="contractCompleted(contract) && !contract.completed"
            @click="contract.completed = true"
            >Complete Contract</Button
          >
        </div>
      </div>
    </div>
    <div id="main-destination-list"></div>
    <NewContractForm v-if="route.path == '/'" style="z-index: 10000" />
  </main>
</template>
