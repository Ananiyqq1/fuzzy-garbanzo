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
          title="Study Rooms"
          subtitle="Find and book study rooms for individual or group study sessions"
        />

      </div>

      <AppTabs v-model="activeFilter" :tabs="filterTabs" />

      <div class="rooms-grid">
        <div
          v-for="room in filteredRooms"
          :key="room.id"
          class="room-card"
        >
          <div class="room-status" :class="getStatusClass(room)">
            {{ getStatusLabel(room) }}
          </div>
          <h3 class="room-title">{{ room.name }}</h3>
          <div class="room-capacity">
            <i :class="room.capacityIcon"></i>
            <span>{{ room.capacityText }}</span>
          </div>
          <div class="room-features">
            <span
              v-for="feature in room.features"
              :key="feature"
              class="feature-tag"
            >
              {{ feature }}
            </span>
          </div>
          <div class="room-actions">
            <AppButton
              size="small"
              :disabled="room.primaryDisabled"
              @click="handlePrimaryAction(room)"
            >
              Join Chat
            </AppButton>
          </div>
        </div>
      </div>

      <StudyRoomChatModal
        v-if="ui.modals.studyRoomChat"
        :chat="ui.modals.studyRoomChat"
        @message="handleChatMessage"
        @close="ui.modals.studyRoomChat = null"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import AppTabs from '../common/AppTabs.vue'
import AppButton from '../common/AppButton.vue'
import AppContentHeader from '../common/AppContentHeader.vue'
import AppLoading from '../common/AppLoading.vue'
import StudyRoomChatModal from './modals/StudyRoomChatModal.vue'
import { studentRooms } from '../../data/studentRooms'
import { studentPreferenceFilters } from '../../data/studentPreferences'
import type { StudentRoom } from '../../types/student'

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

const student = reactive({
  allRooms: studentRooms.map((room) => ({
    ...room,
    primaryAction: 'Join Chat',
    primaryDisabled: false
  }))
})

const activeFilter = ref<StudyRoomFilter>('all')

const filterTabs: TabItem[] = [
  { value: 'all', label: 'All Rooms', icon: 'fas fa-layer-group' },
  ...studentPreferenceFilters.map((filter) => ({
    value: filter.value,
    label: filter.label,
    icon: filter.icon
  }))
]

const categoryKeywords: Record<StudyRoomCategory, string[]> = {
  programming: ['program', 'algorithm', 'software', 'code'],
  databases: ['database', 'data', 'sql'],
  systems: ['system', 'network', 'unix', 'assembly'],
  'web-mobile': ['web', 'mobile'],
  'ict-research': ['ict', 'project', 'research'],
  specialized: ['artificial', 'ai', 'compiler', 'graphics', 'retrieval']
}

const preferenceLabelByCategory = studentPreferenceFilters.reduce<Record<string, string>>(
  (acc, filter) => {
    acc[filter.value] = filter.label
    return acc
  },
  {}
)

const filteredRooms = computed<StudentRoom[]>(() => {
  if (activeFilter.value === 'all') {
    return student.allRooms
  }

  const keywords = categoryKeywords[activeFilter.value]
  if (!keywords) {
    return student.allRooms
  }

  return student.allRooms.filter((room) => {
    const normalizedFeatures = room.features.map((feature) => feature.toLowerCase())
    return keywords.some((keyword) =>
      normalizedFeatures.some((feature) => feature.includes(keyword))
    )
  })
})

const determineRoomCategory = (room: StudentRoom): StudyRoomCategory | 'general' => {
  const normalizedFeatures = room.features.map((feature) => feature.toLowerCase())
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (
      keywords.some((keyword) =>
        normalizedFeatures.some((feature) => feature.includes(keyword))
      )
    ) {
      return category as StudyRoomCategory
    }
  }
  return 'general'
}

const getStatusLabel = (room: StudentRoom): string => {
  const category = determineRoomCategory(room)
  if (category === 'general') {
    return 'General Study Room'
  }
  return preferenceLabelByCategory[category] || 'General Study Room'
}

const getStatusClass = (room: StudentRoom): string => {
  const category = determineRoomCategory(room)
  if (category === 'general') {
    return 'status-general'
  }
  return `status-${category}`
}

const handlePrimaryAction = (room: StudentRoom): void => {
  openChat(room)
}

const openChat = (group: StudentRoom & { topic?: string; participants?: string[] }): void => {
  ui.modals.studyRoomChat = {
    id: group.id,
    name: group.name,
    participants: group.participants || ['John Doe', 'You', 'Sarah Smith', 'Alex'],
    messages: [
      {
        author: 'John Doe',
        text: 'Hey everyone! What topic should we focus on today?',
        time: '10:05 AM'
      },
      {
        author: 'You',
        text: `Let's discuss ${group.topic || 'our current assignment'}.`,
        time: '10:06 AM'
      },
      { author: 'Sarah Smith', text: 'Sounds good!', time: '10:07 AM' }
    ]
  }
}

const handleChatMessage = (message: { text: string }): void => {
  if (!ui.modals.studyRoomChat) return
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  ui.modals.studyRoomChat.messages.push({ author: 'You', text: message.text, time: now })
}
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