<template>
  <div>
    <!-- Content Header -->
    <div class="content-header">
      <div>
        <h1>Course Management</h1>
        <p>Create, edit, and manage courses and learning materials</p>
      </div>
      <button class="admin-btn admin-btn-primary" @click="showCreateForm">
        <i class="fas fa-plus"></i> Add New Course
      </button>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-options">
        <select class="filter-select" v-model="filters.category">
          <option>All Categories</option>
          <option>Computer Science</option>
          <option>Engineering</option>
          <option>Business</option>
          <option>Mathematics</option>
        </select>
        <select class="filter-select" v-model="filters.status">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Draft</option>
        </select>
        <input 
          type="text" 
          class="form-input" 
          placeholder="Search courses..." 
          v-model="filters.search" 
          @input="applyFilters"
        >
      </div>
      <div>
        <button class="admin-btn admin-btn-secondary" @click="exportCourses">
          <i class="fas fa-download"></i> Export
        </button>
      </div>
    </div>

    <!-- Create Course Form -->
    <div v-if="showForm" class="form-container">
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
          <button class="admin-btn admin-btn-secondary" @click="hideCreateForm">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Courses Table -->
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
        <tr v-for="course in filteredCourses" :key="course.id">
          <td>{{ course.code }}</td>
          <td>{{ course.title }}</td>
          <td>{{ course.category }}</td>
          <td>{{ course.instructor }}</td>
          <td>{{ course.enrollments }}</td>
          <td><span class="status-badge" :class="getStatusClass(course.status)">{{ course.status }}</span></td>
          <td>
            <i class="fas fa-edit action-icon action-edit" @click="editCourse(course)" title="Edit"></i>
            <i class="fas fa-trash action-icon action-delete" @click="deleteCourse(course)" title="Delete"></i>
            <i class="fas fa-eye action-icon action-view" @click="viewCourse(course)" title="View"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const showForm = ref(false)
const filters = reactive({
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

// Mock courses data
const courses = ref([
  {
    id: 1,
    code: 'CS201',
    title: 'Data Structures and Algorithms',
    category: 'Computer Science',
    instructor: 'Dr. Abebe Kebede',
    enrollments: 142,
    status: 'Active'
  },
  {
    id: 2,
    code: 'CS202',
    title: 'Database Systems',
    category: 'Computer Science',
    instructor: 'Dr. Selamawit Tadesse',
    enrollments: 118,
    status: 'Active'
  },
  {
    id: 3,
    code: 'MTH101',
    title: 'Calculus I',
    category: 'Mathematics',
    instructor: 'Dr. Michael Berhanu',
    enrollments: 205,
    status: 'Active'
  },
  {
    id: 4,
    code: 'BUS301',
    title: 'Business Management',
    category: 'Business',
    instructor: 'Dr. Hanna Girma',
    enrollments: 87,
    status: 'Inactive'
  },
  {
    id: 5,
    code: 'ENG150',
    title: 'Introduction to Engineering',
    category: 'Engineering',
    instructor: 'Dr. Yordanos Lemma',
    enrollments: 93,
    status: 'Draft'
  }
])

const filteredCourses = computed(() => {
  return courses.value.filter(course => {
    const matchesCategory = filters.category === 'All Categories' || course.category === filters.category
    const matchesStatus = filters.status === 'All Status' || course.status === filters.status
    const matchesSearch = !filters.search || course.title.toLowerCase().includes(filters.search.toLowerCase()) || course.code.toLowerCase().includes(filters.search.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })
})

const showCreateForm = () => {
  showForm.value = true
}

const hideCreateForm = () => {
  showForm.value = false
  // Reset form
  Object.assign(newCourse, {
    title: '',
    code: '',
    category: '',
    instructor: '',
    description: ''
  })
}

const createCourse = () => {
  if (!newCourse.title || !newCourse.code || !newCourse.category || !newCourse.instructor) {
    alert('Please fill in all required fields')
    return
  }
  
  // Add new course to list
  const newCourseData = {
    id: Date.now(),
    ...newCourse,
    enrollments: 0,
    status: 'Draft'
  }
  courses.value.push(newCourseData)
  
  // Reset form
  hideCreateForm()
  
  alert('Course created successfully!')
}

const editCourse = (course) => {
  console.log('Edit course:', course)
  // Implement edit functionality
  alert('Edit course functionality would be implemented here')
}

const deleteCourse = (course) => {
  if (confirm('Are you sure you want to delete this course?')) {
    const index = courses.value.findIndex(c => c.id === course.id)
    if (index > -1) {
      courses.value.splice(index, 1)
    }
    alert('Course deleted successfully!')
  }
}

const viewCourse = (course) => {
  console.log('View course:', course)
  // Implement view functionality
  alert('View course details functionality would be implemented here')
}

const exportCourses = () => {
  console.log('Exporting courses...')
  // Implement export functionality
  alert('Courses exported successfully!')
}

const applyFilters = () => {
  // Trigger filtering when search changes
  // The computed property handles this automatically
}

const getStatusClass = (status) => {
  return {
    'status-active': status === 'Active',
    'status-inactive': status === 'Inactive',
    'status-pending': status === 'Draft'
  }
}
</script>

<style scoped>
/* Styles from admin_dashboard.html - Course Management section */
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

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .filter-options {
    flex-wrap: wrap;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: span 1;
  }
}
</style>