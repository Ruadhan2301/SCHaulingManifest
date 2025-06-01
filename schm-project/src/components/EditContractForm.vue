<template>  
  <div style="position: absolute; top:0;">
  <div v-if="editContract" v-show="isActive" class="w-100 h-100" style="background-color: #00000080; position: fixed; left:0;top:0;">
    
    <div class="new-contract-form" style="top: 5rem; left: 50%; transform: translateX(-50%);">
      
      <div>
      <div class="d-flex my-2">
        <h3>Edit Contract</h3>
        <div
          class="btn btn-secondary float-right"
          style="margin-left: auto; width: 5rem; float: right"
          @click="closeContract"
        >
          Close
        </div>
      </div>
      
      <div>
      <div class="d-flex mb-3 w-100">
        <FieldInput
          v-model="editContract!.name"
          placeholder="Contract Name.."
          label="Contract Name"
        />
        <FieldInput v-model="editContract!.price" placeholder="price*" label="Payout (auec)" />
      </div>
      <div class="d-flex mb-3 w-100">        
      <FieldDropdown
            v-model="editContract!.containerSize"
            :options="ContainerSizes"
            style="max-width: 20rem"
          label="Max Container Size"/>
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
          <button
          v-if="!editingPayload"
            class="btn btn-secondary"
            style="margin-left: auto"
            :disabled="newPayloadValid"
            @click="closePayloadAndAdd"
            >Add</button
          >
          <button
          v-if="editingPayload"
            class="btn btn-secondary"
            style="margin-left: auto"
            :disabled="newPayloadValid"
            @click="closePayloadAndUpdate"
            >Update</button
          >
        </div>
      </div>
      <div v-else style="position: relative; max-height: 15rem; overflow-y: auto;">
        <div v-for="payload in editContract!.payloads" class="new-contract-form-payloadblock">
          <div>Commodity: {{ payload.commodityID }}</div>
          <div>Quantity: {{ payload.quantity }}scu</div>
          <div>Origin: {{ payload.originID }}</div>
          <div>Destination: {{ payload.destinationID }}</div>
          <button class="btn btn-secondary" @click="openPayload(payload)">Edit</button>
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
        <button
          class="btn btn-primary text-center mx-auto mt-4"
          style="min-width: 8rem"
          @click="saveContract"
          :disabled="!contractValid"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { PayloadStatus } from '@/enums/payload-status'
import type { Contract } from '@/models/contract'
import { useContractStore } from '@/stores/use-contract-store'
import { computed, ref, watch } from 'vue'
import { Locations } from '@/enums/locations'
import { Commodities } from '@/enums/commodities'
import SearchableDropdown from './SearchableDropdown.vue'
import FieldInput from './FieldInput.vue'
import type { Payload } from '@/models/payload'
import FieldDropdown from '@/components/FieldDropdown.vue';
import { ContainerSizes } from '@/enums/container-sizes';

const locations = Object.values(Locations) as string[]
const commodities = Object.values(Commodities) as string[]

const editContract = ref<Contract | undefined>()

interface IProps {
  contract: Contract | undefined
  isActive: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  isActive: false,
})

watch(
  () => props.contract,
  (newValue) => {
    if (newValue) {
      editContract.value = {
        ...newValue,
        payloads: newValue.payloads.map((p) => ({ ...p })),
      };
    }
  },
)

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

const addingPayload = ref(false)
const editingPayload = ref(false)


const newPayload = ref<Payload>({
  commodityID: '',
  originID: '',
  destinationID: '',
  status: PayloadStatus.Ready,
})

const contractValid = computed(() => {
  return (
    editContract.value &&
    editContract.value.name &&
    editContract.value.price &&
    editContract.value.payloads.length > 0
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

const openPayload = (payload: Payload) => {
  newPayload.value = payload;
  addingPayload.value = true;
  editingPayload.value = true;
}

const closeContract = () => {
  useContractStore().showEditContractModal = false;
}
const submitContract = () => {
  useContractStore().addContract(editContract.value!)
  useContractStore().showEditContractModal = false;
}
const saveContract = () => {
  useContractStore().updateContract(editContract.value!)
  useContractStore().showEditContractModal = false;
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
  editContract.value!.payloads.push({ id: editContract.value!.payloads.length, ...newPayload.value })
  addingPayload.value = false
}

const closePayloadAndUpdate = () => {
  if (
    !newPayload.value.commodityID ||
    !newPayload.value.originID ||
    !newPayload.value.destinationID ||
    !newPayload.value.quantity
  ) {
    return
  }
  editContract.value!.payloads = editContract.value!.payloads.filter((p) => p.id != newPayload.value.id);
  editContract.value!.payloads.push({...newPayload.value })

  addingPayload.value = false
}

const addPayload = () => {
  addingPayload.value = true;
  newPayload.value = {
    ...newPayload.value,
    id: editContract.value!.payloads.length,
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
