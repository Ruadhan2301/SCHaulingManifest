<script setup lang="ts">
import NewContractForm from '../components/NewContractForm.vue'
import type { Contract } from '../models/contract'
import { onMounted, ref } from 'vue'
import { useContractStore } from '../stores/use-contract-store'
import { PayloadStatus } from '../enums/payload-status'

const { contracts } = useContractStore();

onMounted(() => {
})
</script>

<style scoped>
.contract-block {
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.25rem grey;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.contract-block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 0.25rem;
}
.contract-block-body {
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
  padding: 0.25rem 0.5rem;
}
.circle-count {
  border-radius: 100%;
  background-color: rgb(0, 135, 189);
  color: white;
  padding: 0.25rem;
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-weight: bold;
  padding-top: 0.65rem;
}
</style>

<template>
  <main>
    <!--<NewContractForm />-->
    <div id="main-contract-list">
      <div v-for="contract in contracts" id="destination-instance" class="contract-block">
        <div id="destination-instance-header" class="contract-block-header d-flex">
          <h2>{{ contract.name }}</h2>
          <h2>{{ contract.price }}<span class="bold" style="font-size: medium"> auec</span></h2>
        </div>
        <div v-for="payload in contract.payloads" class="contract-block-body">
          <div id="destination-instance-payload" class="d-flex">
            <div class="w-100">
              <div class="d-flex" style="position: relative">
                <div class="circle-count">x{{ payload.quantity }}</div>
                <div style="position: relative; width: 100%">
                  <div style="position: relative">
                    <div
                      style="
                        left: 0.25rem;
                        top: -50%;
                        transform: translateY(50%);
                        position: absolute;
                      "
                    >
                      {{ payload.commodityID }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
            <div style="width: auto; text-wrap: nowrap">Status: {{ payload.status }}</div>
            <Button class="btn btn-primary" v-if="payload.status === PayloadStatus.Ready" @click="payload.status = PayloadStatus.Collected">Collect</Button>
            <Button class="btn btn-primary" v-if="payload.status === PayloadStatus.Collected" @click="payload.status = PayloadStatus.Delivered">Delivered</Button>
          </div>
          </div>
          <p>{{ payload.originID }} -> {{ payload.destinationID }}</p>
        </div>
      </div>
    </div>
    <div id="main-destination-list"></div>
  </main>
</template>
