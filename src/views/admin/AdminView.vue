<template>
  <div class="admin-layout">
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
          <input
            type="text"
            class="search-input"
            placeholder="Search courses, users, and more..."
            v-model="searchQuery"
          />
          <svg class="search-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div class="header-actions">
          <button class="action-btn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          <button class="action-btn" @click="navigateToProfile">
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
            <li v-for="item in navItems" :key="item.path">
              <router-link :to="item.path" class="nav-item" :class="{ active: $route.path === item.path }">
                <template v-if="item.type === 'svg'">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      :d="item.iconPath"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </template>
                <template v-else>
                  <i :class="item.icon" aria-hidden="true"></i>
                </template>
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="main-content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

// Methods
const navigateToProfile = () => {
  router.push('/admin/profile')
}

const navItems = [
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    type: 'svg',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    label: 'Courses',
    path: '/admin/courses',
    type: 'svg',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    label: 'Topics',
    path: '/admin/topics',
    type: 'svg',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  },
  {
    label: 'Users',
    path: '/admin/users',
    type: 'icon',
    icon: 'fas fa-users'
  },
  {
    label: 'Analytics',
    path: '/admin/analytics',
    type: 'icon',
    icon: 'fas fa-chart-line'
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    type: 'icon',
    icon: 'fas fa-cog'
  }
]
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.admin-layout {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  min-height: 100vh;
  color: #111827;
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
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
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
  white-space: nowrap;
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

/* Main Content Wrapper - Auth Interface Consistency */
.main-content-wrapper {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 600px;
}

/* Standardized Button Styling - Auth Interface Consistency */
button {
  border-radius: 20px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 25px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

button:hover {
  background-color: #374151;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: scale(0.98);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.2);
}

button.secondary {
  background-color: transparent;
  color: #111827;
}

button.secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

button.ghost:hover {
  background-color: rgba(255, 255, 255, 0.2);
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
}
</style>