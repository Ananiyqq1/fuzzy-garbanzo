<template>
  <AppModal :show="true" title="Create New Session" size="xl" @close="handleClose">
    <form class="form" @submit.prevent="submitForm">
      <div class="grid">
        <div class="field">
          <label class="label" for="session-title">Session Title</label>
          <input
            id="session-title"
            v-model="form.title"
            type="text"
            placeholder="Enter session title"
            required
          />
        </div>

        <div class="field">
          <label class="label" for="session-topic">Session Topic</label>
          <input
            id="session-topic"
            v-model="form.topic"
            type="text"
            placeholder="Enter session topic"
            required
          />
        </div>
      </div>

      <div class="grid">
        <div class="field">
          <label class="label" for="session-date">Date</label>
          <input id="session-date" v-model="form.date" type="date" required />
        </div>

        <div class="field">
          <label class="label" for="session-time">Time</label>
          <input id="session-time" v-model="form.time" type="time" required />
        </div>
      </div>

      <div class="field">
        <label class="label" for="session-description">Session Description</label>
        <textarea
          id="session-description"
          v-model="form.description"
          placeholder="Describe the goals, topics, or activities for this session"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="form-footer">
        <div class="actions">
          <AppButton type="button" variant="secondary" @click="handleClose">Cancel</AppButton>
          <AppButton type="submit">Create Session</AppButton>
        </div>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { reactive } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  title: '',
  topic: '',
  date: '',
  time: '',
  description: '',
})

function handleClose() {
  emit('close')
}

function submitForm() {
  emit('submit', { ...form })
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
}

input,
select,
textarea {
  border-radius: 0.85rem;
  border: 1px solid rgba(209, 213, 219, 0.8);
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #111827;
  background: rgba(249, 250, 251, 0.95);
  transition: border-color 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.12);
}

textarea {
  resize: vertical;
}

.form-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: #374151;
}

.checkbox input {
  width: 1.1rem;
  height: 1.1rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .actions {
    width: 100%;
    flex-direction: column;
  }

  .actions :deep(button) {
    width: 100%;
  }
}
</style>
