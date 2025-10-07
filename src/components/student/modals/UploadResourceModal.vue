<template>
  <AppModal :show="true" title="Upload Document" size="lg" @close="$emit('close')">
    <form class="upload-form" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label" for="resource-title">Title</label>
        <input
          id="resource-title"
          v-model="form.title"
          type="text"
          placeholder="Enter document title"
          required
        />
      </div>

      <div class="field-grid">
        <div class="field">
          <label class="label" for="resource-uploader-id">Uploader Id</label>
          <input
          id="resource-uploader-id"
          v-model="form.uploaderId"
          type="text"
          disabled
          required
        />
        </div>

        <div class="field">
          <label class="label" for="resource-room-id">Room Id</label>
          <input
          id="resource-room-id" 
            v-model="props.roomId"
          type="text" 
          required
          disabled
        />
        </div>
      </div>

      <div class="field">
        <label class="label" for="resource-file">File</label>
       <v-file-input label="File input" v-model="form.file"></v-file-input>
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
import {uploadDocument } from '../api/UploadDoc'

const props = defineProps({
  initialValue: {
    type: Object,
    default: () => ({})
  },
  roomId: {
    type: String,
    required: true
  },
  // uploaderId: {
  //   type: String,
  //   required: true
  // }
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  title: '',
  uploaderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  roomId: props.roomId || '', 
  file: null, 
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

 

function handleFile(event) {
  const file = event.target.files?.[0]
  form.file = file || null
  form.fileName = file ? file.name : ''
}

async function handleSubmit() { 
  if(form.file == null){
    alert("Please select a file to upload.");
    return;
  }
var res=await uploadDocument({
  fileName:form.title,
  uploaderId:form.uploaderId,
  roomId:form.roomId,
},form.file);
 if (res.status === 200) {
          alert("File uploaded successfully!");
          emit('close');
        } else {
          alert("Upload failed.");
        }
  // emit('submit', { ...form })
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
