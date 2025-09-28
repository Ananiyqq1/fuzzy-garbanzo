<template>
  <div>
    <div class="content-header">
      <div>
        <h1>User Management</h1>
        <p>Manage user accounts, roles, and permissions</p>
      </div>
      <button class="admin-btn admin-btn-primary" @click="showCreateForm">
        <i class="fas fa-plus"></i> Add New User
      </button>
    </div>

    <div class="filter-bar">
      <div class="filter-options">
        <select class="filter-select" v-model="filters.role">
          <option>All Roles</option>
          <option>Student</option>
          <option>Instructor</option>
          <option>Administrator</option>
        </select>
        <select class="filter-select" v-model="filters.status">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Suspended</option>
        </select>
        <input type="text" class="form-input" placeholder="Search users..." v-model="filters.search" @input="applyFilters">
      </div>
      <div>
        <button class="admin-btn admin-btn-secondary">
          <i class="fas fa-download"></i> Export
        </button>
      </div>
    </div>

    <div class="form-container" v-if="showForm">
      <h3>Create New User</h3>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">First Name</label>
          <input type="text" class="form-input" v-model="newUser.firstName" placeholder="Enter first name">
        </div>
        <div class="form-group">
          <label class="form-label">Last Name</label>
          <input type="text" class="form-input" v-model="newUser.lastName" placeholder="Enter last name">
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" v-model="newUser.email" placeholder="Enter email address">
        </div>
        <div class="form-group">
          <label class="form-label">Role</label>
          <select class="form-select" v-model="newUser.role">
            <option>Select role</option>
            <option>Student</option>
            <option>Instructor</option>
            <option>Administrator</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" class="form-input" v-model="newUser.password" placeholder="Enter password">
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input type="password" class="form-input" v-model="newUser.confirmPassword" placeholder="Confirm password">
        </div>
        <div class="form-group">
          <button class="admin-btn admin-btn-primary" @click="createUser">Create User</button>
          <button class="admin-btn admin-btn-secondary" @click="hideCreateForm">Cancel</button>
        </div>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Joined</th>
          <th>Last Active</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.joined }}</td>
          <td>{{ user.lastActive }}</td>
          <td><span class="status-badge" :class="getStatusClass(user.status)">{{ user.status }}</span></td>
          <td>
            <i class="fas fa-edit action-icon action-edit" @click="editUser(user)"></i>
            <i class="fas fa-trash action-icon action-delete" @click="deleteUser(user)"></i>
            <i class="fas fa-eye action-icon action-view" @click="viewUser(user)"></i>
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
  role: 'All Roles',
  status: 'All Status',
  search: ''
})
const newUser = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  password: '',
  confirmPassword: ''
})

const users = ref([
  { id: 1, name: 'Abebe Kebede', email: 'abebe.kebede@example.com', role: 'Instructor', joined: 'Jan 15, 2023', lastActive: 'Today', status: 'Active' },
  { id: 2, name: 'Selamawit Tadesse', email: 'selamawit.t@example.com', role: 'Instructor', joined: 'Mar 10, 2023', lastActive: 'Yesterday', status: 'Active' },
  { id: 3, name: 'Michael Berhanu', email: 'michael.b@example.com', role: 'Student', joined: 'Feb 5, 2023', lastActive: '2 days ago', status: 'Active' },
  { id: 4, name: 'Hanna Girma', email: 'hanna.girma@example.com', role: 'Administrator', joined: 'Dec 20, 2022', lastActive: 'Today', status: 'Active' },
  { id: 5, name: 'Yordanos Lemma', email: 'yordanos.l@example.com', role: 'Student', joined: 'Apr 18, 2023', lastActive: '1 week ago', status: 'Inactive' }
])

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesRole = filters.role === 'All Roles' || user.role === filters.role
    const matchesStatus = filters.status === 'All Status' || user.status === filters.status
    const matchesSearch = !filters.search || user.name.toLowerCase().includes(filters.search.toLowerCase()) || user.email.toLowerCase().includes(filters.search.toLowerCase())
    return matchesRole && matchesStatus && matchesSearch
  })
})

const showCreateForm = () => {
  showForm.value = true
}

const hideCreateForm = () => {
  showForm.value = false
  Object.assign(newUser, { firstName: '', lastName: '', email: '', role: '', password: '', confirmPassword: '' })
}

const createUser = () => {
  if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.role || !newUser.password || !newUser.confirmPassword) {
    alert('Please fill in all required fields')
    return
  }
  if (newUser.password !== newUser.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  const newUserData = {
    id: Date.now(),
    ...newUser,
    joined: new Date().toLocaleDateString(),
    lastActive: 'Today',
    status: 'Active'
  }
  users.value.push(newUserData)
  hideCreateForm()
  alert('User created successfully!')
}

const editUser = (user) => {
  console.log('Edit user:', user)
}

const deleteUser = (user) => {
  if (confirm('Are you sure you want to delete this user?')) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
    alert('User deleted successfully!')
  }
}

const viewUser = (user) => {
  console.log('View user:', user)
}

const applyFilters = () => {
  // The computed property handles this automatically
}

const getStatusClass = (status) => {
  return {
    'status-active': status === 'Active',
    'status-inactive': status === 'Inactive'
  }
}
</script>

<style scoped>
/* Reuse styles from admin_dashboard.html */
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