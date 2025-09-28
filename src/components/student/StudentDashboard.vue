<template>
  <!-- Header -->

  <!-- Main Container -->
  <div class="main-container">
    <!-- Sidebar - Navigation -->
    
    <!-- Main Content -->
    <main class="main-content">

      <!-- Study Rooms Content -->
        <div class="content-header">
          <h1>Suggested Rooms For You</h1>
          <!-- <p>Find and book study rooms for individual or group study sessions</p> -->
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
              <!-- <button class="btn" :disabled="room.status !== 'available'" @click="bookRoom(room.id)">{{ room.status === 'available' ? 'Book Now' : 'Occupied' }}</button> -->
              <button class="btn btn-secondary" @click="showRoomChat(room.id)">Join Room</button>
            </div>
          </div>

          




        </div>

    

   
      <!-- Default Content -->
 



    <!-- </main> -->

<!-- <main class="main-content"> -->
       <div class="content-header">
          <h1>Document Recommendation</h1>
          <!-- <p>Find and book study rooms for individual or group study sessions</p> -->
        </div>
   <div class="resources-grid">

      <div v-for="resource in filteredResources" :key="resource.id" class="resource-card" :data-type="resource.type">
        <div class="resource-header">
          <div class="resource-icon">
            <i :class="getResourceIcon(resource.type)"></i>
          </div>
          <div class="resource-title">{{ resource.title }}</div>
        </div>
        <div class="resource-meta">
          <span><i class="fas fa-book"></i> {{ resource.course }}</span>
          <span><i class="fas fa-calendar"></i> {{ resource.date }}</span>
        </div>
        <!-- <div class="resource-description">{{ resource.description }}</div> -->
        <div class="resource-actions">
          <!-- <button class="btn btn-secondary" @click="previewResource(resource.id)">Preview</button> -->
          <button class="btn" @click="downloadResource(resource.id)">{{ getResourceAction(resource.type) }}</button>
        </div>
      </div>
    </div>
</main>


  </div>

 
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentPage = ref('dashboard')
const searchQuery = ref('')
const filteredSessions = ref([])
const filteredResources = ref([])
const filteredRooms = ref([])
const filteredEvaluations = ref([])

// Mock data
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
    description: 'Let\'s review linked lists, trees, and sorting algorithms for the upcoming exam.',
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
  }
])

const resources = ref([
  {
    id: 1,
    title: 'Data Structures Notes',
    type: 'lectures',
    course: 'CS201',
    date: 'Oct 15, 2023',
    description: 'Comprehensive notes covering arrays, linked lists, trees, and graphs with examples and algorithms.'
  },
    {
    id: 1,
    title: 'Compiler Design Notes',
    type: 'lectures',
    course: 'CS223',
    date: 'Oct 15, 2023',
    description: 'Comprehensive notes covering scannners, lexical analysis and parsing.'
  },

])

const rooms = ref([
  {
    id: 1,
    title: 'Dagm Machine Learning',
    status: 'available',
    capacity: '4 people',
    features: ['CS488', 'WArtificial Intelligence']
  },
  {
    id: 2,
    title: 'Information Retrieval',
    status: 'available',
    capacity: '2 person',
    features: ['CS321', 'Information Retrieval']
  }
])

const evaluations = ref([
  {
    id: 1,
    title: 'Data Structures - CS201',
    status: 'pending',
    instructor: 'Dr. Abebe Kebede',
    dueDate: 'Dec, 2023',
    description: 'Please provide feedback on the course content, teaching methods, and overall learning experience.',
    progress: 0
  },
  {
    id: 2,
    title: 'Database Systems - CS202',
    status: 'pending',
    instructor: 'Dr. Selamawit Tadesse',
    dueDate: 'Nov 5, 2023',
    description: 'Your feedback helps improve the course for future students.',
    progress: 0
  }
])

// Initialize filtered data
filteredSessions.value = [...sessions.value]
filteredResources.value = [...resources.value]
filteredRooms.value = [...rooms.value]
filteredEvaluations.value = [...evaluations.value]

const loadPageContent = (page) => {
  currentPage.value = page
}

const handleSearch = () => {
  // Implement search functionality
  console.log('Searching for:', searchQuery.value)
}

const navigateTo = (page) => {
  // Navigate to specific pages
  console.log('Navigating to:', page)
}

const filterSessions = (status) => {
  if (status === 'all') {
    filteredSessions.value = [...sessions.value]
  } else {
    filteredSessions.value = sessions.value.filter(s => s.status === status)
  }
}

const filterResources = (type) => {
  if (type === 'all') {
    filteredResources.value = [...resources.value]
  } else {
    filteredResources.value = resources.value.filter(r => r.type === type)
  }
}

const filterRooms = (filter) => {
  if (filter === 'all') {
    filteredRooms.value = [...rooms.value]
  } else if (filter === 'available') {
    filteredRooms.value = rooms.value.filter(r => r.status === 'available')
  } else {
    filteredRooms.value = rooms.value.filter(r => r.features.includes(filter.charAt(0).toUpperCase() + filter.slice(1)))
  }
}

const filterEvaluations = (status) => {
  if (status === 'all') {
    filteredEvaluations.value = [...evaluations.value]
  } else {
    filteredEvaluations.value = evaluations.value.filter(e => e.status === status)
  }
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

const getResourceIcon = (type) => {
  const icons = {
    lectures: 'fas fa-file-pdf',
    books: 'fas fa-book',
    papers: 'fas fa-file-alt'
  }
  return icons[type] || 'fas fa-file'
}

const getResourceAction = (type) => {
  return type === 'video' ? 'Watch' : 'Download'
}

const getRoomStatusClass = (status) => {
  return {
    'status-available': status === 'available',
    'status-occupied': status === 'occupied',
    'status-full': status === 'full'
  }
}

const getEvaluationStatusClass = (status) => {
  return {
    'status-pending': status === 'pending',
    'status-completed': status === 'completed'
  }
}

const joinSession = (sessionId) => {
  console.log('Joining session:', sessionId)
  // Implement session joining logic
}

const showSessionDetails = (sessionId) => {
  console.log('Showing details for session:', sessionId)
  // Implement session details modal
}

const previewResource = (resourceId) => {
  console.log('Previewing resource:', resourceId)
  // Implement resource preview
}

const downloadResource = (resourceId) => {
  console.log('Downloading resource:', resourceId)
  // Implement resource download
}

const bookRoom = (roomId) => {
  console.log('Booking room:', roomId)
  // Implement room booking
}

const showRoomChat = (roomId) => {
  console.log('Showing chat for room:', roomId)
  // Implement room chat
}

const startEvaluation = (evaluationId) => {
  console.log('Starting evaluation for:', evaluationId)
  // Implement evaluation form
}

const viewEvaluationDetails = (evaluationId) => {
  console.log('Viewing evaluation details for:', evaluationId)
  // Implement evaluation details view
}

const showCreateSessionModal = () => {
  console.log('Showing create session modal')
  // Implement create session modal
}

const showUploadResourceModal = () => {
  console.log('Showing upload resource modal')
  // Implement upload resource modal
}

const toggleNotifications = () => {
  console.log('Toggle notifications')
  // Implement notifications toggle
}

const toggleProfile = () => {
  console.log('Toggle profile')
  // Implement profile toggle
}
</script>

<style scoped>
/* Dashboard styling using CSS variables */
.main-container {
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: var(--spacing-xl);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-2xl);
  min-height: calc(100vh - 100px);
  position: relative;
  z-index: 1;
}

/* Main Content */
.main-content {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
  padding: var(--spacing-xl);
  min-height: 600px;
}

.content-header {
  margin-bottom: var(--spacing-xl);
}

.content-header h1 {
  font-size: 2.25rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
}

.content-header p {
  color: var(--accent-color);
  font-size: 1.125rem;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.card-icon {
  padding: 0.75rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: var(--radius-md);
  transition: transform 0.3s ease;
}

.card:hover .card-icon {
  transform: scale(1.1);
}

.card-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.card h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.card:hover h3 {
  color: var(--secondary-color);
}

.card p {
  color: var(--text-tertiary);
  line-height: 1.6;
}

/* Sessions Page Styles */
.filter-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  margin: 0 10px 10px;
  cursor: pointer;
  transition: var(--transition);
}

.filter-tab:hover {
  background: rgba(17, 24, 39, 0.1);
}

.filter-tab.active {
  background: var(--primary-color);
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
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: 25px;
  transition: var(--transition);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.session-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
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

.session-card h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--text-primary);
  padding-right: 80px;
}

.session-meta {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: var(--text-tertiary);
  font-size: 0.9rem;
}

.session-meta i {
  margin-right: 8px;
  width: 16px;
}

.session-description {
  font-size: 0.9rem;
  color: var(--text-tertiary);
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
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -10px;
  border: 2px solid white;
  font-size: 0.7rem;
  font-weight: bold;
}

.more-participants {
  background: var(--primary-color);
  color: white;
}

.session-actions {
  display: flex;
  justify-content: space-between;
}

.create-session-btn {
  display: block;
  margin: 30px auto;
  padding: 12px 30px;
}

/* Resources Page Styles */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.resource-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: 20px;
  transition: var(--transition);
  cursor: pointer;
}

.resource-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.resource-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.resource-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.resource-icon i {
  color: white;
  font-size: 18px;
}

.resource-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.resource-meta {
  display: flex;
  align-items: center;
  color: var(--text-tertiary);
  font-size: 14px;
  margin-bottom: 15px;
}

.resource-meta span {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.resource-meta i {
  margin-right: 5px;
}

.resource-description {
  color: var(--text-tertiary);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.resource-actions {
  display: flex;
  justify-content: space-between;
}

/* Study Rooms Page Styles */
.rooms-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.room-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: 20px;
  transition: var(--transition);
}

.room-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.room-status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.room-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.room-capacity {
  display: flex;
  align-items: center;
  color: var(--text-tertiary);
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
  color: var(--secondary-color);
}

/* Evaluation Page Styles */
.evaluation-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.evaluation-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  padding: 20px;
  transition: var(--transition);
}

.evaluation-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.evaluation-status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.evaluation-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.evaluation-meta {
  display: flex;
  align-items: center;
  color: var(--text-tertiary);
  margin-bottom: 15px;
  font-size: 14px;
}

.evaluation-meta span {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.evaluation-meta i {
  margin-right: 5px;
}

.progress-bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 4px;
}

.progress-text {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 15px;
}

/* Buttons */
.btn {
  border-radius: 20px;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: var(--transition);
  cursor: pointer;
}

.btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
}

.create-session-btn {
  display: block;
  margin: 30px auto;
  padding: 12px 30px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin: 20px 0;
}

.empty-state i {
  font-size: 3rem;
  color: var(--accent-color);
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--secondary-color);
}

.empty-state p {
  color: var(--text-tertiary);
  margin-bottom: 20px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .sidebar {
    position: static;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .sessions-container, .resources-grid, .rooms-container, .evaluation-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
  }

  .search-container {
    margin: 0;
    max-width: none;
  }

  .main-container {
    padding: 1rem;
  }

  .main-content {
    padding: 1.5rem;
  }

  .content-header h1 {
    font-size: 1.875rem;
  }

  .session-actions, .resource-actions {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding: 0.5rem;
    gap: 1rem;
  }

  .main-content {
    padding: 1rem;
  }

  .content-header h1 {
    font-size: 1.5rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
