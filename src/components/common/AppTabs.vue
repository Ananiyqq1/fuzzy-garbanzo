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
        <span>{{ tab.label }}</span>
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>
    <div class="tab-panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue';

interface TabItem {
  value: string;
  label: string;
  icon?: string;
  badge?: string | number;
}

interface AppTabsProps {
  modelValue?: string;
  tabs?: TabItem[];
}

const props = withDefaults(defineProps<AppTabsProps>(), {
  modelValue: '',
  tabs: () => [],
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const currentValue = computed({
  get: () => props.modelValue || (props.tabs[0]?.value ?? ''),
  set: (value: string) => emit('update:modelValue', value),
});

const selectTab = (value: string): void => {
  currentValue.value = value;
};

provide('appTabsValue', currentValue);
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
  margin-bottom: 30px;
}

.tab-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 20px;
  margin: 0 10px 10px;
  color: #4b5563;
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1.2;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-trigger:hover {
  background: rgba(17, 24, 39, 0.1);
}

.tab-trigger.active {
  background: #111827;
  color: #ffffff;
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
