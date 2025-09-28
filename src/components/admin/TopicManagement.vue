<template>
  <div>
    <div class="content-header">
      <div>
        <h1>Topic Management</h1>
        <p>Organize and manage learning topics and subtopics</p>
      </div>
      <button class="admin-btn admin-btn-primary" @click="showCreateForm">
        <i class="fas fa-plus"></i> Add New Topic
      </button>
    </div>

    <div class="filter-bar">
      <div class="filter-options">
        <select class="filter-select" v-model="filters.course">
          <option>All Courses</option>
          <option>Data Structures and Algorithms</option>
          <option>Database Systems</option>
          <option>Calculus I</option>
          <option>Business Management</option>
        </select>
        <input type="text" class="form-input" placeholder="Search topics..." v-model="filters.search" @input="applyFilters">
      </div>
      <div>
        <button class="admin-btn admin-btn-secondary">
          <i class="fas fa-download"></i> Export
        </button>
      </div>
    </div>

    <div class="form-container" v-if="showForm">
      <h3>Create New Topic</h3>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Topic Title</label>
          <input type="text" class="form-input" v-model="newTopic.title" placeholder="Enter topic title">
        </div>
        <div class="form-group">
          <label class="form-label">Parent Course</label>
          <select class="form-select" v-model="newTopic.course">
            <option>Select course</option>
            <option>Data Structures and Algorithms</option>
            <option>Database Systems</option>
            <option>Calculus I</option>
            <option>Business Management</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Difficulty Level</label>
          <select class="form-select" v-model="newTopic.difficulty">
            <option>Select difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Estimated Duration (hours)</label>
          <input type="number" class="form-input" v-model="newTopic.duration" placeholder="e.g., 5">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Topic Description</label>
          <textarea class="form-textarea" v-model="newTopic.description" placeholder="Enter topic description"></textarea>
        </div>
        <div class="form-group">
          <button class="admin-btn admin-btn-primary" @click="createTopic">Create Topic</button>
          <button class="admin-btn admin-btn-secondary" @click="hideCreateForm">Cancel</button>
        </div>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Topic Title</th>
          <th>Course</th>
          <th>Difficulty</th>
          <th>Duration</th>
          <th>Resources</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="topic in filteredTopics" :key="topic.id">
          <td>{{ topic.title }}</td>
          <td>{{ topic.course }}</td>
          <td>{{ topic.difficulty }}</td>
          <td>{{ topic.duration }} hours</td>
          <td>{{ topic.resources }}</td>
          <td><span class="status-badge" :class="getStatusClass(topic.status)">{{ topic.status }}</span></td>
          <td>
            <i class="fas fa-edit action-icon action-edit" @click="editTopic(topic)"></i>
            <i class="fas fa-trash action-icon action-delete" @click="deleteTopic(topic)"></i>
            <i class="fas fa-eye action-icon action-view" @click="viewTopic(topic)"></i>
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
  course: 'All Courses',
  search: ''
})
const newTopic = reactive({
  title: '',
  course: '',
  difficulty: '',
  duration: '',
  description: ''
})

const topics = ref([
  { id: 1, title: 'Linked Lists', course: 'Data Structures and Algorithms', difficulty: 'Intermediate', duration: 4, resources: 12, status: 'Active' },
  { id: 2, title: 'SQL Queries', course: 'Database Systems', difficulty: 'Beginner', duration: 3, resources: 8, status: 'Active' },
  { id: 3, title: 'Derivatives', course: 'Calculus I', difficulty: 'Intermediate', duration: 5, resources: 15, status: 'Active' },
  { id: 4, title: 'Business Ethics', course: 'Business Management', difficulty: 'Beginner', duration: 2, resources: 6, status: 'Inactive' },
  { id: 5, title: 'Normalization', course: 'Database Systems', difficulty: 'Advanced', duration: 4, resources: 10, status: 'Draft' }
])

const filteredTopics = computed(() => {
  return topics.value.filter(topic => {
    const matchesCourse = filters.course === 'All Courses' || topic.course === filters.course
    const matchesSearch = !filters.search || topic.title.toLowerCase().includes(filters.search.toLowerCase())
    return matchesCourse && matchesSearch
  })
})

const showCreateForm = () => {
  showForm.value = true
}

const hideCreateForm = () => {
  showForm.value = false
  Object.assign(newTopic, { title: '', course: '', difficulty: '', duration: '', description: '' })
}

const createTopic = () => {
  if (!newTopic.title || !newTopic.course || !newTopic.difficulty || !newTopic.duration) {
    alert('Please fill in all required fields')
    return
  }
  const newTopicData = {
    id: Date.now(),
    ...newTopic,
    resources: 0,
    status: 'Draft'
  }
  topics.value.push(newTopicData)
  hideCreateForm()
  alert('Topic created successfully!')
}

const editTopic = (topic) => {
  console.log('Edit topic:', topic)
}

const deleteTopic = (topic) => {
  if (confirm('Are you sure you want to delete this topic?')) {
    const index = topics.value.findIndex(t => t.id === topic.id)
    if (index > -1) {
      topics.value.splice(index, 1)
    }
    alert('Topic deleted successfully!')
  }
}

const viewTopic = (topic) => {
  console.log('View topic:', topic)
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
/* Reuse styles from admin_dashboard.html for consistency */
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
</style>