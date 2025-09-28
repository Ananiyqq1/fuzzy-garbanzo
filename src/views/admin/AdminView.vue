<template>
  <div class="layout">
    <AppSidebar :items="items" />
    <main>
      <AppHeader title="HiLCoE Peer - Admin Dashboard" />
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '../../components/common/AppSidebar.vue';
import AppHeader from '../../components/common/AppHeader.vue';

const items = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Course Management', to: '/admin/courses' },
  { label: 'Topic Management', to: '/admin/topics' },
  { label: 'User Management', to: '/admin/users' },
  { label: 'Analytics', to: '/admin/analytics' },
  { label: 'Settings', to: '/admin/settings' },
];
</script>