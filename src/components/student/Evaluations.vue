<template>
  <div class="evaluations">
    <div class="page-shell">
      <AppContentHeader
        title="Course Evaluation"
        subtitle="Provide feedback on your courses and teaching assistants"
      />

      <AppTabs v-model="activeFilter" :tabs="filterTabs" />

      <div class="evaluation-grid">
        <AppCard
          v-for="evaluation in filteredEvaluations"
          :key="evaluation.id"
          class="evaluation-card"
          variant="elevated"
        >
          <template #header>
            <div class="evaluation-header">
              <div class="evaluation-title-group">
                <h3>{{ evaluation.title }}</h3>
                <div class="evaluation-meta">
                  <span><i class="fas fa-user"></i> {{ evaluation.instructor }}</span>
                  <span><i :class="evaluation.metaIcon"></i> {{ evaluation.metaText }}</span>
                </div>
              </div>
              <AppStatusBadge :variant="statusVariants[evaluation.status]">
                {{ evaluation.statusLabel }}
              </AppStatusBadge>
            </div>
          </template>

          <div class="evaluation-body">
            <p>{{ evaluation.description }}</p>
            <div class="progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: evaluation.progress + '%' }"></div>
              </div>
              <span>{{ evaluation.progress }}% completed</span>
            </div>
          </div>

          <template #footer>
            <div class="evaluation-actions">
              <AppButton size="small" @click="handlePrimaryAction(evaluation)">
                {{ evaluation.primaryAction }}
              </AppButton>
              <AppButton size="small" variant="secondary" @click="handleSecondaryAction(evaluation)">
                {{ evaluation.secondaryAction }}
              </AppButton>
            </div>
          </template>
        </AppCard>
      </div>

      <CourseEvaluationModal
        v-if="ui.modals.courseEvaluation"
        :course="ui.modals.courseEvaluation"
        @close="ui.modals.courseEvaluation = null"
        @submit="submitCourseEvaluation"
      />

      <EvaluationDetailsModal
        v-if="ui.modals.viewEvaluation"
        :details="ui.modals.viewEvaluation"
        @close="ui.modals.viewEvaluation = null"
      />

      <AppLoading v-if="ui.loading" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppLoading from '../common/AppLoading.vue';
import AppStatusBadge from '../common/AppStatusBadge.vue';
import AppTabs from '../common/AppTabs.vue';
import EvaluationDetailsModal from './modals/EvaluationDetailsModal.vue';
import CourseEvaluationModal from './modals/CourseEvaluationModal.vue';

// import CourseEvaluationModal from './modals/CourseEvaluationModal.vue';

// Local UI and student data replacing stores
const ui = reactive({
  loading: false,
  notify: (msg, type) => console.log(type ? `${type}: ${msg}` : msg),
  modals: {
    courseEvaluation: null,
    viewEvaluation: null,
  },
});

const student = reactive({
  allEvaluations: [
    {
      id: 1,
      title: 'Data Structures - CS201',
      courseCode: 'CS201',
      instructor: 'Dr. Abebe Kebede',
      status: 'pending',
      statusLabel: 'Pending',
      metaIcon: 'fas fa-clock',
      metaText: 'Due: Dec 1, 2023',
      description: 'Please provide feedback on the course content, teaching methods, and overall learning experience.',
      progress: 0,
      primaryAction: 'Start Evaluation',
      secondaryAction: 'Details',
      submissionDate: null,
      ratings: {},
      comments: 'Share your experience with lectures, assignments, and labs.',
      recommend: null,
    },
    {
      id: 2,
      title: 'Database Systems - CS202',
      courseCode: 'CS202',
      instructor: 'Dr. Selamawit Tadesse',
      status: 'pending',
      statusLabel: 'Pending',
      metaIcon: 'fas fa-clock',
      metaText: 'Due: Nov 5, 2023',
      description: 'Evaluate content coverage, database labs, and teaching support.',
      progress: 0,
      primaryAction: 'Start Evaluation',
      secondaryAction: 'Details',
      submissionDate: null,
      ratings: {},
      comments: 'Let us know how the course can be improved.',
      recommend: null,
    },
    {
      id: 3,
      title: 'Algorithms - CS301',
      courseCode: 'CS301',
      instructor: 'Dr. Michael Berhanu',
      status: 'completed',
      statusLabel: 'Completed',
      metaIcon: 'fas fa-check',
      metaText: 'Completed: Oct 15, 2023',
      description: 'You provided feedback on course structure, difficulty level, and teaching assistant support.',
      progress: 100,
      primaryAction: 'View Response',
      secondaryAction: 'Edit Feedback',
      submissionDate: 'Oct 15, 2023',
      ratings: { overall: 4, content: 4, instructor: 5 },
      comments: 'Great lectures and helpful TAs. More practice problems would help.',
      recommend: true,
    },
    {
      id: 4,
      title: 'Computer Networks - CS305',
      courseCode: 'CS305',
      instructor: 'Dr. Yordanos Lemma',
      status: 'pending',
      statusLabel: 'Pending',
      metaIcon: 'fas fa-clock',
      metaText: 'Due: Nov 10, 2023',
      description: 'Evaluate the course materials, lab sessions, and the overall organization of the computer networks course.',
      progress: 0,
      primaryAction: 'Start Evaluation',
      secondaryAction: 'Details',
      submissionDate: null,
      ratings: {},
      comments: 'Tell us about the labs, projects, and lecture pace.',
      recommend: null,
    },
    {
      id: 5,
      title: 'Software Engineering - CS320',
      courseCode: 'CS320',
      instructor: 'Dr. Hanna Girma',
      status: 'completed',
      statusLabel: 'Completed',
      metaIcon: 'fas fa-check',
      metaText: 'Completed: Oct 5, 2023',
      description: 'Feedback provided on project management, team collaboration, and software development lifecycle.',
      progress: 100,
      primaryAction: 'View Response',
      secondaryAction: 'Edit Feedback',
      submissionDate: 'Oct 5, 2023',
      ratings: { overall: 5, content: 5, instructor: 4 },
      comments: 'Loved the group project emphasis and mentorship.',
      recommend: true,
    }
  ],
});

onMounted(() => {
  ui.loading = true;
  setTimeout(() => (ui.loading = false), 300);
});

const activeFilter = ref('all');

const filterTabs = [
  { value: 'all', label: 'All Evaluations', icon: 'fas fa-layer-group' },
  { value: 'pending', label: 'Pending', icon: 'fas fa-hourglass-half' },
  { value: 'completed', label: 'Completed', icon: 'fas fa-check-circle' }
];

const statusVariants = {
  pending: 'warning',
  completed: 'success'
};

const filteredEvaluations = computed(() => {
  if (activeFilter.value === 'all') {
    return student.allEvaluations;
  }
  return student.allEvaluations.filter(evaluation => 
    evaluation.status === activeFilter.value
  );
});

function handlePrimaryAction(evaluation) {
  if (evaluation.status === 'pending') {
    openCourseEvaluation(evaluation);
  } else {
    viewSubmittedEvaluation(evaluation);
  }
}

function handleSecondaryAction(evaluation) {
  const label = (evaluation.secondaryAction || '').toLowerCase();

  if (label.includes('edit')) {
    openCourseEvaluation(evaluation);
    return;
  }

  viewSubmittedEvaluation(evaluation);
}

function openCourseEvaluation(course) {
  ui.modals.courseEvaluation = {
    ...course,
    title: course.title,
    code: course.courseCode,
  };
}

async function submitCourseEvaluation(form) {
  if (!ui.modals.courseEvaluation) return;

  ui.modals.courseEvaluation = null;
  ui.notify('Course evaluation submitted successfully!', 'success');
}

function viewSubmittedEvaluation(evaluation) {
  ui.modals.viewEvaluation = {
    ...evaluation,
    courseTitle: evaluation.title,
  };
}
</script>

<style scoped>
.evaluations {
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  justify-content: center;
  padding: 3rem 2rem;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  padding: 2.25rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.evaluations :deep(.tab-list) {
  justify-content: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  padding: 0;
}

.evaluations :deep(.tab-trigger) {
  padding: 0.65rem 1.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(229, 231, 235, 0.6);
  color: #374151;
  font-weight: 600;
  transition: all 0.25s ease;
}

.evaluations :deep(.tab-trigger:not(.active):hover) {
  background: rgba(17, 24, 39, 0.08);
}

.evaluations :deep(.tab-trigger.active) {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #fff;
  box-shadow: 0 14px 28px -16px rgba(17, 24, 39, 0.45);
}

.evaluation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.evaluation-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 231, 235, 0.55);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 16px 30px -20px rgba(17, 24, 39, 0.32);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.evaluation-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 45px -22px rgba(17, 24, 39, 0.45);
  background: rgba(255, 255, 255, 0.94);
}

.evaluation-card :deep(.card-header) {
  border-bottom: none;
  padding-bottom: 0;
}

.evaluation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
}

.evaluation-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.evaluation-title-group h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: #111827;
}

.evaluation-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.evaluation-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.evaluation-meta i {
  width: 16px;
  text-align: center;
}

.evaluation-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: #4b5563;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.68);
  padding: 1rem;
  border-radius: 0.9rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.evaluation-body p {
  margin: 0;
  line-height: 1.6;
}

.progress {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(229, 231, 235, 0.85);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #111827, #374151);
  transition: width 0.3s ease;
}

.progress span {
  font-size: 0.8rem;
  color: #6b7280;
}

.evaluation-card :deep(.card-footer) {
  border-top: none;
  padding-top: 0;
}

.evaluation-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.evaluation-card :deep(.app-status-badge) {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  box-shadow: 0 10px 25px -15px rgba(17, 24, 39, 0.35);
}

.evaluation-card :deep(.variant-warning) {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
}

.evaluation-card :deep(.variant-success) {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .evaluations {
    padding: 1.5rem;
  }

  .evaluation-grid {
    grid-template-columns: 1fr;
  }

  .evaluation-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>