<template>
  <div class="app-filter-bar" :class="{ 'is-stacked': stacked }">
    <div class="filter-start">
      <slot />
    </div>
    <div v-if="$slots.actions" class="filter-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stacked: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.app-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg, 1rem);
  padding: 1.25rem;
  border-radius: var(--radius-xl, 1rem);
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  backdrop-filter: blur(10px);
  flex-wrap: wrap;
}

.app-filter-bar.is-stacked {
  flex-direction: column;
  align-items: stretch;
}

.filter-start {
  display: flex;
  flex: 1;
  gap: var(--spacing-md, 0.875rem);
  flex-wrap: wrap;
}

.filter-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm, 0.75rem);
}

@media (max-width: 768px) {
  .app-filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-actions {
    justify-content: flex-start;
  }
}
</style>
