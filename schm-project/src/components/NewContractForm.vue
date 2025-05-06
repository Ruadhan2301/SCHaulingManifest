<template>
  <div class="w-100 text-center md-flex">
    <Button class="btn btn-secondary w-100 my-1 mx-auto" style="max-width: 25rem" @click="OpenNewContract"
      >New Contract</Button>
    <Button class="btn btn-secondary w-100 my-1 mx-auto" style="max-width: 25rem" @click="OpenCaptureMode"
      >Capture Mode (Experimental)</Button>
      
  </div>
  
  <div style="position: absolute; top:0;">
  <div v-show="showForm" class="w-100 h-100" style="background-color: #00000080; position: fixed; left:0;top:0;">
    
    <div class="new-contract-form" style="top: 5rem; left: 50%; transform: translateX(-50%);">
      
      <div>
      <div class="d-flex my-2">
        <h3>New Contract</h3>
        <div
          class="btn btn-secondary float-right"
          style="margin-left: auto; width: 5rem; float: right"
          @click="closeContract"
        >
          Close
        </div>
      </div>
      <div v-show="captureMode" class="text-center">
        <div>
          <div class="d-flex d-none" v-show="!loadingCapture">
            <video id="video" class="d-none">Video stream not available.</video>
            <canvas id="canvas" class="d-none"></canvas>
            <img id="photo" alt="The screen capture will appear in this box." class="mx-auto" style="width:19rem;height:10rem; background-color: grey;" />
          </div>
          <div v-if="!loadingCapture" class="mx-auto p-2" style="background-color: whitesmoke;">
            <p>
            This is an experimental feature
          </p><p>
            It will request permission to access your screen, and if provided with a version of your Monitor which has the Contract data (ie: Star Citizen) it will take a screenshot and pass it to the Tesseract OCR API.
          </p><p>
            No information is saved, and the image is deleted/overwritten every time you use this function.
          </p><p>
            The picture is purely used to extract Contract data in the following formats:</p>
            <p>"Collect (Commodity) from (Origin)"</p>
            <p>"Deliver (Quantity) to (Destination)"</p>
            
          </div>
          <div v-if="loadingCapture" class="mx-auto" style="width:19rem;height:10rem; background-color: lightgrey;">
            <div class="spinner-border text-primary mt-3" style="color:grey !important; --bs-spinner-width: 5rem;
    --bs-spinner-height: 5rem;" role="status">
              <span class="sr-only"></span>
            </div>
            <div>Loading...</div>
          </div>
        </div>
        <Button v-if="!canCapture" class="btn btn-secondary w-100 my-1 mx-auto" style="max-width: 25rem" @click="setTarget"
        >Get Started</Button>
        <Button v-if="canCapture" :disabled="loadingCapture" class="btn btn-secondary w-100 my-1 mx-auto" style="max-width: 25rem" @click="testimage"
        >Capture Screen</Button>
      </div>
      <div v-if="!captureMode">
      <div class="d-flex mb-3 w-100">
        <FieldInput
          v-model="newContract.name"
          placeholder="Contract Name.."
          label="Contract Name"
        />
        <FieldInput v-model="newContract.price" placeholder="price*" label="Payout (auec)" />
      </div>
      <div v-if="addingPayload" class="border-thin p-3">
        <div class="d-flex mb-3 w-100 gap-3">
          <SearchableDropdown
            :options="selectableCommodities"
            v-model="newPayload.commodityID"
            placeholder="Commodity.."
            label="Commodity"
          />
          <FieldInput
            v-model="newPayload.quantity"
            placeholder="quantity.."
            label="Quantity (scu)"
          />
        </div>
        <div class="d-flex mb-3 w-100">
          <SearchableDropdown
            :options="selectableLocations"
            v-model="newPayload.originID"
            placeholder="Origin.."
            label="Origin"
          /><span class="mx-3 mt-4" style="font-weight: bold; font-size: xx-large">➧</span>
          <SearchableDropdown
            :options="selectableLocations"
            v-model="newPayload.destinationID"
            placeholder="Destination.."
            label="Destination"
          />
        </div>
        <div class="d-flex">
          <div class="btn btn-primary" @click="closePayload">Cancel</div>
          <Button
          v-if="!editingPayload"
            class="btn btn-secondary"
            style="margin-left: auto"
            :disabled="newPayloadValid"
            @click="closePayloadAndAdd"
            >Add</Button
          >
          <Button
          v-if="editingPayload"
            class="btn btn-secondary"
            style="margin-left: auto"
            :disabled="newPayloadValid"
            @click="closePayloadAndUpdate"
            >Update</Button
          >
        </div>
      </div>
      <div v-else style="position: relative; max-height: 15rem; overflow-y: auto;">
        <div v-for="payload in newContract.payloads" class="new-contract-form-payloadblock">
          <div>Commodity: {{ payload.commodityID }}</div>
          <div>Quantity: {{ payload.quantity }}scu</div>
          <div>Origin: {{ payload.originID }}</div>
          <div>Destination: {{ payload.destinationID }}</div>
          <Button class="btn btn-secondary" @click="openPayload(payload)">Edit</Button>
        </div>
      </div>

      <div
        v-if="!addingPayload"
        class="mb-3"
        style="background: whitesmoke; padding: 0.5rem; text-align: center"
      >
        <div class="btn btn-primary ml-auto" @click="addPayload">Add Payload</div>
      </div>
      <div class="w-100 text-center">
        <Button
          class="btn btn-primary text-center mx-auto mt-4"
          style="min-width: 8rem"
          @click="submitContract"
          :disabled="!contractValid"
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { PayloadStatus } from '@/enums/payload-status'
import type { Contract } from '@/models/contract'
import { useContractStore } from '@/stores/use-contract-store'
import { computed, onMounted, ref } from 'vue'
import { Locations } from '@/enums/locations'
import { Commodities } from '@/enums/commodities'
import SearchableDropdown from './SearchableDropdown.vue'
import FieldInput from './FieldInput.vue'
import type { Payload } from '@/models/payload'
import { createWorker } from 'tesseract.js';

const locations = Object.values(Locations) as string[]
const commodities = Object.values(Commodities) as string[]

const captureMode = ref(false);
const loadingCapture = ref(false);

let width = 1920;    // We will scale the photo width to this
  let height = 1080;     // This will be computed based on the input stream

  let streaming = false;

  let video:any = null;
  let canvas:any = null;
  let photo:any = null;
  let startButton:any = null;

  onMounted(() => {
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  startButton = document.getElementById('start-button');
console.log(video);

    video.addEventListener(
    "canplay",
    () => {
      if (!streaming) {
        height = (video.videoHeight / video.videoWidth) * width;

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        streaming = true;
        // immediately take a screenshot
        getPhoto();
      }
    },
    false,
  );
  })

const getPhoto = () => {
  const context = canvas.getContext("2d");
        if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);

          const data = canvas.toDataURL("image/png");
          photo.setAttribute("src", data);
        } else {
          clearImage();
        }
}

async function getMedia() {

  clearImage();

  //Get screenshot of the user's screen
  await navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: "monitor",
    },
    audio: false
  })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error(`An error occurred: ${err}`);
  });
  
  
}

const clearImage = () => {
  const context = canvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
}
const canCapture = ref(false);
const setTarget = () => {
  getMedia();
  canCapture.value = true;
}

const testimage = async () =>
{
  loadingCapture.value = true;
  getPhoto();
  //await getMedia();
  //run Tesseract against media
  if(!photo) return;
    const worker = await createWorker('eng');
    const ret = await worker.recognize(photo);
    parseResults(ret.data.text);
    await worker.terminate();
  
  loadingCapture.value = false;
}

const parseResults = (text:string) =>
{
  //split string by regex looking for ©, < or > symbols
  let rows = text.split(/[©©<>]/);

  //Identify strings that start with ©, < or > symbols and end with ©, <, > or \ symbols, and return as an array
  const matchedStrings = text.match(/[©¢<>][^©¢<>\\]*[.]/g) || [];

  //let rows = text.split('©');

  //text =text.replace('© ', '') //cleanup
  let missionText = []
  
  for (let i in matchedStrings){
    let outputString = matchedStrings[i].replace(/[©¢<>]/g,'').trim();
    outputString = outputString.split('.')[0];
    if(outputString.startsWith("Collect")){      
      missionText.push(outputString);
    }
    if(outputString.startsWith("Deliver")){
      missionText.push(outputString);
    }
  }

  let commodity = ''
  let origin = ''
  let destination = ''
  let quantity = 0;
  newContract.value = {
    id: useContractStore().contracts.length,
    name: 'Contract ' + (useContractStore().contracts.length + 1),
    payloads: [],
  }
  for(let i in missionText){
    let row = missionText[i];
    if(row.startsWith("Collect")){
        //Extract Commodity
        //Extract Origin
        let text = row.replace('Collect ','').replace(' from ',',').replace('.','').replace('LS','L5');
        let textParts = text.split(',');
        commodity = textParts[0];
        origin = textParts[1];
    }
    if(row.startsWith("Deliver") || row.startsWith("Oeliver")){
      //Extract Quantity
      //Extract Destination
        let text = row.replace('Deliver ','').replace('Oeliver ','').replace(' to ',',').replace('.','').replace('LS','L5');
        let textParts = text.split(',');
        quantity = Number.parseInt(textParts[0].replace('0/','').replace(' SCU',''));
        destination = textParts[1];
        newContract.value.payloads.push({
          id: newContract.value.payloads.length,
          commodityID: commodity,
          originID: origin,
          destinationID: destination,
          quantity: quantity,
          status: PayloadStatus.Ready
        })
    }
  }
  captureMode.value = false;
}


const selectableLocations = computed(() => {
  return locations.map((location) => {
    return { value: location, label: location }
  })
})

const selectableCommodities = computed(() => {
  return commodities.map((commodity) => {
    return { value: commodity, label: commodity }
  })
})

const showForm = ref(false)
const addingPayload = ref(false)
const editingPayload = ref(false)

const newContract = ref<Contract>({
  id: -1,
  name: '',
  price: 0,
  payloads: [],
})

const newPayload = ref<Payload>({
  commodityID: '',
  originID: '',
  destinationID: '',
  status: PayloadStatus.Ready,
})

const contractValid = computed(() => {
  return (
    newContract.value &&
    newContract.value.name &&
    newContract.value.price &&
    newContract.value.payloads.length > 0
  )
})

const newPayloadValid = computed(() => {
  return (
    !newPayload.value.commodityID ||
    !newPayload.value.originID ||
    !newPayload.value.destinationID ||
    !newPayload.value.quantity
  )
})

const openPayload = (payload: Payload) => {
  newPayload.value = payload;
  addingPayload.value = true;
  editingPayload.value = true;
}

const OpenCaptureMode = () => {

  newContract.value = {
    id: useContractStore().contracts.length,
    name: 'Contract ' + (useContractStore().contracts.length + 1),
    payloads: [],
  }

  captureMode.value = true;
  showForm.value = true;
}

const OpenNewContract = () => {
  newContract.value = {
    id: useContractStore().contracts.length,
    name: 'Contract ' + (useContractStore().contracts.length + 1),
    payloads: [],
  }
  captureMode.value = false;
  showForm.value = true
}
const closeContract = () => {
  showForm.value = false
}
const submitContract = () => {
  useContractStore().addContract(newContract.value)
  showForm.value = false
}

const closePayload = () => {
  addingPayload.value = false
}
const closePayloadAndAdd = () => {
  if (
    !newPayload.value.commodityID ||
    !newPayload.value.originID ||
    !newPayload.value.destinationID ||
    !newPayload.value.quantity
  ) {
    return
  }
  newContract.value.payloads.push({ id: newContract.value.payloads.length, ...newPayload.value })
  addingPayload.value = false
}

const closePayloadAndUpdate = () => {
  if (
    !newPayload.value.commodityID ||
    !newPayload.value.originID ||
    !newPayload.value.destinationID ||
    !newPayload.value.quantity
  ) {
    return
  }
  newContract.value.payloads = newContract.value.payloads.filter((p) => p.id != newPayload.value.id);
  newContract.value.payloads.push({...newPayload.value })

  addingPayload.value = false
}

const addPayload = () => {
  addingPayload.value = true;
  newPayload.value = {
    ...newPayload.value,
    id: newContract.value.payloads.length,
    commodityID: '',
    quantity: 0,
    status: PayloadStatus.Ready,
  }
}
</script>

<style scoped>
.new-contract-form {
  position: absolute;
  border: 1px solid black;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  min-width: 50%;
  margin-top: 0rem;
  padding: 0.5rem;
}
.new-contract-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 0.25rem;
}
.new-contract-form-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}
.new-contract-form-payloadblock {
  padding: 0.25rem 0.5rem;
}
.new-contract-form-payloadblock:nth-child(odd) {
  background-color: lightgrey;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}
.border-thin {
  border: 1px solid black;
  margin: 0.25rem;
}

@media (max-width: 1024px) {
  .new-contract-form {
    width: 100% !important;
  }
}
</style>
