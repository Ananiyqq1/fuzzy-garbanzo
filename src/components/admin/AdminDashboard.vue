<template>
  <div class="admin-dashboard">
      <!-- Header -->
      <div class="content-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage students, courses, and platform settings</p>
        </div>
        <button class="admin-btn admin-btn-primary" @click="generateReport">Generate Report</button>
      </div>

      <!-- Admin Cards Grid -->
      <div class="admin-cards-grid">
        <div class="admin-card" @click="navigateTo('/admin/users')">
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
            <button class="admin-btn admin-btn-primary" @click.stop="navigateTo('/admin/users')">View Users</button>
            <button class="admin-btn admin-btn-secondary" @click.stop="addNewUser">Add New</button>
          </div>
        </div>

        <div class="admin-card" @click="navigateTo('/admin/courses')">
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
            <button class="admin-btn admin-btn-primary" @click.stop="navigateTo('/admin/courses')">View Courses</button>
            <button class="admin-btn admin-btn-secondary" @click.stop="createNewCourse">Create New</button>
          </div>
        </div>

        <div class="admin-card" @click="navigateTo('/admin/analytics')">
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
            <button class="admin-btn admin-btn-primary" @click.stop="navigateTo('/admin/analytics')">View Analytics</button>
            <button class="admin-btn admin-btn-secondary" @click.stop="generateReport">Generate Report</button>
          </div>
        </div>

        <div class="admin-card" @click="navigateTo('/admin/topics')">
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
            <button class="admin-btn admin-btn-primary" @click.stop="navigateTo('/admin/topics')">Manage Content</button>
            <button class="admin-btn admin-btn-secondary" @click.stop="addNewContent">Add New</button>
          </div>
        </div>

        <div class="admin-card" @click="navigateTo('/admin/settings')">
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
            <button class="admin-btn admin-btn-primary" @click.stop="navigateTo('/admin/settings')">Settings</button>
            <button class="admin-btn admin-btn-secondary" @click.stop="managePermissions">Permissions</button>
          </div>
        </div>

        <div class="admin-card" @click="viewLogs">
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
            <button class="admin-btn admin-btn-primary" @click.stop="viewLogs">View Logs</button>
            <button class="admin-btn admin-btn-secondary" @click.stop="exportLogs">Export</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Methods
const navigateTo = (path) => {
  router.push(path)
}

const generateReport = () => {
  console.log('Generating report...')
  // Implement report generation logic
}

const addNewUser = () => {
  console.log('Adding new user...')
  // Implement add user logic
}

const createNewCourse = () => {
  console.log('Creating new course...')
  // Implement create course logic
}

const addNewContent = () => {
  console.log('Adding new content...')
  // Implement add content logic
}

const managePermissions = () => {
  console.log('Managing permissions...')
  // Implement permissions logic
}

const viewLogs = () => {
  console.log('Viewing logs...')
  // Implement view logs logic
}

const exportLogs = () => {
  console.log('Exporting logs...')
  // Implement export logs logic
}

onMounted(() => {
  console.log('Admin dashboard mounted')
})
</script>

<style scoped>
h3 {
  white-space: nowrap;
}
.admin-dashboard {
  padding: 2rem;
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
  cursor: pointer;
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

/* Responsive Design */
@media (max-width: 768px) {
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

  .main-content {
    padding: 1.5rem;
  }
}
</style>