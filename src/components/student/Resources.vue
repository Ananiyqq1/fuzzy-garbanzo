<template>
  <div class="resources">
    <div class="page-shell">
      <div class="header-row">
        <AppContentHeader
          title="Learning Resources"
          subtitle="Access study materials, lecture notes, and other resources"
        />
        <AppButton class="upload-button" size="small" icon="fas fa-upload" @click="openUploadModal">
          Upload Resource
        </AppButton>
      </div>

      <AppTabs v-model="activeFilter" :tabs="filterTabs" />

      <div class="resources-grid">
        <AppCard
          v-for="resource in filteredResources"
          :key="resource.id"
          class="resource-card"
          variant="elevated"
        >
          <template #header>
            <div class="resource-header">
              <div class="resource-icon">
                <i :class="getResourceIcon(resource.type)"></i>
              </div>
              <div class="resource-title">{{ resource.title }}</div>
            </div>
          </template>

          <div class="resource-body">
            <div class="resource-meta">
              <span><i class="fas fa-book"></i> {{ resource.course }}</span>
              <span><i :class="resource.metaIcon"></i> {{ resource.metaText }}</span>
            </div>
            <p class="resource-description">
              {{ resource.description }}
            </p>
          </div>

          <template #footer>
            <div class="resource-actions">
              <AppButton size="small" variant="secondary" @click="openPreview(resource)">
                Preview
              </AppButton>
              <AppButton size="small" @click="handleResourceAction(resource)">
                {{ resource.actionLabel }}
              </AppButton>
            </div>
          </template>
        </AppCard>
      </div>

      <AppLoading v-if="ui.loading" />

      <ResourcePreviewModal
        v-if="ui.modals.preview"
        :resource="ui.modals.preview"
        @close="ui.modals.preview = null"
        @download="handleResourceDownload"
      />

      <UploadResourceModal
        v-if="ui.modals.upload"
        :initial-value="{}"
        @close="ui.modals.upload = false"
        @submit="submitUpload"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed, ref } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppLoading from '../common/AppLoading.vue';
import AppTabs from '../common/AppTabs.vue';
import ResourcePreviewModal from './modals/ResourcePreviewModal.vue';
import UploadResourceModal from './modals/UploadResourceModal.vue';
 
// Local UI and student data replacing stores
const ui = reactive({
  loading: false,
  notify: (msg, type) => console.log(type ? `${type}: ${msg}` : msg),
  modals: {
    preview: null,
    upload: false,
  },
});

const student = reactive({
  resources: [
    {
      id: 1,
      title: 'Data Structures Lecture Notes',
      type: 'lectures',
      course: 'CS201',
      metaIcon: 'fas fa-calendar',
      metaText: 'Updated: Oct 15, 2023',
      description: 'Comprehensive notes covering arrays, linked lists, trees, and graphs with examples and algorithms.',
      actionLabel: 'Download'
    },
    {
      id: 2,
      title: 'Introduction to Algorithms',
      type: 'books',
      course: 'CS301',
      metaIcon: 'fas fa-user',
      metaText: 'Cormen et al.',
      description: 'The famous CLRS textbook covering fundamental algorithms and data structures.',
      actionLabel: 'Download'
    },
    {
      id: 3,
      title: 'Neural Networks Overview',
      type: 'papers',
      course: 'CS401',
      metaIcon: 'fas fa-calendar',
      metaText: 'Published: 2022',
      description: 'Recent survey paper on advances in deep learning and neural network architectures.',
      actionLabel: 'Download'
    },
    {
      id: 4,
      title: 'Database Systems Video Lectures',
      type: 'lectures',
      course: 'CS202',
      metaIcon: 'fas fa-clock',
      metaText: '4h 25m',
      description: 'Recorded lectures covering SQL, normalization, and transaction processing.',
      actionLabel: 'Watch'
    },
    {
      id: 5,
      title: 'Computer Networking Textbook',
      type: 'books',
      course: 'CS305',
      metaIcon: 'fas fa-user',
      metaText: 'Kurose & Ross',
      description: 'Comprehensive guide to computer networking concepts and protocols.',
      actionLabel: 'Download'
    },
    {
      id: 6,
      title: 'Machine Learning Research Paper',
      type: 'papers',
      course: 'CS402',
      metaIcon: 'fas fa-calendar',
      metaText: 'Published: 2023',
      description: 'Latest research on supervised learning algorithms and their applications.',
      actionLabel: 'Download'
    }
  ],
});

const activeFilter = ref('all');

const filterTabs = [
  { value: 'all', label: 'All Resources', icon: 'fas fa-layer-group' },
  { value: 'lectures', label: 'Lecture Notes', icon: 'fas fa-file-pdf' },
  { value: 'books', label: 'Books', icon: 'fas fa-book' },
  { value: 'papers', label: 'Research Papers', icon: 'fas fa-file-alt' }
];

const filteredResources = computed(() => {
  if (activeFilter.value === 'all') {
    return student.resources;
  }
  return student.resources.filter(resource => 
    resource.type === activeFilter.value
  );
});

onMounted(() => {
  loadResources();
});

function loadResources() {
  ui.loading = true;
  setTimeout(() => { ui.loading = false; }, 300);
}

function setActiveFilter(filter) {
  activeFilter.value = filter;
}

function getResourceIcon(type) {
  const icons = {
    lectures: 'fas fa-file-pdf',
    books: 'fas fa-book',
    papers: 'fas fa-file-alt',
    videos: 'fas fa-file-video'
  };
  return icons[type] || 'fas fa-file';
}

function handleResourceAction(resource) {
  ui.notify(`${resource.actionLabel}: ${resource.title}`);
}

function openPreview(resource) {
  ui.modals.preview = {
    ...resource,
    typeLabel: getTypeLabel(resource.type),
  };
}

function handleResourceDownload(resource) {
  ui.notify(`Downloading: ${resource.title}`);
  ui.modals.preview = null;
}

function openUploadModal() {
  ui.modals.upload = true;
}

function submitUpload(form) {
  ui.modals.upload = false;
  ui.notify(`Uploaded: ${form.title}`, 'success');
}

function getTypeLabel(value) {
  const map = {
    lectures: 'Lecture Notes',
    lecture: 'Lecture Notes',
    books: 'Book',
    book: 'Book',
    papers: 'Research Paper',
    paper: 'Research Paper',
    videos: 'Video',
    video: 'Video',
  };
  return map[value] || 'Resource';
}
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.upload-button {
  align-self: center;
}

.resources {
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  justify-content: center;
  padding: 3rem 2rem;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  padding: 2.25rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.resources :deep(.tab-list) {
  justify-content: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  padding: 0;
}

.resources :deep(.tab-trigger) {
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.6);
  color: #374151;
  font-weight: 600;
  transition: all 0.25s ease;
}

.resources :deep(.tab-trigger:not(.active):hover) {
  background: rgba(17, 24, 39, 0.08);
}

.resources :deep(.tab-trigger.active) {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #fff;
  box-shadow: 0 10px 30px -12px rgba(17, 24, 39, 0.45);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.resource-card :deep(.card-header) {
  border-bottom: none;
  padding-bottom: 0;
}

.resource-card {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(229, 231, 235, 0.5);
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 30px -22px rgba(17, 24, 39, 0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.resource-card:hover {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 28px 50px -20px rgba(17, 24, 39, 0.45);
}

.resource-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.resource-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #111827, #374151);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.resource-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0;
}

.resource-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.9rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.resource-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 0.5rem;
}

.resource-meta span {
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 0.9rem;
}

.resource-meta i {
  width: 16px;
}

.resource-description {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

.resource-card :deep(.card-footer) {
  border-top: none;
  padding-top: 0;
}

.resource-actions {
  display: flex;
  gap: 10px;
}

.resources :deep(.tab-list) {
  justify-content: center;
  gap: 0.75rem;
  background: transparent;
  border: none;
  padding: 0;
}

.resources :deep(.tab-trigger) {
  padding: 0.65rem 1.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(229, 231, 235, 0.6);
  color: #374151;
  font-weight: 600;
  transition: all 0.25s ease;
}

.resources :deep(.tab-trigger:not(.active):hover) {
  background: rgba(17, 24, 39, 0.08);
}

.resources :deep(.tab-trigger.active) {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #fff;
  box-shadow: 0 14px 28px -16px rgba(17, 24, 39, 0.45);
}

/* Responsive Design */
@media (max-width: 768px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }
  
  .resource-actions {
    flex-direction: column;
  }
}
</style>