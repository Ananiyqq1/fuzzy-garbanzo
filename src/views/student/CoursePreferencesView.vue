<template>
  <div class="container">
    <header>
      <h1>Select Your Course Preferences</h1>
      <p class="subtitle">Choose the courses you're interested in to personalize your learning experience. Select at least 3 to continue.</p>
    </header>

    <div class="progress-container">
      <div class="progress-text">
        <span>Selection Progress</span>
        <span id="progress-text">{{ selectedCount }}/{{ maxSelections }} courses selected</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <div class="progress-text">
        <span>Minimum: {{ minSelections }} courses</span>
        <span>Maximum: {{ maxSelections }} courses</span>
      </div>
    </div>

    <div class="category-filter">
      <button 
        class="filter-btn" 
        :class="{ active: activeFilter === 'all' }"
        @click="setFilter('all')"
        data-category="all"
      >All Courses</button>
      <button 
        class="filter-btn" 
        :class="{ active: activeFilter === 'programming' }"
        @click="setFilter('programming')"
        data-category="programming"
      >Programming</button>
      <button 
        class="filter-btn" 
        :class="{ active: activeFilter === 'ai' }"
        @click="setFilter('ai')"
        data-category="ai"
      >AI & Data Science</button>
      <button 
        class="filter-btn" 
        :class="{ active: activeFilter === 'networking' }"
        @click="setFilter('networking')"
        data-category="networking"
      >Networking</button>
    </div>

    <div class="courses-grid">
      <div 
        v-for="course in filteredCourses" 
        :key="course.id" 
        class="course-card" 
        :class="{ selected: selectedCourses.includes(course.id) }"
        @click="toggleCourse(course.id)"
        :data-category="course.category"
      >
        <div class="course-icon">
          <i :class="course.icon"></i>
        </div>
        <h3 class="course-title">{{ course.title }}</h3>
        <p class="course-description">{{ course.description }}</p>
      </div>
    </div>

    <div class="action-buttons">
      <button class="secondary" @click="skipForNow">Skip for Now</button>
      <button @click="submitPreferences" :disabled="selectedCount < minSelections">Continue to Dashboard</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeFilter = ref('all')
const selectedCourses = ref([])
const minSelections = 2
const maxSelections = 6

const courses = ref([
  {
    id: 1,
    title: 'Programming & Software Development',
    description: 'Programming I, Programming II, Data Structures & Algorithms, Object-Oriented Programming, Windows Programming, Object Oriented Software Engineering, Compiler Design and Software Testing',
    category: 'programming',
    icon: 'fas fa-code'
  },
  {
    id: 2,
    title: 'Databases and Data Management',
    description: 'Database Management Systems, Database Programming & Admin, Data Mining, Information Retrieval',
    category: 'programming',
    icon: 'fas fa-database'
  },
  {
    id: 3,
    title: 'Systems & Infrastructure',
    description: 'Introduction to Unix, Computer Organization & Assembly Language Programming, Operating Systems, Computer Networks, Network Administration, Computer Systems Security, UNIX System Administration',
    category: 'networking',
    icon: 'fas fa-network-wired'
  },
  {
    id: 4,
    title: 'Specialized & Emerging Areas',
    description: 'Introduction to Emerging Technologies, Artificial Intelligence, Geographic Information Systems, Computer Graphics',
    category: 'ai',
    icon: 'fas fa-brain'
  },
  {
    id: 5,
    title: 'Web & Mobile Development',
    description: 'Web Design & Development I, Web Design & Development II, Mobile Application',
    category: 'programming',
    icon: 'fas fa-globe'
  },
  {
    id: 6,
    title: 'ICT Management & Research',
    description: 'ICT Fundamentals, Systems Analysis & Design, Focusing Areas on ICT, IT Research Methods, IT Project Management',
    category: 'ai',
    icon: 'fas fa-chart-bar'
  }
])

const selectedCount = computed(() => selectedCourses.value.length)
const progressPercentage = computed(() => (selectedCount.value / maxSelections.value) * 100)
const filteredCourses = computed(() => {
  if (activeFilter.value === 'all') {
    return courses.value
  }
  return courses.value.filter(course => course.category === activeFilter.value)
})

const setFilter = (category) => {
  activeFilter.value = category
}

const toggleCourse = (courseId) => {
  const index = selectedCourses.value.indexOf(courseId)
  if (index > -1) {
    selectedCourses.value.splice(index, 1)
  } else if (selectedCount.value < maxSelections) {
    selectedCourses.value.push(courseId)
  } else {
    alert(`You can only select up to ${maxSelections} courses.`)
  }
}

const submitPreferences = () => {
  if (selectedCount.value < minSelections) {
    alert(`Please select at least ${minSelections} courses to continue.`)
    return
  }
  
  // Store preferences (in real app, send to backend)
  localStorage.setItem('coursePreferences', JSON.stringify(selectedCourses.value))
  
  alert(`Success! ${selectedCount.value} courses selected. Redirecting to dashboard...`)
  router.push('/student')
}

const skipForNow = () => {
  alert("You haven't selected any preferences. You can come back later to complete your selection.")
  router.push('/student')
}
</script>

<style scoped>
/* Styles from course_preferences.html */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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

.subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

.progress-container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 20px;
  margin-bottom: 30px;
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
}

.filter-btn:hover, .filter-btn.active {
  background: #111827;
  color: white;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.course-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.9);
}

.course-card.selected {
  background: rgba(17, 24, 39, 0.05);
  border: 2px solid #111827;
}

.course-icon {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #111827;
}

.course-title {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.course-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

button.secondary {
  background-color: transparent;
  color: #111827;
}

button.secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
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