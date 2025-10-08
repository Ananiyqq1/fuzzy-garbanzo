<template>
  <transition name="toast-fade">
    <div v-if="modelValue" class="toast-notification" :class="positionClass">
      <div class="toast-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 11a1 1 0 110 2 1 1 0 010-2zm0-8a1 1 0 00-1 1v5a1 1 0 002 0V6a1 1 0 00-1-1z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div class="toast-content">
        <strong>{{ resolvedTitle }}</strong>
        <span>{{ message }}</span>
      </div>
      <button class="toast-close" type="button" @click="handleDismiss">✕</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Notifications'
  },
  duration: {
    type: Number,
    default: 3200
  },
  position: {
    type: String as () => 'top-right' | 'bottom-center',
    default: 'top-right'
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'dismiss'): void
}>()

const resolvedTitle = computed(() => props.title || 'Notifications')
const toastTimer = ref<number | null>(null)

const clearTimer = () => {
  if (toastTimer.value !== null) {
    window.clearTimeout(toastTimer.value)
    toastTimer.value = null
  }
}

const handleDismiss = () => {
  clearTimer()
  emit('update:modelValue', false)
  emit('dismiss')
}

watch(
  () => props.modelValue,
  value => {
    clearTimer()
    if (value && props.duration > 0) {
      toastTimer.value = window.setTimeout(() => {
        handleDismiss()
      }, props.duration)
    }
  }
)

onBeforeUnmount(() => {
  clearTimer()
})

const positionClass = computed(() => {
  return props.position === 'bottom-center' ? 'is-bottom-center' : 'is-top-right'
})
</script>

<style scoped>
.toast-notification {
  position: fixed;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.92);
  color: #111827;
  border-radius: 1.1rem;
  box-shadow: 0 22px 44px -24px rgba(15, 23, 42, 0.35);
  border: 1px solid rgba(17, 24, 39, 0.08);
  backdrop-filter: blur(12px);
  z-index: 100;
}

.toast-notification.is-top-right {
  top: 1.5rem;
  right: 1.5rem;
}

.toast-notification.is-bottom-center {
  left: 1rem;
  right: 1rem;
  bottom: 1.5rem;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(55, 65, 81, 0.85));
  color: #f9fafb;
}

.toast-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
}

.toast-content strong {
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  color: #111827;
}

.toast-content span {
  color: rgba(55, 65, 81, 0.85);
}

.toast-close {
  appearance: none;
  border: none;
  background: transparent;
  color: rgba(55, 65, 81, 0.7);
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.5rem;
  transition: background 0.2s ease;
}

.toast-close:hover {
  background: rgba(17, 24, 39, 0.08);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .toast-notification.is-top-right {
    left: 1rem;
    right: 1rem;
    top: auto;
    bottom: 1.5rem;
  }
}
</style>
