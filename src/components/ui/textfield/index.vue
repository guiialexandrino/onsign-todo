<template>
  <input class="input-style" v-model="inputValue" @keydown.enter="onPressEnter"></input>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextField, TextFieldEmits } from './textfield.types';

const inputValue = defineModel<string>()
const props = withDefaults(defineProps<TextField>(), {  height: 38 })
const emits = defineEmits<TextFieldEmits>()

const inputHeight = computed(() => `${props.height}px`)
const onPressEnter = () => {
  emits('onPressEnter')
}
</script>

<style>
.input-style {
  padding: 0px 12px;
  border: 1px solid lightgray;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  color: var(--text-color);
  height: v-bind(inputHeight) !important;
}

.input-style:focus {
  border: 1px solid #0671af !important;
}
</style>
