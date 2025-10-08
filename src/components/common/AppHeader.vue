<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="brand-info">
          <h1>{{ title }}</h1>
          <p v-if="subtitle">{{ subtitle }}</p>
        </div>
      </div>

      <!-- Search Bar (only show if showSearch is true) -->
      <div v-if="showSearch" class="search-container">
        <div class="search-input-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input 
            type="text" 
            class="search-input" 
            :placeholder="searchPlaceholder"
            v-model="searchQuery"
            @input="$emit('search', searchQuery)"
          />
        </div>
      </div>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Notifications -->
        <button v-if="showNotifications" class="action-btn" @click="$emit('notifications')">
          <i class="fas fa-bell"></i>
          <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
        </button>

        <!-- Theme Toggle -->
        <button v-if="showThemeToggle" class="action-btn" @click="$emit('toggle-theme')">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>

        <!-- User Profile -->
        <div v-if="showProfile" class="user-profile" @click="$emit('toggle-profile')">
          <img 
          :src="userAvatar || '/default-avatar.png'" 
          :alt="userName || 'User'"
          class="user-avatar"
          />
          <span class="user-name">{{ userName || 'User' }}</span>
        </div>

        <!-- Logout -->
        <button v-if="showLogout" class="action-btn logout-btn" @click="$emit('logout')">
          <i class="fas fa-sign-out-alt"></i>
        </button>

        <!-- Mobile Menu Toggle -->
        <button 
          v-if="showMobileMenu" 
          class="action-btn mobile-menu-btn"
          @click="$emit('toggle-sidebar')"
        >
          <i class="fas fa-bars"></i>
        </button>



      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'HiLCoE Peer'
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    default: 'Search courses, topics, or resources...'
  },
  showMobileMenu: {
    type: Boolean,
    default: true
  },
  showNotifications: {
    type: Boolean,
    default: true
  },
  notificationCount: {
    type: Number,
    default: 0
  },
  showThemeToggle: {
    type: Boolean,
    default: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  },
  showProfile: {
    type: Boolean,
    default: true
  },
  userName: {
    type: String,
    default: ''
  },
  userAvatar: {
    type: String,
    default: ''
  },
  showLogout: {
    type: Boolean,
    default: true
  }
})

const searchQuery = ref('')

defineEmits(['search', 'toggle-sidebar', 'toggle-theme', 'toggle-profile', 'notifications', 'logout'])
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: var(--backdrop-blur-md);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-shrink: 0;
}

.logo {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: bold;
  font-size: var(--font-size-lg);
}

.brand-info h1 {
  font-size: var(--font-size-2xl);
  font-weight: bold;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
}

.brand-info p {
  font-size: var(--font-size-sm);
  color: var(--light-gray);
  font-weight: 500;
  margin: 0;
}

.search-container {
  flex: 1;
  max-width: 28rem;
  margin: 0 var(--spacing-2xl);
}

.search-input-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-md) 2.5rem;
  background: var(--light-bg);
  border: 1px solid var(--border-gray);
  border-radius: var(--radius-lg);
  outline: none;
  transition: all var(--transition-fast);
  font-size: var(--font-size-base);
}

.search-input:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--lighter-gray);
  width: 1.25rem;
  height: 1.25rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-shrink: 0;
}

.action-btn {
  padding: var(--spacing-md);
  background: var(--bg-gray);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--border-gray);
  transform: translateY(-1px);
}

.action-btn i {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--secondary-gray);
  font-size: var(--font-size-base);
}

.logout-btn {
  background: rgba(239, 68, 68, 0.15);
}

.logout-btn i {
  color: var(--error-red);
}

.mobile-menu-btn {
  display: none;
}

.notification-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background: var(--error-red);
  color: var(--white);
  font-size: 0.625rem;
  font-weight: bold;
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-full);
  min-width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-gray);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.user-profile:hover {
  background: var(--border-gray);
  transform: translateY(-1px);
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid var(--white);
}

.user-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--primary-dark);
}

.user-profile i {
  color: var(--light-gray);
  font-size: var(--font-size-xs);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .search-container {
    max-width: 20rem;
    margin: 0 var(--spacing-lg);
  }
  
  .mobile-menu-btn {
    display: flex;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: var(--spacing-lg);
    gap: var(--spacing-md);
  }
  
  .brand-info h1 {
    font-size: var(--font-size-xl);
  }
  
  .brand-info p {
    display: none;
  }
  
  .search-container {
    display: none;
  }
  
  .user-name {
    display: none;
  }
  
  .user-profile {
    padding: var(--spacing-sm);
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: var(--spacing-md);
  }
  
  .logo-section {
    gap: var(--spacing-md);
  }
  
  .brand-info h1 {
    font-size: var(--font-size-lg);
  }
  
  .header-actions {
    gap: var(--spacing-sm);
  }
  
  .action-btn {
    padding: var(--spacing-sm);
  }
}
</style>