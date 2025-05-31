import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Ship } from '@/models/ship'

export const useShipStore = defineStore('ships', () => {
  const ships = ref<Ship[]>([
    //Origin
    {display_name: '100i', cargo_capacity: 2},
    {display_name: '125a', cargo_capacity: 2},
    {display_name: '135c', cargo_capacity: 6},
    {display_name: '300i', cargo_capacity: 8},
    {display_name: '315p', cargo_capacity: 12},
    {display_name: '325a', cargo_capacity: 4},
    {display_name: '350r', cargo_capacity: 4},
    {display_name: '400i', cargo_capacity: 42},
    {display_name: '600i Explorer', cargo_capacity: 44},
    {display_name: '600i Touring', cargo_capacity: 20},
    {display_name: '890j', cargo_capacity: 388},
    //Crusader
    {display_name: 'C1 Spirit', cargo_capacity: 64},
    {display_name: 'Intrepid', cargo_capacity: 8},
    {display_name: 'Mercury Star Runner', cargo_capacity: 114},

    
    {display_name: 'Hercules A2', cargo_capacity: 216},
    {display_name: 'Hercules C2', cargo_capacity: 696},
    {display_name: 'Hercules M2', cargo_capacity: 522},
    //Anvil
    {display_name: 'C8 Pisces', cargo_capacity: 4},
    {display_name: 'C8X Pisces', cargo_capacity: 4},
    {display_name: 'Carrack', cargo_capacity: 456},
    {display_name: 'Carrack Expedition', cargo_capacity: 456},
    {display_name: 'F7C Hornet Mk1', cargo_capacity: 2},
    {display_name: 'F7C Hornet Wildfire Mk1', cargo_capacity: 2},
    {display_name: 'Valkyrie', cargo_capacity: 30},
    //Argo
    {display_name: 'MPUV Cargo', cargo_capacity: 2},
    {display_name: 'SRV', cargo_capacity: 12},
    {display_name: 'RAFT', cargo_capacity: 32},
    //Aegis
    {display_name: 'Avenger Titan', cargo_capacity: 8},
    {display_name: 'Avenger Titan Renegade', cargo_capacity: 8},
    {display_name: 'Hammerhead', cargo_capacity: 40},
    {display_name: 'Reclaimer', cargo_capacity: 180},
    {display_name: 'Retaliator (2x Cargo Modules)', cargo_capacity: 74},
    //Consolidated Outland
    {display_name: 'Mustang Alpha', cargo_capacity: 4},
    {display_name: 'Nomad', cargo_capacity: 24},


    //MISC
    {display_name: 'Reliant Tana', cargo_capacity: 1},
    {display_name: 'Reliant Kore', cargo_capacity: 6},
    {display_name: 'Starfarer Gemini', cargo_capacity: 291},
    {display_name: 'Starfarer', cargo_capacity: 291},
    {display_name: 'Starlancer Max', cargo_capacity: 224},
    {display_name: 'Starlancer TAC', cargo_capacity: 96},
    {display_name: 'Starlancer BLD', cargo_capacity: 128},
    {display_name: 'Fortune', cargo_capacity: 12},
    {display_name: 'Hull A', cargo_capacity: 64},
    {display_name: 'Hull C', cargo_capacity: 4608},
    {display_name: 'Freelancer', cargo_capacity: 66},
    {display_name: 'Freelancer DUR', cargo_capacity: 36},
    {display_name: 'Freelancer MAX', cargo_capacity: 120},
    {display_name: 'Freelancer MIS', cargo_capacity: 36},
    //Alien
    {display_name: 'Banu Merchantman', cargo_capacity: 2880},
    //Gatac
    {display_name: 'Syulen', cargo_capacity: 6},
    {display_name: 'Railen', cargo_capacity: 320},



    //Drake
    {display_name: 'Caterpillar', cargo_capacity: 576},
    {display_name: 'Corsair', cargo_capacity: 72},
    {display_name: 'Cutlass Black', cargo_capacity: 46},
    {display_name: 'Cutlass Blue', cargo_capacity: 12},
    {display_name: 'Cutlass Red', cargo_capacity: 12},
    {display_name: 'Cutter', cargo_capacity: 4},
    {display_name: 'Cutter Rambler', cargo_capacity: 2},
    {display_name: 'Cutter Scout', cargo_capacity: 2},
    {display_name: 'Vulture', cargo_capacity: 12},
    //RSI
    {display_name: 'Apollo Medivac', cargo_capacity: 28},
    {display_name: 'Apollo Triage', cargo_capacity: 28},
    {display_name: 'Aurora CL', cargo_capacity: 6},
    {display_name: 'Aurora ES', cargo_capacity: 3},
    {display_name: 'Aurora LN', cargo_capacity: 3},
    {display_name: 'Aurora LX', cargo_capacity: 3},
    {display_name: 'Aurora MR', cargo_capacity: 3},
    {display_name: 'Constellation Andromeda', cargo_capacity: 96},
    {display_name: 'Constellation Aquila', cargo_capacity: 96},
    {display_name: 'Constellation Phoenix', cargo_capacity: 80},
    {display_name: 'Constellation Taurus', cargo_capacity: 168},
    {display_name: 'Mantis', cargo_capacity: 2},
    {display_name: 'Polaris', cargo_capacity: 576},
    {display_name: 'Arrastra', cargo_capacity: 576},
    {display_name: 'Zeus Mk2 CL', cargo_capacity: 128},
    {display_name: 'Zeus Mk2 ES', cargo_capacity: 32},
    {display_name: 'Zeus Mk2 MR', cargo_capacity: 16},
    
  ])


  const ship = ref<Ship>()

  return { ships, ship }
})
