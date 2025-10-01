<template>
  <div class="form-group" :class="{ 'has-error': error, 'is-focused': isFocused }">
    <!-- Label -->
    <label v-if="label" class="form-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>

    <!-- Input Container -->
    <div class="input-container">
      <!-- Left Icon -->
      <div v-if="leftIcon" class="input-icon input-icon-left">
        <i :class="leftIcon"></i>
      </div>

      <!-- Input Field -->
      <input
        :id="inputId"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        class="form-input"
        :class="[
          size,
          {
            'has-left-icon': leftIcon,
            'has-right-icon': rightIcon || showPasswordToggle,
            'is-invalid': error
          }
        ]"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />

      <!-- Right Icon / Password Toggle -->
      <div v-if="rightIcon || showPasswordToggle" class="input-icon input-icon-right">
        <button
          v-if="showPasswordToggle"
          type="button"
          class="password-toggle"
          @click="togglePasswordVisibility"
          :title="inputType === 'password' ? 'Show password' : 'Hide password'"
        >
          <i :class="inputType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </button>
        <i v-else-if="rightIcon" :class="rightIcon"></i>
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="input-loading">
        <div class="loading-spinner"></div>
      </div>
    </div>

    <!-- Helper Text / Error Message -->
    <div v-if="error || helperText" class="input-feedback">
      <span v-if="error" class="form-error">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
      </span>
      <span v-else-if="helperText" class="helper-text">{{ helperText }}</span>
    </div>

    <!-- Character Count -->
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
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
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
  leftIcon: {
    type: String,
    default: ''
  },
  rightIcon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  autocomplete: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: null
  },
  min: {
    type: [String, Number],
    default: null
  },
  max: {
    type: [String, Number],
    default: null
  },
  step: {
    type: [String, Number],
    default: null
  },
  showCharCount: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'keydown', 'enter'])

const isFocused = ref(false)
const inputType = ref(props.type)

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const showPasswordToggle = computed(() => {
  return props.type === 'password'
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event) => {
  emit('keydown', event)
  if (event.key === 'Enter') {
    emit('enter', event)
  }
}

const togglePasswordVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>

<style scoped>
.form-group {
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.form-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--secondary-gray);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
  line-height: 1.4;
}

.required-indicator {
  color: var(--error-red);
  margin-left: 2px;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 0.75rem var(--spacing-lg);
  background-color: var(--light-bg);
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-family: inherit;
  color: var(--primary-dark);
  transition: all var(--transition-fast);
  outline: none;
}

.form-input:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
  background-color: var(--white);
}

.form-input:disabled {
  background-color: var(--bg-gray);
  color: var(--light-gray);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-input:readonly {
  background-color: var(--bg-gray);
  cursor: default;
}

.form-input.is-invalid {
  border-color: var(--error-red);
}

.form-input.is-invalid:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
}

/* Input Sizes */
.form-input.small {
  padding: 0.5rem var(--spacing-md);
  font-size: var(--font-size-sm);
}

.form-input.large {
  padding: 1rem var(--spacing-xl);
  font-size: var(--font-size-lg);
}

/* Input with Icons */
.form-input.has-left-icon {
  padding-left: 2.5rem;
}

.form-input.has-right-icon {
  padding-right: 2.5rem;
}

.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--light-gray);
  pointer-events: none;
  z-index: 1;
}

.input-icon-left {
  left: var(--spacing-md);
}

.input-icon-right {
  right: var(--spacing-md);
}

.input-icon i {
  font-size: var(--font-size-base);
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--light-gray);
  transition: color var(--transition-fast);
  pointer-events: auto;
}

.password-toggle:hover {
  color: var(--secondary-gray);
}

.password-toggle:focus {
  outline: none;
  color: var(--primary-dark);
}

.input-loading {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--border-gray);
  border-top: 2px solid var(--primary-dark);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.input-feedback {
  margin-top: var(--spacing-xs);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
}

.form-error {
  color: var(--error-red);
  font-size: var(--font-size-xs);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.form-error i {
  font-size: var(--font-size-xs);
  flex-shrink: 0;
}

.helper-text {
  color: var(--light-gray);
  font-size: var(--font-size-xs);
  line-height: 1.4;
}

.char-count {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--light-gray);
  text-align: right;
}

/* Focus States */
.form-group.is-focused .form-label {
  color: var(--primary-dark);
}

.form-group.has-error .form-label {
  color: var(--error-red);
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-input {
    padding: 0.625rem var(--spacing-md);
    font-size: var(--font-size-sm);
  }
  
  .form-input.small {
    padding: 0.5rem var(--spacing-sm);
  }
  
  .form-input.large {
    padding: 0.875rem var(--spacing-lg);
  }
  
  .form-input.has-left-icon {
    padding-left: 2.25rem;
  }
  
  .form-input.has-right-icon {
    padding-right: 2.25rem;
  }
}

/* Placeholder Styling */
.form-input::placeholder {
  color: var(--lighter-gray);
  opacity: 1;
}

.form-input:disabled::placeholder {
  color: var(--light-gray);
}
</style>