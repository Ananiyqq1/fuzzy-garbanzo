<template>
  <section class="app-form-section">
    <header v-if="title || $slots.header" class="section-header">
      <div class="header-text">
        <h3 v-if="title" class="section-title">{{ title }}</h3>
        <div v-else class="section-title">
          <slot name="header" />
        </div>
        <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
        <div v-else-if="$slots.subtitle" class="section-subtitle">
          <slot name="subtitle" />
        </div>
      </div>
      <div v-if="$slots.actions" class="section-actions">
        <slot name="actions" />
      </div>
    </header>

    <div class="section-body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="section-footer">
      <slot name="footer" />
    </footer>
  </section>
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
  }
})
</script>

<style scoped>
.app-form-section {
  background: rgba(255, 255, 255, 0.75);
  border-radius: var(--radius-xl, 1rem);
  border: 1px solid rgba(229, 231, 235, 0.45);
  padding: clamp(1.25rem, 1.8vw, 1.75rem);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-lg, 1rem);
  border-bottom: 1px solid rgba(229, 231, 235, 0.6);
  padding-bottom: 1rem;
  flex-wrap: wrap;
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: clamp(1.125rem, 1.8vw, 1.5rem);
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.section-subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.section-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-footer {
  border-top: 1px solid rgba(229, 231, 235, 0.6);
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .section-footer {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
