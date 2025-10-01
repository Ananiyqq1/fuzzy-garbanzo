<template>
  <AppModal :show="true" :title="`Session Materials · ${session.title}`" size="lg" @close="$emit('close')">
    <div class="materials-layout">
      <div class="session-summary">
        <div class="summary-item">
          <span class="label">Date</span>
          <span class="value">{{ session.date || '—' }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Host</span>
          <span class="value">{{ session.host || '—' }}</span>
        </div>
        <div class="summary-item">
          <span class="label">Type</span>
          <span class="value">{{ session.type || '—' }}</span>
        </div>
      </div>

      <div class="materials-list">
        <h4>Available Materials</h4>
        <ul>
          <li v-for="(item, index) in normalizedMaterials" :key="`${item.name}-${index}`">
            <div class="material-icon" :class="item.variant">
              <i :class="item.icon"></i>
            </div>
            <div class="material-meta">
              <div class="material-name">{{ item.name }}</div>
              <div class="material-type">{{ item.type }}</div>
            </div>
            <AppButton size="small" variant="secondary" @click="$emit('action', item)">
              {{ item.action || 'Download' }}
            </AppButton>
          </li>
        </ul>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
})

const iconMap = {
  pdf: { icon: 'fas fa-file-pdf', variant: 'variant-pdf' },
  doc: { icon: 'fas fa-file-alt', variant: 'variant-doc' },
  docx: { icon: 'fas fa-file-alt', variant: 'variant-doc' },
  video: { icon: 'fas fa-video', variant: 'variant-video' },
  link: { icon: 'fas fa-link', variant: 'variant-link' },
  default: { icon: 'fas fa-file', variant: 'variant-default' },
}

const normalizedMaterials = computed(() => {
  if (!Array.isArray(props.session?.materials)) {
    return []
  }

  return props.session.materials.map(item => {
    const key = String(item.type || '').toLowerCase()
    const icon = iconMap[key] || iconMap.default
    return {
      ...item,
      icon: icon.icon,
      variant: icon.variant,
    }
  })
})
</script>

<style scoped>
.materials-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.session-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.summary-item {
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

.materials-list {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(229, 231, 235, 0.6);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.materials-list h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #111827;
}

.materials-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.materials-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: rgba(249, 250, 251, 0.9);
  border: 1px solid rgba(229, 231, 235, 0.6);
}

.material-icon {
  width: 44px;
  height: 44px;
  border-radius: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.material-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.material-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
}

.material-type {
  font-size: 0.85rem;
  color: #6b7280;
}

.variant-pdf {
  background: linear-gradient(135deg, #dc2626, #b91c1c);
}

.variant-doc {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}

.variant-video {
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
}

.variant-link {
  background: linear-gradient(135deg, #059669, #047857);
}

.variant-default {
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

@media (max-width: 640px) {
  .materials-list li {
    flex-direction: column;
    align-items: flex-start;
  }

  .materials-list li > * {
    width: 100%;
  }

  .materials-list li AppButton {
    width: 100%;
  }
}
</style>
