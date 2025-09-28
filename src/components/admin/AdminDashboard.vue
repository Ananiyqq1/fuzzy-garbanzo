<template>
  <!-- Header -->
  <header class="header">
    <div class="header-container">
      <div class="logo-section">
        <div class="logo">H</div>
        <div class="brand-info">
          <h1>HiLCoE Peer</h1>
          <p>Admin Dashboard</p>
        </div>
      </div>
      
      <div class="search-container">
        <svg class="search-icon" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
        <input type="text" class="search-input" placeholder="Search courses, users, and more..." v-model="searchQuery" @input="handleSearch">
      </div>
      
      <div class="header-actions">
        <button class="action-btn" @click="toggleNotifications">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        <button class="action-btn" @click="toggleProfile">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <div class="main-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <nav>
        <ul class="nav-list">
          <li>
            <a href="#" class="nav-item" :class="{ active: currentPage === 'dashboard' }" @click.prevent="loadPageContent('dashboard')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ active: currentPage === 'course-management' }" @click.prevent="loadPageContent('course-management')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Course Management
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ active: currentPage === 'topic-management' }" @click.prevent="loadPageContent('topic-management')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Topic Management
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ active: currentPage === 'user-management' }" @click.prevent="loadPageContent('user-management')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              User Management
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ active: currentPage === 'analytics' }" @click.prevent="loadPageContent('analytics')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Analytics
            </a>
          </li>
          <li>
            <a href="#" class="nav-item" :class="{ active: currentPage === 'settings' }" @click.prevent="loadPageContent('settings')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div v-if="currentPage === 'dashboard'">
        <div class="content-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage students, courses, and platform settings</p>
          </div>
          <button class="admin-btn admin-btn-primary" @click="generateReport">Generate Report</button>
        </div>

        <div class="admin-cards-grid">
          <div class="admin-card">
            <div class="admin-card-header">
              <div class="admin-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
            </div>
            <h3>User Management</h3>
            <p>View, edit, and manage all user accounts and permissions.</p>
            <div class="admin-card-actions">
              <button class="admin-btn admin-btn-primary" @click="loadPageContent('user-management')">View Users</button>
              <button class="admin-btn admin-btn-secondary">Add New</button>
            </div>
          </div>

          <div class="admin-card">
            <div class="admin-card-header">
              <div class="admin-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
            </div>
            <h3>Course Management</h3>
            <p>Create, edit, and manage courses and learning materials.</p>
            <div class="admin-card-actions">
              <button class="admin-btn admin-btn-primary" @click="loadPageContent('course-management')">View Courses</button>
              <button class="admin-btn admin-btn-secondary">Create New</button>
            </div>
          </div>

          <div class="admin-card">
            <div class="admin-card-header">
              <div class="admin-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <h3>Analytics & Reports</h3>
            <p>View platform analytics, generate reports, and track performance.</p>
            <div class="admin-card-actions">
              <button class="admin-btn admin-btn-primary" @click="loadPageContent('analytics')">View Analytics</button>
              <button class="admin-btn admin-btn-secondary">Generate Report</button>
            </div>
          </div>

          <div class="admin-card">
            <div class="admin-card-header">
              <div class="admin-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
            <h3>Content Management</h3>
            <p>Manage topics, resources, and learning materials across the platform.</p>
            <div class="admin-card-actions">
              <button class="admin-btn admin-btn-primary" @click="loadPageContent('topic-management')">Manage Content</button>
              <button class="admin-btn admin-btn-secondary">Add New</button>
            </div>
          </div>

          <div class="admin-card">
            <div class="admin-card-header">
              <div class="admin-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
            <h3>Platform Settings</h3>
            <p>Configure system settings, permissions, and platform preferences.</p>
            <div class="admin-card-actions">
              <button class="admin-btn admin-btn-primary" @click="loadPageContent('settings')">Settings</button>
              <button class="admin-btn admin-btn-secondary">Permissions</button>
            </div>
          </div>

          <div class="admin-card">
            <div class="admin-card-header">
              <div class="admin-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <h3>Event Logs</h3>
            <p>View system logs, user activities, and platform events.</p>
            <div class="admin-card-actions">
              <button class="admin-btn admin-btn-primary">View Logs</button>
              <button class="admin-btn admin-btn-secondary">Export</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Management Content -->
      <div v-else-if="currentPage === 'course-management'">
        <div class="content-header">
          <div>
            <h1>Course Management</h1>
            <p>Create, edit, and manage courses and learning materials</p>
          </div>
          <button class="admin-btn admin-btn-primary">
            <i class="fas fa-plus"></i> Add New Course
          </button>
        </div>

        <div class="filter-bar">
          <div class="filter-options">
            <select class="filter-select" v-model="courseFilter.category">
              <option>All Categories</option>
              <option>Computer Science</option>
              <option>Engineering</option>
              <option>Business</option>
              <option>Mathematics</option>
            </select>
            <select class="filter-select" v-model="courseFilter.status">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Draft</option>
            </select>
            <input type="text" class="form-input" placeholder="Search courses..." v-model="courseFilter.search" @input="filterCourses">
          </div>
          <div>
            <button class="admin-btn admin-btn-secondary">
              <i class="fas fa-download"></i> Export
            </button>
          </div>
        </div>

        <div class="form-container">
          <h3>Create New Course</h3>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Course Title</label>
              <input type="text" class="form-input" v-model="newCourse.title" placeholder="Enter course title">
            </div>
            <div class="form-group">
              <label class="form-label">Course Code</label>
              <input type="text" class="form-input" v-model="newCourse.code" placeholder="e.g., CS101">
            </div>
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-select" v-model="newCourse.category">
                <option>Select category</option>
                <option>Computer Science</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Mathematics</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Instructor</label>
              <select class="form-select" v-model="newCourse.instructor">
                <option>Select instructor</option>
                <option>Dr. Abebe Kebede</option>
                <option>Dr. Selamawit Tadesse</option>
                <option>Dr. Michael Berhanu</option>
              </select>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Course Description</label>
              <textarea class="form-textarea" v-model="newCourse.description" placeholder="Enter course description"></textarea>
            </div>
            <div class="form-group">
              <button class="admin-btn admin-btn-primary" @click="createCourse">Create Course</button>
            </div>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Enrollments</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in filteredCourses" :key="course.code">
              <td>{{ course.code }}</td>
              <td>{{ course.title }}</td>
              <td>{{ course.category }}</td>
              <td>{{ course.instructor }}</td>
              <td>{{ course.enrollments }}</td>
              <td><span class="status-badge" :class="getStatusClass(course.status)">{{ course.status }}</span></td>
              <td>
                <i class="fas fa-edit action-icon action-edit" @click="editCourse(course)"></i>
                <i class="fas fa-trash action-icon action-delete" @click="deleteCourse(course)"></i>
                <i class="fas fa-eye action-icon action-view" @click="viewCourse(course)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Other page contents would be added here with v-else-if -->
      <div v-else>
        <div class="content-header">
          <h1>{{ currentPage.replace('-', ' ').toUpperCase() }}</h1>
          <p>This section is under development</p>
        </div>
        <div class="chart-placeholder">
          {{ currentPage }} management interface would be displayed here
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentPage = ref('dashboard')
const searchQuery = ref('')
const courseFilter = reactive({
  category: 'All Categories',
  status: 'All Status',
  search: ''
})
const newCourse = reactive({
  title: '',
  code: '',
  category: '',
  instructor: '',
  description: ''
})
const filteredCourses = ref([
  { code: 'CS201', title: 'Data Structures and Algorithms', category: 'Computer Science', instructor: 'Dr. Abebe Kebede', enrollments: 142, status: 'Active' },
  { code: 'CS202', title: 'Database Systems', category: 'Computer Science', instructor: 'Dr. Selamawit Tadesse', enrollments: 118, status: 'Active' },
  { code: 'MTH101', title: 'Calculus I', category: 'Mathematics', instructor: 'Dr. Michael Berhanu', enrollments: 205, status: 'Active' },
  { code: 'BUS301', title: 'Business Management', category: 'Business', instructor: 'Dr. Hanna Girma', enrollments: 87, status: 'Inactive' },
  { code: 'ENG150', title: 'Introduction to Engineering', category: 'Engineering', instructor: 'Dr. Yordanos Lemma', enrollments: 93, status: 'Draft' }
])

const loadPageContent = (page) => {
  currentPage.value = page
}

const handleSearch = () => {
  // Implement search functionality
}

const getStatusClass = (status) => {
  return {
    'status-active': status === 'Active',
    'status-inactive': status === 'Inactive',
    'status-pending': status === 'Draft'
  }
}

const createCourse = () => {
  // Implement course creation
  console.log('Creating course:', newCourse)
  // Reset form
  Object.assign(newCourse, {
    title: '',
    code: '',
    category: '',
    instructor: '',
    description: ''
  })
}

const editCourse = (course) => {
  console.log('Editing course:', course)
}

const deleteCourse = (course) => {
  console.log('Deleting course:', course)
}

const viewCourse = (course) => {
  console.log('Viewing course:', course)
}

const generateReport = () => {
  console.log('Generating report...')
}

const toggleNotifications = () => {
  console.log('Toggle notifications')
}

const toggleProfile = () => {
  console.log('Toggle profile')
}

const filterCourses = () => {
  // Implement course filtering based on courseFilter
  console.log('Filtering courses with:', courseFilter)
}
</script>

<style scoped>
/* All styles from admin_dashboard.html */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  line-height: 1.6;
  color: #374151;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  min-height: 100vh;
}

/* Header Styles */
.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
}

.brand-info h1 {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.brand-info p {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin: 0;
}

/* Search Bar */
.search-container {
  flex: 1;
  max-width: 28rem;
  margin: 0 2rem;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  outline: none;
  transition: all 0.2s ease;
}

.search-input:focus {
  border: 2px solid #111827;
  border-color: transparent;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  width: 1.25rem;
  height: 1.25rem;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.75rem;
  background: #f3f4f6;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background: #e5e7eb;
}

.action-btn svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #4b5563;
}

/* Main Layout */
.main-container {
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  min-height: calc(100vh - 100px);
  position: relative;
  z-index: 1;
}

/* Sidebar */
.sidebar {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 2rem 1.5rem;
  position: sticky;
  top: 6rem;
  height: fit-content;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color: #4b5563;
  text-decoration: none;
}

.nav-item:hover {
  background: #f3f4f6;
}

.nav-item.active {
  background: #111827;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.nav-item svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* Main Content */
.main-content {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 2rem;
  min-height: 600px;
}

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

/* Admin Cards Grid */
.admin-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.admin-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.admin-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.admin-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.admin-card-icon {
  padding: 0.75rem;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  border-radius: 0.75rem;
  transition: transform 0.3s ease;
}

.admin-card:hover .admin-card-icon {
  transform: scale(1.1);
  background: linear-gradient(135deg, #374151 0%, #111827 100%);
}

.admin-card-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.admin-card h3 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.admin-card:hover h3 {
  color: #374151;
}

.admin-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.admin-card-actions {
  display: flex;
  gap: 0.5rem;
}

.admin-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.admin-btn-primary {
  background: #111827;
  color: white;
}

.admin-btn-primary:hover {
  background: #374151;
}

.admin-btn-secondary {
  background: transparent;
  color: #111827;
  border: 1px solid #e5e7eb;
}

.admin-btn-secondary:hover {
  background: rgba(17, 24, 39, 0.1);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.filter-options {
  display: flex;
  gap: 0.75rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.875rem;
}

/* Form Styles */
.form-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #111827;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Data Table */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.data-table th {
  background: rgba(17, 24, 39, 0.05);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover {
  background: rgba(17, 24, 39, 0.03);
}

/* Status Badges */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #fee2e2;
  color: #991b1b;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

/* Action Icons */
.action-icon {
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.5rem;
}

.action-edit {
  color: #2563eb;
}

.action-edit:hover {
  background: rgba(37, 99, 235, 0.1);
}

.action-delete {
  color: #dc2626;
}

.action-delete:hover {
  background: rgba(220, 38, 38, 0.1);
}

.action-view {
  color: #059669;
}

.action-view:hover {
  background: rgba(5, 150, 105, 0.1);
}

/* Chart Placeholder */
.chart-placeholder {
  height: 300px;
  background: rgba(17, 24, 39, 0.05);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 0.875rem;
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

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: span 1;
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

  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .content-header h1 {
    font-size: 1.875rem;
  }

  .admin-cards-grid {
    grid-template-columns: 1fr;
  }

  .filter-bar {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .filter-options {
    flex-wrap: wrap;
  }
}
</style>