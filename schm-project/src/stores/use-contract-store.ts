import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Contract } from '../models/contract'

export const useContractStore = defineStore('contracts', () => {
  const contracts = ref<Contract[]>()

  return { contracts }
})
