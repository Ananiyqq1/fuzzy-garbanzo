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
          <div class="avatar-wrapper">
            <img
              :src="isEditing ? editData.avatar || studentData.avatar : studentData.avatar"
              alt="Profile Photo"
              class="profile-photo"
            />
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
            />
          </div>
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
import { onMounted, reactive, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSignUpData } from '@/composables/useSignUpData'
import AppButton from '../common/AppButton.vue'
import AppCard from '../common/AppCard.vue'
import AppContentHeader from '../common/AppContentHeader.vue'
import AppFormSection from '../common/AppFormSection.vue'
import AppInput from '../common/AppInput.vue'
import AppTextarea from '../common/AppTextarea.vue'

// Reactive data
const isEditing = ref(false)
const newInterest = ref('')
const fileInput = ref(null)

const auth = useAuthStore()
const { signUpData } = useSignUpData()

const FALLBACK_AVATAR = new URL('../../assets/default-avatar.svg', import.meta.url).href

const studentData = reactive({
  name: '',
  username: '',
  roles: '',
  avatar: FALLBACK_AVATAR,
  instituteEmail: '',
  personalEmail: '',
  overallScore: 0,
  bio: '',
  interests: []
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

const sanitizeUsername = (value) => {
  if (!value) return ''
  return value.startsWith('@') ? value : `@${value}`
}

const hydrateStudentData = () => {
  if (isEditing.value) return

  const user = auth.user

  studentData.name = user?.name || signUpData.name || 'Student'
  studentData.username = user?.username
    ? sanitizeUsername(user.username)
    : sanitizeUsername(signUpData.username)
  studentData.roles = user?.roles?.length ? user.roles.join(', ') : 'Student'
  studentData.avatar = user?.profile_photo || editData.avatar || FALLBACK_AVATAR
  studentData.instituteEmail = user?.institute_email || signUpData.instituteEmail || ''
  studentData.personalEmail = user?.email || signUpData.personalEmail || ''
  studentData.overallScore = user?.overall_score ?? studentData.overallScore
  studentData.bio = user?.bio || signUpData.bio || 'Add a short bio so peers can learn more about you.'
  studentData.interests = user?.interests?.length
    ? [...user.interests]
    : [...editData.interests]

  if (!studentData.interests.length && signUpData.bio) {
    studentData.interests = ['Getting Started']
  }
}

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
    avatar: studentData.avatar,
    interests: [...studentData.interests]
  })
}

const cancelEdit = () => {
  isEditing.value = false
  newInterest.value = ''
  editData.avatar = studentData.avatar
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const saveProfile = () => {
  // Update student data with edit data
  Object.assign(studentData, editData)
  isEditing.value = false
  newInterest.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
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

onMounted(() => {
  hydrateStudentData()
})

watch(
  () => auth.user,
  () => {
    hydrateStudentData()
  },
  { immediate: true }
)

watch(
  () => ({
    name: signUpData.name,
    username: signUpData.username,
    instituteEmail: signUpData.instituteEmail,
    personalEmail: signUpData.personalEmail,
    bio: signUpData.bio
  }),
  () => {
    hydrateStudentData()
  }
)
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.student-profile {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
}

.page-shell {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
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
  width: 100%;
}

.profile-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 45px 70px -34px rgba(15, 23, 42, 0.55);
  background: rgba(255, 255, 255, 0.94);
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
  flex-wrap: wrap;
}

.interest-input-container input {
  flex-grow: 1;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}

.profile-card :deep(.btn.small) {
  padding: 0.65rem 1.8rem;
}

@media (max-width: 1024px) {
  .student-profile {
    padding: 2.5rem 1.5rem;
  }

  .page-shell {
    gap: 1.5rem;
  }

  .profile-card {
    padding: 2rem;
    border-radius: 1.25rem;
  }

  .detail-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-photo {
    margin-bottom: 20px;
  }

  .avatar-wrapper {
    margin-right: 0;
  }

  .student-profile {
    padding: 2rem 1rem;
  }

  .page-shell {
    gap: 1.25rem;
  }

  .profile-card {
    padding: 1.75rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .action-buttons :deep(button),
  .action-buttons :deep(.btn) {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .student-profile {
    padding: 1.5rem 0.75rem;
  }

  .profile-card {
    padding: 1.25rem;
    gap: 1.5rem;
  }

  .profile-header {
    gap: 0.75rem;
  }

  .profile-photo {
    width: 90px;
    height: 90px;
  }

  .change-photo-btn {
    bottom: -12px;
  }

  .detail-grid {
    gap: 0.75rem;
  }

  .interest-input-container {
    flex-direction: column;
  }

  .interest-input-container input {
    width: 100%;
  }

  .action-buttons {
    gap: 0.75rem;
  }
}
</style>