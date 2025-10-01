<template>
  <div class="student-layout">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <div class="logo-section">
          <div class="logo">H</div>
          <div class="brand-info">
            <h1>HiLCoE Peer</h1>
            <p>Student Dashboard</p>
          </div>
        </div>

        <div class="search-container">
          <input
            type="text"
            class="search-input"
            placeholder="Search for courses, topics and more"
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
              <router-link :to="item.path" class="nav-link" :class="{ active: $route.path === item.path }">
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path :d="item.iconPath" />
                </svg>
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
  router.push('/student/profile')
}

const navItems = [
  {
    label: 'Dashboard',
    path: '/student/dashboard',
    iconPath: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'
  },
  {
    label: 'My Sessions',
    path: '/student/sessions',
    iconPath: 'M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z'
  },
  {
    label: 'Resources',
    path: '/student/resources',
    iconPath: 'M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4z'
  },
  {
    label: 'Study Rooms',
    path: '/student/study-rooms',
    iconPath: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z'
  },
  {
    label: 'Evaluation',
    path: '/student/evaluations',
    iconPath: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'
  }
]
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.student-layout {
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

.nav-link {
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

.nav-link:hover {
  background: #f3f4f6;
}

.nav-link.active {
  background: #111827;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.nav-link svg {
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
  padding: 12px 45px;
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
