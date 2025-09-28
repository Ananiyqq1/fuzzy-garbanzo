<template>
  <div class="evaluations">
    <h1>Course Evaluations</h1>
    <p>Your feedback is valuable! Please complete evaluations for your courses and view past submissions.</p>

    <section class="evaluation-section">
      <h2>Courses Requiring Evaluation</h2>
      <div class="course-list">
        <AppCard v-for="c in student.coursesForEvaluation" :key="c.id" :title="c.title" :subtitle="c.code">
          <div class="muted">Instructor: {{ c.instructor }}</div>
          <div class="row justify-end mt-8">
            <AppButton @click="openCourseEvaluation(c)">Evaluate Course</AppButton>
          </div>
        </AppCard>
        <p v-if="!student.coursesForEvaluation.length">No courses currently require your evaluation.</p>
      </div>
    </section>

    <section class="evaluation-section">
      <h2>Submitted Evaluations</h2>
      <div class="evaluation-list">
        <AppCard v-for="e in student.submittedEvaluations" :key="e.id" :title="e.courseTitle" :subtitle="e.submissionDate">
          <div class="muted">Overall Rating: {{ '★'.repeat(e.ratings.overall) }}</div>
          <div class="muted">Comments: {{ e.comments.substring(0, 70) }}...</div>
          <div class="row justify-end mt-8">
            <AppButton variant="secondary" @click="viewSubmittedEvaluation(e)">View Details</AppButton>
          </div>
        </AppCard>
        <p v-if="!student.submittedEvaluations.length">You haven't submitted any course evaluations yet.</p>
      </div>
    </section>

    <!-- Modals -->
    <CourseEvaluationModal
      v-if="ui.modals.courseEvaluation"
      :course="ui.modals.courseEvaluation"
      @submit="submitCourseEvaluation"
      @close="ui.closeModal('courseEvaluation')"
    />

    <AppModal v-if="ui.modals.viewEvaluation" :title="ui.modals.viewEvaluation.courseTitle" @close="ui.closeModal('viewEvaluation')">
      <div class="field"><strong>Submitted On:</strong> {{ ui.modals.viewEvaluation.submissionDate }}</div>
      <div class="field"><strong>Overall Rating:</strong> {{ '★'.repeat(ui.modals.viewEvaluation.ratings.overall) }}</div>
      <div class="field"><strong>Content Rating:</strong> {{ '★'.repeat(ui.modals.viewEvaluation.ratings.content) }}</div>
      <div class="field"><strong>Instructor Rating:</strong> {{ '★'.repeat(ui.modals.viewEvaluation.ratings.instructor) }}</div>
      <div class="field"><strong>Comments:</strong> {{ ui.modals.viewEvaluation.comments }}</div>
      <div class="field"><strong>Recommended:</strong> {{ ui.modals.viewEvaluation.recommend ? 'Yes' : 'No' }}</div>
    </AppModal>

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStudentStore } from '../../stores/useStudentStore';
import { useUIStore } from '../../stores/useUIStore';
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
import AppModal from '../common/AppModal.vue';
import AppLoading from '../common/AppLoading.vue';

// import CourseEvaluationModal from './modals/CourseEvaluationModal.vue';

const student = useStudentStore();
const ui = useUIStore();

onMounted(() => {
  student.loadCoursesForEvaluation();
  student.loadSubmittedEvaluations();
});

function openCourseEvaluation(course) {
  ui.openModal('courseEvaluation', course);
}

async function submitCourseEvaluation(payload) {
  await student.submitCourseEvaluation(payload);
  ui.closeModal('courseEvaluation');
  ui.notify('Course evaluation submitted successfully!', 'success');
  // Refresh evaluations after submission
  student.loadCoursesForEvaluation();
  student.loadSubmittedEvaluations();
}

function viewSubmittedEvaluation(evaluation) {
  ui.openModal('viewEvaluation', evaluation);
}
</script>

<style scoped>
.evaluations { display: flex; flex-direction: column; gap: 16px; }
.evaluation-section { margin-bottom: 24px; }
.evaluation-section h2 { margin-bottom: 12px; font-size: 1.5em; }
.course-list, .evaluation-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.row { display: flex; align-items: center; }
.justify-end { justify-content: flex-end; }
.mt-8 { margin-top: 8px; }
.muted { color: #6b7280; font-size: 13px; }
.field { margin: 6px 0; }
</style>