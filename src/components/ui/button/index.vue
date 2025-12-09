<template>
  <button @click="onClick">
    <slot>Botão</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Button, type ButtonEmits } from './button.types'
const props = withDefaults(defineProps<Button>(), { color: '#0671af', height: 40 })
const emits = defineEmits<ButtonEmits>()

const btnBgColor = computed(() => props.color)
const btnHeight = computed(() => `${props.height}px`)

const onClick = (e: PointerEvent) => {
  e.preventDefault()
  emits('onClick')
}
</script>

<style scoped>
button {
  padding: 10px 18px;
  border-radius: 30px;
  font-size: 16px;
  border: solid 0px;
  cursor: pointer;
  background-color: v-bind(btnBgColor);
  color: white;
  height: v-bind(btnHeight);
}

button:active {
  transform: translateY(2px);
}

button::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 0;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none;
}

button:active::after {
  animation: ripple 0.4s ease-out;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(35);
    opacity: 0;
  }
}
</style>
