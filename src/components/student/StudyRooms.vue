<template>
  <div class="study-rooms">
    <div class="page-shell">
      <AppLoading
        :show="ui.loading"
        size="large"
        :duration="3000"
        @finished="ui.loading = false"
      />

      <div class="header-row">
        <AppContentHeader
          title="Joined Rooms"
          subtitle="Continue your discussion with your peers"
        />
      </div>

      <div v-if="joinedRooms.length" class="rooms-grid">
        <div
          v-for="room in joinedRooms"
          :key="room.id"
          class="room-card"
        >
          <div class="room-status status-general">
            Available
          </div>
          <h3 class="room-title">{{ room.name }}</h3>
          <div class="room-capacity">
            <i class="fas fa-users"></i>
            <span>{{ room.memberCount }} {{ room.memberCount > 1 ? 'members' : 'member' }}</span>
          </div>
          <div class="room-features">
            <span class="feature-tag">
              {{ room.CourseCode }}
            </span>
            <span class="feature-tag">
              {{ Array.isArray(room.topicName) ? room.topicName.join(', ') : room.topicName }}
            </span>
          </div>
          <div class="room-actions">
            <AppButton
              size="small"
              @click="openChat(room.id)"
            >
              Open Chat
            </AppButton>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-state-card">
          <i class="fas fa-smile"></i>
          <h3>No rooms joined yet</h3>
          <p>Join a room below to start collaborating with your peers</p>
        </div>
      </div>

      <AppContentHeader
        title="Explore Other Rooms"
        subtitle="Ready for more? Other rooms are open and full of inspiration"
      />

      <div v-if="roomsToExplore.length" class="rooms-grid">
        <div
          v-for="room in roomsToExplore"
          :key="room.id"
          class="room-card"
        >
          <div class="room-status status-general">
            Available
          </div>
          <h3 class="room-title">{{ room.name }}</h3>
          <div class="room-capacity">
            <i class="fas fa-users"></i>
            <span>{{ room.memberCount }} {{ room.memberCount > 1 ? 'members' : 'member' }}</span>
          </div>
          <div class="room-features">
            <span class="feature-tag">
              {{ room.CourseCode }}
            </span>
            <span class="feature-tag">
              {{ Array.isArray(room.topicName) ? room.topicName.join(', ') : room.topicName }}
            </span>
          </div>
          <div class="room-actions">
            <AppButton
              size="small"
              @click="joinChatRoom(room.id)"
            >
              Join Chat
            </AppButton>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-state-card">
          <i class="fas fa-smile"></i>
          <h3>No more rooms</h3>
          <p>Check back soon to catch the next vibrant study room</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '../common/AppButton.vue'
import AppContentHeader from '../common/AppContentHeader.vue'
import AppLoading from '../common/AppLoading.vue'
import { mapToRoom, type Room } from '../../types/student'
import loadRooms from './api/GetRooms'
import { useSignalR } from '@/common/useSignalR'
import joinRoom from './api/JoinRoom'

interface ChatMessage {
  author: string
  text: string
  time: string
}

interface ChatModalState {
  id: number
  name: string
  participants: string[]
  messages: ChatMessage[]
}

type StudyRoomCategory =
  | 'programming'
  | 'databases'
  | 'systems'
  | 'web-mobile'
  | 'ict-research'
  | 'specialized'

type StudyRoomFilter = 'all' | StudyRoomCategory

interface TabItem {
  value: string
  label: string
  icon?: string
  badge?: string | number
}

interface UiState {
  loading: boolean
  notify: (msg: string, type?: string) => void
  modals: {
    studyRoomChat: ChatModalState | null
  }
}

const ui = reactive<UiState>({
  loading: false,
  notify: (msg, type) => console.log(type ? `${type}: ${msg}` : msg),
  modals: {
    studyRoomChat: null
  }
})

const router = useRouter();
const userId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

const joinedRooms = ref<Array<Room>>([]);
const roomsToExplore = ref<Array<Room>>([]);
const { connect } = useSignalR();

// Open chat for joined rooms
const openChat = (roomId: string): void => {
  router.push(`/room/${roomId}`);
};

// Join a new chat room
const joinChatRoom = async (roomId: string): Promise<void> => {
  try {
    const res = await joinRoom({
      roomId: roomId,
      memberId: userId
    });

    if (res.status === 204 || res.status === 200) {
      ui.notify('Joined room successfully!', 'success');
      router.push(`/room/${roomId}`);
    }
  } catch (error: any) {
    console.error('❌ Failed to join room:', error);
    ui.notify('Failed to join room. Please try again.', 'error');
  }
};

// Load rooms from backend
onMounted(async () => {
  try {
    console.log('🏫 StudyRooms: Starting data load...');
    ui.loading = true;
    
    // Try SignalR connection (non-critical)
    try {
      await connect();
      console.log('✅ StudyRooms: SignalR connected');
    } catch (signalRError) {
      console.warn('⚠️ StudyRooms: SignalR failed (non-critical):', signalRError);
    }

    // Load joined rooms (explore=false)
    console.log('🔄 StudyRooms: Fetching joined rooms...');
    const joinedRes = await loadRooms(false, userId);
    console.log('📥 StudyRooms: Joined rooms response:', joinedRes);
    
    if (joinedRes.status === 200 && joinedRes.data != null) {
      joinedRooms.value = joinedRes.data.map(mapToRoom);
      console.log('✅ StudyRooms: Loaded', joinedRooms.value.length, 'joined rooms');
    } else {
      console.warn('⚠️ StudyRooms: Unexpected joined rooms response', joinedRes);
    }

    // Load rooms to explore (explore=true)
    console.log('🔄 StudyRooms: Fetching explorable rooms...');
    const exploreRes = await loadRooms(true, userId);
    console.log('📥 StudyRooms: Explore rooms response:', exploreRes);
    
    if (exploreRes.status === 200 && exploreRes.data != null) {
      roomsToExplore.value = exploreRes.data.map(mapToRoom);
      console.log('✅ StudyRooms: Loaded', roomsToExplore.value.length, 'rooms to explore');
    } else {
      console.warn('⚠️ StudyRooms: Unexpected explore rooms response', exploreRes);
    }

    console.log('✅ StudyRooms: Data load complete!');
  } catch (error: any) {
    console.error('❌ StudyRooms: Failed to load rooms:', error);
    console.error('Error details:', error.response?.data || error.message);
    ui.notify('Failed to load study rooms. Please try again.', 'error');
  } finally {
    ui.loading = false;
  }
})
</script>

<style scoped>
.study-rooms {
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


.study-rooms :deep(.tab-list) {
  justify-content: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  padding: 0;
}

.study-rooms :deep(.tab-trigger) {
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

.study-rooms :deep(.tab-trigger:not(.active):hover) {
  background: rgba(17, 24, 39, 0.08);
}

.study-rooms :deep(.tab-trigger.active) {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #fff;
  box-shadow: 0 14px 28px -16px rgba(17, 24, 39, 0.45);
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  padding: 2rem;
}

.empty-state-card {
  background: rgba(255, 255, 255, 0.78);
  border-radius: 1rem;
  padding: 2.5rem 3rem;
  text-align: center;
  box-shadow: 0 22px 40px -18px rgba(17, 24, 39, 0.4);
  border: 1px solid rgba(229, 231, 235, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 480px;
}

.empty-state-card i {
  font-size: 3rem;
  color: #9ca3af;
}

.empty-state-card h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
  font-weight: 600;
}

.empty-state-card p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.room-card {
  position: relative;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 231, 235, 0.55);
  border-radius: 1rem;
  padding: 1.75rem 1.5rem 1.5rem;
  box-shadow: 0 18px 35px -22px rgba(17, 24, 39, 0.35);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.room-card:hover {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 28px 50px -24px rgba(17, 24, 39, 0.45);
}

.room-status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.6rem 1.25rem;
  border-radius: 0 1rem 0 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-general {
  background: linear-gradient(135deg, #94a3b8, #64748b);
  color: #fff;
}

.status-programming {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
}

.status-databases {
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  color: #fff;
}

.status-systems {
  background: linear-gradient(135deg, #14b8a6, #0f766e);
  color: #fff;
}

.status-web-mobile {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: #fff;
}

.status-ict-research {
  background: linear-gradient(135deg, #a855f7, #7c3aed);
  color: #fff;
}

.status-specialized {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #fff;
}

.room-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  padding-right: 3rem;
}

.room-capacity {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.room-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: rgba(17, 24, 39, 0.08);
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8rem;
  color: #374151;
}

.room-actions {
  display: flex;
  justify-content: flex-end;
}

.room-actions :deep(.btn) {
  border-radius: 999px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.6rem 1.75rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .study-rooms {
    padding: 1.5rem;
  }

  .page-shell {
    gap: 1.5rem;
  }

  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .room-card {
    padding: 1.25rem;
  }

  .room-header {
    gap: 1rem;
  }

  .room-actions {
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .study-rooms {
    padding: 1rem;
  }

  .page-shell {
    gap: 1rem;
  }

  .rooms-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .room-card {
    padding: 1rem;
  }

  .room-title {
    font-size: 1.1rem;
    padding-right: 0;
  }

  .room-capacity, .room-features {
    font-size: 0.9rem;
  }

  .room-actions {
    justify-content: center;
    gap: 0.5rem;
  }

  .room-actions :deep(.btn) {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .study-rooms {
    padding: 0.5rem;
  }

  .room-card {
    padding: 0.75rem;
  }

  .room-title {
    font-size: 1rem;
  }

  .room-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .room-capacity, .room-features {
    font-size: 0.85rem;
  }
}
</style>