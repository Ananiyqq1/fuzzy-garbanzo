<template>
  <AppModal :show="true" :title="`Feedback · ${session.title}`" size="lg" @close="$emit('close')">
    <form class="feedback-form" @submit.prevent="$emit('submit', form)">
      <div class="intro">
        <p>Please share your thoughts about this session. Your feedback helps improve future experiences.</p>
      </div>

      <div class="rating-group">
        <label class="label">How would you rate this session?</label>
        <div class="stars">
          <button
            v-for="value in 5"
            :key="value"
            type="button"
            class="star"
            :class="{ active: value <= form.rating }"
            @click="form.rating = value"
            aria-label="Rate session"
          >
            ★
          </button>
        </div>
      </div>

      <div class="field">
        <label class="label" for="feedback-comments">Comments</label>
        <textarea
          id="feedback-comments"
          v-model="form.comments"
          placeholder="What went well? What could be improved?"
          rows="4"
        />
      </div>

      <div class="field">
        <label class="label">Would you recommend this session to others?</label>
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
      </div>

      <div class="actions">
        <AppButton variant="secondary" type="button" @click="$emit('close')">Cancel</AppButton>
        <AppButton type="submit">Submit Feedback</AppButton>
      </div>
    </form>
  </AppModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
})

const form = reactive({
  rating: 0,
  comments: '',
  recommend: 'yes',
})

watch(
  () => props.session,
  () => {
    form.rating = props.session?.feedback?.rating ?? 0
    form.comments = props.session?.feedback?.comments ?? ''
    form.recommend = props.session?.feedback?.recommend ?? 'yes'
  },
  { immediate: true }
)
</script>

<style scoped>
.feedback-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.rating-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stars {
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
