<script setup lang="ts">
import NewContractForm from '../components/NewContractForm.vue'
import type { Contract } from '../models/contract'
import { onMounted, ref } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'

const contracts = ref()

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
    <div id="main-contract-list">
      <div v-for="contract in contracts" id="destination-instance" class="contract-block">
        <div id="destination-instance-header" class="contract-block-header">
          <h2>{{ contract.name }}</h2>
        </div>
        <div v-for="payload in contract.payloads" class="contract-block-body">
          <div id="destination-instance-payload" class="d-flex" style="display: flex;">
            <div>
              <p>x{{ payload.quantity }} {{ payload.commodityID }}</p>
              <p>Route {{ payload.originID }} -> {{ payload.destinationID }}</p>
            </div>
            <div class="ml-auto">
              <select v-model="payload.status">
                <option v-for="status in PayloadStatus" :value="status">{{ status }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="main-destination-list"></div>
  </main>
</template>
