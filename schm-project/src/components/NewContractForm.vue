<template>
  <div class="btn btn-secondary" @click="OpenNewContract">New Contract</div>
  <div v-if="showForm">
    <div class="new-contract-form">
      <div>
        <div
          class="btn btn-secondary float-right"
          style="margin-left: auto; width: 5rem; float: right"
          @click="closeContract"
        >
          Close
        </div>
      </div>
      <h2>New Contract</h2>
      <div class="d-flex mb-3" style="width: 100%">
        <input type="text" placeholder="Contract Name" v-model="newContract.name" />
        <input
          type="number"
          placeholder="Price*"
          style="margin-left: 1rem; width: 100%"
          v-model="newContract.price"
        />
      </div>
      <div v-if="!addingPayload" class="mb-3">
        New payload
        <div class="btn btn-primary" @click="addPayload">Add</div>
      </div>
      <div v-if="addingPayload">
        <div class="btn btn-primary" @click="closePayload">Cancel</div>
        <SearchableDropdown :options="selectableCommodities" :searchQuery="newPayload.commodityID" />
        <FieldInput v-model="newPayload.quantity" />
        <SearchableDropdown :options="selectableLocations" :searchQuery="newPayload.originID" />
        <SearchableDropdown :options="selectableLocations" :searchQuery="newPayload.destinationID" />
        <div class="btn btn-secondary" @click="closePayloadAndAdd">Add</div>
      </div>
      <div v-for="payload in newContract.payloads" class="new-contract-form-payloadblock">
        <div>Commodity: {{ payload.commodityID }}</div>
        <div>Quantity: {{ payload.quantity }}scu</div>
        <div>Origin: {{ payload.originID }}</div>
        <div>Destination: {{ payload.destinationID }}</div>
      </div>
      <div>
        <div
          class="btn btn-primary text-center mx-auto mt-4"
          style="min-width: 8rem"
          @click="submitContract"
        >
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PayloadStatus } from '@/enums/payload-status'
import type { Contract } from '@/models/contract'
import { useContractStore } from '@/stores/use-contract-store'
import { computed, onMounted, ref } from 'vue'
import { Locations } from '@/enums/locations'
import { Commodities } from '@/enums/commodities'
import SearchableDropdown from './SearchableDropdown.vue'

onMounted(() => {
  console.log('NewContractForm mounted')
})

const locations = Object.values(Locations) as string[];
const commodities = Object.values(Commodities) as string[];

const selectableLocations = computed(() => {
  return locations.map((location) => {
    return { value: location, label: location }
  })
})

const selectableCommodities = computed(() => {
  return commodities.map((commodity) => {
    return { value: commodity, label: commodity }
  })
})

const showForm = ref(false)
const addingPayload = ref(false)

const newContract = ref<Contract>({
  id: -1,
  name: '',
  price: 0,
  payloads: [],
})

const newPayload = ref({
  commodityID: '',
  quantity: 0,
  originID: '',
  destinationID: '',
  status: PayloadStatus.Ready,
})

const OpenNewContract = () => {
  newContract.value = {
    id: -1,
    name: '',
    price: 0,
    payloads: [],
  }
  showForm.value = true
}
const closeContract = () => {
  console.log('Close Contract')
  showForm.value = false
}
const submitContract = () => {
  console.log('Submit Contract')
  useContractStore().addContract(newContract.value)
  showForm.value = false
}

const closePayload = () => {
  addingPayload.value = false
}
const closePayloadAndAdd = () => {
  newContract.value.payloads.push({ id: 0, ...newPayload.value })
  addingPayload.value = false
}
const addPayload = () => {
  addingPayload.value = true
  newPayload.value = {
    commodityID: '',
    quantity: 0,
    originID: '',
    destinationID: '',
    status: PayloadStatus.Ready,
  }
  console.log('Add Payload')
}
</script>

<style scoped>
.new-contract-form {
  position: absolute;
  border: 1px solid black;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  min-width: 50%;
  margin-top: 0rem;
}
.new-contract-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 0.25rem;
}
.new-contract-form-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}
.new-contract-form-payloadblock:nth-child(odd) {
  background-color: lightgrey;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}

@media (max-width: 1024px) {
  .new-contract-form {
    width: 100% !important;
  }
}
</style>
