<template>
  <div class="preferences-page">
    <div class="page-shell">
      <AppContentHeader title="Select Your Course Preferences"
        subtitle="Choose the courses you're interested in to personalize your learning experience. Select at least 3 to continue."
        align="center" />

      <div class="progress-card">
        <div class="progress-text">
          <span>Selection Progress</span>
          <span>{{ selectedCount }}/{{ maxSelections }} courses selected</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <div class="progress-text">
          <span>Minimum: {{ minSelections }} courses</span>
          <span>Maximum: {{ maxSelections }} courses</span>
        </div>
      </div>

      <AppTabs v-model="activeFilter" :tabs="filters" />
      <div class="courses-grid">
        <AppCard
          v-for="topic in topicCards"
          :key="topic.id"
          class="course-card"
          variant="elevated"
          :class="{ selected: selectedCourses.includes(topic.name) }"
          :clickable="true"
          @click="toggleSelection(topic.name)"
        >
          <template #header>
            <div class="course-header">
              <div class="course-icon">
                <i :class="topic.icon"></i>
              </div>
              <div class="course-header-text">
                <h3 class="course-title">{{ topic.name }}</h3>
                <p class="course-subtitle">{{ topic.categoryTitle }}</p>
              </div>
            </div>
          </template>

          <template #footer>
            <AppButton
              size="small"
              :variant="selectedCourses.includes(topic.name) ? 'primary' : 'secondary'"
            >
              {{ selectedCourses.includes(topic.name) ? 'Selected' : 'Select Course' }}
            </AppButton>
          </template>
        </AppCard>
      </div>

      <div class="action-buttons">
        <AppButton variant="secondary" size="small" @click="skip">Skip for Now</AppButton>
        <AppButton size="small" :disabled="selectedCount < minSelections" @click="continueOtp">
          Continue to OTP Verification
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppTabs from '../common/AppTabs.vue';
import { useAuthStore } from '@/stores/useAuthStore';
// import SignUp from '../auth/SignUp.vue';
// import { signUp } from '../auth/api/SignUp';
const auth = useAuthStore()
import {
  studentPreferenceCourses,
  studentPreferenceFilters,
  studentPreferenceSelectionLimits,
} from '../../data/studentPreferences.js';
import { useSignUpData } from '../../composables/useSignUpData';

const router = useRouter();
const userInfo = auth.tempPayload;
const selectedCourses = ref([]);
const activeFilter = ref(studentPreferenceFilters[0].value);
const maxSelections = studentPreferenceSelectionLimits.max;
const minSelections = studentPreferenceSelectionLimits.min;

const filters = studentPreferenceFilters;

const selectedCount = computed(() => selectedCourses.value.length);
const progressPercentage = computed(() => (selectedCount.value / maxSelections) * 100);

const { signUpData } = useSignUpData();

const topicCards = computed(() => {
  const course = studentPreferenceCourses.find(
    (item) => item.category === activeFilter.value,
  );

  if (!course) {
    return [];
  }

  return course.description
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((name, index) => ({
      id: `${course.category}-${index}`,
      name,
      icon: course.icon,
      categoryTitle: course.title,
    }));
});

function toggleSelection(topicName) {
  const index = selectedCourses.value.indexOf(topicName);
  if (index > -1) {
    selectedCourses.value.splice(index, 1);
  } else {
    if (selectedCount.value < maxSelections) {
      selectedCourses.value.push(topicName);
    } else {
      alert(`You can only select up to ${maxSelections} courses.`);
    }
  }
}

function skip() {
  alert("You haven't selected any preferences. You can come back later to complete your selection.");
  router.push('/');
}

async function continueOtp() {
   if (!userInfo) { 
    console.warn('No signup payload found, redirecting to /auth');
    router.push('/auth');
    return;
  }
  if (selectedCount.value < minSelections) {
    alert(`Please select at least ${minSelections} courses to continue.`);
    return;
  }
  
  const signUpDetails = {
    name: signUpData.name,
    username: signUpData.username,
    instituteEmail: signUpData.instituteEmail,
    personalEmail: signUpData.personalEmail,
    bio: signUpData.bio,
  };

  const courseSelections = [...selectedCourses.value];

  console.log('Onboarding submission:', {
    signUp: signUpDetails,
    selectedCourses: courseSelections,
  });
  console.log('Selected courses:', selectedCourses.value);
  router.push('/')
  // const res = await signUp({
  //   ...userInfo,
  //   interests: selectedCourses.value,
  //   bio: 'Please add a field to add bio Ananiya'
  // })

  // if (res.status !== 200) {
  //   alert('Sign up failed. Please try again.')
  //   router.push('/auth')
  //   return
  // }

  // if (res.data.verification_required && res.data.otp_session_id) {
  //   alert(`Success! ${selectedCount.value} courses selected. Redirecting to OTP verification...`)
  //   router.push(`/auth/otp/${res.data.otp_session_id}`)
  //   return
  // }

  // if (!res.data.verification_required) {
  //   await auth.fetchUser()
  //   router.push('/')
  //   return
  // }

}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.preferences-page {
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
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 2.5rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.course-card {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.6);
  border-radius: 1rem;
  box-shadow: 0 10px 25px -12px rgba(17, 24, 39, 0.25);
  transition: all 0.3s ease;
}

.course-card :deep(.card-header) {
  border-bottom: none;
  padding-bottom: 0;
}

.course-card :deep(.card-footer) {
  border-top: none;
  padding-top: 0;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 45px -18px rgba(17, 24, 39, 0.35);
  background: rgba(255, 255, 255, 0.9);
}

.course-card.selected {
  border: 2px solid #111827;
  background: rgba(17, 24, 39, 0.05);
  box-shadow: 0 22px 40px -20px rgba(17, 24, 39, 0.5);
}

.course-icon {
  font-size: 2rem;
  color: #111827;
}

.course-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.course-header-text {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.course-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
  color: #111827;
}

.course-subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.45;
}


.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 30px;
}


.progress-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;
}

.progress-bar {
  height: 10px;
  background-color: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-fill {
  height: 100%;
  background-color: #111827;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #6b7280;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}

.filter-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #111827;
  text-transform: none;
  letter-spacing: normal;
  font-weight: normal;
}

.filter-btn:hover,
.filter-btn.active {
  background: #111827;
  color: white;
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>