<template>
  <div class="app-tabs">
    <div class="tab-list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-trigger"
        :class="{ active: tab.value === currentValue }"
        role="tab"
        :aria-selected="tab.value === currentValue"
        @click="selectTab(tab.value)"
      >
        <i v-if="tab.icon" :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>
    <div class="tab-panels">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { provide, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  tabs: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const currentValue = computed({
  get: () => props.modelValue || (props.tabs[0]?.value ?? ''),
  set: (value) => emit('update:modelValue', value)
})

const selectTab = (value) => {
  currentValue.value = value
}

provide('appTabsValue', currentValue)
</script>

<style scoped>
.app-tabs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.tab-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.875rem;
}

.tab-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 1.25rem;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-trigger:hover {
  background: rgba(17, 24, 39, 0.1);
}

.tab-trigger.active {
  background: #111827;
  color: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(17, 24, 39, 0.25);
}

.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.3);
  font-size: 0.7rem;
}

.tab-panels {
  position: relative;
  width: 100%;
}
</style>
