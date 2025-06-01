<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SearchableDropdown from '../components/SearchableDropdown.vue'
import FieldInput from '../components/FieldInput.vue'
import FieldDropdown from '@/components/FieldDropdown.vue';
import { ContainerSizes } from '@/enums/container-sizes';
import { calculatePayload } from '@/utils/payload-calculator.ts';


const containerSize = ref(32);
const containerVolume = ref(63);

const payloadContainers = ref<any[]>([]); // Initialize payload containers as an empty array

onMounted(() => {
  // Set default values for container size and volume
  containerSize.value = 32; // Default to the first container size
  containerVolume.value = 63; // Default to a reasonable volume#
  generatePayload(); // Generate initial payload based on defaults
});

const generatePayload = () => {
  // Reset payload containers
  payloadContainers.value = [];  
  // Calculate the payload based on the selected container size and volume
  payloadContainers.value = calculatePayload(containerVolume.value, containerSize.value);
};

</script>

<template>
  <main>
    <div class="d-flex flex-column align-items-center justify-content-center w-100 container">
      <h2 class="text-center">Payload Calculator</h2>
    
    <div>
      <p class="bold">This tool calculates the spread of containers you can expect for a given number of SCU, and a maximum container-size</p>
      <p class="text-center" style="font-style: italic">Note that this ignores the existence of 24scu containers because CIG is not using them in contracts</p>
    </div>
    <div class="d-flex my-3 w-100 gap-3">
      <FieldDropdown
            v-model="containerSize"
            :options="ContainerSizes"
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
          @click="generatePayload"
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
      </div>
  </main>
</template>
