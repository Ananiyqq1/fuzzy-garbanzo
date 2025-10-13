import { useAuthStore } from '@/stores/useAuthStore';
import AuthView from '@/views/auth/AuthView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import OTP from "../components/auth/OTP.vue";
import ForgotPassword from '../components/auth/ForgetPassword.vue'
import StudentView from '../views/student/StudentView.vue'
import StudentDashboard from '../components/student/StudentDashboard.vue'
import MySessions from '../components/student/MySessions.vue'
import Resources from '../components/student/Resources.vue'
import StudyRooms from '../components/student/StudyRooms.vue'
import Evaluations from '../components/student/Evaluations.vue'
import StudentPreferences from '../components/student/StudentPreferences.vue'
import StudentProfile from '../components/student/StudentProfile.vue'

import AdminView from '../views/admin/AdminView.vue'
import AdminDashboard from '../components/admin/AdminDashboard.vue'
import CourseManagement from '../components/admin/CourseManagement.vue'
import TopicManagement from '../components/admin/TopicManagement.vue'
import UserManagement from '../components/admin/UserManagement.vue'
import Analytics from '../components/admin/Analytics.vue'
import Settings from '../components/admin/Settings.vue'
import AdminProfile from '../components/admin/AdminProfile.vue'
import Room from '@/components/student/Room.vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/otp',
    component: OTP,
    meta: { requiresAuth: false, title: 'Please check your email' }
  },
  {
    path: '/auth/forgot-password',
    component: ForgotPassword,
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/preferences',
    component: StudentPreferences,
    name: 'StudentPreferences',
    meta: { requiresAuth: false }
  },

  // {
  //     path: "/live/:stream_session_id",
  //     component: NewStreamView,
  //     meta: { requiresAuth: true },
  //   },


  {
    path: '/',
    component: StudentView,
    name: "StudentHome",
    children: [
      { path: '', component: StudentDashboard, name: "StudentDashboard", },
      { path: 'sessions', component: MySessions, name: "MySessions" },
      { path: 'resources', component: Resources, name: "Resources" },
      { path: 'study-rooms', component: StudyRooms, name: "StudyRooms" },
      { path: 'room/:id', component: Room, name: "StudyRoom" },
      { path: 'evaluations', component: Evaluations, name: "Evaluations" },
      { path: 'profile', component: StudentProfile, name: "StudentProfile" },
    ],
    meta: { requiresAuth: true, role: 'peer' },
  },


  {
    path: '/admin',
    component: AdminView,
    name: "AdminHome",
    children: [
      { path: '', component: AdminDashboard, name: "AdminDashboard" },
      { path: 'courses', component: CourseManagement, name: "Courses" },
      { path: 'topics', component: TopicManagement, name: "Topics" },
      { path: 'users', component: UserManagement, name: "Users" },
      { path: 'analytics', component: Analytics, name: "Analytics" },
      { path: 'settings', component: Settings, name: "Settings" },
      { path: 'profile', component: AdminProfile, name: "AdminProfile" },
    ],
    meta: { requiresAuth: true, role: 'admin' },
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  try {
    if (auth.loading) {
      await auth.fetchUser();
    }
  } catch (err) {
    console.log("User fetch failed:", err);
    auth.user = null;
    return next("/auth");
  }

  const requiresAuth = to.meta.requiresAuth as boolean | undefined;
  const roleRequired = to.meta.role as string | undefined;
  const userRoles = auth.user?.roles || [];

  if (to.path.startsWith('/auth/otp')) {
    return next();
  }

  if (requiresAuth && !auth.isAuthenticated) {
    if (auth.tempPayload && to.meta.role === 'peer') {
      return next();
    }
    return next("/auth");
  }

  if (auth.isAuthenticated) {
    if (roleRequired && !userRoles.includes(roleRequired)) {
      if (userRoles.includes("admin")) return next("/admin");
      if (userRoles.includes("peer")) return next("/");
      return next("/auth");
    }

    if (userRoles.includes("peer") && to.path.startsWith("/admin")) {
      return next("/");
    }
    if (userRoles.includes("admin") && to.path.startsWith("/peer")) {
      return next("/admin");
    }
  }
  next();
  
});
export default router;