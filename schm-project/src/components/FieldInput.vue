<template>
  <div>
    <label v-show="props.label" class="bold" style="margin-left: 0.25rem">{{ props.label }}</label>
    <input
      type="text"
      v-model="val"
      :placeholder="props.placeholder"
      class="dropdown-input w-100 mt-1"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps } from 'vue'

interface IProps {
  modelValue?: any
  disabled?: boolean
  placeholder?: string
  label?: string
}

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
})

const val = ref('')

watch(
  () => props.modelValue,
  (newValue) => (val.value = newValue),
  {
    immediate: true,
  },
)
const onInput = () => {
  emit('update:modelValue', val.value)
}
</script>

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
