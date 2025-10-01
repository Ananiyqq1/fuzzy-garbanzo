<template>
  <div class="student-profile">
    <div class="page-shell">
      <AppContentHeader
        title="Student Profile"
        subtitle="Manage your profile information"
        align="center"
      />

      <AppCard class="profile-card" variant="elevated">
        <div class="profile-header">
          <img :src="studentData.avatar" alt="Profile Photo" class="profile-photo" />
          <div class="profile-info">
            <h2>{{ studentData.name }}</h2>
            <p>{{ studentData.username }}</p>
            <span class="roles">{{ studentData.roles }}</span>
          </div>
        </div>

        <div class="profile-details">
          <AppFormSection title="Personal Information">
            <div class="detail-grid">
              <div class="detail-item">
                <label>Name</label>
                <div v-if="!isEditing" class="view-mode">
                  <p>{{ studentData.name }}</p>
                </div>
                <AppInput v-else v-model="editData.name" />
              </div>
              <div class="detail-item">
                <label>Username</label>
                <div v-if="!isEditing" class="view-mode">
                  <p>{{ studentData.username }}</p>
                </div>
                <AppInput v-else v-model="editData.username" />
              </div>
              <div class="detail-item">
                <label>Institute Email</label>
                <div v-if="!isEditing" class="view-mode">
                  <p>{{ studentData.instituteEmail }}</p>
                </div>
                <AppInput v-else v-model="editData.instituteEmail" type="email" />
              </div>
              <div class="detail-item">
                <label>Personal Email</label>
                <div v-if="!isEditing" class="view-mode">
                  <p>{{ studentData.personalEmail }}</p>
                </div>
                <AppInput v-else v-model="editData.personalEmail" type="email" />
              </div>
            </div>
          </AppFormSection>

          <AppFormSection title="Academic Information">
            <div class="detail-grid">
              <div class="detail-item">
                <label>Overall Score</label>
                <div v-if="!isEditing" class="view-mode">
                  <p>{{ studentData.overallScore }}</p>
                </div>
                <AppInput v-else v-model="editData.overallScore" type="number" step="0.1" />
              </div>
              <div class="detail-item full-width">
                <label>Bio</label>
                <div v-if="!isEditing" class="view-mode">
                  <p>{{ studentData.bio }}</p>
                </div>
                <AppTextarea v-else v-model="editData.bio" rows="4" />
              </div>
              <div class="detail-item full-width">
                <label>Interests</label>
                <div v-if="!isEditing" class="view-mode">
                  <div class="interests-container">
                    <span v-for="interest in studentData.interests" :key="interest" class="interest-tag">
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
                    <AppInput
                      v-model="newInterest"
                      placeholder="Add an interest"
                      @keyup.enter="addInterest"
                    />
                    <AppButton variant="secondary" size="small" @click="addInterest">Add</AppButton>
                  </div>
                </div>
              </div>
            </div>
          </AppFormSection>
        </div>

        <div class="action-buttons">
          <AppButton v-if="!isEditing" variant="secondary" size="small" @click="toggleEdit">
            Edit Profile
          </AppButton>
          <AppButton v-if="!isEditing" variant="danger" size="small" @click="deleteProfile">
            Delete Account
          </AppButton>
          <AppButton v-if="isEditing" size="small" @click="saveProfile">Save Changes</AppButton>
          <AppButton v-if="isEditing" variant="secondary" size="small" @click="cancelEdit">
            Cancel
          </AppButton>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import AppButton from '../common/AppButton.vue'
import AppCard from '../common/AppCard.vue'
import AppContentHeader from '../common/AppContentHeader.vue'
import AppFormSection from '../common/AppFormSection.vue'
import AppInput from '../common/AppInput.vue'
import AppTextarea from '../common/AppTextarea.vue'

// Reactive data
const isEditing = ref(false)
const newInterest = ref('')

const studentData = reactive({
  name: 'John Doe',
  username: '@johndoe',
  roles: 'Student, Peer Mentor',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  instituteEmail: 'john.doe@hilcoe.edu.et',
  personalEmail: 'johndoe@gmail.com',
  overallScore: 87.5,
  bio: 'Computer Science student passionate about AI and machine learning. Currently working on a research project in natural language processing.',
  interests: ['Artificial Intelligence', 'Machine Learning', 'Natural Language Processing', 'Data Science']
})

const editData = reactive({
  name: '',
  username: '',
  instituteEmail: '',
  personalEmail: '',
  overallScore: 0,
  bio: '',
  interests: []
})

// Methods
const toggleEdit = () => {
  isEditing.value = true
  // Copy current data to edit data
  Object.assign(editData, {
    name: studentData.name,
    username: studentData.username,
    instituteEmail: studentData.instituteEmail,
    personalEmail: studentData.personalEmail,
    overallScore: studentData.overallScore,
    bio: studentData.bio,
    interests: [...studentData.interests]
  })
}

const cancelEdit = () => {
  isEditing.value = false
  newInterest.value = ''
}

const saveProfile = () => {
  // Update student data with edit data
  Object.assign(studentData, editData)
  isEditing.value = false
  newInterest.value = ''
  // In a real app, you would send this to the backend
  console.log('Profile updated:', studentData)
}

const deleteProfile = () => {
  if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
    // In a real app, you would send delete request to backend
    console.log('Profile deleted')
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

onMounted(() => {
  console.log('Student profile mounted')
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.student-profile {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  min-height: 100vh;
  padding: 3rem 2rem;
  color: #111827;
  display: flex;
  justify-content: center;
}

.page-shell {
  width: 100%;
  max-width: 960px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
}

.profile-card {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 231, 235, 0.6);
  border-radius: 1.5rem;
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 55px -32px rgba(15, 23, 42, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 45px 70px -34px rgba(15, 23, 42, 0.55);
  background: rgba(255, 255, 255, 0.94);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.7);
}

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
  border: 3px solid rgba(17, 24, 39, 0.1);
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
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.18), rgba(55, 65, 81, 0.2));
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-top: 10px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-card :deep(.section-header) {
  border-bottom: 1px solid rgba(229, 231, 235, 0.6);
  padding-bottom: 1rem;
}

.profile-card :deep(.app-form-section) {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(229, 231, 235, 0.55);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

.detail-item label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #4b5563;
}

.view-mode p {
  margin: 0;
  font-size: 1rem;
  color: #111827;
  line-height: 1.6;
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.interests-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.interest-tag {
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.16), rgba(55, 65, 81, 0.18));
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

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.profile-card :deep(.btn.small) {
  padding: 0.65rem 1.8rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
  }
  
  .profile-photo {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .profile-details {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  button {
    width: 100%;
  }

  .profile-container {
    padding: 25px;
  }
}
</style>
