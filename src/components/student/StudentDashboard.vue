<template>
  <div class="study-rooms">
    <div class="page-shell">
      <AppContentHeader
        title="Available Study Rooms"
        subtitle="Quickly jump into rooms we think will fit for you"
      />

      <div v-if="fetchedRooms.length" class="rooms-grid">
        <div
          v-for="room in fetchedRooms"
          :key="room.id"
          class="room-card"
        >
          <div class="room-status status-general">
          Available
          </div>
          <h3 class="room-title">{{ room.name }}</h3>
          <div class="room-capacity">
            <i class="fas fa-users"></i>
            <span>{{ room.memberCount }} {{room.memberCount>1?'members':'member'}}</span>
          </div>
          <div class="room-features">
            <span 
              class="feature-tag"
            >
              {{ room.CourseCode }}
            </span>
            <span  
              class="feature-tag"
            >
              {{ room.topicName }}
            </span>
          </div>
          <div class="room-actions">
            <AppButton
              size="small" 
              @click="handleJoinRoom(room)"
            > Join Room
            </AppButton>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-state-card">
          <i class="fas fa-smile"></i>
          <h3>No rooms are open right now</h3>
          <p>Check back soon to catch the next available study session</p>
        </div>
      </div>

      <section class="books-section" >
        <AppContentHeader
          title="Recommended Documents"
          subtitle="A bespoke collection of documents, crafted to match your needs"
        />

        <div class="books-grid" v-if="bookRecommendations.length">
          <div
            v-for="resource in bookRecommendations"
            :key="resource.id"
            class="resource-card" 
          >
            <div class="resource-header">
              <div class="resource-icon">
                <i class="fas fa-calendar"></i>
              </div>
              <div class="resource-title">{{ resource.docTitle }}</div>
            </div>
            <div class="resource-meta">
              <span>
                <i class="fas fa-book"></i>
                {{ resource.topicName }}
              </span>
              <span>
                <i class="far fa-calendar-alt"></i>
                {{ formatUpdatedDate(resource.dateUploaded) }}
              </span>
              <!-- <span v-else>
                <i :class="resource.metaIcon"></i>
                {{ resource.metaText }}
              </span> -->
            </div>
            <div class="resource-actions">
              <AppButton
              v-on:click="downloadFile(resource.docKey)"
                size="small"
                class="resource-action-button"
                type="button" 
              >
                Download
              </AppButton>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
        <div class="empty-state-card">
          <i class="fas fa-smile"></i>
          <h3>Loading Documents curated for you</h3>
          <!-- <p>Check back soon to catch the next available study session</p> -->
        </div>
      </div>
      </section>

      <section class="contributors-section" v-if="topContributors.length">
        <AppContentHeader
          title="Top Peers on HiLCoE Knowledge Hub"
          subtitle="Recognizing this week's most engaged student contributors"
        />

        <div class="contributors-grid">
          <div
            v-for="contributor in topContributors"
            :key="contributor.id"
            class="contributor-card"
          >
            <div class="contributor-avatar">
              <img :src="contributor.avatar" :alt="contributor.name" />
            </div>
            <h3 class="contributor-name">{{ contributor.name }}</h3>
            <p class="contributor-role">{{ contributor.role }}</p>
            <div class="contributor-score">
              <i
                v-for="n in 5"
                :key="`star-${contributor.id}-${n}`"
                :class="n <= Math.round(contributor.score) ? 'fas fa-star' : 'far fa-star'"
              ></i>
              <span class="score-value">{{ contributor.score.toFixed(1) }}</span>
            </div>
            <span class="contributor-metric">{{ contributor.totalPoints }} pts</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue'; 
import { studentPreferenceFilters } from '../../data/studentPreferences';
import {type Room, Resource, mapToRoom, mapToResource } from '../../types/student';
import getRoomSuggestions from './api/GetSuggestedRooms';
import getDocSuggestions from './api/GetSuggestedDocs';   
import { useSignalR } from '@/common/useSignalR';
import joinRoom from './api/JoinRoom';
import router from '@/router';
import getDocLink from './api/GetDocLink';
import { useAuthStore } from '@/stores/useAuthStore';
interface TopContributor {
  id: number;
  name: string;
  role: string;
  score: number;
  totalPoints: number;
  avatar: string;
}
const {user}=useAuthStore();
const {connect} = useSignalR();
var fetchedRooms=ref<Array<Room>>([])
var bookRecommendations=ref<Array<Resource>>([])

onMounted(async()=>{
  await connect()
  var roomsResponse=await getRoomSuggestions(user?.user_id as string,user?.interests as Array<string>)
  if(roomsResponse.status==200&&roomsResponse.data!=null){
    fetchedRooms.value=roomsResponse.data.map(mapToRoom)
  }
  var docResponse=await getDocSuggestions(user?.interests as Array<string>)
  if(docResponse.status==200&&docResponse.data!=null){
    bookRecommendations.value=docResponse.data.map(mapToResource) 
  }
})  
type StudyRoomCategory =
  | 'programming'
  | 'databases'
  | 'systems'
  | 'web-mobile'
  | 'ict-research'
  | 'specialized';

const categoryKeywords: Record<StudyRoomCategory, string[]> = {
  programming: ['program', 'algorithm', 'software', 'code'],
  databases: ['database', 'data', 'sql'],
  systems: ['system', 'network', 'unix', 'assembly'],
  'web-mobile': ['web', 'mobile'],
  'ict-research': ['ict', 'project', 'research'],
  specialized: ['artificial', 'ai', 'compiler', 'graphics', 'retrieval']
};


const topContributors: TopContributor[] = [
  {
    id: 1,
    name: 'Moa Fuad',
    role: 'Peer Mentor',
    score: 5,
    totalPoints: 1320,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Simon Yohannes',
    role: 'Discussion Lead',
    score: 5,
    totalPoints: 1245,
    avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Hayat Abdulrezak',
    role: 'Resource Curator',
    score: 5,
    totalPoints: 1184,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
  }
];

const updatedFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});
  async function downloadFile(fileKey: string) { 
    try{ 
    var link=await getDocLink(fileKey); 
      window.open(link, '_blank');
    }
    catch(error){
      console.error("Error downloading file:", error);
    }
  }

const formatUpdatedDate = (isoDate: string): string => {
  return updatedFormatter.format(new Date(isoDate));
};
 
const handleJoinRoom = async(room: Room): Promise<void> => { 
try{
  const res=await joinRoom({
  "roomId":room.id,
  "memberId":user?.user_id as string
  })
  if(res.status==204){
    router.push(`/room/${room.id}`)
  }

}
catch(e){

} 
};
</script>

<style scoped>
.study-rooms {
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  position: relative;
  padding: 2.5rem;
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
  background: linear-gradient(135deg, #11ff00, #23a003);
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

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
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
  max-width: 420px;
}

.empty-state-card i {
  font-size: 2.5rem;
  color: #10b981;
}

.empty-state-card h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
}

.empty-state-card p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.books-section {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-top: 2rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.resource-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 1.25rem;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 12px 32px -18px rgba(17, 24, 39, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -20px rgba(17, 24, 39, 0.35);
}

.resource-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resource-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #111827, #374151);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.resource-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.resource-meta {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.resource-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.resource-description {
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.55;
  opacity: 0;
  max-height: 0;
  margin: 0;
  overflow: hidden;
  pointer-events: none;
}

.resource-actions {
  display: flex;
  justify-content: flex-end;
}

.resource-actions :deep(.btn) {
  border-radius: 999px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.6rem 1.75rem;
}

.contributors-section {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-top: 2.5rem;
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.contributor-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 1.25rem;
  padding: 1.5rem 1.25rem;
  box-shadow: 0 18px 32px -20px rgba(17, 24, 39, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contributor-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 42px -18px rgba(17, 24, 39, 0.4);
}

.contributor-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(17, 24, 39, 0.12);
  box-shadow: 0 12px 24px -12px rgba(17, 24, 39, 0.35);
}

.contributor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contributor-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #111827;
}

.contributor-role {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.contributor-score {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f59e0b;
}

.contributor-score i {
  font-size: 0.9rem;
}

.contributor-score .score-value {
  margin-left: 0.35rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.contributor-metric {
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
  background: rgba(17, 24, 39, 0.08);
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
}

@media (max-width: 1024px) {
  .page-shell {
    padding: 2rem;
  }

  .rooms-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .room-card {
    padding: 1.25rem;
  }

  .book-card {
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .study-rooms {
    padding: 1.5rem;
  }

  .page-shell {
    padding: 1.5rem;
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
    padding-right: 2rem;
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

  .books-header h2 {
    font-size: 1.5rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .book-card {
    padding: 1rem;
  }

  .book-title {
    font-size: 1rem;
  }

  .book-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .study-rooms {
    padding: 1rem;
  }

  .page-shell {
    padding: 1rem;
  }

  .room-card {
    padding: 0.75rem;
  }

  .room-title {
    font-size: 1rem;
  }

  .room-capacity, .room-features {
    font-size: 0.85rem;
  }

  .empty-state-card {
    padding: 1.5rem;
  }

  .empty-state-card h3 {
    font-size: 1.25rem;
  }

  .books-header h2 {
    font-size: 1.25rem;
  }

  .book-card {
    padding: 0.75rem;
  }

  .book-title {
    font-size: 0.95rem;
  }

  .book-description {
    font-size: 0.85rem;
  }
}
</style>