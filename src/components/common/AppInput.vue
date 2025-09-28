<template>
  <label class="app-input">
    <span v-if="label">{{ label }}</span>
    <input
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      @input="$emit('update:modelValue', model)"
    />
    <small class="error" v-if="error">{{ error }}</small>
  </label>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  error: String,
});
const emit = defineEmits(['update:modelValue']);
const model = ref(props.modelValue);
watch(() => props.modelValue, (v) => { model.value = v; });
watch(model, (v) => emit('update:modelValue', v));
</script>

<style scoped>
.app-input { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
input { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; }
.error { color: #c00; }
</style>