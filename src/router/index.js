import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminView.vue'),
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../components/admin/AdminDashboard.vue')
        },
        {
          path: 'course-management',
          name: 'admin-course-management',
          component: () => import('../components/admin/CourseManagement.vue')
        },
        {
          path: 'topic-management',
          name: 'admin-topic-management',
          component: () => import('../components/admin/TopicManagement.vue')
        },
        {
          path: 'user-management',
          name: 'admin-user-management',
          component: () => import('../components/admin/UserManagement.vue')
        },
        {
          path: 'analytics',
          name: 'admin-analytics',
          component: () => import('../components/admin/Analytics.vue')
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../components/admin/Settings.vue')
        },
        {
          path: '',
          redirect: '/admin/dashboard'
        }
      ]
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('../views/student/StudentView.vue'),
      meta: { requiresAuth: true, role: 'student' },
      children: [
        {
          path: 'dashboard',
          name: 'student-dashboard',
          component: () => import('../components/student/StudentDashboard.vue')
        },
        {
          path: 'sessions',
          name: 'student-sessions',
          component: () => import('../components/student/MySessions.vue')
        },
        {
          path: 'resources',
          name: 'student-resources',
          component: () => import('../components/student/Resources.vue')
        },
        {
          path: 'rooms',
          name: 'student-rooms',
          component: () => import('../components/student/StudyRooms.vue')
        },
        {
          path: 'evaluations',
          name: 'student-evaluations',
          component: () => import('../components/student/Evaluations.vue')
        },
        {
          path: 'contributors',
          name: 'student-contributors',
          component: () => import('../components/student/TopContributors.vue')
        },
        {
          path: 'preferences',
          name: 'student-preferences',
          component: () => import('../components/student/StudentPreferences.vue')
        },
        {
          path: '',
          redirect: '/student/dashboard'
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.role && authStore.userRole !== to.meta.role) {
    if (authStore.isAuthenticated) {
      next(authStore.userRole === 'admin' ? '/admin/dashboard' : '/student/dashboard')
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router