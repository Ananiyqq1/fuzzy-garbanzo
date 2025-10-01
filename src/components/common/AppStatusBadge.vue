<template>
  <span class="app-status-badge" :class="[`variant-${variant}`, size]">
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'neutral',
    validator: (value) => [
      'neutral',
      'success',
      'warning',
      'danger',
      'info'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium'].includes(value)
  }
})
</script>

<style scoped>
.app-status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 0.75rem;
  gap: 0.35rem;
  transition: all var(--transition-fast, 0.2s ease);
}

.app-status-badge.small {
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
}

.variant-neutral {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: #ffffff;
}

.variant-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
}

.variant-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
}

.variant-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #ffffff;
}

.variant-info {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
}
</style>
