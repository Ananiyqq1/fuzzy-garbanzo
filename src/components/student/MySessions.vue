<template>
  <div>
    <div class="content-header">
      <h1>My Study Sessions</h1>
      <p>Manage your upcoming, ongoing, and past study sessions</p>
    </div>

    <div class="filter-tabs">
      <div class="filter-tab active" data-filter="all" @click="filterSessions('all')">All Sessions</div>
      <div class="filter-tab" data-filter="upcoming" @click="filterSessions('upcoming')">Upcoming</div>
      <div class="filter-tab" data-filter="ongoing" @click="filterSessions('ongoing')">Ongoing</div>
      <div class="filter-tab" data-filter="completed" @click="filterSessions('completed')">Completed</div>
    </div>

    <div class="sessions-container">
      <div v-for="session in filteredSessions" :key="session.id" class="session-card" :data-status="session.status">
        <div class="session-status" :class="getStatusClass(session.status)">{{ session.status }}</div>
        <h3>{{ session.title }}</h3>
        <div class="session-meta">
          <i class="fas fa-calendar-alt"></i>
          <span>{{ session.date }}</span>
        </div>
        <div class="session-meta">
          <i class="fas fa-video"></i>
          <span>{{ session.type }}</span>
        </div>
        <p class="session-description">{{ session.description }}</p>
        <div class="session-participants">
          <div v-for="participant in session.participants.slice(0, 3)" :key="participant.id" class="participant">{{ participant.initials }}</div>
          <div v-if="session.participants.length > 3" class="participant more-participants">+{{ session.participants.length - 3 }}</div>
        </div>
        <div class="session-actions">
          <button class="btn" @click="joinSession(session.id)">{{ getSessionButtonText(session.status) }}</button>
          <button class="btn btn-secondary" @click="showSessionDetails(session.id)">Details</button>
        </div>
      </div>
    </div>

    <button class="btn create-session-btn" @click="showCreateSessionModal">
      <i class="fas fa-plus"></i> Create New Session
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const sessions = ref([
  {
    id: 1,
    title: 'Web Development Project Meeting',
    status: 'upcoming',
    date: 'Friday, 10:00 AM - 11:30 AM',
    type: 'Virtual Session',
    description: 'Planning session for the group project. We\'ll assign tasks and set milestones.',
    participants: [{ id: 1, initials: 'AB' }, { id: 2, initials: 'CD' }, { id: 3, initials: 'EF' }]
  },
  {
    id: 2,
    title: 'Data Structures Study Group',
    status: 'upcoming',
    date: 'Tomorrow, 3:00 PM - 5:00 PM',
    type: 'Virtual Session',
    description: 'Let\'s review linked lists, trees, and sorting algorithms for the upcoming exam. Bring your questions!',
    participants: [{ id: 4, initials: 'JD' }, { id: 5, initials: 'MA' }, { id: 6, initials: 'SK' }]
  },
  {
    id: 3,
    title: 'Python Programming Help',
    status: 'ongoing',
    date: 'Today, 1:00 PM - 3:00 PM',
    type: 'Virtual Session',
    description: 'Helping with Python concepts and debugging code. All welcome to join and ask questions.',
    participants: [{ id: 7, initials: 'MN' }, { id: 8, initials: 'OP' }]
  },
  {
    id: 4,
    title: 'Database Systems Workshop',
    status: 'ongoing',
    date: 'Today, 2:00 PM - 4:00 PM',
    type: 'Virtual Session',
    description: 'Working on SQL queries and normalization techniques. Join us if you need help with assignment 3.',
    participants: [{ id: 9, initials: 'TP' }, { id: 10, initials: 'LJ' }, { id: 11, initials: 'RM' }]
  },
  {
    id: 5,
    title: 'Networking Concepts Review',
    status: 'completed',
    date: 'October 5, 2023',
    type: 'Virtual Session',
    description: 'Reviewed TCP/IP model, routing algorithms, and network security concepts.',
    participants: [{ id: 12, initials: 'GH' }, { id: 13, initials: 'IJ' }, { id: 14, initials: 'KL' }]
  },
  {
    id: 6,
    title: 'Algorithm Problem Solving',
    status: 'completed',
    date: 'October 12, 2023',
    type: 'Virtual Session',
    description: 'Solved problems on recursion and dynamic programming. Great session with active participation.',
    participants: [{ id: 15, initials: 'AK' }, { id: 16, initials: 'DM' }, { id: 17, initials: 'JS' }]
  }
])

const filteredSessions = ref([...sessions.value])

const filterSessions = (status) => {
  if (status === 'all') {
    filteredSessions.value = [...sessions.value]
  } else {
    filteredSessions.value = sessions.value.filter(s => s.status === status)
  }
}

const joinSession = (sessionId) => {
  console.log('Joining session:', sessionId)
  alert(`Joining session ${sessionId}...`)
}

const showSessionDetails = (sessionId) => {
  console.log('Showing details for session:', sessionId)
  alert(`Showing details for session ${sessionId}...`)
}

const showCreateSessionModal = () => {
  console.log('Showing create session modal')
  alert('Create session functionality would be implemented here')
}

const getStatusClass = (status) => {
  return {
    'status-upcoming': status === 'upcoming',
    'status-ongoing': status === 'ongoing',
    'status-completed': status === 'completed'
  }
}

const getSessionButtonText = (status) => {
  switch (status) {
    case 'upcoming':
      return 'Start Session'
    case 'ongoing':
      return 'Join Now'
    case 'completed':
      return 'View Materials'
    default:
      return 'View Session'
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

.sessions-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.session-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.session-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.9);
}

.session-status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 15px;
  border-bottom-left-radius: 8px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status-upcoming {
  background: #f59e0b;
  color: white;
}

.status-ongoing {
  background: #10b981;
  color: white;
}

.status-completed {
  background: #6b7280;
  color: white;
}

.session-card h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #111827;
  padding-right: 80px;
}

.session-meta {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #6b7280;
  font-size: 0.9rem;
}

.session-meta i {
  margin-right: 8px;
  width: 16px;
}

.session-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.5;
}

.session-participants {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  border: 2px solid white;
  font-size: 0.7rem;
  font-weight: bold;
}

.more-participants {
  background: #111827;
  color: white;
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

.create-session-btn {
  display: block;
  margin: 30px auto;
  padding: 12px 30px;
}

@media (max-width: 768px) {
  .sessions-container {
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