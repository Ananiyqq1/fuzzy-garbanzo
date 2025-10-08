<template>
  <transition name="loading-fade">
    <div
      v-if="visible"
      class="loading-overlay"
      :class="overlayClasses"
    >
      <div class="spinner-wrapper" :class="[`spinner-wrapper--${props.size}`]">
        <div class="spinner-container" :class="[`spinner-container--${props.size}`]">
          <div class="spinner" :class="[`spinner--${props.size}`]"></div>
          <div class="spinner-glow" :class="[`spinner-glow--${props.size}`]"></div>
        </div>
        <div class="loading-text">
          <h3>Loading...</h3>
          <p>Please wait while we prepare your experience</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';

type LoadingSize = 'medium' | 'large';

interface AppLoadingProps {
  show?: boolean;
  duration?: number;
  size?: LoadingSize;
  fullScreen?: boolean;
}

const props = withDefaults(defineProps<AppLoadingProps>(), {
  show: true,
  duration: 3000,
  size: 'medium',
  fullScreen: false,
});

const emit = defineEmits<{
  (event: 'finished'): void;
}>();

const visible = ref(props.show);
let timerId: number | undefined;

const overlayClasses = computed(() => ({
  'loading-overlay--fixed': props.fullScreen,
  'loading-overlay--borderless': props.size === 'large',
}));

const startTimer = (): void => {
  clearTimer();
  if (props.duration > 0) {
    timerId = window.setTimeout(() => {
      visible.value = false;
      emit('finished');
    }, props.duration);
  }
};

const clearTimer = (): void => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = undefined;
  }
};

watch(
  () => props.show,
  (value: boolean) => {
    visible.value = value;
    if (value) {
      startTimer();
    } else {
      clearTimer();
    }
  },
);

watch(
  () => props.duration,
  () => {
    if (visible.value) {
      startTimer();
    }
  },
);

onMounted(() => {
  if (visible.value) {
    startTimer();
  }
});

onUnmounted(() => {
  clearTimer();
});
</script>

<style scoped>


.loading-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: clamp(2rem, 6vh, 4rem);
  z-index: 1500;
  backdrop-filter: blur(20px);
}

.loading-overlay--fixed {
  padding-top: clamp(2.5rem, 8vh, 5rem);
}

.loading-overlay--borderless {
  padding: 0;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 1.75rem;
  padding: 2rem 3rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(229, 231, 235, 0.4);
  box-shadow: 0 25px 55px -16px rgba(17, 24, 39, 0.28);
  max-width: 420px;
  text-align: center;
}

.spinner-wrapper--large {
  gap: 3rem;
  padding: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  background: transparent;
  border: none;
  box-shadow: none;
}

.spinner-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-container--large {
  width: 100%;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 4.5rem;
  height: 4.5rem;
  border: 4px solid rgba(17, 24, 39, 0.12);
  border-top: 4px solid #111827;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  z-index: 2;
}

.spinner--large {
  width: 8.5rem;
  height: 8.5rem;
  border-width: 7px;
}

.spinner-glow {
  position: absolute;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(17, 24, 39, 0.18) 0%, transparent 72%);
  animation: pulse 2s ease-in-out infinite;
}

.spinner-glow--large {
  width: 11rem;
  height: 11rem;
}

.spinner-wrapper--large .loading-text h3 {
  font-size: 1.75rem;
}

.spinner-wrapper--large .loading-text p {
  font-size: 1.125rem;
}
.loading-text h3 {
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.5rem 0;
}

.loading-text p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Responsive Design */
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.3s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
