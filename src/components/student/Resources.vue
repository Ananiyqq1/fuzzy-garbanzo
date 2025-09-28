<template>
  <div class="resources">
    <h1>Learning Resources</h1>
    <p>Access all your course materials, lecture notes, videos, and supplementary readings here.</p>

    <div class="filter-controls">
      <AppInput v-model="filters.q" placeholder="Search resources..." />
      <select v-model="filters.courseId" class="app-select">
        <option value="">All Courses</option>
        <option v-for="c in student.courses" :key="c.id" :value="c.id">{{ c.title }}</option>
      </select>
      <select v-model="filters.type" class="app-select">
        <option value="">All Types</option>
        <option value="pdf">PDF</option>
        <option value="video">Video</option>
        <option value="link">Link</option>
        <option value="document">Document</option>
      </select>
      <AppButton @click="loadResources">Refresh Resources</AppButton>
    </div>

    <section class="resources-grid">
      <AppCard v-for="r in filteredResources" :key="r.id" :title="r.title" :subtitle="r.courseTitle">
        <div class="muted">{{ r.type }}</div>
        <div class="row justify-between items-center mt-8">
          <span class="badge" :class="r.type">{{ r.type }}</span>
          <AppButton @click="handleResourceAction(r)">{{ r.actionLabel }}</AppButton>
        </div>
      </AppCard>
      <p v-if="!filteredResources.length">No resources found matching your criteria.</p>
    </section>

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useStudentStore } from '../../stores/useStudentStore';
import { useUIStore } from '../../stores/useUIStore';
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
import AppInput from '../common/AppInput.vue';
import AppLoading from '../common/AppLoading.vue';

const student = useStudentStore();
const ui = useUIStore();

const filters = reactive({
  q: '',
  courseId: '',
  type: '',
});

const filteredResources = computed(() => {
  let resources = student.resources;
  if (filters.q) {
    resources = resources.filter(r => r.title.toLowerCase().includes(filters.q.toLowerCase()));
  }
  if (filters.courseId) {
    resources = resources.filter(r => r.courseId == filters.courseId); // Use == for potential string/number mismatch
  }
  if (filters.type) {
    resources = resources.filter(r => r.type === filters.type);
  }
  return resources;
});

onMounted(() => {
  loadResources();
  // Also load courses for the filter dropdown if not already loaded by dashboard
  if (!student.courses.length) {
    student.loadDashboard(); // A simple way to get courses if this page is accessed directly
  }
});

function loadResources() {
  student.loadResources();
}

function handleResourceAction(resource) {
  ui.notify(`Attempting to ${resource.actionLabel.toLowerCase()} "${resource.title}"`);
  // In a real app, this would open a new tab, start a download, or open a viewer modal
  if (resource.url) {
    window.open(resource.url, '_blank');
  }
}
</script>

<style scoped>
.resources { display: flex; flex-direction: column; gap: 16px; }
.filter-controls { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.app-select { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; background: white; }
.resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.row { display: flex; align-items: center; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.mt-8 { margin-top: 8px; }
.badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; background: #e5e7eb; color: #374151; }
/* Specific badge colors for resource types */
.badge.pdf { background: #fee2e2; color: #ef4444; }
.badge.video { background: #dbeafe; color: #3b82f6; }
.badge.link { background: #dcfce7; color: #22c55e; }
.badge.document { background: #fef3c7; color: #f59e0b; }
.muted { color: #6b7280; font-size: 13px; }
</style>