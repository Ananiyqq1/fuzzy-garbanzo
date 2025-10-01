<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div 
        v-if="show" 
        class="modal-overlay" 
        :class="{ 'no-backdrop': !showBackdrop }"
        @click="handleBackdropClick"
      >
        <div 
          class="modal-content" 
          :class="[size, { 'full-screen': fullScreen }]"
          @click.stop
          role="dialog"
          :aria-labelledby="titleId"
          :aria-describedby="contentId"
        >
          <!-- Modal Header -->
          <div v-if="$slots.header || title || showCloseButton" class="modal-header">
            <div class="modal-title-section">
              <div v-if="icon" class="modal-icon">
                <i :class="icon"></i>
              </div>
              <div class="modal-title-content">
                <h2 v-if="title" :id="titleId" class="modal-title">{{ title }}</h2>
                <p v-if="subtitle" class="modal-subtitle">{{ subtitle }}</p>
                <slot name="header"></slot>
              </div>
            </div>
            
            <button 
              v-if="showCloseButton"
              class="modal-close-btn"
              @click="handleClose"
              :title="closeButtonTitle"
              aria-label="Close modal"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body" :id="contentId">
            <div v-if="isLoading" class="modal-loading">
              <div class="loading-spinner"></div>
              <p>{{ loadingText }}</p>
            </div>
            <div v-else>
              <slot></slot>
            </div>
          </div>

          <!-- Modal Footer -->
          <div v-if="$slots.footer || showDefaultActions" class="modal-footer">
            <slot name="footer">
              <div v-if="showDefaultActions" class="modal-actions">
                <AppButton 
                  v-if="showCancelButton"
                  variant="secondary" 
                  @click="handleCancel"
                  :disabled="isLoading"
                >
                  {{ cancelButtonText }}
                </AppButton>
                <AppButton 
                  v-if="showConfirmButton"
                  :variant="confirmButtonVariant"
                  @click="handleConfirm"
                  :is-loading="isLoading"
                  :disabled="confirmDisabled"
                >
                  {{ confirmButtonText }}
                </AppButton>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import AppButton from './AppButton.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'extra-large'].includes(value)
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  showBackdrop: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  closeOnEscape: {
    type: Boolean,
    default: true
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  closeButtonTitle: {
    type: String,
    default: 'Close'
  },
  showDefaultActions: {
    type: Boolean,
    default: false
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel'
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm'
  },
  confirmButtonVariant: {
    type: String,
    default: 'primary'
  },
  confirmDisabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  }
})

const emit = defineEmits(['close', 'cancel', 'confirm', 'backdrop-click'])

const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)
const contentId = computed(() => `modal-content-${Math.random().toString(36).substr(2, 9)}`)

const handleClose = () => {
  if (!props.isLoading) {
    emit('close')
  }
}

const handleCancel = () => {
  if (!props.isLoading) {
    emit('cancel')
    emit('close')
  }
}

const handleConfirm = () => {
  if (!props.isLoading && !props.confirmDisabled) {
    emit('confirm')
  }
}

const handleBackdropClick = () => {
  emit('backdrop-click')
  if (props.closeOnBackdrop && !props.isLoading) {
    emit('close')
  }
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.show && !props.isLoading) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  if (props.show) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: var(--backdrop-blur-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.modal-overlay.no-backdrop {
  background: transparent;
  backdrop-filter: none;
}

.modal-content {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Modal Sizes */
.modal-content.small {
  width: 400px;
  max-width: 90vw;
}

.modal-content.medium {
  width: 600px;
  max-width: 90vw;
}

.modal-content.large {
  width: 800px;
  max-width: 90vw;
}

.modal-content.extra-large {
  width: 1200px;
  max-width: 95vw;
}

.modal-content.full-screen {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  border-radius: 0;
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--spacing-2xl);
  border-bottom: 1px solid var(--border-gray);
  background: var(--light-bg);
}

.modal-title-section {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  flex: 1;
}

.modal-icon {
  padding: var(--spacing-md);
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.modal-icon i {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--white);
  font-size: var(--font-size-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-title-content {
  flex: 1;
}

.modal-title {
  font-size: var(--font-size-2xl);
  font-weight: bold;
  color: var(--primary-dark);
  margin: 0 0 var(--spacing-xs) 0;
  line-height: 1.2;
}

.modal-subtitle {
  font-size: var(--font-size-sm);
  color: var(--light-gray);
  margin: 0;
  line-height: 1.4;
}

.modal-close-btn {
  padding: var(--spacing-sm);
  background: var(--bg-gray);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.modal-close-btn:hover {
  background: var(--border-gray);
  transform: scale(1.05);
}

.modal-close-btn i {
  color: var(--secondary-gray);
  font-size: var(--font-size-lg);
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal Body */
.modal-body {
  flex: 1;
  padding: var(--spacing-2xl);
  overflow-y: auto;
  color: var(--secondary-gray);
  line-height: 1.6;
}

.modal-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl);
  gap: var(--spacing-lg);
}

.modal-loading p {
  color: var(--light-gray);
  font-size: var(--font-size-sm);
}

/* Modal Footer */
.modal-footer {
  padding: var(--spacing-2xl);
  border-top: 1px solid var(--border-gray);
  background: var(--light-bg);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
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

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-md);
  }
  
  .modal-content {
    width: 100% !important;
    max-width: 100% !important;
    border-radius: var(--radius-lg);
  }
  
  .modal-header {
    padding: var(--spacing-xl);
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
  
  .modal-title-section {
    align-items: center;
  }
  
  .modal-close-btn {
    align-self: flex-end;
  }
  
  .modal-body {
    padding: var(--spacing-xl);
  }
  
  .modal-footer {
    padding: var(--spacing-xl);
  }
  
  .modal-actions {
    flex-direction: column-reverse;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: var(--spacing-sm);
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: var(--spacing-lg);
  }
  
  .modal-title {
    font-size: var(--font-size-xl);
  }
  
  .modal-icon {
    padding: var(--spacing-sm);
  }
  
  .modal-icon i {
    width: 1.25rem;
    height: 1.25rem;
    font-size: var(--font-size-base);
  }
}
</style>