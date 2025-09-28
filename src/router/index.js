import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';

const SignInUp = () => import('../views/login/LoginView.vue');
const OTP = () => import('../components/auth/OTP.vue');
const ForgotPassword = () => import('../components/auth/ForgetPassword.vue');

const StudentView = () => import('../views/student/StudentView.vue');
const StudentDashboard = () => import('../components/student/StudentDashboard.vue');
const MySessions = () => import('../components/student/MySessions.vue');
const Resources = () => import('../components/student/Resources.vue');
const StudyRooms = () => import('../components/student/StudyRooms.vue');
const Evaluations = () => import('../components/student/Evaluations.vue');
const StudentPreferences = () => import('../components/student/StudentPreferences.vue');

const AdminView = () => import('../views/admin/AdminView.vue');
const AdminDashboard = () => import('../components/admin/AdminDashboard.vue');
const CourseManagement = () => import('../components/admin/CourseManagement.vue');
const TopicManagement = () => import('../components/admin/TopicManagement.vue');
const UserManagement = () => import('../components/admin/UserManagement.vue');
const Analytics = () => import('../components/admin/Analytics.vue');
const Settings = () => import('../components/admin/Settings.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/sign' },
    { path: '/sign', component: SignInUp, meta: { public: true } },
    { path: '/otp', component: OTP, meta: { public: true } },
    { path: '/forgot-password', component: ForgotPassword, meta: { public: true } },

    {
      path: '/student',
      component: StudentView,
      children: [
        { path: '', redirect: '/student/dashboard' },
        { path: 'dashboard', component: StudentDashboard },
        { path: 'sessions', component: MySessions },
        { path: 'resources', component: Resources },
        { path: 'study-rooms', component: StudyRooms },
        { path: 'evaluations', component: Evaluations },
        { path: 'preferences', component: StudentPreferences },
      ],
      meta: { requiresAuth: true, role: 'student' },
    },

    {
      path: '/admin',
      component: AdminView,
      children: [
        { path: '', redirect: '/admin/dashboard' },
        { path: 'dashboard', component: AdminDashboard },
        { path: 'courses', component: CourseManagement },
        { path: 'topics', component: TopicManagement },
        { path: 'users', component: UserManagement },
        { path: 'analytics', component: Analytics },
        { path: 'settings', component: Settings },
      ],
      meta: { requiresAuth: true, role: 'admin' },
    },

    { path: '/:pathMatch(.*)*', redirect: '/sign' },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.public) return next();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ path: '/sign', query: { redirect: to.fullPath } });
  }

  if (to.meta.role && auth.user?.role !== to.meta.role) {
    // Send user to their dashboard
    return next(auth.user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
  }

  next();
});

export default router;