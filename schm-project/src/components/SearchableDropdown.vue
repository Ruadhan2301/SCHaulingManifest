<template>
  <div class="w-100">
    <label v-show="props.label" class="bold" style="margin-left: 0.25rem">{{ props.label }}</label>
    <input
      ref="inputField"
      type="text"
      v-model="inputSearch"
      :placeholder="props.placeholder"
      @focus="onFocus"
      @keydown.enter="selectFirstOption()"
      @keydown.tab="selectFirstOption()"
      :disabled="props.disabled"
      class="dropdown-input w-100 mt-1"
    />
    <div
      v-if="isFocused"
      class="autocomplete w-100"
      style="position: absolute; z-index: 10000; background: white"
    >
      <ul @mouseleave="hideDropdown">
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
  max-width: 20rem;
}
li {
  color:black;
}
</style>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'

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
  label?: string
}

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
})

const emit = defineEmits(['update:modelValue'])

const onFocus = () => {
  showDropdown()
  selectFieldInput()
}

onMounted(() => {
  if (props.modelValue) {
    const selectedOption = props.options?.find((option) => option.value === props.modelValue)
    if (selectedOption) {
      inputSearch.value = selectedOption.label
    }
    val.value = props.modelValue
  }
})

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
        entry.label.toLowerCase().replace(/[^a-z0-9]/gi, '').includes(inputSearch.value.toLowerCase().replace(/[^a-z0-9]/gi, '')) ||
        entry.value.toString() == inputSearch.value,
    )
  }
})

const setSelection = (option: IOptions) => {
  val.value = option.value
  inputSearch.value = option.label
  selectedOption.value = option
  onInput()
  hideDropdown()
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

  console.log('inputSearch', inputSearch.value)
  if(val.value != inputSearch.value){
    val.value = inputSearch.value;
  }
  console.log('val A', val.value)
  onInput()
  hideDropdown()
}

watch(
  () => inputSearch.value,
  (newValue,oldvalue) => {
    if (newValue === '') {
      console.log('empty')
      val.value = '';
      onInput();
    }
    if(newValue != val.value){
      showDropdown();
    }
  },
)

watch(
  () => props.modelValue,
  (newValue,oldvalue) => {
    if(val.value != newValue){
      val.value = newValue ?? '';
      console.log('setting inputSearch',newValue)
      inputSearch.value = props.options?.find((option) => option.value.toString().replace(/[^a-z0-9]/gi, '') === newValue!.replace(/[^a-z0-9]/gi, ''))?.label ?? newValue ?? '';
    }
  },
  {
    immediate: true,
  },
)
const onInput = () => {
  
  console.log('val', val.value)
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
