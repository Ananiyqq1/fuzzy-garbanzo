<template>
  <div class="admin-profile">
    <!-- Main Content -->
    <main class="main-content">
      <!-- Header -->
      <header class="profile-header-section">
        <h1>Admin Profile</h1>
        <p>Manage your administrative profile information</p>
      </header>

      <!-- Profile Container -->
      <div class="profile-container">
        <div class="profile-header">
          <div class="avatar-wrapper">
            <img
              :src="isEditing ? editData.avatar || adminData.avatar : adminData.avatar"
              alt="Profile Photo"
              class="profile-photo"
            >
            <button
              v-if="isEditing"
              class="change-photo-btn"
              type="button"
              @click="triggerAvatarUpload"
            >
              Change Photo
            </button>
            <input
              ref="fileInput"
              class="avatar-input"
              type="file"
              accept="image/*"
              @change="handleAvatarSelected"
            >
          </div>
          <div class="profile-info">
            <h2>{{ adminData.name }}</h2>
            <p>{{ adminData.username }}</p>
            <span class="roles">{{ adminData.roles }}</span>
          </div>
        </div>

        <div class="profile-details">
          <!-- Personal Information Card -->
          <div class="detail-card">
            <h3>Personal Information</h3>
            <div class="detail-item">
              <label>Name</label>
              <div v-if="!isEditing" class="view-mode">
                <p>{{ adminData.name }}</p>
              </div>
              <div v-else class="edit-mode">
                <input type="text" v-model="editData.name">
              </div>
            </div>
            <div class="detail-item">
              <label>Username</label>
              <div v-if="!isEditing" class="view-mode">
                <p>{{ adminData.username }}</p>
              </div>
              <div v-else class="edit-mode">
                <input type="text" v-model="editData.username">
              </div>
            </div>
            <div class="detail-item">
              <label>Institute Email</label>
              <div v-if="!isEditing" class="view-mode">
                <p>{{ adminData.instituteEmail }}</p>
              </div>
              <div v-else class="edit-mode">
                <input type="email" v-model="editData.instituteEmail">
              </div>
            </div>
            <div class="detail-item">
              <label>Personal Email</label>
              <div v-if="!isEditing" class="view-mode">
                <p>{{ adminData.personalEmail }}</p>
              </div>
              <div v-else class="edit-mode">
                <input type="email" v-model="editData.personalEmail">
              </div>
            </div>
          </div>

          <!-- Professional Information Card -->
          <div class="detail-card">
            <h3>Professional Information</h3>
            <div class="detail-item">
              <label>Overall Score</label>
              <div v-if="!isEditing" class="view-mode">
                <p>{{ adminData.overallScore }}</p>
              </div>
              <div v-else class="edit-mode">
                <input type="number" v-model="editData.overallScore" step="0.1">
              </div>
            </div>
            <div class="detail-item">
              <label>Bio</label>
              <div v-if="!isEditing" class="view-mode">
                <p>{{ adminData.bio }}</p>
              </div>
              <div v-else class="edit-mode">
                <textarea v-model="editData.bio"></textarea>
              </div>
            </div>
            <div class="detail-item">
              <label>Interests</label>
              <div v-if="!isEditing" class="view-mode">
                <div class="interests-container">
                  <span v-for="interest in adminData.interests" :key="interest" class="interest-tag">
                    {{ interest }}
                  </span>
                </div>
              </div>
              <div v-else class="edit-mode">
                <div class="interests-container">
                  <span v-for="(interest, index) in editData.interests" :key="index" class="interest-tag">
                    {{ interest }}
                    <i class="fas fa-times" @click="removeInterest(index)"></i>
                  </span>
                </div>
                <div class="interest-input-container">
                  <input 
                    type="text" 
                    v-model="newInterest" 
                    placeholder="Add an interest"
                    @keyup.enter="addInterest"
                  >
                  <button class="secondary" @click="addInterest">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Statistics Section -->
        <div class="admin-section">
          <h3>Administrative Dashboard</h3>
          <div class="stats-grid">
            <div class="stat-card" v-for="stat in adminStats" :key="stat.id">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
          <div class="action-buttons">
            <button class="secondary" @click="manageUsers">Manage Users</button>
            <button class="secondary" @click="viewReports">View Reports</button>
            <button class="secondary" @click="systemSettings">System Settings</button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button v-if="!isEditing" class="secondary" @click="toggleEdit">Edit Profile</button>
          <button v-if="!isEditing" class="danger" @click="deleteProfile">Delete Account</button>
          <button v-if="isEditing" @click="saveProfile">Save Changes</button>
          <button v-if="isEditing" class="secondary" @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const isEditing = ref(false)
const newInterest = ref('')
const fileInput = ref(null)

const adminData = reactive({
  name: 'Dr. Sarah Johnson',
  username: '@sarahj',
  roles: 'Administrator, Faculty',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  instituteEmail: 'sarah.johnson@hilcoe.edu.et',
  personalEmail: 'sarahj@example.com',
  overallScore: 95.2,
  bio: 'Professor of Computer Science with 15 years of experience. Specialized in database systems and software engineering. Currently serving as Department Head.',
  interests: ['Database Systems', 'Software Engineering', 'Data Management', 'Academic Research']
})

const editData = reactive({
  name: '',
  username: '',
  instituteEmail: '',
  personalEmail: '',
  overallScore: 0,
  bio: '',
  avatar: '',
  interests: []
})

const adminStats = ref([
  { id: 1, value: '1,254', label: 'Total Students' },
  { id: 2, value: '42', label: 'Active Courses' },
  { id: 3, value: '87%', label: 'Avg. Performance' },
  { id: 4, value: '23', label: 'Pending Requests' }
])

// Methods
const toggleEdit = () => {
  isEditing.value = true
  // Copy current data to edit data
  Object.assign(editData, {
    name: adminData.name,
    username: adminData.username,
    instituteEmail: adminData.instituteEmail,
    personalEmail: adminData.personalEmail,
    overallScore: adminData.overallScore,
    bio: adminData.bio,
    avatar: adminData.avatar,
    interests: [...adminData.interests]
  })
}

const cancelEdit = () => {
  isEditing.value = false
  newInterest.value = ''
  editData.avatar = adminData.avatar
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const saveProfile = () => {
  // Update admin data with edit data
  Object.assign(adminData, editData)
  isEditing.value = false
  newInterest.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  // In a real app, you would send this to the backend
  console.log('Admin profile updated:', adminData)
}

const deleteProfile = () => {
  if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
    // In a real app, you would send delete request to backend
    console.log('Admin profile deleted')
  }
}

const addInterest = () => {
  if (newInterest.value.trim() && !editData.interests.includes(newInterest.value.trim())) {
    editData.interests.push(newInterest.value.trim())
    newInterest.value = ''
  }
}

const removeInterest = (index) => {
  editData.interests.splice(index, 1)
}

const triggerAvatarUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleAvatarSelected = (event) => {
  const [file] = event.target.files || []
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (typeof e.target?.result === 'string') {
      editData.avatar = e.target.result
    }
  }
  reader.readAsDataURL(file)
}

const manageUsers = () => {
  router.push('/admin/users')
}

const viewReports = () => {
  router.push('/admin/analytics')
}

const systemSettings = () => {
  router.push('/admin/settings')
}

onMounted(() => {
  console.log('Admin profile mounted')
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.admin-profile {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  color: #111827;
}

.main-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.profile-header-section {
  text-align: center;
  margin-bottom: 30px;
}

.profile-header-section h1 {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 2.5rem;
  color: #111827;
}

.profile-header-section p {
  color: #6b7280;
  font-size: 1rem;
}

.profile-container {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.7);
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(17, 24, 39, 0.1);
}

.avatar-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
}

.change-photo-btn {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.35rem 0.9rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  text-transform: none;
  letter-spacing: normal;
  border: none;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  color: #ffffff;
  box-shadow: 0 8px 16px -12px rgba(15, 23, 42, 0.9);
}

.change-photo-btn:hover {
  transform: translate(-50%, -2px);
}

.change-photo-btn:active,
.change-photo-btn:focus {
  transform: translate(-50%, -2px);
}

.avatar-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.profile-info h2 {
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: #111827;
}

.profile-info p {
  color: #6b7280;
  margin-bottom: 10px;
}

.roles {
  display: inline-block;
  background: rgba(17, 24, 39, 0.1);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-top: 10px;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 30px;
}

.detail-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 20px;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.detail-card h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #374151;
  border-bottom: 1px solid rgba(229, 231, 235, 0.7);
  padding-bottom: 10px;
}

.detail-item {
  margin-bottom: 15px;
}

.detail-item label {
  display: block;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #4b5563;
}

.detail-item p {
  font-size: 1rem;
  color: #111827;
  line-height: 1.5;
}

.detail-item input, 
.detail-item textarea, 
.detail-item select {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  font-family: inherit;
  transition: all 0.3s ease;
}

.detail-item input:focus, 
.detail-item textarea:focus, 
.detail-item select:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
}

.detail-item textarea {
  min-height: 100px;
  resize: vertical;
}

.interests-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.interest-tag {
  background: rgba(17, 24, 39, 0.1);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.interest-tag i {
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;
}

.interest-tag i:hover {
  color: #ef4444;
}

.interest-input-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.interest-input-container input {
  flex-grow: 1;
}

.admin-section {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 25px;
  margin-top: 30px;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.admin-section h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #111827;
  border-bottom: 1px solid rgba(229, 231, 235, 0.7);
  padding-bottom: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.8rem;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #111827;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 20px;
}

button {
  border-radius: 20px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 25px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

button:hover {
  background-color: #374151;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: scale(0.98);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.2);
}

button.secondary {
  background-color: transparent;
  color: #111827;
}

button.secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
}

button.danger {
  background-color: #ef4444;
  border-color: #ef4444;
}

button.danger:hover {
  background-color: #dc2626;
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-profile {
    padding: 1rem;
  }

  .avatar-wrapper {
    margin-right: 0;
  }

  .profile-info h2 {
    font-size: 1.5rem;
  }

  .change-photo-btn {
    bottom: -12px;
  }

  .profile-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .detail-card {
    padding: 1rem;
  }

  .admin-section {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .stat-card {
    padding: 0.75rem;
  }

  .stat-value {
    font-size: 1.25rem;
  }
}
</style>
