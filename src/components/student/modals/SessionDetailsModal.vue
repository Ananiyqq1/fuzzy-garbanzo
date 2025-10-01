<template>
  <AppModal :show="true" :title="session.title" size="xl" @close="$emit('close')">
    <div class="details-wrapper">
      <div class="primary-info">
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Status</span>
            <span class="detail-value status" :class="statusVariant">{{ session.status }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Date &amp; Time</span>
            <span class="detail-value">{{ session.datetime }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Type</span>
            <span class="detail-value">{{ session.type }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Host</span>
            <span class="detail-value">{{ session.host }}</span>
          </div>
        </div>

        <div class="description">
          <h4>Description</h4>
          <p>{{ session.description }}</p>
        </div>

        <div class="participants" v-if="session.participants?.length">
          <h4>Participants</h4>
          <div class="participant-list">
            <span v-for="participant in session.participants" :key="participant" class="participant-chip">
              {{ participant }}
            </span>
          </div>
        </div>
      </div>

      <div class="sidebar">
        <div class="countdown" v-if="countdown">
          <h4>Starts In</h4>
          <div class="countdown-grid">
            <div class="countdown-item">
              <div class="value">{{ countdown.days }}</div>
              <div class="label">Days</div>
            </div>
            <div class="countdown-item">
              <div class="value">{{ countdown.hours }}</div>
              <div class="label">Hours</div>
            </div>
            <div class="countdown-item">
              <div class="value">{{ countdown.minutes }}</div>
              <div class="label">Minutes</div>
            </div>
            <div class="countdown-item">
              <div class="value">{{ countdown.seconds }}</div>
              <div class="label">Seconds</div>
            </div>
          </div>
        </div>

        <div class="actions">
          <AppButton block @click="$emit('join', session)">
            Join Session
          </AppButton>
          <AppButton block variant="secondary" @click="$emit('open-materials', session)">
            View Materials
          </AppButton>
          <AppButton block variant="secondary" @click="$emit('open-feedback', session)">
            Leave Feedback
          </AppButton>
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
})

const countdown = ref(null)
let intervalId = null

const statusVariant = computed(() => {
  const mapping = {
    Upcoming: 'status-upcoming',
    Ongoing: 'status-ongoing',
    Completed: 'status-completed',
  }
  return mapping[props.session.status] ?? 'status-default'
})

const sessionStart = computed(() => {
  const start = props.session.startAt
  if (!start) return null
  const date = new Date(start)
  return Number.isNaN(date.getTime()) ? null : date
})

function updateCountdown() {
  const target = sessionStart.value
  if (!target) {
    countdown.value = null
    return
  }

  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) {
    countdown.value = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

onMounted(() => {
  updateCountdown()
  intervalId = window.setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.details-wrapper {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.5rem;
}

.primary-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.detail-item {
  background: rgba(248, 250, 252, 0.75);
  border: 1px solid rgba(226, 232, 240, 0.7);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.detail-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
}

.detail-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
}

.status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
}

.status-upcoming {
  background: rgba(245, 158, 11, 0.15);
  color: #b45309;
}

.status-ongoing {
  background: rgba(16, 185, 129, 0.18);
  color: #047857;
}

.status-completed {
  background: rgba(107, 114, 128, 0.18);
  color: #374151;
}

.description {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.description h4,
.participants h4 {
  margin: 0;
  font-size: 1rem;
  color: #111827;
}

.description p {
  margin: 0;
  line-height: 1.6;
  color: #4b5563;
}

.participants {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.participant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.participant-chip {
  background: rgba(17, 24, 39, 0.08);
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  font-size: 0.85rem;
  color: #374151;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.countdown {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 18px 35px -22px rgba(17, 24, 39, 0.55);
}

.countdown h4 {
  margin: 0 0 1rem;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.countdown-item .value {
  font-size: 1.5rem;
  font-weight: 700;
}

.countdown-item .label {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (max-width: 1024px) {
  .details-wrapper {
    grid-template-columns: 1fr;
  }

  .sidebar {
    flex-direction: row;
    align-items: flex-start;
  }

  .countdown {
    flex: 1;
  }

  .actions {
    flex: 1;
  }
}

@media (max-width: 640px) {
  .sidebar {
    flex-direction: column;
  }
}
</style>
