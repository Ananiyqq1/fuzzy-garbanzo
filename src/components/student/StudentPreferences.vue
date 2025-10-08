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
        <AppCard v-for="course in filteredCourses" :key="course.title" class="course-card" variant="elevated"
          :clickable="true" @click="toggleSelection(course.title)">
          <template #header>
            <div class="course-header">
              <div class="course-icon">
                <i :class="course.icon"></i>
              </div>
              <h3 class="course-title">{{ course.title }}</h3>
            </div>
          </template>
          <p class="course-description">{{ course.description }}</p>
          <template #footer>
            <AppButton size="small" :variant="selectedCourses.includes(course.title) ? 'primary' : 'secondary'">
              {{ selectedCourses.includes(course.title) ? 'Selected' : 'Select Course' }}
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppTabs from '../common/AppTabs.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import SignUp from '../auth/SignUp.vue';
import { signUp } from '../auth/api/SignUp';
const auth = useAuthStore()
const router = useRouter();
const userInfo = auth.tempPayload;
const selectedCourses = ref([]);
const activeFilter = ref('all');
const maxSelections = 6;
const minSelections = 2;

const courses = [
  {
    title: 'Programming & Software Development',
    description: 'Programming I, Programming II, Data Structures & Algorithms, Object-Oriented Programming, Windows Programming, Object Oriented Software Engineering, Compiler Design and Software Testing',
    icon: 'fas fa-code',
    category: 'programming'
  },
  {
    title: 'Databases and Data Management',
    description: 'Database Management Systems, Database Programming & Admin, Data Mining, Information Retrieval',
    icon: 'fas fa-database',
    category: 'programming'
  },
  {
    title: 'Systems & Infrastructure',
    description: 'Introduction to Unix, Computer Organization & Assembly Language Programming, Operating Systems, Computer Networks, Network Administration, Computer Systems Security, UNIX System Administration',
    icon: 'fas fa-network-wired',
    category: 'networking'
  },
  {
    title: 'Specialized & Emerging Areas',
    description: 'Introduction to Emerging Techologies, Artificial Intelligence, Geographic Information Systems, Computer Graphics',
    icon: 'fas fa-brain',
    category: 'ai'
  },
  {
    title: 'Web & Mobile Development',
    description: 'Web Design & Development I, Web Design & Development II, Mobile Application',
    icon: 'fas fa-globe',
    category: 'programming'
  },
  {
    title: 'ICT Management & Research',
    description: 'ICT Fundamentals, Systems Analysis & Design, Focusing Areas on ICT, IT Research Methods, IT Project Management',
    icon: 'fas fa-chart-line',
    category: 'ai'
  }
];

const filters = [
  { value: 'all', label: 'All Courses', icon: 'fas fa-layer-group' },
  { value: 'programming', label: 'Programming', icon: 'fas fa-code' },
  { value: 'ai', label: 'AI & Data Science', icon: 'fas fa-brain' },
  { value: 'networking', label: 'Networking', icon: 'fas fa-network-wired' }
];

const selectedCount = computed(() => selectedCourses.value.length);
const progressPercentage = computed(() => (selectedCount.value / maxSelections) * 100);

const filteredCourses = computed(() => {
  if (activeFilter.value === 'all') {
    return courses;
  }
  return courses.filter(course => course.category === activeFilter.value);
});

function toggleSelection(courseTitle) {
  const index = selectedCourses.value.indexOf(courseTitle);
  if (index > -1) {
    selectedCourses.value.splice(index, 1);
  } else {
    if (selectedCount.value < maxSelections) {
      selectedCourses.value.push(courseTitle);
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

  console.log('Selected courses:', selectedCourses.value);
  var res = await signUp({
    ...userInfo,
    interests: selectedCourses.value,
    bio: "Please add a field to add bio Ananiya"
  })
  //add logics here like when the email is registered before and so
  if (res.status !== 200) {
    router.push("/auth")
    return;
  }
  if (res.data.verification_required) {
    router.push('/otp/${res.data.otp_session_id}}');
    return
  }
  else if (!res.data.verification_required) {
    await auth.fetchUser()
    router.push('/');
  }
  else
    router.push("/auth")
  return;
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
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}


.course-card :deep(.card-header) {
  border-bottom: none;
  padding-bottom: 0;
}

.course-card :deep(.card-footer) {
  border-top: none;
  padding-top: 0;
}

.course-card.selected {
  box-shadow: 0 20px 40px -10px rgba(17, 24, 39, 0.2);
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

.course-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.course-description {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  flex-grow: 1;
  display: -webkit-box;
  /* -webkit-line-clamp: 4; */
  -webkit-box-orient: vertical;
  overflow: hidden;
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