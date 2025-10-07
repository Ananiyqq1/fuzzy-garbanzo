<template>
  <div class="study-rooms">
    <div class="page-shell">
      <div class="header-row">
        <AppContentHeader
          title="Study Rooms"
          subtitle="Find and book study rooms for individual or group study sessions"
        />

      </div>

      <AppTabs v-model="activeFilter" :tabs="filterTabs" />

      <div class="rooms-grid">
        <AppCard
          v-for="room in filteredRooms"
          :key="room.id"
          class="room-card"
          variant="elevated"
        >
          <template #header>
            <div class="room-header">
              <div class="room-header-text">
                <h3>{{ room.name }}</h3>
                <div class="room-capacity">
                  <i :class="room.capacityIcon"></i>
                  <span>{{ room.capacityText }}</span>
                </div>
              </div>
              <AppStatusBadge :variant="statusVariants[room.status]">
                {{ room.statusLabel }}
              </AppStatusBadge>
            </div>
          </template>

          <div class="room-body">
            <div class="room-features">
              <span
                v-for="feature in room.features"
                :key="feature"
                class="feature-tag"
              >
                {{ feature }}
              </span>
            </div>
          </div>

          <template #footer>
            <div class="room-actions">
              <AppButton
                size="small"
                :disabled="room.primaryDisabled"
                @click="handlePrimaryAction(room)"
              >
                {{ room.primaryAction }}
              </AppButton>
              <AppButton size="small" variant="secondary" @click="handleSecondaryAction(room)">
                {{ room.secondaryAction }}
              </AppButton>
            </div>
          </template>
        </AppCard>
      </div>

      <StudyRoomChatModal
        v-if="ui.modals.studyRoomChat"
        :chat="ui.modals.studyRoomChat"
        @message="handleChatMessage"
        @close="ui.modals.studyRoomChat = null"
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
import StudyRoomChatModal from './modals/StudyRoomChatModal.vue';
import getRooms from '../auth/api/peer/GetRooms';

// import StudyRoomChatModal from './modals/StudyRoomChatModal.vue';

// Local UI and student state replacing stores
const ui = reactive({
  loading: false,
  notify: (msg, type) => console.log(type ? `${type}: ${msg}` : msg),
  modals: {
    studyRoomChat: null,
  },
});

const student = reactive({
  allRooms: [
    {
      id: 1,
      name: 'Study Room A101',
      status: 'available',
      statusLabel: 'Available',
      capacity: 4,
      capacityIcon: 'fas fa-users',
      capacityText: 'Capacity: 4 people',
      features: ['Whiteboard', 'Power Outlets', 'Wi-Fi'],
      primaryAction: 'Book Now',
      secondaryAction: 'Join Chat',
      primaryDisabled: false
    },
    {
      id: 2,
      name: 'Silent Study Room B205',
      status: 'available',
      statusLabel: 'Available',
      capacity: 1,
      capacityIcon: 'fas fa-user',
      capacityText: 'Capacity: 1 person',
      features: ['Quiet Zone', 'Reading Light', 'Power Outlets'],
      primaryAction: 'Book Now',
      secondaryAction: 'View Details',
      primaryDisabled: false
    },
    {
      id: 3,
      name: 'Group Study Room C304',
      status: 'occupied',
      statusLabel: 'Occupied',
      capacity: 8,
      capacityIcon: 'fas fa-users',
      capacityText: 'Capacity: 8 people',
      features: ['Projector', 'Wi-Fi'],
      primaryAction: 'Join Room',
      secondaryAction: 'Join Chat',
      primaryDisabled: true
    },
    {
      id: 4,
      name: 'Study Room D102',
      status: 'available',
      statusLabel: 'Available',
      capacity: 6,
      capacityIcon: 'fas fa-users',
      capacityText: 'Capacity: 6 people',
      features: ['Whiteboard', 'Monitor', 'Power Outlets'],
      primaryAction: 'Book Now',
      secondaryAction: 'Join Chat',
      primaryDisabled: false
    },
    {
      id: 5,
      name: 'Collaboration Room E201',
      status: 'full',
      statusLabel: 'Fully Booked',
      capacity: 10,
      capacityIcon: 'fas fa-users',
      capacityText: 'Capacity: 10 people',
      features: ['Smart Board', 'Video Conferencing', 'Wi-Fi'],
      primaryAction: 'Join Room',
      secondaryAction: 'View Details',
      primaryDisabled: true
    }
  ],
});

const activeFilter = ref('all');

const filterTabs = [
  { value: 'all', label: 'All Rooms', icon: 'fas fa-layer-group' },
  { value: 'available', label: 'Available', icon: 'fas fa-door-open' },
  { value: 'group', label: 'Group Study', icon: 'fas fa-users' },
  { value: 'silent', label: 'Silent Study', icon: 'fas fa-volume-mute' }
];

const statusVariants = {
  available: 'success',
  occupied: 'warning',
  full: 'danger'
};

const filteredRooms = computed(() => {
  if (activeFilter.value === 'all') {
    return student.allRooms;
  }
  if (activeFilter.value === 'available') {
    return student.allRooms.filter(room => room.status === 'available');
  }
  if (activeFilter.value === 'group') {
    return student.allRooms.filter(room => room.capacity > 1);
  }
  if (activeFilter.value === 'silent') {
    return student.allRooms.filter(room => room.features.includes('Quiet Zone'));
  }
  return student.allRooms;
});

onMounted(async() => { 
  // loadStudyGroups(); 
  var res=await getRooms();
  console.log("rooms data", res.data);
});

function handlePrimaryAction(room) {
  if (room.primaryDisabled) {
    ui.notify(`Cannot ${room.primaryAction.toLowerCase()} - room is ${room.status}`);
    return;
  }

  const action = (room.primaryAction || '').toLowerCase();
  if (action.includes('book')) {
    ui.notify(`Booked ${room.name}!`, 'success');
  } else if (action.includes('join')) {
    openChat(room);
  } else {
    ui.notify(`${room.primaryAction}: ${room.name}`);
  }
}

function handleSecondaryAction(room) {
  const action = (room.secondaryAction || '').toLowerCase();

  if (action.includes('chat')) {
    openChat(room);
    return;
  }

  ui.notify(`${room.secondaryAction}: ${room.name}`);
}

function loadStudyGroups() { ui.loading = true; setTimeout(() => (ui.loading = false), 300); }

function openChat(group) {
  ui.modals.studyRoomChat = {
    id: group.id,
    name: group.name,
    participants: group.participants || ['John Doe', 'You', 'Sarah Smith', 'Alex'],
    messages: [
      { author: 'John Doe', text: 'Hey everyone! What topic should we focus on today?', time: '10:05 AM' },
      { author: 'You', text: `Let's discuss ${group.topic || 'our current assignment'}.`, time: '10:06 AM' },
      { author: 'Sarah Smith', text: 'Sounds good!', time: '10:07 AM' },
    ],
  };
}

function handleChatMessage(message) {
  if (!ui.modals.studyRoomChat) return;
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  ui.modals.studyRoomChat.messages.push({ author: 'You', text: message.text, time: now });
}

</script>

<style scoped>
.study-rooms {
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
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

.study-rooms :deep(.tab-list) {
  justify-content: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  padding: 0;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.study-rooms :deep(.tab-trigger) {
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.6);
  color: #374151;
  font-weight: 600;
  transition: all 0.25s ease;
}

.study-rooms :deep(.tab-trigger:not(.active):hover) {
  background: rgba(17, 24, 39, 0.08);
}

.study-rooms :deep(.tab-trigger.active) {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #fff;
  box-shadow: 0 14px 28px -16px rgba(17, 24, 39, 0.45);
}

.room-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 231, 235, 0.55);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 18px 35px -22px rgba(17, 24, 39, 0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.room-card:hover {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 28px 50px -24px rgba(17, 24, 39, 0.45);
}

.room-card :deep(.card-header) {
  border-bottom: none;
  padding-bottom: 0;
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
}

.room-header-text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.room-header-text h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
}

.room-capacity {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.room-capacity i {
  width: 16px;
  text-align: center;
}

.room-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.68);
  padding: 1rem;
  border-radius: 0.9rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.room-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: rgba(17, 24, 39, 0.08);
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  color: #374151;
}

.room-card :deep(.card-footer) {
  border-top: none;
  padding-top: 0;
}

.room-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.room-card :deep(.app-status-badge) {
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  box-shadow: 0 10px 25px -15px rgba(17, 24, 39, 0.35);
}

.room-card :deep(.variant-success) {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
}

.room-card :deep(.variant-warning) {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
}

.room-card :deep(.variant-danger) {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #fff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .study-rooms {
    padding: 1.5rem;
  }

  .rooms-grid {
    grid-template-columns: 1fr;
  }

  .room-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .room-actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>