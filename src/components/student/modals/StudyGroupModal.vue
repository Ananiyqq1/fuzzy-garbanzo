<template>
  <AppModal :show="true" title="Create New Study Group" @close="$emit('close')">
    <form class="form" @submit.prevent="$emit('create', form)">
      <AppInput v-model="form.name" label="Group Name" required />
      <AppInput v-model="form.topic" label="Study Topic" />
      <label class="app-input">
        <span>Description</span>
        <textarea v-model="form.description" rows="4"></textarea>
      </label>
      <div class="actions">
        <AppButton variant="secondary" type="button" @click="$emit('close')">Cancel</AppButton>
        <AppButton type="submit">Create Group</AppButton>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppInput from '../../common/AppInput.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  initialValue: {
    type: Object,
    default: () => ({ name: '', topic: '', description: '' }),
  },
})

const form = reactive({ name: '', topic: '', description: '' })

watch(
  () => props.initialValue,
  value => Object.assign(form, value ?? { name: '', topic: '', description: '' }),
  { immediate: true, deep: true }
)
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #374151;
  font-weight: 600;
}

textarea {
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.4);
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #1f2937;
  background: rgba(248, 250, 252, 0.75);
  transition: border-color 0.2s ease;
}

textarea:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
