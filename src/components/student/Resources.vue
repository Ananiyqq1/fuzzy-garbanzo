<template>
  <div class="resources">
    <div class="page-shell">
      <AppLoading :show="ui.loading" size="large" :duration="3000" @finished="ui.loading = false" />

      <div class="header-row">
        <AppContentHeader title="Learning Resources"
          subtitle="Access study materials, lecture notes, and other resources" /> 
      </div>

      <AppTabs v-model="activeCategory" :tabs="filterTabs" />

      <div class="resources-grid">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, ref, watch } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppLoading from '../common/AppLoading.vue';
import AppTabs from '../common/AppTabs.vue';
import { mapToResource, type Resource, type ResourceType } from '../../types/student';
import loadDocuments from './api/GetDocs';
import getDocLink from './api/GetDocLink';

interface UiState {
  loading: boolean;
  notify: (msg: string, type?: string) => void;
  modals: {
    preview: Resource & { typeLabel: string } | null;
    upload: boolean;
  };
}
 
interface TabItem {
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
  loading: false,
  notify: (msg: string, type?: string) => console.log(type ? `${type}: ${msg}` : msg),
  modals: {
    preview: null,
    upload: false,
  },
}); 


const filterTabs: TabItem[] = [
  { label: 'All Resources', icon: 'fas fa-layer-group', category: "-1" },
  { label: 'Programming', icon: 'fas fa-code', category: "0" },
  { label: 'Databases', icon: 'fas fa-database', category: '2' },
  { label: 'Systems', icon: 'fas fa-network-wired', category: '1' },
  { label: 'Web & Mobile', icon: 'fas fa-globe', category: '3' },
  { label: 'ICT & Research', icon: 'fas fa-chart-line', category: '5' },
  { label: 'Specialized', icon: 'fas fa-brain', category: '4' },
];
const activeCategory = ref<string>(filterTabs[0].category);
 

const updatedFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const formatUpdatedDate = (isoDate: string): string => {
  return updatedFormatter.format(new Date(isoDate));
};
const fetchedDocs = ref<Array<Resource>>([])
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
  loadResources();
  var res = await loadDocuments(activeCategory.value);
  if (res.status == 200 && res.data != null) {
    fetchedDocs.value = res.data.map(mapToResource)
  }
});
watch(activeCategory, async (cat) => {
  const res = await loadDocuments(cat);
  if (res.status === 200 && res.data != null) {
    fetchedDocs.value = res.data.map(mapToResource);
  }
});

const loadResources = (): void => {
  ui.loading = true;
};

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