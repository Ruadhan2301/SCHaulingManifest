import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Contract } from '../models/contract'
import { Commodities } from '../enums/commodities'
import { PayloadStatus } from '@/enums/payload-status'

export const useContractStore = defineStore('contracts', () => {
  const contracts = ref<Contract[]>([])
  /*const contracts = ref<Contract[]>([
    {
      id: 1,
      name: 'Contract 1',
      payloads: [
        {
          id: 1,
          commodityID: Commodities.ProcessedFood,
          originID: 12,
          destinationID: 14,
          quantity: 3,
          status: PayloadStatus.Ready,
        },
        {
          id: 2,
          commodityID: Commodities.ProcessedFood,
          originID: 12,
          destinationID: 15,
          quantity: 8,
          status: PayloadStatus.Ready,
        },
        {
          id: 3,
          commodityID: Commodities.ProcessedFood,
          originID: 12,
          destinationID: 14,
          quantity: 6,
          status: PayloadStatus.Ready,
        },
      ],
    },
    {
      id: 2,
      name: 'Contract 2',
      payloads: [
        {
          id: 4,
          commodityID: Commodities.ProcessedFood,
          originID: 12,
          destinationID: 14,
          quantity: 3,
          status: PayloadStatus.Ready,
        },
        {
          id: 5,
          commodityID: Commodities.ProcessedFood,
          originID: 12,
          destinationID: 15,
          quantity: 8,
          status: PayloadStatus.Ready,
        },
        {
          id: 6,
          commodityID: Commodities.ProcessedFood,
          originID: 12,
          destinationID: 14,
          quantity: 6,
          status: PayloadStatus.Ready,
        },
      ],
    },
  ])*/

  const addContract = (contract: Contract) => {
    contracts.value.push(contract)
  }
  const deleteContract = (contractID: number) => {
    contracts.value = contracts.value.filter((contract) => contract.id !== contractID)
  }

  return { contracts, addContract, deleteContract }
})
