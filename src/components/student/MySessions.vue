<template>
  <div class="my-sessions">
    <div class="page-shell">
      <AppLoading
        :show="ui.loading"
        size="large"
        :duration="3000"
        @finished="ui.loading = false"
      />

      <div class="header-row">
        <AppContentHeader
          title="My Study Sessions"
          subtitle="Manage your upcoming, ongoing, and past study sessions"
        />
        <AppButton class="create-session-btn" size="small" icon="fas fa-plus" @click="openCreateSession">
          Create Session
        </AppButton>
      </div>

      <AppTabs v-model="activeFilter" :tabs="filterTabs" />

      <div class="sessions-grid">
        <AppCard
          v-for="session in filteredSessions"
          :key="session.id"
          class="session-card"
          variant="elevated"
        >
          <div class="session-status-badge">
            <AppStatusBadge :variant="statusVariants[session.status.toLowerCase()]">
              {{ session.status }}
            </AppStatusBadge>
          </div>
          <template #header>
            <div class="session-header">
              <div class="session-header-text">
                <h3>{{ session.title }}</h3>
                <div class="session-meta">
                  <i class="fas fa-calendar-alt"></i>
                  <span>
                    <template v-if="session.status === 'Completed'">
                      {{ formatSessionDuration(session) }}
                    </template>
                    <template v-else>
                      {{ session.datetime }}
                    </template>
                  </span>
                </div>
                <div class="session-meta owner-meta">
                  <span class="meta-label">Owner</span>
                  <div class="owner-badge">
                    {{ formatParticipantLabel(session.host) }}
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="session-body">
            <p class="session-description">
              {{ session.description }}
            </p>
            <div class="session-participants">
              <div
                v-for="participant in session.participants"
                :key="participant"
                class="participant"
                :class="{ 'more-participants': participant.startsWith('+') }"
              >
                {{ participant }}
              </div>
            </div>
          </div>

          <template #footer>
            <div class="session-actions">
              <AppButton size="small" @click="handlePrimaryAction(session)">
                {{ getPrimaryActionText(session) }}
              </AppButton>
            </div>
          </template>
        </AppCard>
      </div>

    </div>

    <div class="page-overlays">
      <SessionDetailsModal
        v-if="ui.modals.sessionDetails"
        :session="ui.modals.sessionDetails"
        @close="ui.modals.sessionDetails = null"
        @join="join"
        @open-materials="openMaterials"
        @open-feedback="openFeedback"
      />

      <SessionMaterialsModal
        v-if="ui.modals.sessionMaterials"
        :session="ui.modals.sessionMaterials"
        @close="ui.modals.sessionMaterials = null"
        @action="handleMaterialAction"
      />

      <SessionFeedbackModal
        v-if="ui.modals.sessionFeedback"
        :session="ui.modals.sessionFeedback"
        @close="ui.modals.sessionFeedback = null"
        @submit="submitFeedback"
      />

      <CreateSessionModal
        v-if="ui.modals.createSession"
        @close="ui.modals.createSession = false"
        @submit="handleCreateSession"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, ref } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppLoading from '../common/AppLoading.vue';
import AppStatusBadge from '../common/AppStatusBadge.vue';
import AppTabs from '../common/AppTabs.vue';
import SessionDetailsModal from './modals/SessionDetailsModal.vue';
import SessionFeedbackModal from './modals/SessionFeedbackModal.vue';
import SessionMaterialsModal from './modals/SessionMaterialsModal.vue';
import CreateSessionModal from './modals/CreateSessionModal.vue';
import type { StudentSession, SessionFeedback } from '../../types/student';

interface UiState {
  loading: boolean;
  notify: (msg: string, type?: string) => void;
  modals: {
    sessionDetails: StudentSession | null;
    sessionMaterials: (StudentSession & { date: string; materials: any[] }) | null;
    sessionFeedback: (StudentSession & { feedback: SessionFeedback }) | null;
    createSession: boolean;
  };
}

interface StudentState {
  allSessions: StudentSession[];
}

interface CreateSessionForm {
  title: string;
  date?: string;
  time?: string;
  description: string;
}

type FilterValue = 'all' | 'upcoming' | 'ongoing' | 'completed';

const ui: UiState = reactive({
  loading: false,
  notify: (msg: string, type?: string) => console.log(type ? `${type}: ${msg}` : msg),
  modals: {
    sessionDetails: null,
    sessionMaterials: null,
    sessionFeedback: null,
    createSession: false,
  },
});

const student: StudentState = reactive({
  allSessions: [
    {
      id: 1,
      title: 'Web Development Project Meeting',
      datetime: 'Friday, 10:00 AM - 11:30 AM',
      startAt: '2023-11-10T10:00:00',
      type: 'Virtual Session',
      host: 'Dr. Abebe Kebede',
      status: 'Upcoming',
      description: 'Planning session for the group project. We\'ll assign tasks and set milestones.',
      participants: ['AB', 'CD', 'EF'],
      materials: [
        { name: 'Session Slides.pdf', type: 'pdf', action: 'Download' },
        { name: 'Meeting Notes.docx', type: 'docx', action: 'Download' },
        { name: 'Session Recording.mp4', type: 'video', action: 'Watch' },
      ],
    },
    {
      id: 2,
      title: 'Data Structures Study Group',
      datetime: 'Tomorrow, 3:00 PM - 5:00 PM',
      startAt: '2023-11-05T15:00:00',
      type: 'Virtual Session',
      host: 'Mikias Solomon',
      status: 'Upcoming',
      description: 'Let\'s review linked lists, trees, and sorting algorithms for the upcoming exam. Bring your questions!',
      participants: ['JD', 'MA', 'SK', '+5'],
      materials: [
        { name: 'Revision Outline.pdf', type: 'pdf', action: 'Download' },
      ],
    },
    {
      id: 3,
      title: 'Python Programming Help',
      datetime: 'Today, 1:00 PM - 3:00 PM',
      startAt: '2023-10-30T13:00:00',
      type: 'Virtual Session',
      host: 'Sara Yirga',
      status: 'Ongoing',
      description: 'Helping with Python concepts and debugging code. All welcome to join and ask questions.',
      participants: ['MN', 'OP'],
      materials: [
        { name: 'Code Snippets.zip', type: 'link', action: 'Open' },
      ],
    },
    {
      id: 4,
      title: 'Database Systems Workshop',
      datetime: 'Today, 2:00 PM - 4:00 PM',
      startAt: '2023-10-30T14:00:00',
      type: 'Virtual Session',
      host: 'Lulit Alemu',
      status: 'Ongoing',
      description: 'Working on SQL queries and normalization techniques. Join us if you need help with assignment 3.',
      participants: ['TP', 'LJ', 'RM', '+8'],
      materials: [
        { name: 'Normalization Cheatsheet.pdf', type: 'pdf', action: 'Download' },
      ],
    },
    {
      id: 5,
      title: 'Networking Concepts Review',
      datetime: 'October 5, 2023',
      startAt: '2023-10-05T10:00:00',
      type: 'Virtual Session',
      host: 'Kebede Alem',
      status: 'Completed',
      description: 'Reviewed TCP/IP model, routing algorithms, and network security concepts.',
      participants: ['GH', 'IJ', 'KL', '+2'],
      materials: [
        { name: 'Session Recording.mp4', type: 'video', action: 'Watch' },
        { name: 'Packet Tracer Lab.pdf', type: 'pdf', action: 'Download' },
      ],
      duration: '2h',
      feedback: { rating: 4, comments: 'Very helpful recap session.', recommend: 'yes' },
    },
    {
      id: 6,
      title: 'Algorithm Problem Solving',
      datetime: 'October 12, 2023',
      startAt: '2023-10-12T16:00:00',
      type: 'Virtual Session',
      host: 'Bereket Tilahun',
      status: 'Completed',
      description: 'Solved various algorithmic problems including dynamic programming and graph algorithms.',
      participants: ['QR', 'ST', 'UV'],
      materials: [
        { name: 'Practice Problems.pdf', type: 'pdf', action: 'Download' },
        { name: 'Solution Walkthrough.docx', type: 'docx', action: 'Download' },
      ],
      duration: '2.5h',
      feedback: { rating: 5, comments: 'Excellent explanations and pacing.', recommend: 'yes' },
    },
  ] as StudentSession[]
});

const activeFilter = ref<FilterValue>('all');

const filterTabs = [
  { value: 'all', label: 'All Sessions', icon: 'fas fa-layer-group' },
  { value: 'upcoming', label: 'Upcoming', icon: 'fas fa-hourglass-half' },
  { value: 'ongoing', label: 'Ongoing', icon: 'fas fa-play-circle' },
  { value: 'completed', label: 'Completed', icon: 'fas fa-check-circle' },
] as any;

const statusVariants: Record<string, string> = {
  upcoming: 'warning',
  ongoing: 'success',
  completed: 'neutral',
};

const filteredSessions = computed<StudentSession[]>(() => {
  if (activeFilter.value === 'all') {
    return student.allSessions;
  }
  return student.allSessions.filter((session) =>
    session.status.toLowerCase() === activeFilter.value,
  );
});

onMounted(() => {
  loadSessions();
});

const loadSessions = (): void => {
  ui.loading = true;
};

const formatSessionDuration = (session: StudentSession): string => {
  if (session.duration) {
    return session.duration;
  }
  const match = session.datetime.match(/(\d{1,2}:\d{2}\s?[AP]M)\s?-\s?(\d{1,2}:\d{2}\s?[AP]M)/i);
  if (match) {
    return match[0];
  }
  return session.datetime;
};

const formatParticipantLabel = (host: string): string => {
  if (!host) return 'Host';
  const trimmed = host.trim();
  if (trimmed.includes(' ')) {
    return trimmed
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .join('');
  }
  return trimmed.slice(0, 2).toUpperCase();
};

const openDetails = (session: StudentSession): void => {
  ui.modals.sessionDetails = { ...session };
};

const openMaterials = (session: StudentSession): void => {
  ui.modals.sessionMaterials = {
    ...session,
    date: session.datetime,
    materials: session.materials ?? [],
  };
};

const openFeedback = (session: StudentSession): void => {
  ui.modals.sessionFeedback = {
    ...session,
    feedback: session.feedback || { rating: 0, comments: '', recommend: 'yes' },
  };
};

const handlePrimaryAction = (session: StudentSession): void => {
  if (session.status === 'Completed') {
    openMaterials(session);
    return;
  }
  openDetails(session);
};

const getPrimaryActionText = (session: StudentSession): string => {
  if (session.status === 'Upcoming') return 'Start Session';
  if (session.status === 'Ongoing') return 'Join Now';
  if (session.status === 'Completed') return 'View Materials';
  return 'Action';
};

const join = (session: StudentSession): void => {
  ui.notify(`Joining session: ${session.title}`);
  ui.modals.sessionDetails = null;
};

const handleMaterialAction = (item: { name: string; action?: string }): void => {
  ui.notify(`${item.action || 'Download'} · ${item.name}`);
};

const submitFeedback = (payload: any): void => {
  ui.modals.sessionFeedback = null;
  ui.notify('Feedback submitted successfully!', 'success');
};

const openCreateSession = (): void => {
  ui.modals.createSession = true;
};

const handleCreateSession = (form: CreateSessionForm): void => {
  const newSession: StudentSession = {
    id: Date.now(),
    title: form.title,
    datetime: `${form.date || 'TBD'}${form.time ? ` · ${form.time}` : ''}`,
    startAt: form.date ? new Date(`${form.date}T${form.time || '00:00'}`).toISOString() : new Date().toISOString(),
    type: 'Virtual Session',
    host: 'You',
    status: 'Upcoming',
    description: form.description,
    participants: [],
    materials: [],
  };

  student.allSessions.unshift(newSession);
  ui.modals.createSession = false;
  ui.notify(`Session "${form.title}" created successfully!`, 'success');
};
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.create-session-btn {
  align-self: center;
}

.my-sessions {
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}


.sessions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}
.my-sessions :deep(.tab-list) {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  background: transparent;
  padding: 0;
  flex-wrap: wrap;
}

.my-sessions :deep(.tab-trigger) {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(229, 231, 235, 0.6);
  color: #374151;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 10px 18px -12px rgba(17, 24, 39, 0.35);
}

.my-sessions :deep(.tab-trigger:not(.active):hover) {
  background: rgba(17, 24, 39, 0.08);
}

.my-sessions :deep(.tab-trigger.active) {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #fff;
  box-shadow: 0 14px 28px -16px rgba(17, 24, 39, 0.45);
}


.session-card {
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.session-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.9);
}

.session-card :deep(.card-header) {
  border-bottom: none;
  padding-bottom: 0;
}

.session-status-badge {
  position: absolute;
  top: 0;
  right: 0;
}

.session-status-badge :deep(.app-status-badge) {
  border-radius: 0 1rem 0 1rem;
  box-shadow: none;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.session-header {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;
}

.session-header-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.session-header-text h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
  padding-right: 2rem;
}

.session-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.session-meta i {
  width: 16px;
  text-align: center;
}

.owner-meta {
  align-items: center;
  gap: 0.6rem;
}

.meta-label {
  font-weight: 600;
  color: #374151;
}

.owner-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: #111827;
  color: #ffffff;
  border-color: #111827;
}

.session-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #4b5563;
  font-size: 0.95rem;
}

.session-description {
  margin: 0;
  line-height: 1.6;
}

.session-participants {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.participant {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -10px;
  border: 2px solid #ffffff;
  font-size: 0.7rem;
  font-weight: bold;
  color: #374151;
}

.participant.more-participants {
  background: #111827;
  color: #ffffff;
}

.session-card :deep(.card-footer) {
  border-top: none;
  padding-top: 0;
}

.session-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: space-between;
}

.session-actions :deep(.btn) {
  border-radius: 20px;
  border: 1px solid #111827;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.65rem 1.5rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .my-sessions {
    padding: 1.5rem;
  }

  .page-shell {
    gap: 1.5rem;
  }

  .sessions-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }

  .session-card {
    padding: 1.25rem;
  }

  .session-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .session-actions {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .session-actions :deep(.btn) {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .my-sessions {
    padding: 1rem;
  }

  .page-shell {
    gap: 1rem;
  }

  .header-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .create-session-btn {
    align-self: flex-start;
  }

  .sessions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .session-card {
    padding: 1rem;
  }

  .session-status-badge :deep(.app-status-badge) {
    font-size: 0.65rem;
    padding: 0.3rem 0.6rem 0.45rem;
  }

  .session-header-text h3 {
    font-size: 1rem;
  }

  .session-meta {
    font-size: 0.85rem;
  }

  .session-actions {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .my-sessions {
    padding: 0.5rem;
  }

  .session-card {
    padding: 0.75rem;
  }

  .session-header-text h3 {
    font-size: 0.95rem;
  }

  .session-body {
    font-size: 0.9rem;
  }
}
</style>