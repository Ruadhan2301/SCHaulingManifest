<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchableDropdown from '../components/SearchableDropdown.vue'
import FieldInput from '../components/FieldInput.vue'
import FieldDropdown from '@/components/FieldDropdown.vue';

onMounted(() => {

});

const containerSizes = [
  { value: 1, label: '1 scu' },
  { value: 2, label: '2 scu' },
  { value: 4, label: '4 scu' },
  { value: 8, label: '8 scu' },
  { value: 16, label: '16 scu' },
  { value: 32, label: '32 scu' },
];

const containerSize = ref(1);
const containerVolume = ref(1);

const payloadContainers = ref<any[]>([]); // Initialize payload containers as an empty array

const calculatePayload = () => {
  
  //For each container size, calculate the number of containers needed to fill the remaining volume
  let remainingVolume = containerVolume.value;
  let payloads = []; // Reset the payload containers array
  // Loop through the container sizes in descending order
  for (let i = containerSizes.length - 1; i >= 0; i--) {
    const containerSizeValue = containerSizes[i].value;
    if(containerSizeValue > containerSize.value) {
      continue; // Skip if the container size is larger than the selected size
    }
    const numContainers = Math.floor(remainingVolume / containerSizeValue);
    if (numContainers > 0) {
      payloads.push({
        size: containerSizeValue,
        quantity: numContainers,
      });
      remainingVolume -= numContainers * containerSizeValue;
    }
  }
  payloadContainers.value = payloads;
};

</script>

<template>
  <main>
    <div class="d-flex my-3 w-100 gap-3">
      <FieldDropdown
            v-model="containerSize"
            :options="containerSizes"
          label="Max Container Size"/>
          <!--dropdown-->
        <FieldInput
            v-model="containerVolume"
            placeholder="quantity.."
            label="Total Quantity (scu)"
          />
      </div>
      <div class="w-100 text-center">
        <Button
          class="btn btn-primary text-center mx-auto mt-4"
          style="min-width: 8rem"
          @click="calculatePayload"
          :disabled="!containerSize || !containerVolume || containerVolume < containerSize"
        >
          Submit
        </Button>
      </div>
      <!--Display payloadContainers as a grid of two wide and three down-->
      <div v-if="payloadContainers.length > 0" class="w-100 mt-4">
        <h3 class="text-center">Payload Containers</h3>
        <div class="m-3 d-flex flex-wrap justify-content-center">
          <div
            v-for="(container, index) in payloadContainers"
            :key="index"
            class="my-2 d-flex"
            style="position: relative; width: 50%"
          >
          <div
            class="d-flex"
            style="
              position: absolute;
              width: 90%;
              height: 100%;
              border-radius: 0.5rem;
              background-color: #f0f0f0;
              padding: 1rem;
              z-index: -1;
              left:0.5rem;

            "
          ></div>
            <div class="circle-count">x{{ container.quantity }}</div>
            <div style="position: relative; width: 100%">
              <div style="position: relative">
                <div
                  style="
                    left: 0.25rem;
                    padding-left:0.25rem;
                    padding-right:0.25rem;
                    
                    top: -50%;
                    transform: translateY(50%);
                    position: absolute;
                  "
                  class="bold"
                >
                  {{ container.size }} scu
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
  </main>
</template>
