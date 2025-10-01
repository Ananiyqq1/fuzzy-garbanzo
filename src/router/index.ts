import { createRouter, createWebHistory } from 'vue-router';

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
const StudentProfile = () => import('../components/student/StudentProfile.vue');

const AdminView = () => import('../views/admin/AdminView.vue');
const AdminDashboard = () => import('../components/admin/AdminDashboard.vue');
const CourseManagement = () => import('../components/admin/CourseManagement.vue');
const TopicManagement = () => import('../components/admin/TopicManagement.vue');
const UserManagement = () => import('../components/admin/UserManagement.vue');
const Analytics = () => import('../components/admin/Analytics.vue');
const Settings = () => import('../components/admin/Settings.vue');
const AdminProfile = () => import('../components/admin/AdminProfile.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: SignInUp, meta: { public: true } },
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
        { path: 'profile', component: StudentProfile },
      ],
      meta: { requiresAuth: true, role: 'student' },
    },
    {
      path: '/student/preferences',
      component: StudentPreferences,
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
        { path: 'profile', component: AdminProfile },
      ],
      meta: { requiresAuth: true, role: 'admin' },
    },

    { path: '/:pathMatch(.*)*', redirect: '/auth' },
  ],
});

export default router;