<template>
  <div class="header">
    <div id="title" class="d-flex flex-wrap">
      <div>
        <h4 >Star Citizen Hauling Manifest</h4>
        <h3 class="bold">{{ route.name }}</h3>
      </div>
      <div class="hamburger-menu" style="position: relative;">
        <button
          class="btn"
          @click="menuOpen = !menuOpen"
          style="background: none; border: none; font-size: 2rem; color: white; margin-left: 1rem;"
        >
          &#9776;
        </button>
        <div ref="dropdownRef"
          v-if="menuOpen"
          class="dropdown"
          style="position: absolute; right: 0; top: 2.5rem; background: white; border: 1px solid #ccc; border-radius: 0.5rem; z-index: 2000; min-width: 10rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15);"
        >
          <div class="dropdown-item" @click="goTo('/')">Contracts</div>
          <div class="dropdown-item" @click="goTo('/destinations')">Location</div>
          <div class="dropdown-item" @click="goTo('/history')">History</div>
          <div class="dropdown-item" @click="goTo('/calculator')">Calculator</div>
        </div>
      </div>
      <!--<Button 
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
      </Button>-->
      <!--<SearchableDropdown 
            :options="selectableShips"
            v-model="shipName"
            placeholder="Select ship.."
            label=""  
            class="ship-selector"/>-->
      <!--Create hamburger menu for tabs-->

    </div>
    <Tabs v-if="route.path!='/calculator'" />
    <NewContractForm v-if="route.path == '/'" style="z-index: 10000;" />
    <EditContractForm :isActive="useContractStore().showEditContractModal" :contract="useContractStore().editContract" ></EditContractForm>
  </div>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import NewContractForm from '@/components/NewContractForm.vue'
import { useRoute, useRouter } from 'vue-router'
import SearchableDropdown from './SearchableDropdown.vue';
import {useShipStore} from '@/stores/use-ship-store.ts'
import { useContractStore } from '@/stores/use-contract-store';
import { computed,ref,watch } from 'vue'
import EditContractForm from '@/components/EditContractForm.vue'
import { onClickOutside } from '@vueuse/core'

const dropdownRef = ref()
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
const router = useRouter()

const menuOpen = ref(false)
function goTo(path: string) {
  menuOpen.value = false
  if (route.path !== path) {
    router.push(path)
  }
}

const hideDropdown = () => {
  menuOpen.value = false
}

onClickOutside(dropdownRef, hideDropdown)

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
.hamburger-menu .dropdown {
  min-width: 10rem;
}
.dropdown-item {
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  color: #2c5768;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}
.dropdown-item:last-child {
  border-bottom: none;
}
.dropdown-item:hover {
  background: #f0f4f8;
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
