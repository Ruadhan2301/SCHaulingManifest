import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Contract } from '../models/contract'
import { Commodities } from '../enums/commodities'
import { PayloadStatus } from '@/enums/payload-status'

export const useContractStore = defineStore('contracts', () => {

  const showEditContractModal = ref(false)
  const editContract = ref<Contract | undefined>()

  const contracts = ref<Contract[]>([
    /*{
      id:1,
      name: 'Delivery to Area18',
      description: 'Deliver 10 units of Titanium to Area18',
      price: 10000,
      payloads: [
        {
          commodityID: Commodities.Titanium,
          originID: 'Ruin Station',
          destinationID: 'Area18',
          quantity: 10,
          status: PayloadStatus.Collected
        }
      ],
    }*/
  ])

  const addContract = (contract: Contract) => {
    contracts.value.push(contract)
  }
  const updateContract = (updatedContract: Contract) => {
    const index = contracts.value.findIndex(contract => contract.id === updatedContract.id)
    if (index !== -1) {
      contracts.value[index] = updatedContract
    } else {
      console.warn(`Contract with ID ${updatedContract.id} not found for update.`)
    }
  }
  const deleteContract = (contractID: number) => {
    const index = contracts.value.findIndex(contract => contract.id === contractID)
    if (index !== -1) {
      contracts.value.splice(index, 1)
    } else {
      console.warn(`Contract with ID ${contractID} not found for deletion.`)
    }
  }

  return { contracts, addContract, updateContract, deleteContract, editContract, showEditContractModal }
})
