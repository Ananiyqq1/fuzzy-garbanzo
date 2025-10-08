<template>
  <aside class="sidebar" :class="{ open: isOpen }">
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
  </aside>

  <!-- Mobile Overlay -->
  <div 
    v-if="showOverlay && isOpen" 
    class="sidebar-overlay"
    @click="$emit('close')"
  ></div>
</template>

<script setup>
import { ref } from 'vue'
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
  showOverlay: {
    type: Boolean,
    default: true
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
  if (window.innerWidth <= 768) {
    $emit('close')
  }
}

defineEmits(['close', 'logout'])
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

.sidebar-nav {
  flex: 1;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
}
.nav-link {
  padding: var(--spacing-md);
}
  
.nav-sublink {
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 2.5rem;
  font-size: var(--font-size-xs);
  color: var(--light-gray);
}

.nav-sublink:hover {
  background: var(--bg-gray);
}

.nav-sublink.active {
  background: var(--primary-gray);
  color: var(--white);
}

.sidebar-overlay {
  display: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 5rem;
    left: -100vw;
    height: calc(100vh - 5rem);
    z-index: 100;
    transition: left var(--transition-normal);
    border-radius: 0;
    padding: var(--spacing-xl);
    width: min(80vw, 320px);
  }
  
  .sidebar.open {
    left: 0;
  }
  
  .sidebar-overlay {
    position: fixed;
    top: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    display: block;
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