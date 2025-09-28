<template>
  <div>
    <div class="content-header">
      <h1>Study Rooms</h1>
      <p>Find and book study rooms for individual or group study sessions</p>
    </div>

    <div class="filter-tabs">
      <div class="filter-tab active" data-filter="all" @click="filterRooms('all')">All Rooms</div>
      <div class="filter-tab" data-filter="available" @click="filterRooms('available')">Available</div>
      <div class="filter-tab" data-filter="group" @click="filterRooms('group')">Group Study</div>
      <div class="filter-tab" data-filter="silent" @click="filterRooms('silent')">Silent Study</div>
    </div>

    <div class="rooms-container">
      <div v-for="room in filteredRooms" :key="room.id" class="room-card" :data-status="room.status">
        <div class="room-status" :class="getRoomStatusClass(room.status)">{{ room.status }}</div>
        <h3 class="room-title">{{ room.title }}</h3>
        <div class="room-capacity">
          <i class="fas fa-users"></i>
          <span>Capacity: {{ room.capacity }}</span>
        </div>
        <div class="room-features">
          <span v-for="feature in room.features" :key="feature" class="feature-tag">{{ feature }}</span>
        </div>
        <div class="session-actions">
          <button class="btn" :disabled="room.status !== 'available'" @click="bookRoom(room.id)">{{ room.status === 'available' ? 'Book Now' : 'Occupied' }}</button>
          <button class="btn btn-secondary" @click="showRoomChat(room.id)">Join Chat</button>
        </div>
      </div>
    </div>



    
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const rooms = ref([
  {
    id: 1,
    title: 'Study Room A101',
    status: 'available',
    capacity: '4 people',
    features: ['Whiteboard', 'Power Outlets', 'Wi-Fi']
  },
  {
    id: 2,
    title: 'Silent Study Room B205',
    status: 'available',
    capacity: '1 person',
    features: ['Quiet Zone', 'Reading Light', 'Power Outlets']
  },
  {
    id: 3,
    title: 'Group Study Room C304',
    status: 'occupied',
    capacity: '8 people',
    features: ['Projector', 'Wi-Fi']
  },
  {
    id: 4,
    title: 'Study Room D102',
    status: 'available',
    capacity: '6 people',
    features: ['Whiteboard', 'Monitor', 'Power Outlets']
  },
  {
    id: 5,
    title: 'Collaboration Room E201',
    status: 'full',
    capacity: '10 people',
    features: ['Smart Board', 'Video Conferencing', 'Wi-Fi']
  },
  {
    id: 6,
    title: 'Silent Study Room F105',
    status: 'available',
    capacity: '1 person',
    features: ['Reading Light']
  }
])

const filteredRooms = ref([...rooms.value])

const filterRooms = (filter) => {
  if (filter === 'all') {
    filteredRooms.value = [...rooms.value]
  } else if (filter === 'available') {
    filteredRooms.value = rooms.value.filter(r => r.status === 'available')
  } else if (filter === 'group') {
    filteredRooms.value = rooms.value.filter(r => r.title.includes('Group') || r.capacity !== '1 person')
  } else if (filter === 'silent') {
    filteredRooms.value = rooms.value.filter(r => r.title.includes('Silent') || r.capacity === '1 person')
  }
}

const bookRoom = (roomId) => {
  console.log('Booking room:', roomId)
  alert(`Booking ${roomId}...`)
}

const showRoomChat = (roomId) => {
  console.log('Showing chat for room:', roomId)
  alert(`Opening chat for ${roomId}...`)
}

const getRoomStatusClass = (status) => {
  return {
    'status-available': status === 'available',
    'status-occupied': status === 'occupied',
    'status-full': status === 'full'
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

.rooms-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.room-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 20px;
  transition: all 0.3s ease;
}

.room-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.room-status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.status-available {
  background: #10b981;
  color: white;
}

.status-occupied {
  background: #f59e0b;
  color: white;
}

.status-full {
  background: #ef4444;
  color: white;
}

.room-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 10px;
}

.room-capacity {
  display: flex;
  align-items: center;
  color: #6b7280;
  margin-bottom: 15px;
  font-size: 14px;
}

.room-capacity i {
  margin-right: 8px;
}

.room-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.feature-tag {
  padding: 5px 10px;
  background: rgba(17, 24, 39, 0.1);
  border-radius: 20px;
  font-size: 12px;
  color: #374151;
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

.btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: transparent;
  color: #111827;
}

.btn-secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
}

@media (max-width: 768px) {
  .rooms-container {
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