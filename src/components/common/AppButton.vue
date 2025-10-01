<template>
  <button 
    :type="type" 
    :disabled="disabled" 
    class="btn" 
    :class="[variant, size, { loading: isLoading, 'full-width': fullWidth }]"
    @click="handleClick"
  >
    <i v-if="icon && !isLoading" :class="icon" class="btn-icon"></i>
    <div v-if="isLoading" class="loading-spinner"></div>
    <span v-if="$slots.default" class="btn-text">
      <slot />
    </span>
    <i v-if="rightIcon && !isLoading" :class="rightIcon" class="btn-icon btn-icon-right"></i>
  </button>
</template>

<script setup>
const props = defineProps({
  type: { 
    type: String, 
    default: 'button' 
  },
  disabled: { 
    type: Boolean, 
    default: false 
  },
  variant: { 
    type: String, 
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost', 'danger', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  icon: {
    type: String,
    default: ''
  },
  rightIcon: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled && !props.isLoading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: 0.75rem 2.8125rem;
  border-radius: 1.25rem;
  border: 1px solid var(--primary-dark);
  background-color: var(--primary-dark);
  color: var(--white);
  font-size: var(--font-size-xs);
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.btn:hover:not(:disabled):not(.loading) {
  background-color: var(--primary-gray);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn:active:not(:disabled):not(.loading) {
  transform: scale(0.98);
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.2);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn.loading {
  cursor: not-allowed;
  pointer-events: none;
}

/* Variants */
.btn.secondary {
  background-color: var(--bg-gray);
  border-color: var(--border-gray);
  color: var(--primary-dark);
}

.btn.secondary:hover:not(:disabled):not(.loading) {
  background-color: var(--border-gray);
}

.btn.ghost {
  background-color: transparent;
  border-color: var(--primary-dark);
  color: var(--primary-dark);
}

.btn.ghost:hover:not(:disabled):not(.loading) {
  background-color: var(--primary-dark);
  color: var(--white);
}

.btn.danger {
  background-color: var(--error-red);
  border-color: var(--error-red);
  color: var(--white);
}

.btn.danger:hover:not(:disabled):not(.loading) {
  background-color: #dc2626;
  border-color: #dc2626;
}

.btn.success {
  background-color: #10b981;
  border-color: #10b981;
  color: var(--white);
}

.btn.success:hover:not(:disabled):not(.loading) {
  background-color: #059669;
  border-color: #059669;
}

/* Sizes */
.btn.small {
  padding: 0.5rem 1.5rem;
  font-size: 0.625rem;
  border-radius: 1rem;
}

.btn.medium {
  padding: 0.75rem 2.8125rem;
  font-size: var(--font-size-xs);
  border-radius: 1.25rem;
}

.btn.large {
  padding: 1rem 3.5rem;
  font-size: var(--font-size-sm);
  border-radius: 1.5rem;
}

/* Full Width */
.btn.full-width {
  width: 100%;
}

/* Icons */
.btn-icon {
  font-size: 1em;
  width: 1em;
  height: 1em;
}

.btn-icon-right {
  order: 1;
}

.btn-text {
  display: flex;
  align-items: center;
}

/* Loading Spinner */
.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .btn {
    padding: 0.75rem var(--spacing-xl);
    font-size: var(--font-size-sm);
  }
  
  .btn.small {
    padding: 0.5rem var(--spacing-lg);
  }
  
  .btn.large {
    padding: 1rem var(--spacing-2xl);
  }
}

@media (max-width: 480px) {
  .btn {
    padding: 0.625rem var(--spacing-lg);
  }
  
  .btn.small {
    padding: 0.5rem var(--spacing-md);
  }
  
  .btn.large {
    padding: 0.875rem var(--spacing-xl);
  }
}

/* Hover Effects */
.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}
</style>