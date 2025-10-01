<template>
  <div class="student-dashboard">
    <div class="page-shell">
      <AppContentHeader
        title="Student Dashboard"
        subtitle="Welcome back! Here's an overview of your learning journey."
      />

      <div class="cards-grid">
        <AppCard
          class="dashboard-card"
          variant="elevated"
          :clickable="true"
          icon="fas fa-book-open"
          @click="navigateTo('/student/resources')"
        >
          <h3 class="card-title">My Courses</h3>
          <p class="card-subtitle">Continue your learning journey with your enrolled courses.</p>
        </AppCard>

        <AppCard
          class="dashboard-card"
          variant="elevated"
          :clickable="true"
          icon="fas fa-calendar-check"
          @click="navigateTo('/student/sessions')"
        >
          <h3 class="card-title">Upcoming Sessions</h3>
          <p class="card-subtitle">View your scheduled study sessions and join when they start.</p>
        </AppCard>

        <AppCard
          class="dashboard-card"
          variant="elevated"
          :clickable="true"
          icon="fas fa-clipboard-list"
          @click="navigateTo('/student/evaluations')"
        >
          <h3 class="card-title">Assignments</h3>
          <p class="card-subtitle">Check your pending assignments and submission deadlines.</p>
        </AppCard>

        <AppCard
          class="dashboard-card"
          variant="elevated"
          :clickable="true"
          icon="fas fa-users"
          @click="navigateTo('/student/study-rooms')"
        >
          <h3 class="card-title">Study Groups</h3>
          <p class="card-subtitle">Join or create study groups to collaborate with peers.</p>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppCard from '../common/AppCard.vue'
import AppContentHeader from '../common/AppContentHeader.vue'

const router = useRouter()

// Methods
const navigateTo = (path) => {
  router.push(path)
}

onMounted(() => {
  // Load dashboard data
  console.log('Student dashboard mounted')
})
</script>

<style scoped>
.student-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  justify-content: center;
  padding: 3rem 2rem;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}


.dashboard-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 231, 235, 0.55);
  backdrop-filter: blur(14px);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -8px rgba(17, 24, 39, 0.12);
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px -12px rgba(17, 24, 39, 0.25);
  background: rgba(255, 255, 255, 0.92);
}

.dashboard-card :deep(.card-icon) {
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
}

.dashboard-card :deep(.card-icon i) {
  color: #fff;
  font-size: 1.25rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.card-subtitle {
  color: #6b7280;
  line-height: 1.6;
}

.dashboard-card:hover .card-title {
  color: #1f2937;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .student-dashboard {
    padding: 1.5rem;
  }
}
</style>