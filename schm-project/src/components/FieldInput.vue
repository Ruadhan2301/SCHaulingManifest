<template>
  <input 
  type="text" 
  v-model="val" 
  placeholder="" 
  @input="onInput"/>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineProps } from 'vue';

interface IProps {
  modelValue?: any;
  disabled?: boolean;
}

const emit = defineEmits([
  'update:modelValue'
]);

const props = withDefaults(defineProps<IProps>(), {
  disabled: false
});

const val = ref('');

watch(() => props.modelValue, newValue => (val.value = newValue),
{
  immediate: true
})
const onInput = () => {
  emit('update:modelValue', val.value);
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

