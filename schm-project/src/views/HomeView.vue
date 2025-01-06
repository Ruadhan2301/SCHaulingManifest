<script setup lang="ts">
  import NewContractForm from '../components/NewContractForm.vue'
  import type { Contract } from '../models/contract'

  import { ref } from 'vue'

  const contracts = ref<Contract[]>([
    {
      id: 1,
      name: 'Contract 1',
      payloads: [
        {
          id: 1,
          commodityID: 23,
          originID: 12,
          destinationID: 14,
          quantity: 3
        },
        {
          id: 2,
          commodityID: 23,
          originID: 12,
          destinationID: 15,
          quantity: 8
        },
        {
          id: 3,
          commodityID: 26,
          originID: 12,
          destinationID: 14,
          quantity: 6
        }
      ]     
      
    }
  ])
</script>

<template>
  <main>
    <!--<NewContractForm />-->
    <div id="main-contract-list">
      <div v-for="contract in contracts" id="destination-instance">
        <div id="destination-instance-header">
          <h2>{{ contract.name }}</h2>
        </div>
        <div v-for="payload in contract.payloads">
          <div id="destination-instance-payload">
            <p>Commodity ID: {{ payload.commodityID }}</p>
            <p>Origin ID: {{ payload.originID }}</p>
            <p>Destination ID: {{ payload.destinationID }}</p>
            <p>Quantity: {{ payload.quantity }}</p>
          </div>
        </div>
        
      </div>
    </div>
    <div id="main-destination-list">
      
    </div>
  </main>
</template>
