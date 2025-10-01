<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div class="logo">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="brand-info">
          <h2>HiLCoE Peer</h2>
          <p>Navigation</p>
        </div>
      </div>
      <button v-if="showCloseButton" class="close-btn" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="item in menuItems" :key="item.name" class="nav-item">
          <router-link 
            v-if="!item.children"
            :to="item.path" 
            class="nav-link"
            :class="{ active: isActiveRoute(item.path) }"
            @click="handleNavClick(item)"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
            <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
          </router-link>
          
          <!-- Expandable Menu Item -->
          <div v-else class="nav-group">
            <button 
              class="nav-link nav-toggle"
              :class="{ active: isGroupActive(item), expanded: expandedGroups.includes(item.name) }"
              @click="toggleGroup(item.name)"
            >
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
              <i class="fas fa-chevron-down expand-icon"></i>
            </button>
            
            <ul v-show="expandedGroups.includes(item.name)" class="nav-sublist">
              <li v-for="child in item.children" :key="child.name">
                <router-link 
                  :to="child.path" 
                  class="nav-link nav-sublink"
                  :class="{ active: isActiveRoute(child.path) }"
                  @click="handleNavClick(child)"
                >
                  <i v-if="child.icon" :class="child.icon"></i>
                  <span>{{ child.name }}</span>
                  <span v-if="child.badge" class="nav-badge">{{ child.badge }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>

    <!-- Sidebar Footer -->
    <div v-if="showFooter" class="sidebar-footer">
      <div class="user-info">
        <img 
          :src="userAvatar || '/default-avatar.png'" 
          :alt="userName || 'User'"
          class="user-avatar"
        />
        <div class="user-details">
          <span class="user-name">{{ userName || 'User' }}</span>
          <span class="user-role">{{ userRole || 'Student' }}</span>
        </div>
      </div>
      
      <div class="footer-actions">
        <button class="footer-btn" @click="$emit('settings')" title="Settings">
          <i class="fas fa-cog"></i>
        </button>
        <button class="footer-btn" @click="$emit('logout')" title="Logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <div 
    v-if="showOverlay && isOpen" 
    class="sidebar-overlay"
    @click="$emit('close')"
  ></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  showCloseButton: {
    type: Boolean,
    default: false
  },
  showOverlay: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  userName: {
    type: String,
    default: ''
  },
  userRole: {
    type: String,
    default: ''
  },
  userAvatar: {
    type: String,
    default: ''
  }
})

const expandedGroups = ref([])

const isActiveRoute = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const isGroupActive = (group) => {
  return group.children?.some(child => isActiveRoute(child.path))
}

const toggleGroup = (groupName) => {
  const index = expandedGroups.value.indexOf(groupName)
  if (index > -1) {
    expandedGroups.value.splice(index, 1)
  } else {
    expandedGroups.value.push(groupName)
  }
}

const handleNavClick = (item) => {
  if (item.action) {
    $emit(item.action)
  }
  // Close sidebar on mobile after navigation
  if (window.innerWidth <= 1024) {
    $emit('close')
  }
}

defineEmits(['close', 'settings', 'logout'])
</script>

<style scoped>
.sidebar {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: var(--backdrop-blur-md);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: var(--spacing-2xl) var(--spacing-xl);
  width: 280px;
  height: fit-content;
  position: sticky;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-gray);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.sidebar-logo .logo {
  width: 2rem;
  height: 2rem;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: bold;
  font-size: var(--font-size-base);
}

.sidebar-logo h2 {
  font-size: var(--font-size-lg);
  font-weight: bold;
  color: var(--primary-dark);
  margin: 0;
  line-height: 1.2;
}

.sidebar-logo p {
  font-size: var(--font-size-xs);
  color: var(--light-gray);
  margin: 0;
}

.close-btn {
  display: none;
  padding: var(--spacing-sm);
  background: var(--bg-gray);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background: var(--border-gray);
}

.close-btn i {
  color: var(--secondary-gray);
  font-size: var(--font-size-sm);
}

.sidebar-nav {
  flex: 1;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: none;
  background: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-weight: 500;
  color: var(--secondary-gray);
  text-decoration: none;
  font-size: var(--font-size-sm);
}

.nav-link:hover {
  background: var(--bg-gray);
  transform: translateX(4px);
}

.nav-link.active {
  background: var(--primary-dark);
  color: var(--white);
  box-shadow: var(--shadow-lg);
}

.nav-link i {
  width: 1.25rem;
  height: 1.25rem;
  font-size: var(--font-size-base);
  flex-shrink: 0;
}

.nav-badge {
  margin-left: auto;
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

.nav-link.active .nav-badge {
  background: rgba(255, 255, 255, 0.2);
}

.nav-toggle {
  justify-content: space-between;
}

.expand-icon {
  transition: transform var(--transition-fast);
  font-size: var(--font-size-xs) !important;
  width: 1rem !important;
  height: 1rem !important;
}

.nav-toggle.expanded .expand-icon {
  transform: rotate(180deg);
}

.nav-sublist {
  list-style: none;
  margin: var(--spacing-sm) 0 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.nav-sublink {
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm) 3rem;
  font-size: var(--font-size-xs);
  color: var(--light-gray);
}

.nav-sublink:hover {
  background: var(--bg-gray);
  color: var(--secondary-gray);
}

.nav-sublink.active {
  background: var(--primary-gray);
  color: var(--white);
}

.sidebar-footer {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-gray);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--light-bg);
  border-radius: var(--radius-lg);
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid var(--white);
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--primary-dark);
  line-height: 1.2;
}

.user-role {
  font-size: var(--font-size-xs);
  color: var(--light-gray);
}

.footer-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.footer-btn {
  flex: 1;
  padding: var(--spacing-md);
  background: var(--bg-gray);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-btn:hover {
  background: var(--border-gray);
  transform: translateY(-1px);
}

.footer-btn i {
  color: var(--secondary-gray);
  font-size: var(--font-size-base);
}

.sidebar-overlay {
  display: none;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    height: 100vh;
    z-index: 100;
    transition: left var(--transition-normal);
    border-radius: 0;
    padding: var(--spacing-xl);
  }
  
  .sidebar.open {
    left: 0;
  }
  
  .close-btn {
    display: flex;
  }
  
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    display: block;
  }
}

@media (max-width: 768px) {
  .sidebar {
    padding: var(--spacing-lg);
  }
  
  .sidebar-header {
    padding-bottom: var(--spacing-md);
  }
  
  .nav-link {
    padding: var(--spacing-md);
  }
  
  .nav-sublink {
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 2.5rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100vw;
    left: -100vw;
  }
  
  .sidebar.open {
    left: 0;
  }
}
</style>