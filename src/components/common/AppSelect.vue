<template>
  <div class="form-group" :class="{ 'has-error': error, 'is-focused': isFocused }">
    <label v-if="label" class="form-label" :for="selectId">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <div class="select-container">
      <div v-if="$slots.prefix" class="select-prefix">
        <slot name="prefix" />
      </div>
      <select
        :id="selectId"
        class="form-select"
        :class="[size, { 'has-prefix': !!$slots.prefix, 'is-invalid': error }]"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
        <slot />
      </select>
      <div class="select-icon">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <div v-if="error || helperText" class="select-feedback">
      <span v-if="error" class="form-error">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </span>
      <span v-else-if="helperText" class="helper-text">{{ helperText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  error: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const isFocused = ref(false)
const selectId = computed(() => `select-${Math.random().toString(36).slice(2, 9)}`)

const onChange = (event) => {
  emit('update:modelValue', event.target.value)
}

const onFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const onBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: var(--font-size-xs);
  color: var(--secondary-gray, #6b7280);
  font-weight: 500;
}

.required-indicator {
  color: var(--error-red, #ef4444);
  margin-left: 0.2rem;
}

.select-container {
  position: relative;
}

.form-select {
  width: 100%;
  appearance: none;
  background: var(--light-bg, #f9fafb);
  border: 1px solid var(--border-gray, #e5e7eb);
  border-radius: var(--radius-sm, 0.75rem);
  padding: 0.75rem 3rem 0.75rem 1rem;
  font-size: var(--font-size-base, 1rem);
  color: var(--primary-dark, #111827);
  transition: all var(--transition-fast, 0.2s ease);
}

.form-select.small {
  padding: 0.5rem 2.75rem 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.form-select.large {
  padding: 1rem 3.25rem 1rem 1.25rem;
  font-size: 1.0625rem;
}

.form-select.has-prefix {
  padding-left: 2.75rem;
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-dark, #111827);
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.12);
  background: var(--white, #ffffff);
}

.form-select:disabled {
  background: var(--bg-gray, #f3f4f6);
  color: var(--light-gray, #9ca3af);
  cursor: not-allowed;
}

.form-select.is-invalid {
  border-color: var(--error-red, #ef4444);
}

.select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--light-gray, #9ca3af);
}

.select-prefix {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--light-gray, #9ca3af);
  pointer-events: none;
}

.select-feedback {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--light-gray, #9ca3af);
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.form-error {
  color: var(--error-red, #ef4444);
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
}
</style>
