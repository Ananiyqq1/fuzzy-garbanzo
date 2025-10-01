<template>
  <AppModal :show="true" title="Upload Resource" size="lg" @close="$emit('close')">
    <form class="upload-form" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label" for="resource-title">Resource Title</label>
        <input
          id="resource-title"
          v-model="form.title"
          type="text"
          placeholder="Enter resource title"
          required
        />
      </div>

      <div class="field-grid">
        <div class="field">
          <label class="label" for="resource-course">Course</label>
          <select id="resource-course" v-model="form.course" required>
            <option value="" disabled>Select a course</option>
            <option v-for="course in courseOptions" :key="course.value" :value="course.value">
              {{ course.label }}
            </option>
          </select>
        </div>

        <div class="field">
          <label class="label" for="resource-type">Resource Type</label>
          <select id="resource-type" v-model="form.type" required>
            <option value="" disabled>Select resource type</option>
            <option v-for="type in typeOptions" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label" for="resource-file">File</label>
        <label class="file-input">
          <input id="resource-file" type="file" @change="handleFile" required />
          <span>{{ form.fileName || 'Choose file...' }}</span>
        </label>
      </div>

      <div class="field">
        <label class="label" for="resource-description">Description</label>
        <textarea
          id="resource-description"
          v-model="form.description"
          placeholder="Describe this resource"
          rows="4"
        ></textarea>
      </div>

      <div class="actions">
        <AppButton variant="secondary" type="button" @click="$emit('close')">Cancel</AppButton>
        <AppButton type="submit">Upload Resource</AppButton>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  initialValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  title: '',
  course: '',
  type: '',
  description: '',
  file: null,
  fileName: ''
})

const courseOptions = [
  { value: 'CS201', label: 'CS201 - Data Structures' },
  { value: 'CS202', label: 'CS202 - Database Systems' },
  { value: 'CS301', label: 'CS301 - Algorithms' },
  { value: 'CS305', label: 'CS305 - Computer Networks' },
  { value: 'CS320', label: 'CS320 - Software Engineering' }
]

const typeOptions = [
  { value: 'lecture', label: 'Lecture Notes' },
  { value: 'book', label: 'Textbook' },
  { value: 'paper', label: 'Research Paper' },
  { value: 'video', label: 'Video Lecture' },
  { value: 'other', label: 'Other' }
]

watch(
  () => props.initialValue,
  value => {
    Object.assign(form, {
      title: value.title || '',
      course: value.course || '',
      type: value.type || '',
      description: value.description || '',
      file: null,
      fileName: ''
    })
  },
  { immediate: true, deep: true }
)

function handleFile(event) {
  const file = event.target.files?.[0]
  form.file = file || null
  form.fileName = file ? file.name : ''
}

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<style scoped>
.upload-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
}

input[type='text'],
select,
textarea {
  border-radius: 0.85rem;
  border: 1px solid rgba(209, 213, 219, 0.8);
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #111827;
  background: rgba(249, 250, 251, 0.9);
  transition: border-color 0.2s ease;
}

input[type='text']:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.12);
}

textarea {
  resize: vertical;
}

.file-input {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: 0.85rem;
  border: 1px dashed rgba(156, 163, 175, 0.8);
  background: rgba(249, 250, 251, 0.9);
  cursor: pointer;
  color: #6b7280;
}

.file-input input[type='file'] {
  display: none;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

@media (max-width: 480px) {
  .actions {
    flex-direction: column;
  }
}
</style>
