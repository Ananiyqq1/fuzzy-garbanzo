<template>
  <AppModal :show="true" title="Upload Document" size="lg" @close="handleClose">
    <form class="upload-form" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label" for="resource-title">Title</label>
        <input id="resource-title" v-model="form.title" type="text" placeholder="Enter document title" required />
      </div>

      <div class="field-grid">
        <!-- <div class="field">
          <label class="label" for="resource-uploader-id">Uploader Id</label>
          <input
          id="resource-uploader-id"
          v-model="form.uploaderId"
          type="text"
          disabled
          required
        />
        </div> -->

        <!-- <div class="field">
          <label class="label" for="resource-room-id">Room Id</label>
          <input
          id="resource-room-id" 
            v-model="props.roomId"
          type="text" 
          required
          disabled
        />
        </div> -->
      </div>

      <div class="field">
        <label class="label" for="resource-file">File</label>
        <v-file-input
          id="resource-file"
          v-model="selectedFiles"
          label="Select a document"
          prepend-icon="mdi-file-upload"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.mp4,.mp3,.png,.jpg"
          show-size
          :multiple="false"
          :disabled="isSubmitting"
          required
        />
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="actions">
        <AppButton variant="secondary" type="button" :disabled="isSubmitting" @click="handleClose">
          Cancel
        </AppButton>
        <AppButton type="submit" :disabled="isSubmitting">
          <template v-if="isSubmitting">
            Uploading...
          </template>
          <template v-else>
            Upload Resource
          </template>
        </AppButton>
      </div>
    </form>
  </AppModal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'
import { uploadDocument, type UploadResult } from '../api/UploadDoc'
import { useDocStore } from '@/stores/useDocStore'
import { useAuthStore } from '@/stores/useAuthStore'

interface UploadFormState {
  title: string
  file: File | null
}

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

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: UploadResult): void
}>()

const form = reactive<UploadFormState>({
  title: '',
  file: null,
})

const isSubmitting = ref(false)
const errorMessage = ref('')

const docStore = useDocStore()
const authStore = useAuthStore()
const selectedFiles = ref<File[] | File | null>(null)

watch(
  () => props.initialValue,
  value => {
    form.title = (value?.title as string) ?? ''
  },
  { immediate: true, deep: true }
)

watch(
  () => props.roomId,
  () => {
    // ensure file must be reselected if room changes
    form.file = null
    selectedFiles.value = null
  }
)

watch(
  () => selectedFiles.value,
  files => {
    if (Array.isArray(files)) {
      form.file = files[0] ?? null
    } else if (files instanceof File) {
      form.file = files
    } else {
      form.file = null
    }
  }
)

function resetForm() {
  form.title = ''
  form.file = null
  errorMessage.value = ''
  selectedFiles.value = null
}

function handleClose() {
  resetForm()
  emit('close')
}

async function handleSubmit() {
  if (!form.title.trim()) {
    errorMessage.value = 'Please provide a document title.'
    return
  }

  if (!form.file) {
    errorMessage.value = 'Please select a file to upload.'
    return
  }

  if (!props.roomId) {
    errorMessage.value = 'A valid room identifier is required to upload.'
    return
  }

  const uploaderId = authStore.user?.user_id

  if (!uploaderId) {
    errorMessage.value = 'You must be signed in to upload a document.'
    return
  }

  try {
    isSubmitting.value = true
    errorMessage.value = ''

    const result = await uploadDocument(
      {
        title: form.title.trim(),
        roomId: props.roomId,
        uploaderId,
      },
      form.file
    )

    docStore.setUploadedDocument({
      docId: result.docId,
      docKey: result.docKey,
      docTitle: result.docTitle,
      downloadUrl: result.downloadUrl,
    })

    emit('submit', result)
    handleClose()
  } catch (error: any) {
    console.error('Upload failed', error)
    errorMessage.value = error?.response?.data?.message || 'Upload failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
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

.error-message {
  margin: 0;
  color: #dc2626;
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .actions {
    flex-direction: column;
  }
}
</style>
