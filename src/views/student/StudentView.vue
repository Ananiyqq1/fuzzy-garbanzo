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
            @input="handleSearch"
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
          <button class="action-btn" @click="toggleNotifications">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          <button class="action-btn" @click="logout">
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
              <router-link
                to="/student/dashboard"
                class="nav-link"
                active-class="active"
              >
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/student/sessions"
                class="nav-link"
                active-class="active"
              >
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                  />
                </svg>
                My Sessions
              </router-link>
            </li>
            <li>
              <router-link
                to="/student/resources"
                class="nav-link"
                active-class="active"
              >
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                  />
                </svg>
                Resources
              </router-link>
            </li>
            <li>
              <router-link
                to="/student/rooms"
                class="nav-link"
                active-class="active"
              >
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  />
                </svg>
                Study Rooms
              </router-link>
            </li>
            <li>
              <router-link
                to="/student/evaluations"
                class="nav-link"
                active-class="active"
              >
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                  />
                </svg>
                Evaluations
              </router-link>
            </li>
            <li>
              <router-link
                to="/student/contributors"
                class="nav-link"
                active-class="active"
              >
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 13h-2v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5a2 2 0 00-2 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 00-2-2zM7 9a1 1 0 112 0 1 1 0 01-2 0z"
                  />
                </svg>
                Top Contributors
              </router-link>
            </li>
            <li>
              <router-link
                to="/student/preferences"
                class="nav-link"
                active-class="active"
              >
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                Preferences
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/useAuthStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const searchQuery = ref('')

const handleSearch = () => {
  // Implement search functionality
  console.log('Searching for:', searchQuery.value)
}

const toggleNotifications = () => {
  // Implement notifications toggle
  console.log('Toggling notifications')
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.student-layout {
  min-height: 100vh;
  background: var(--bg-gradient);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
  font-weight: 500;
}

.nav-link:hover {
  background: var(--bg-tertiary);
}

.nav-link.active {
  background: var(--primary-color);
  color: white;
  box-shadow: var(--shadow-lg);
}

.nav-link svg {
  width: 1.25rem;
  height: 1.25rem;
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
}

@media (max-width: 480px) {
  .header-container {
    padding: 0.75rem;
  }

  .main-container {
    padding: 0.5rem;
    gap: 1rem;
  }

  .main-content {
    padding: 1rem;
  }

  .content-header h1 {
    font-size: 1.5rem;
  }
}
</style>