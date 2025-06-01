import { ContainerSizes } from '@/enums/container-sizes';
import { computed } from 'vue';

export function calculatePayload (volume: number, maxSize: number) {
  
  //For each container size, calculate the number of containers needed to fill the remaining volume
  let remainingVolume = volume;
  let payloads = []; // Reset the payload containers array
  // Loop through the container sizes in descending order
  for (let i = ContainerSizes.length - 1; i >= 0; i--) {
    const containerSizeValue = ContainerSizes[i].value;
    if(containerSizeValue > maxSize) {
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
  return payloads;
};