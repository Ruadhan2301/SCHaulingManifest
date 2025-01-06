<template>
  <input type="text" v-model="props.searchQuery" placeholder="" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { defineProps } from 'vue';
const props = defineProps<{
  options: string[];
  searchQuery: string;
}>();

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

