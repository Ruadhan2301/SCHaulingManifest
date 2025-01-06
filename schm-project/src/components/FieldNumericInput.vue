<template>
  <input type="number" v-model="val" placeholder="" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { defineProps } from 'vue';

const props = defineProps<{
  value: number;
}>();
const val = ref<number>(props.value);

</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
}

li {
  padding: 8px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>

