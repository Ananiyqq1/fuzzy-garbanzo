<template>
  <AppModal :show="true" :title="modalTitle" @close="$emit('close')">
    <div class="details-grid">
      <div v-for="(item, index) in detailItems" :key="index" class="detail">
        <strong>{{ item.label }}:</strong>
        <span>{{ item.value }}</span>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  details: {
    type: Object,
    required: true,
  },
})

const modalTitle = computed(() => props.details?.courseTitle ?? 'Evaluation Details')

const detailItems = computed(() => {
  const data = props.details ?? {}
  const ratings = data.ratings ?? {}
  const renderStars = count => '★'.repeat(Math.max(0, count ?? 0))

  return [
    { label: 'Submitted On', value: data.submissionDate ?? '—' },
    { label: 'Overall Rating', value: renderStars(ratings.overall) || 'Not rated' },
    { label: 'Content Rating', value: renderStars(ratings.content) || 'Not rated' },
    { label: 'Instructor Rating', value: renderStars(ratings.instructor) || 'Not rated' },
    { label: 'Comments', value: data.comments ?? 'No comments provided.' },
    { label: 'Recommended', value: data.recommend ? 'Yes' : 'No' },
  ]
})
</script>

<style scoped>
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.detail {
  background: rgba(248, 250, 252, 0.7);
  border: 1px solid rgba(226, 232, 240, 0.7);
  border-radius: 0.75rem;
  padding: 1rem;
  color: #1f2937;
  font-size: 0.95rem;
}
</style>
