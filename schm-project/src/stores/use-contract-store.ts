import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Contract } from '../models/contract'
import { Commodities } from '../enums/commodities'
import { PayloadStatus } from '@/enums/payload-status'

export const useContractStore = defineStore('contracts', () => {
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
  const deleteContract = (contractID: number) => {
    contracts.value = contracts.value.filter((contract) => contract.id !== contractID)
  }

  return { contracts, addContract, deleteContract }
})
