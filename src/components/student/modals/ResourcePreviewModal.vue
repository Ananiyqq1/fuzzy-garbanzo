<template>
  <AppModal :show="true" :title="resource.title" size="lg" @close="$emit('close')">
    <div class="preview-layout">
      <div class="meta-grid">
        <div class="meta-item">
          <span class="label">Course</span>
          <span class="value">{{ resource.course }}</span>
        </div>
        <div class="meta-item">
          <span class="label">Type</span>
          <span class="value">{{ resource.typeLabel }}</span>
        </div>
        <div class="meta-item">
          <span class="label">Uploaded</span>
          <span class="value">{{ resource.updatedAt || resource.metaText }}</span>
        </div>
      </div>

      <div class="preview-pane">
        <h4>Overview</h4>
        <p>{{ resource.description }}</p>
        <div class="preview-content">
          <slot name="content">
            <p v-if="resource.preview">
              {{ resource.preview }}
            </p>
            <p v-else class="placeholder">
              Preview content is not available for this file. Download to view the full resource.
            </p>
          </slot>
        </div>
      </div>

      <div class="actions">
        <AppButton variant="secondary" @click="$emit('close')">Close</AppButton>
        <AppButton @click="$emit('download', resource)">
          {{ resource.actionLabel || 'Download' }}
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  resource: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.preview-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.meta-item {
  background: rgba(248, 250, 252, 0.78);
  border: 1px solid rgba(226, 232, 240, 0.7);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
}

.preview-pane {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(229, 231, 235, 0.6);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-pane h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #111827;
}

.preview-pane p {
  margin: 0;
  line-height: 1.6;
  color: #4b5563;
}

.preview-content {
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 0.85rem;
  padding: 1rem;
  min-height: 180px;
  background: rgba(249, 250, 251, 0.9);
  overflow-y: auto;
}

.placeholder {
  color: #9ca3af;
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
