<template>
  <div class="admin-layout">
    <AppHeader
      title="HiLCoE Peer"
      subtitle="Admin Dashboard"
      :show-search="true"
      :show-notifications="true"
      :show-theme-toggle="false"
      :show-profile="true"
      :user-name="adminName"
      :user-avatar="adminAvatar"
      :show-mobile-menu="isMobile"
      :notification-count="notificationCount"
      :search-placeholder="'Search courses, users, and more...'"
      @search="searchQuery = $event"
      @notifications="showNotificationToast"
      @toggle-sidebar="toggleSidebar"
      @toggle-profile="navigateToProfile"
      @logout="handleLogout"
    />

    <StudentNotificationToast
      v-model="isToastVisible"
      :message="toastMessage"
      :position="toastPosition"
    />

    <!-- Main Container -->
    <div class="main-container" :class="containerLayoutClasses">
      <AppSidebar
        :menu-items="navMenuItems"
        :is-open="sidebarOpen"
        :show-overlay="isMobile"
        @close="sidebarOpen = false"
        @logout="handleLogout"
      />

      <!-- Main Content -->
      <AppCard class="main-content-wrapper" variant="elevated">
        <router-view />
      </AppCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import AppHeader from '../../components/common/AppHeader.vue'
import AppSidebar from '../../components/common/AppSidebar.vue'
import AppCard from '../../components/common/AppCard.vue'
import StudentNotificationToast from '../../components/student/modals/StudentNotificationToast.vue'

const router = useRouter()
const auth = useAuthStore()
const searchQuery = ref('')
const isMobile = ref(false)
const isTablet = ref(false)
const sidebarOpen = ref(false)
const isToastVisible = ref(false)
const toastMessage = ref('')
const adminName = ref('Dr. Sarah Johnson')
const adminAvatar = ref('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80')
const notificationCount = ref(0)

const toastPosition = computed(() => (isMobile.value ? 'bottom-center' : 'top-right'))

let resizeListener = null

// Methods
const navigateToProfile = () => {
  router.push('/admin/profile')
}

const handleLogout = () => {
  auth.logout()
  router.push('/auth')
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const updateBreakpoints = () => {
  const width = window.innerWidth
  isMobile.value = width <= 768
  isTablet.value = width > 768 && width <= 1024
  sidebarOpen.value = !isMobile.value
}

const showNotificationToast = () => {
  toastMessage.value = "All systems are running smoothly. No new alerts."
  isToastVisible.value = true
}

onMounted(() => {
  updateBreakpoints()
  resizeListener = () => updateBreakpoints()
  window.addEventListener('resize', resizeListener)
})

onUnmounted(() => {
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener)
    resizeListener = null
  }
})

const navMenuItems = computed(() => [
  {
    name: 'Dashboard',
    path: '/admin/',
    icon: 'fas fa-home'
  },
  {
    name: 'Courses',
    path: '/admin/courses',
    icon: 'fas fa-book-open'
  },
  {
    name: 'Topics',
    path: '/admin/topics',
    icon: 'fas fa-layer-group'
  },
  {
    name: 'Insights',
    path: '/admin/insights',
    icon: 'fas fa-lightbulb'
  },
  {
    name: 'Analytics',
    path: '/admin/analytics',
    icon: 'fas fa-chart-line'
  }
])

const containerLayoutClasses = computed(() => ({
  'layout-mobile': isMobile.value,
  'layout-tablet': isTablet.value
}))
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

:deep(.header) {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  position: sticky;
  top: 0;
  z-index: 50;
}

:deep(.header-container) {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.logo-section) {
  display: flex;
  align-items: center;
  gap: 1rem;
}

:deep(.logo-section .logo) {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.125rem;
}

:deep(.brand-info h1) {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

:deep(.brand-info p) {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin: 0;
}

:deep(.search-container) {
  flex: 1;
  max-width: 28rem;
  margin: 0 2rem;
  position: relative;
}

:deep(.search-input) {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  outline: none;
  transition: all 0.2s ease;
}

:deep(.search-input:focus) {
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
}

:deep(.search-icon) {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  width: 1.25rem;
  height: 1.25rem;
}

:deep(.header-actions) {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

:deep(.header-actions .action-btn) {
  padding: 0.75rem;
  background: #f3f4f6;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

:deep(.header-actions .action-btn:hover) {
  background: #e5e7eb;
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

.main-container.layout-tablet {
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 1.75rem;
}

.main-container.layout-tablet :deep(.sidebar) {
  position: static;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
}

.main-container.layout-tablet :deep(.sidebar-nav) {
  width: 100%;
}

.main-container.layout-tablet :deep(.nav-list) {
  flex-direction: row;
  gap: 0.75rem;
}

.main-container.layout-tablet :deep(.nav-item) {
  flex: 1 1 0;
  display: flex;
}

.main-container.layout-tablet :deep(.nav-link) {
  justify-content: center;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.main-container.layout-mobile {
  display: block;
  padding: 1.25rem 1rem;
}

.main-container.layout-mobile :deep(.sidebar) {
  position: fixed;
  top: 5rem;
  left: 0;
  width: min(80vw, 320px);
  height: calc(100vh - 5rem);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.main-container.layout-mobile :deep(.sidebar.open) {
  transform: translateX(0);
}

.main-content-wrapper {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-height: 600px;
}

@media (max-width: 1024px) {
  .main-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .main-container {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 1rem;
  }
}
</style>