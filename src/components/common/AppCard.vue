<template>
  <div 
    class="card" 
    :class="[variant, { clickable: clickable, loading: isLoading }]"
    @click="handleClick"
  >
    <!-- Card Header -->
    <div v-if="$slots.header || title || icon" class="card-header">
      <div class="card-title-section">
        <div v-if="icon" class="card-icon">
          <i :class="icon"></i>
        </div>
        <div v-if="title || $slots.header" class="card-title-content">
          <h3 v-if="title" class="card-title">{{ title }}</h3>
          <slot name="header"></slot>
        </div>
      </div>
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <div v-if="isLoading" class="card-loading">
        <div class="loading-spinner"></div>
        <p>{{ loadingText }}</p>
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>

    <!-- Hover Overlay -->
    <div v-if="clickable" class="card-overlay"></div>
  </div>
</template>

<script setup lang="ts">
type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat';

interface AppCardProps {
  title?: string;
  icon?: string;
  variant?: CardVariant;
  clickable?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const props = withDefaults(defineProps<AppCardProps>(), {
  title: '',
  icon: '',
  variant: 'default',
  clickable: false,
  isLoading: false,
  loadingText: 'Loading...',
});

const emit = defineEmits<{
  (event: 'click', value: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent): void => {
  if (props.clickable && !props.isLoading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: var(--backdrop-blur-sm);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: var(--spacing-xl);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.card.clickable {
  cursor: pointer;
}

.card.loading {
  pointer-events: none;
}

/* Card Variants */
.card.elevated {
  box-shadow: var(--shadow-lg);
}

.card.outlined {
  border: 2px solid var(--border-gray);
  background: var(--white);
}

.card.flat {
  box-shadow: none;
  border: none;
  background: var(--light-bg);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-gray);
}

.card-title-section {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  flex: 1;
}

.card-icon {
  padding: var(--spacing-md);
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  transition: transform var(--transition-normal);
  flex-shrink: 0;
}

.card:hover .card-icon {
  transform: scale(1.1);
}

.card-icon i {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--white);
  font-size: var(--font-size-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title-content {
  flex: 1;
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--primary-dark);
  margin: 0 0 var(--spacing-sm) 0;
  transition: color var(--transition-normal);
  line-height: 1.2;
}

.card:hover .card-title {
  color: var(--primary-gray);
}

.card-actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: flex-start;
}

/* Card Body */
.card-body {
  flex: 1;
  color: var(--light-gray);
  line-height: 1.6;
}

.card-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  gap: var(--spacing-lg);
}

.card-loading p {
  color: var(--secondary-gray);
  font-size: var(--font-size-sm);
}

/* Card Footer */
.card-footer {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-gray);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
}

/* Hover Overlay */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.05) 0%, rgba(55, 65, 81, 0.05) 100%);
  opacity: 0;
  transition: opacity var(--transition-normal);
  pointer-events: none;
}

.card.clickable:hover .card-overlay {
  opacity: 1;
}

/* Loading Spinner */
.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--border-gray);
  border-top: 2px solid var(--primary-dark);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .card {
    padding: var(--spacing-lg);
  }
  
  .card-header {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
  
  .card-title-section {
    align-items: center;
  }
  
  .card-actions {
    justify-content: flex-end;
  }
  
  .card-footer {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .card {
    padding: var(--spacing-lg);
  }
  
  .card-title {
    font-size: var(--font-size-lg);
  }
  
  .card-icon {
    padding: var(--spacing-sm);
  }
  
  .card-icon i {
    width: 1.25rem;
    height: 1.25rem;
    font-size: var(--font-size-base);
  }
}

/* Special Card Types */
.card.stats {
  text-align: center;
}

.card.stats .card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.card.stats .stat-number {
  font-size: var(--font-size-3xl);
  font-weight: bold;
  color: var(--primary-dark);
  line-height: 1;
}

.card.stats .stat-label {
  font-size: var(--font-size-sm);
  color: var(--light-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card.notification {
  border-left: 4px solid var(--primary-dark);
}

.card.notification.success {
  border-left-color: #10b981;
}

.card.notification.warning {
  border-left-color: #f59e0b;
}

.card.notification.error {
  border-left-color: var(--error-red);
}

</style>