import { createRouter, createWebHistory } from 'vue-router';

type LazyView = () => Promise<typeof import('*.vue')>;

const SignInUp: LazyView = () => import('../views/login/LoginView.vue');
const OTP: LazyView = () => import('../components/auth/OTP.vue');
const ForgotPassword: LazyView = () => import('../components/auth/ForgetPassword.vue');

const StudentView: LazyView = () => import('../views/student/StudentView.vue');
const StudentDashboard: LazyView = () => import('../components/student/StudentDashboard.vue');
const MySessions: LazyView = () => import('../components/student/MySessions.vue');
const Resources: LazyView = () => import('../components/student/Resources.vue');
const StudyRooms: LazyView = () => import('../components/student/StudyRooms.vue');
const Evaluations: LazyView = () => import('../components/student/Evaluations.vue');
const StudentPreferences: LazyView = () => import('../components/student/StudentPreferences.vue');
const StudentProfile: LazyView = () => import('../components/student/StudentProfile.vue');

const AdminView: LazyView = () => import('../views/admin/AdminView.vue');
const AdminDashboard: LazyView = () => import('../components/admin/AdminDashboard.vue');
const CourseManagement: LazyView = () => import('../components/admin/CourseManagement.vue');
const TopicManagement: LazyView = () => import('../components/admin/TopicManagement.vue');
const UserManagement: LazyView = () => import('../components/admin/UserManagement.vue');
const Analytics: LazyView = () => import('../components/admin/Analytics.vue');
const Settings: LazyView = () => import('../components/admin/Settings.vue');
const AdminProfile: LazyView = () => import('../components/admin/AdminProfile.vue');

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