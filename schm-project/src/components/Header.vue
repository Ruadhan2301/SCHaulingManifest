<template>
  <div class="header">
    <div id="title" class="d-flex flex-wrap">
      <h4 >Star Citizen Hauling Manifest</h4>
      <Button 
        v-if="route.path!='/calculator'" 
        class="btn btn-primary ml-auto" 
        @click="$router.push('/calculator')">
        Payload Calculator
      </Button>
      <Button 
        v-if="route.path=='/calculator'" 
        class="btn btn-primary ml-auto" 
        @click="$router.push('/')">
        Close Calculator
      </Button>
      <!--<SearchableDropdown 
            :options="selectableShips"
            v-model="shipName"
            placeholder="Select ship.."
            label=""  
            class="ship-selector"/>-->
    </div>
    <Tabs v-if="route.path!='/calculator'" />
    <NewContractForm v-if="route.path == '/'" style="z-index: 10000;" />
    <EditContractForm :isActive="useContractStore().showEditContractModal" :contract="useContractStore().editContract" ></EditContractForm>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import NewContractForm from '@/components/NewContractForm.vue'
import { useRoute } from 'vue-router'
import SearchableDropdown from './SearchableDropdown.vue';
import {useShipStore} from '@/stores/use-ship-store.ts'
import { useContractStore } from '@/stores/use-contract-store';
import { computed,ref,watch } from 'vue'
import EditContractForm from '@/components/EditContractForm.vue'

const shipStore = useShipStore();
const shipName = ref<string>('')

const selectableShips = computed(() => {
  return shipStore.ships.map((ship) => {
    return { value: ship, label: ship.display_name + " " + ship.cargo_capacity + "scu" }
  })
});

watch (() => shipName.value, (newVal) => {
  shipStore.ship = selectableShips.value.find((ship) => ship.label === newVal)?.value;
});
const route = useRoute()
</script>

<style scoped>
.header{
    position: sticky;
    top: 0;
    background: white;
    z-index: 1000;
}
#title {
  padding: 0.5rem 0.5rem;
  background-color: #2c5768;
  color:white;
  margin-bottom:2px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
#title h4 {
  font-weight:bold;
  font-size: larger;
}
#title p {
  font-size: small;
  color: #ffd400;
  margin-bottom: 0.25rem;
}

.ship-selector {
    max-width: 15rem;
    margin: 0.5rem;
  }

@media (min-width: 1024px) {
  #title {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
