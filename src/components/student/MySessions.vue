<template>
  <div class="my-sessions">
    <h1>My Sessions</h1>
    <p>Here you can manage all your enrolled and past study sessions.</p>

    <div class="filter-controls">
      <AppInput v-model="filters.q" placeholder="Search sessions by title..." />
      <select v-model="filters.status" class="app-select">
        <option value="">All Statuses</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
      <AppButton @click="loadSessions">Refresh Sessions</AppButton>
    </div>

    <section class="sessions-list">
      <AppCard v-for="s in filteredSessions" :key="s.id" :title="s.title" :subtitle="s.datetime">
        <div class="muted">{{ s.type }}</div>
        <div class="row items-center justify-between mt-8">
          <span class="badge" :class="s.status.toLowerCase()">{{ s.status }}</span>
          <div class="actions">
            <AppButton variant="secondary" @click="openDetails(s)">Details</AppButton>
            <AppButton v-if="s.status === 'Upcoming' || s.status === 'Ongoing'" @click="join(s)">Join</AppButton>
            <AppButton v-if="s.status === 'Completed'" variant="secondary" @click="openFeedback(s)">Feedback</AppButton>
          </div>
        </div>
      </AppCard>
      <p v-if="!filteredSessions.length">No sessions found matching your criteria.</p>
    </section>

    <!-- Modals (reused from StudentDashboard) -->
    <SessionDetailsModal
      v-if="ui.modals.sessionDetails"
      :session="ui.modals.sessionDetails"
      @close="ui.closeModal('sessionDetails')"
      @open-materials="openMaterials"
      @open-feedback="openFeedback"
      @join="join"
    />

    <SessionMaterialsModal
      v-if="ui.modals.sessionMaterials"
      :materials="ui.modals.sessionMaterials"
      @close="ui.closeModal('sessionMaterials')"
    />

    <SessionFeedbackModal
      v-if="ui.modals.sessionFeedback"
      :session="ui.modals.sessionFeedback"
      @submit="submitFeedback"
      @close="ui.closeModal('sessionFeedback')"
    />

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useStudentStore } from '../../stores/useStudentStore';
import { useUIStore } from '../../stores/useUIStore';
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
import AppInput from '../common/AppInput.vue';
import AppLoading from '../common/AppLoading.vue';

// import SessionDetailsModal from './modals/SessionDetailsModal.vue';
// import SessionFeedbackModal from './modals/SessionFeedbackModal.vue';
// import SessionMaterialsModal from './modals/SessionMaterialsModal.vue';

const student = useStudentStore();
const ui = useUIStore();

const filters = reactive({
  q: '',
  status: '',
});

const filteredSessions = computed(() => {
  let sessions = student.allSessions;
  if (filters.q) {
    sessions = sessions.filter(s => s.title.toLowerCase().includes(filters.q.toLowerCase()));
  }
  if (filters.status) {
    sessions = sessions.filter(s => s.status === filters.status);
  }
  return sessions;
});

onMounted(() => {
  loadSessions();
});

function loadSessions() {
  student.loadAllSessions();
}

function openDetails(session) {
  ui.openModal('sessionDetails', session);
}

function openMaterials(session) {
  // Mock materials data for demonstration
  ui.openModal('sessionMaterials', {
    title: session.title,
    date: session.datetime || 'October 5, 2023',
    host: session.host || 'Dr. Abebe Kebede',
    files: [
      { name: 'Session Slides.pdf', type: 'pdf', action: 'Download' },
      { name: 'Meeting Notes.docx', type: 'docx', action: 'Download' },
      { name: 'Session Recording.mp4', type: 'video', action: 'Watch' },
    ],
  });
}

function openFeedback(session) {
  ui.openModal('sessionFeedback', session);
}

async function submitFeedback(payload) {
  await student.submitFeedback(payload);
  ui.closeModal('sessionFeedback');
  ui.notify('Feedback submitted successfully!', 'success');
}

function join(session) {
  ui.notify(`Joining session: ${session.title}`);
  // In a real app, this would navigate to a video conference link or similar
}
</script>

<style scoped>
.my-sessions { display: flex; flex-direction: column; gap: 16px; }
.filter-controls { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.app-select { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; background: white; }
.sessions-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.row { display: flex; align-items: center; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.mt-8 { margin-top: 8px; }
.badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; }
.badge.upcoming { background: #dbeafe; color: #1d4ed8; }
.badge.ongoing { background: #dcfce7; color: #166534; }
.badge.completed { background: #fee2e2; color: #991b1b; }
.muted { color: #6b7280; font-size: 13px; }
.actions { display: flex; gap: 8px; }
</style>