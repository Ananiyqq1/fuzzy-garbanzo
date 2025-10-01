<template>
  <div class="app-content-header" :class="{ 'is-centered': align === 'center' }">
    <div class="header-main">
      <div v-if="$slots.pretitle" class="header-pretitle">
        <slot name="pretitle" />
      </div>
      <h1 v-if="title" class="header-title">{{ title }}</h1>
      <p v-else-if="$slots.title" class="header-title">
        <slot name="title" />
      </p>
      <p v-if="subtitle" class="header-subtitle">{{ subtitle }}</p>
      <div v-else-if="$slots.subtitle" class="header-subtitle">
        <slot name="subtitle" />
      </div>
      <div v-if="$slots.description" class="header-description">
        <slot name="description" />
      </div>
    </div>
    <div v-if="$slots.actions" class="header-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center'].includes(value)
  }
})
</script>

<style scoped>
.app-content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-xl, 1.5rem);
  margin-bottom: var(--spacing-2xl, 2rem);
  flex-wrap: wrap;
}

.app-content-header.is-centered {
  align-items: center;
  text-align: center;
}

.app-content-header.is-centered .header-main {
  width: 100%;
}

.header-main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm, 0.75rem);
}

.header-pretitle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(17, 24, 39, 0.08);
  color: #111827;
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.header-title {
  font-size: clamp(1.875rem, 2.75vw, 2.5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.header-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.header-description {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.6;
}

.header-actions {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm, 0.75rem);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .app-content-header {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions {
    justify-content: flex-start;
  }

  .app-content-header.is-centered .header-actions {
    justify-content: center;
  }
}
</style>
