<template>
  <div>
    <h1>HiLCoE Peer - Admin Dashboard</h1>
    <p>Manage students, courses, and platform settings</p>

    <section class="grid">
      <AppCard title="User Management" subtitle="View, edit, and manage all user accounts and permissions.">
        <router-link to="/admin/users"><AppButton>View Users</AppButton></router-link>
        <AppButton variant="secondary">Add New</AppButton>
      </AppCard>

      <AppCard title="Course Management" subtitle="Create, edit, and manage courses and learning materials.">
        <router-link to="/admin/courses"><AppButton>View Courses</AppButton></router-link>
        <AppButton variant="secondary">Create New</AppButton>
      </AppCard>

      <AppCard title="Analytics & Reports" subtitle="View platform analytics, generate reports, and track performance.">
        <router-link to="/admin/analytics"><AppButton>View Analytics</AppButton></router-link>
        <AppButton variant="secondary">Generate Report</AppButton>
      </AppCard>

      <AppCard title="Content Management" subtitle="Manage topics, resources, and learning materials across the platform.">
        <AppButton>Manage Content</AppButton>
        <AppButton variant="secondary">Add New</AppButton>
      </AppCard>

      <AppCard title="Platform Settings" subtitle="Configure system settings, permissions, and platform preferences.">
        <router-link to="/admin/settings"><AppButton>Settings</AppButton></router-link>
        <AppButton variant="secondary">Permissions</AppButton>
      </AppCard>

      <AppCard title="Event Logs" subtitle="View system logs, user activities, and platform events.">
        <AppButton>View Logs</AppButton>
        <AppButton variant="secondary">Export</AppButton>
      </AppCard>
    </section>
  </div>
</template>

<script setup>
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
</style>