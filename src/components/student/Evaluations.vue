<template>
  <div>
    <div class="content-header">
      <h1>Course Evaluation</h1>
      <p>Provide feedback on your courses and teaching assistants</p>
    </div>

    <div class="filter-tabs">
      <div class="filter-tab active" data-filter="all" @click="filterEvaluations('all')">All Evaluations</div>
      <div class="filter-tab" data-filter="pending" @click="filterEvaluations('pending')">Pending</div>
      <div class="filter-tab" data-filter="completed" @click="filterEvaluations('completed')">Completed</div>
    </div>

    <div class="evaluation-container">
      <div v-for="evaluation in filteredEvaluations" :key="evaluation.id" class="evaluation-card" :data-status="evaluation.status">
        <div class="evaluation-status" :class="getEvaluationStatusClass(evaluation.status)">{{ evaluation.status }}</div>
        <h3 class="evaluation-title">{{ evaluation.title }}</h3>
        <div class="evaluation-meta">
          <span><i class="fas fa-user"></i> {{ evaluation.instructor }}</span>
          <span><i class="fas fa-clock"></i> {{ evaluation.dueDate }}</span>
        </div>
        <p class="session-description">{{ evaluation.description }}</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: evaluation.progress + '%' }"></div>
        </div>
        <div class="progress-text">{{ evaluation.progress }}% completed</div>
        <div class="session-actions">
          <button class="btn" @click="startEvaluation(evaluation.id)">{{ evaluation.status === 'pending' ? 'Start Evaluation' : 'View Response' }}</button>
          <button class="btn btn-secondary" @click="viewEvaluationDetails(evaluation.id)">Details</button>
        </div>
      </div>
    </div>

    <div class="empty-state">
      <i class="fas fa-clipboard-check"></i>
      <h3>Your Feedback Matters</h3>
      <p>Course evaluations help improve teaching quality and curriculum development. Please complete all pending evaluations.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const evaluations = ref([
  {
    id: 1,
    title: 'Data Structures - CS201',
    status: 'pending',
    instructor: 'Dr. Abebe Kebede',
    dueDate: 'Dec, 2023',
    description: 'Please provide feedback on the course content, teaching methods, and overall learning experience.',
    progress: 0
  },
  {
    id: 2,
    title: 'Database Systems - CS202',
    status: 'pending',
    instructor: 'Dr. Selamawit Tadesse',
    dueDate: 'Nov 5, 2023',
    description: 'Your feedback helps improve the course for future students. Evaluate content, assignments, and instructor effectiveness.',
    progress: 0
  },
  {
    id: 3,
    title: 'Algorithms - CS301',
    status: 'completed',
    instructor: 'Dr. Michael Berhanu',
    dueDate: 'Oct 15, 2023',
    description: 'You provided feedback on course structure, difficulty level, and teaching assistant support.',
    progress: 100
  },
  {
    id: 4,
    title: 'Computer Networks - CS305',
    status: 'pending',
    instructor: 'Dr. Yordanos Lemma',
    dueDate: 'Nov 10, 2023',
    description: 'Evaluate the course materials, lab sessions, and the overall organization of the computer networks course.',
    progress: 0
  },
  {
    id: 5,
    title: 'Software Engineering - CS320',
    status: 'completed',
    instructor: 'Dr. Hanna Girma',
    dueDate: 'Oct 5, 2023',
    description: 'You evaluated the group project structure, practical assignments, and real-world application focus.',
    progress: 100
  },
  {
    id: 6,
    title: 'Artificial Intelligence - CS401',
    status: 'pending',
    instructor: 'Dr. Tomas Mekonnen',
    dueDate: 'Nov 15, 2023',
    description: 'Provide feedback on the AI course covering machine learning, neural networks, and ethical considerations.',
    progress: 0
  }
])

const filteredEvaluations = ref([...evaluations.value])

const filterEvaluations = (status) => {
  if (status === 'all') {
    filteredEvaluations.value = [...evaluations.value]
  } else {
    filteredEvaluations.value = evaluations.value.filter(e => e.status === status)
  }
}

const startEvaluation = (evaluationId) => {
  console.log('Starting evaluation for:', evaluationId)
  alert(`Starting evaluation for ${evaluationId}...`)
}

const viewEvaluationDetails = (evaluationId) => {
  console.log('Viewing evaluation details for:', evaluationId)
  alert(`Viewing details for ${evaluationId}...`)
}

const getEvaluationStatusClass = (status) => {
  return {
    'status-pending': status === 'pending',
    'status-completed': status === 'completed'
  }
}
</script>

<style scoped>
.content-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-header h1 {
  font-size: 2.25rem;
  font-weight: bold;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
}

.content-header p {
  color: #6b7280;
  font-size: 1.125rem;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 20px;
  margin: 0 10px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  color: #111827;
}

.filter-tab:hover {
  background: rgba(17, 24, 39, 0.1);
}

.filter-tab.active {
  background: #111827;
  color: white;
}

.evaluation-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.evaluation-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 20px;
  transition: all 0.3s ease;
}

.evaluation-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.evaluation-status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.status-pending {
  background: #f59e0b;
  color: white;
}

.status-completed {
  background: #10b981;
  color: white;
}

.evaluation-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 10px;
}

.evaluation-meta {
  display: flex;
  align-items: center;
  color: #6b7280;
  margin-bottom: 15px;
  font-size: 14px;
}

.evaluation-meta span {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.evaluation-meta i {
  margin-right: 5px;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #111827;
  border-radius: 4px;
}

.progress-text {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 15px;
}

.session-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  border-radius: 20px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn:hover {
  background-color: #374151;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: transparent;
  color: #111827;
}

.btn-secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  margin: 20px 0;
}

.empty-state i {
  font-size: 3rem;
  color: #9ca3af;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #374151;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .evaluation-container {
    grid-template-columns: 1fr;
  }

  .session-actions {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>