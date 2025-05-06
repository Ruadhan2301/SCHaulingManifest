<template>
  <div class="w-100">
    <label v-show="props.label" class="bold" style="margin-left: 0.25rem">{{ props.label }}</label>
    <select 
      ref="inputField"
      type="text"
      v-model="val"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      @change="onInput"
      class="dropdown-input w-100 mt-1"
    >
      <option v-for="(option, i) in options" :key="i" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.dropdown-input {
  padding: 8px;
  border: 1px solid #ccc;
}
.autocomplete {
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
}
</style>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'

import { defineProps } from 'vue'
import type { IOptions } from './Interfaces/Fields'

const selectedOption = ref<IOptions>()

const val = ref('')
const isFocused = ref(false)

interface IProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  options?: IOptions[]
  label?: string
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  (newValue,oldvalue) => (val.value = newValue ?? ''),
  {
    immediate: true,
  },
)
const onInput = () => {
  emit('update:modelValue', val.value)
}
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
