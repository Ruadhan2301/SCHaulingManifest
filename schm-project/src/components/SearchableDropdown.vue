<template>
  <input type="text" v-model="props.searchQuery" placeholder="Search..." @input="filterOptions" />
  <ul v-if="filteredOptions.length">
    <li v-for="option in filteredOptions" :key="option" @click="selectOption(option)">
      {{ option }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { defineProps } from 'vue';
const props = defineProps<{
  options: string[];
  searchQuery: string;
}>();

const options = ref<string[]>(props.options);

const searchQuery = ref<string>(props.searchQuery);
const filteredOptions = ref<string[]>(options.value);

const filterOptions = () => {
  filteredOptions.value = options.value.filter(option =>
    option.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
};

const selectOption = (option: string) => {
  searchQuery.value = option;
  filteredOptions.value = [];
};
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

