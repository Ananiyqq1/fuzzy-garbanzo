<template>
  <div>
    <h2>Analytics & Reports</h2>
    <div class="row">
      <AppButton @click="load">View Analytics</AppButton>
      <AppButton variant="secondary" @click="generate">Generate Report</AppButton>
    </div>

    <div class="cards">
      <AppCard title="Active Users" :subtitle="String(analytics.activeUsers)" />
      <AppCard title="Sessions This Week" :subtitle="String(analytics.sessionsThisWeek)" />
      <AppCard title="Resources Uploaded" :subtitle="String(analytics.resourcesUploaded)" />
    </div>

    <div class="panel">
      <h3>Trends</h3>
      <div class="chart">
        <div v-for="(v, i) in analytics.weeklyActive" :key="i" class="bar" :style="{ height: v + 'px' }" />
      </div>
    </div>

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '../../stores/useAdminStore';
import { useUIStore } from '../../stores/useUIStore';
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
import AppLoading from '../common/AppLoading.vue';

const admin = useAdminStore();
const ui = useUIStore();

const analytics = admin.analytics;

onMounted(load);

function load() {
  admin.loadAnalytics();
}
function generate() {
  admin.generateReport();
}
</script>

<style scoped>
.row { display: flex; gap: 8px; align-items: center; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 12px 0; }
.panel { margin-top: 16px; padding: 12px; border: 1px solid #eee; border-radius: 8px; }
.chart { display: flex; align-items: flex-end; gap: 6px; height: 160px; padding: 8px 0; }
.bar { width: 24px; background: #60a5fa; border-radius: 4px 4px 0 0; }
</style>