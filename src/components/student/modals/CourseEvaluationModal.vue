<template>
  <AppModal :show="true" title="Course Evaluation" size="lg" @close="$emit('close')">
    <form class="evaluation-form" @submit.prevent="handleSubmit">
      <div class="intro">
        <h3>{{ courseTitle }}</h3>
        <p>Please provide your feedback for this course. Your evaluation helps improve the learning experience for everyone.</p>
      </div>

      <div class="rating-section">
        <label class="label">Overall Rating</label>
        <div class="rating-stars">
          <button
            v-for="value in starScale"
            :key="`overall-${value}`"
            type="button"
            class="star"
            :class="{ active: value <= form.overall }"
            @click="setRating('overall', value)"
          >
            ★
          </button>
        </div>
      </div>

      <!-- <div class="rating-section">
        <label class="label">Course Content Rating</label>
        <div class="rating-stars">
          <button
            v-for="value in starScale"
            :key="`content-${value}`"
            type="button"
            class="star"
            :class="{ active: value <= form.content }"
            @click="setRating('content', value)"
          >
            ★
          </button>
        </div>
      </div> -->

      <!-- <div class="rating-section">
        <label class="label">Instructor Rating</label>
        <div class="rating-stars">
          <button
            v-for="value in starScale"
            :key="`instructor-${value}`"
            type="button"
            class="star"
            :class="{ active: value <= form.instructor }"
            @click="setRating('instructor', value)"
          >
            ★
          </button>
        </div>
      </div> -->

      <div class="field">
        <label class="label" for="evaluation-comments">Comments</label>
        <textarea
          id="evaluation-comments"
          v-model="form.comments"
          placeholder="What did you like about this course? How could it be improved?"
          rows="4"
        />
      </div>
<!-- 
      <div class="field">
        <label class="label">Would you recommend this course to other students?</label>
        <div class="radio-group">
          <label>
            <input type="radio" value="yes" v-model="form.recommend" />
            Yes
          </label>
          <label>
            <input type="radio" value="no" v-model="form.recommend" />
            No
          </label>
        </div>
      </div> -->

      <div class="actions">
        <AppButton variant="secondary" type="button" @click="$emit('close')">Cancel</AppButton>
        <AppButton type="submit">Submit Evaluation</AppButton>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'submit'])

const starScale = [1, 2, 3, 4, 5]

const form = reactive({
  overall: 0,
  // content: 0,
  // instructor: 0,
  comments: '',
  // recommend: 'yes',
})

const courseTitle = computed(() => props.course?.title ?? 'Course')

watch(
  () => props.course,
  value => {
    Object.assign(form, {
      overall: value?.ratings?.overall ?? 0,
      // content: value?.ratings?.content ?? 0,
      // instructor: value?.ratings?.instructor ?? 0,
      comments: value?.feedback?.comments ?? '',
      // recommend: value?.feedback?.recommend ?? 'yes',
    })
  },
  { immediate: true, deep: true }
)

function setRating(field, value) {
  form[field] = value
}

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<style scoped>
.evaluation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.intro h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #111827;
}

.intro p {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
}

.rating-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 0.5rem;
}

.star {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #d1d5db;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.star:hover,
.star:focus {
  transform: scale(1.1);
}

.star.active {
  color: #f59e0b;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

textarea {
  border-radius: 0.85rem;
  border: 1px solid rgba(209, 213, 219, 0.8);
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #111827;
  background: rgba(249, 250, 251, 0.9);
  transition: border-color 0.2s ease;
}

textarea:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.12);
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  color: #4b5563;
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
