<template>
  <div class="resources">
    <div class="page-shell">
      <div class="header-row">
        <AppContentHeader title="Learning Resources"
          subtitle="Access study materials, lecture notes, and other resources" /> 
      </div>

      <AppTabs v-model="activeCategory" :tabs="filterTabs" />

      <div v-if="docsLoading" class="empty-state">
        <div class="empty-state-card">
          <div class="loading-indicator" role="status" aria-live="polite">
            <div class="spinner-wrapper">
              <div class="spinner-container">
                <div class="spinner"></div>
                <div class="spinner-glow"></div>
              </div>
            </div>
            <span class="sr-only">Loading</span>
          </div>
        </div>
      </div>

      <div v-else-if="fetchedDocs.length" class="resources-grid">
        <div v-for="resource in fetchedDocs" :key="resource.id" class="resource-card">
          <div class="resource-header">
            <div class="resource-icon">
              <i class='fas fa-book'></i>
            </div>
            <div class="resource-title">{{ resource.docTitle }}</div>
          </div>
          <div class="resource-meta">
            <span>
              <i class="fas fa-book"></i>
              {{ resource.topicName }}
            </span>
            <span>
              <i class="far fa-calendar-alt"></i>
              {{ formatUpdatedDate(resource.dateUploaded) }}
            </span>
            <!-- <span v-else>
              <i :class="resource.metaIcon"></i>
              {{ resource.metaText }}
            </span> -->
          </div>
          <div class="resource-actions">
            <!-- <AppButton
              size="small"
              variant="secondary"
              @click="openPreview(resource)"
            >
              Preview
            </AppButton>-->
            <AppButton size="small" v-on:click="downloadFile(resource.docKey)">
              Download
            </AppButton>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-state-card empty-state-card--message">
          <div class="empty-icon" aria-hidden="true">
            <i class="fas fa-book-open"></i>
          </div>
          <h3>No resources found</h3>
          <p>Check back soon for newly added study materials</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, ref, watch } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppTabs from '../common/AppTabs.vue';
import { mapToResource, type Resource, type ResourceType } from '../../types/student';
import loadDocuments from './api/GetDocs';
import getDocLink from './api/GetDocLink';

interface UiState {
  notify: (msg: string, type?: string) => void;
  modals: {
    preview: Resource & { typeLabel: string } | null;
    upload: boolean;
  };
}
 
interface TabItem {
  value: string;
  label: string;
  icon?: string;
  category: string;
}

interface StudentState {
  resources: Resource[];
}

interface UploadForm {
  title: string;
}

const ui: UiState = reactive({
  notify: (msg: string, type?: string) => console.log(type ? `${type}: ${msg}` : msg),
  modals: {
    preview: null,
    upload: false,
  },
}); 


const filterTabs: TabItem[] = [
  { value: "-1", label: 'All Resources', icon: 'fas fa-layer-group', category: "-1" },
  { value: "0", label: 'Programming', icon: 'fas fa-code', category: "0" },
  { value: '2', label: 'Databases', icon: 'fas fa-database', category: '2' },
  { value: '1', label: 'Systems', icon: 'fas fa-network-wired', category: '1' },
  { value: '3', label: 'Web & Mobile', icon: 'fas fa-globe', category: '3' },
  { value: '5', label: 'ICT & Research', icon: 'fas fa-chart-line', category: '5' },
  { value: '4', label: 'Specialized', icon: 'fas fa-brain', category: '4' },
];
const activeCategory = ref<string>(filterTabs[0].value);
 

const updatedFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const formatUpdatedDate = (isoDate: string): string => {
  return updatedFormatter.format(new Date(isoDate));
};
const fetchedDocs = ref<Array<Resource>>([])
const docsLoading = ref<boolean>(true)

const fetchDocuments = async (category: string): Promise<void> => {
  docsLoading.value = true
  try {
    const res = await loadDocuments(category)
    if (res.status === 200 && res.data != null) {
      fetchedDocs.value = res.data.map(mapToResource)
    } else {
      fetchedDocs.value = []
    }
  } catch (error) {
    fetchedDocs.value = []
    console.error('Error loading resources:', error)
  } finally {
    docsLoading.value = false
  }
}

async function downloadFile(fileKey: string) {
  try {
    var link = await getDocLink(fileKey);
    // console.log("Download link:", link);
    window.open(link, '_blank');
  }
  catch (error) {
    console.error("Error downloading file:", error);
  }
}

onMounted(async () => {
  await fetchDocuments(activeCategory.value)
});
watch(activeCategory, async (cat) => {
  await fetchDocuments(cat)
});

// const setActiveFilter = (filter: TabItem): void => {
//   activeFilter.value = filter;
// };

const getResourceIcon = (type: ResourceType): string => {
  const icons: Record<ResourceType | 'videos', string> = {
    lectures: 'fas fa-file-pdf',
    books: 'fas fa-book',
    papers: 'fas fa-file-alt',
    videos: 'fas fa-file-video',
  };
  return icons[type] || 'fas fa-file';
};

const handleResourceAction = (resource: Resource): void => {
  // ui.notify(`${resource.actionLabel}: ${resource.title}`);
};

const openPreview = (resource: Resource): void => {
  // ui.modals.preview = {
  //   ...resource,
  //   // typeLabel: getTypeLabel(resource.type),
  // };
};

const handleResourceDownload = (resource: Resource): void => {
  // ui.notify(`Downloading: ${resource.title}`);
  ui.modals.preview = null;
};

const openUploadModal = (): void => {
  ui.modals.upload = true;
};

const submitUpload = (form: UploadForm): void => {
  ui.modals.upload = false;
  ui.notify(`Uploaded: ${form.title}`, 'success');
};

const getTypeLabel = (value: ResourceType): string => {
  const map: Record<string, string> = {
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
};
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
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}


.resources :deep(.tab-trigger:not(.active):hover) {
  background: rgba(17, 24, 39, 0.08);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.resource-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 18px 32px -18px rgba(17, 24, 39, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 46px -20px rgba(17, 24, 39, 0.35);
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 320px;
}

.empty-state-card {
  background: rgba(255, 255, 255, 0.78);
  border-radius: 1rem;
  padding: 2.5rem 3rem;
  box-shadow: 0 22px 40px -18px rgba(17, 24, 39, 0.4);
  border: 1px solid rgba(229, 231, 235, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 420px;
}

.empty-state-card--message {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  padding: 2.5rem 3rem;
}

.empty-state-card--message h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
}

.empty-state-card--message p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(209, 213, 219, 0.65);
  color: rgb(156, 163, 175);
  font-size: 1.9rem;
  box-shadow: 0 18px 36px -20px rgba(17, 24, 39, 0.35);
}

.empty-icon i {
  color: inherit;
  font-size: 1.4em;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  padding: 2rem 3rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(229, 231, 235, 0.4);
  box-shadow: 0 25px 55px -16px rgba(17, 24, 39, 0.28);
  max-width: 420px;
  text-align: center;
}

.spinner-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 4.5rem;
  height: 4.5rem;
  border: 4px solid rgba(17, 24, 39, 0.12);
  border-top: 4px solid #111827;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  z-index: 2;
}

.spinner-glow {
  position: absolute;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(17, 24, 39, 0.18) 0%, transparent 72%);
  animation: pulse 2s ease-in-out infinite;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.45;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}

.resource-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resource-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #111827, #374151);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.resource-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.resource-meta {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.resource-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.resource-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
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
@media (max-width: 1024px) {
  .resources {
    padding: 1.5rem;
  }

  .page-shell {
    gap: 1.5rem;
  }

  .resources-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .resource-card {
    padding: 1.25rem;
  }

  .resource-header {
    gap: 1rem;
  }

  .resource-actions {
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .resources {
    padding: 1rem;
  }

  .page-shell {
    gap: 1rem;
  }

  .header-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .upload-button {
    align-self: flex-start;
  }

  .resources-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .resource-card {
    padding: 1rem;
  }

  .resource-title {
    font-size: 1rem;
  }

  .resource-meta {
    font-size: 0.85rem;
  }

  .resource-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .resource-actions :deep(.btn) {
    width: 100%;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .resources {
    padding: 0.5rem;
  }

  .resource-card {
    padding: 0.75rem;
  }

  .resource-title {
    font-size: 0.95rem;
  }

  .resource-description {
    font-size: 0.85rem;
  }
}
</style>