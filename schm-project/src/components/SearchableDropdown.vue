<template>
  <div class="w-100">
    <input
      ref="inputField"
      type="text"
      v-model="inputSearch"
      :placeholder="props.placeholder"
      @focus="onFocus"
      @keydown.enter="selectFirstOption()"
      @keydown.tab="selectFirstOption()"
      :disabled="props.disabled"
      class="dropdown-input w-100"
    />
    <div
      v-if="isFocused"
      class="autocomplete w-100"
      style="position: absolute; z-index: 10000; background: white"
    >
      <ul @mouseleave="hideDropdown" @mouseenter="showDropdown">
        <li v-for="(option, i) in filteredOptions" :key="i" @click="setSelection(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
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
import { computed, ref, watch } from 'vue'

import { defineProps } from 'vue'
import type { IOptions } from './Interfaces/Fields'

const inputSearch = ref('')
const inputField = ref()
const selectedOption = ref<IOptions>()

const val = ref('')
const selectFieldInput = () => {
  inputField.value.select()
}
const isFocused = ref(false)

interface IProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  options?: IOptions[]
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])

const onFocus = () => {  
  showDropdown();
  selectFieldInput();
}

const hideDropdown = () => {
  isFocused.value = false
}

const showDropdown = () => {
  isFocused.value = true
}

const isEmpty = (a: string) => {
  return a === null || a === undefined || a.trim() === ''
}

const filteredOptions = computed(() => {
  if (isEmpty(inputSearch.value)) {
    return props.options
  }
  if (inputSearch.value && inputSearch.value?.trim().length > 0) {
    return props.options?.filter(
      (entry) =>
        entry.label.toLowerCase().includes(inputSearch.value.toLowerCase()) ||
        entry.value.toString() == inputSearch.value,
    )
  }
})

const setSelection = (option: IOptions) => {
  val.value = option.value
  inputSearch.value = option.label
  selectedOption.value = option
  hideDropdown()
  onInput()
}
const selectFirstOption = () => {
  if (filteredOptions.value && filteredOptions.value.length && !isEmpty(inputSearch.value)) {
    selectedOption.value = filteredOptions.value[0]
    val.value = selectedOption.value.value
    inputSearch.value = selectedOption.value.label
  } else if (!filteredOptions.value?.length && !isEmpty(inputSearch.value)) {
    if (inputSearch.value) {
      const parsedValue = parseInt(inputSearch.value)
      if (!isNaN(parsedValue)) {
        const selectedOption = props.options?.find((option) => option.value === parsedValue)
        if (selectedOption) {
          val.value = selectedOption.value
          inputSearch.value = selectedOption.label
        }
      }
    }
  }
}

watch(
  () => props.modelValue,
  (newValue) => (val.value = newValue ?? ''),
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
