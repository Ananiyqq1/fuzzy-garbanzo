<template>
  <section
    v-show="isActive"
    class="app-tab-panel"
    role="tabpanel"
  >
    <slot />
  </section>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})

const currentValue = inject('appTabsValue')

const isActive = computed(() => currentValue?.value === props.value)
</script>

<style scoped>
.app-tab-panel {
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
