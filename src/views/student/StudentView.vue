<template>
  <div class="layout">
    <AppSidebar :items="items" />
    <main>
      <AppHeader title="HiLCoE Peer - Student Dashboard" />
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '../../components/common/AppSidebar.vue';
import AppHeader from '../../components/common/AppHeader.vue';

const items = [
  { label: 'Dashboard' , to: '/student/dashboard' },
  { label: 'My Sessions', to: '/student/sessions' },
  { label: 'Resources', to: '/student/resources' },
  { label: 'Study Rooms', to: '/student/study-rooms' },
  { label: 'Evaluation', to: '/student/evaluations' },
  { label: 'Preferences', to: '/student/preferences' },
];
</script>

