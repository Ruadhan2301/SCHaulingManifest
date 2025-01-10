<template>
  <div class="w-100 text-center">
    <Button class="btn btn-secondary w-100 my-1 mx-auto" style="max-width: 25rem" @click="OpenNewContract"
      >New Contract</Button
    >
  </div>
  <div style="position: absolute; top:0;">
  <div v-if="showForm" class="w-100 h-100" style="background-color: #00000080; position: fixed; left:0;top:0;">
    <div class="new-contract-form" style="top: 5rem; left: 50%; transform: translateX(-50%);">
      <div class="d-flex my-2">
        <h3>New Contract</h3>
        <div
          class="btn btn-secondary float-right"
          style="margin-left: auto; width: 5rem; float: right"
          @click="closeContract"
        >
          Close
        </div>
      </div>
      <div class="d-flex mb-3 w-100">
        <FieldInput
          v-model="newContract.name"
          placeholder="Contract Name.."
          label="Contract Name"
        />
        <FieldInput v-model="newContract.price" placeholder="price*" label="Payout (auec)" />
      </div>
      <div v-if="addingPayload" class="border-thin p-3">
        <div class="d-flex mb-3 w-100 gap-3">
          <SearchableDropdown
            :options="selectableCommodities"
            v-model="newPayload.commodityID"
            placeholder="Commodity.."
            label="Commodity"
          />
          <FieldInput
            v-model="newPayload.quantity"
            placeholder="quantity.."
            label="Quantity (scu)"
          />
        </div>
        <div class="d-flex mb-3 w-100">
          <SearchableDropdown
            :options="selectableLocations"
            v-model="newPayload.originID"
            placeholder="Origin.."
            label="Origin"
          /><span class="mx-3 mt-4" style="font-weight: bold; font-size: xx-large">➧</span>
          <SearchableDropdown
            :options="selectableLocations"
            v-model="newPayload.destinationID"
            placeholder="Destination.."
            label="Destination"
          />
        </div>
        <div class="d-flex">
          <div class="btn btn-primary" @click="closePayload">Cancel</div>
          <Button
            class="btn btn-secondary"
            style="margin-left: auto"
            :disabled="newPayloadValid"
            @click="closePayloadAndAdd"
            >Add</Button
          >
        </div>
      </div>
      <div v-else style="position: relative; max-height: 15rem; overflow-y: auto;">
        <div v-for="payload in newContract.payloads" class="new-contract-form-payloadblock">
          <div>Commodity: {{ payload.commodityID }}</div>
          <div>Quantity: {{ payload.quantity }}scu</div>
          <div>Origin: {{ payload.originID }}</div>
          <div>Destination: {{ payload.destinationID }}</div>
        </div>
      </div>

      <div
        v-if="!addingPayload"
        class="mb-3"
        style="background: whitesmoke; padding: 0.5rem; text-align: center"
      >
        <div class="btn btn-primary ml-auto" @click="addPayload">Add Payload</div>
      </div>
      <div class="w-100 text-center">
        <Button
          class="btn btn-primary text-center mx-auto mt-4"
          style="min-width: 8rem"
          @click="submitContract"
          :disabled="!contractValid"
        >
          Submit
        </Button>
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
import FieldInput from './FieldInput.vue'
import type { Payload } from '@/models/payload'

const locations = Object.values(Locations) as string[]
const commodities = Object.values(Commodities) as string[]

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

const newPayload = ref<Payload>({
  commodityID: '',
  originID: '',
  destinationID: '',
  status: PayloadStatus.Ready,
})

const contractValid = computed(() => {
  return (
    newContract.value &&
    newContract.value.name &&
    newContract.value.price &&
    newContract.value.payloads.length > 0
  )
})

const newPayloadValid = computed(() => {
  return (
    !newPayload.value.commodityID ||
    !newPayload.value.originID ||
    !newPayload.value.destinationID ||
    !newPayload.value.quantity
  )
})

const OpenNewContract = () => {
  newContract.value = {
    id: useContractStore().contracts.length,
    name: 'Contract ' + (useContractStore().contracts.length + 1),
    payloads: [],
  }
  showForm.value = true
}
const closeContract = () => {
  showForm.value = false
}
const submitContract = () => {
  useContractStore().addContract(newContract.value)
  showForm.value = false
}

const closePayload = () => {
  addingPayload.value = false
}
const closePayloadAndAdd = () => {
  if (
    !newPayload.value.commodityID ||
    !newPayload.value.originID ||
    !newPayload.value.destinationID ||
    !newPayload.value.quantity
  ) {
    return
  }
  newContract.value.payloads.push({ id: newContract.value.payloads.length, ...newPayload.value })
  addingPayload.value = false
}
const addPayload = () => {
  addingPayload.value = true;
  console.log(newPayload.value)
  newPayload.value = {
    ...newPayload.value,
    id: newContract.value.payloads.length,
    commodityID: '',
    quantity: 0,
    status: PayloadStatus.Ready,
  }
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
  padding: 0.5rem;
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
.new-contract-form-payloadblock {
  padding: 0.25rem 0.5rem;
}
.new-contract-form-payloadblock:nth-child(odd) {
  background-color: lightgrey;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}
.border-thin {
  border: 1px solid black;
  margin: 0.25rem;
}

@media (max-width: 1024px) {
  .new-contract-form {
    width: 100% !important;
  }
}
</style>
