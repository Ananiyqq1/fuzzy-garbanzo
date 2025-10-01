<template>
  <div class="form-group" :class="{ 'has-error': error, 'is-focused': isFocused }">
    <label v-if="label" class="form-label" :for="textareaId">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <div class="textarea-wrapper">
      <textarea
        :id="textareaId"
        class="form-textarea"
        :class="[size, { 'is-invalid': error } ]"
        :rows="rows"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :required="required"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div v-if="error || helperText" class="textarea-feedback">
      <span v-if="error" class="form-error">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </span>
      <span v-else-if="helperText" class="helper-text">{{ helperText }}</span>
    </div>
    <div v-if="showCharCount && maxlength" class="char-count">
      {{ (modelValue || '').length }}/{{ maxlength }}
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
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
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
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: null
  },
  showCharCount: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const isFocused = ref(false)
const textareaId = computed(() => `textarea-${Math.random().toString(36).slice(2, 9)}`)

const onInput = (event) => {
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
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--secondary-gray, #6b7280);
  font-weight: 500;
}

.required-indicator {
  color: var(--error-red, #ef4444);
  margin-left: 0.2rem;
}

.textarea-wrapper {
  position: relative;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem var(--spacing-lg, 1rem);
  border-radius: var(--radius-md, 0.75rem);
  border: 1px solid var(--border-gray, #e5e7eb);
  background: var(--light-bg, #f9fafb);
  font-size: var(--font-size-base, 1rem);
  font-family: inherit;
  color: var(--primary-dark, #111827);
  resize: vertical;
  transition: all var(--transition-fast, 0.2s ease);
}

.form-textarea.small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.form-textarea.large {
  padding: 1rem 1.25rem;
  font-size: 1.0625rem;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--primary-dark, #111827);
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.12);
  background: var(--white, #ffffff);
}

.form-textarea:disabled {
  background: var(--bg-gray, #f3f4f6);
  color: var(--light-gray, #9ca3af);
  cursor: not-allowed;
}

.form-textarea.is-invalid {
  border-color: var(--error-red, #ef4444);
}

.textarea-feedback {
  font-size: var(--font-size-xs, 0.75rem);
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
}

.form-error {
  color: var(--error-red, #ef4444);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.helper-text {
  color: var(--light-gray, #9ca3af);
}

.char-count {
  font-size: var(--font-size-xs, 0.75rem);
  color: var(--light-gray, #9ca3af);
  text-align: right;
}
</style>
