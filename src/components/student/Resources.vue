<template>
  <div class="resources">
    <div class="page-shell">
      <AppLoading
        :show="ui.loading"
        size="large"
        :duration="3000"
        @finished="ui.loading = false"
      />

      <div class="header-row">
        <AppContentHeader
          title="Learning Resources"
          subtitle="Access study materials, lecture notes, and other resources"
        />
        <!-- <AppButton class="upload-button" size="small" icon="fas fa-upload" @click="openUploadModal">
          Upload Resource
        </AppButton> -->
      </div>

      <AppTabs v-model="activeFilter" :tabs="filterTabs" />

      <div class="resources-grid">
        <div
          v-for="resource in filteredResources"
          :key="resource.id"
          class="resource-card"
          :data-type="resource.type"
        >
          <div class="resource-header">
            <div class="resource-icon">
              <i :class="getResourceIcon(resource.type)"></i>
            </div>
            <div class="resource-title">{{ resource.title }}</div>
          </div>
          <div class="resource-meta">
            <span>
              <i class="fas fa-book"></i>
              {{ resource.course }}
            </span>
            <span v-if="resource.updatedAt">
              <i class="far fa-calendar-alt"></i>
              {{ formatUpdatedDate(resource.updatedAt) }}
            </span>
            <span v-else>
              <i :class="resource.metaIcon"></i>
              {{ resource.metaText }}
            </span>
          </div>
          <div class="resource-actions">
            <AppButton
              size="small"
              variant="secondary"
              @click="openPreview(resource)"
            >
              Preview
            </AppButton>
            <AppButton size="small" @click="handleResourceAction(resource)">
              {{ resource.actionLabel }}
            </AppButton>
          </div>
        </div>
      </div>

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

<script setup lang="ts">
import { onMounted, reactive, computed, ref } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppLoading from '../common/AppLoading.vue';
import AppTabs from '../common/AppTabs.vue';
import { studentResources } from '../../data/studentResources';
import type { StudentResource, ResourceType } from '../../types/student';
import ResourcePreviewModal from './modals/ResourcePreviewModal.vue';
import UploadResourceModal from './modals/UploadResourceModal.vue';

interface UiState {
  loading: boolean;
  notify: (msg: string, type?: string) => void;
  modals: {
    preview: StudentResource & { typeLabel: string } | null;
    upload: boolean;
  };
}

type PreferenceCategory =
  | 'all'
  | 'programming'
  | 'databases'
  | 'systems'
  | 'web-mobile'
  | 'ict-research'
  | 'specialized';

interface TabItem {
  value: PreferenceCategory;
  label: string;
  icon?: string;
}

interface StudentState {
  resources: StudentResource[];
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

const student: StudentState = reactive({
  resources: studentResources.map((resource) => ({ ...resource })),
});

const activeFilter = ref<PreferenceCategory>('all');

const filterTabs: TabItem[] = [
  { value: 'all', label: 'All Resources', icon: 'fas fa-layer-group' },
  { value: 'programming', label: 'Programming', icon: 'fas fa-code' },
  { value: 'databases', label: 'Databases', icon: 'fas fa-database' },
  { value: 'systems', label: 'Systems', icon: 'fas fa-network-wired' },
  { value: 'web-mobile', label: 'Web & Mobile', icon: 'fas fa-globe' },
  { value: 'ict-research', label: 'ICT & Research', icon: 'fas fa-chart-line' },
  { value: 'specialized', label: 'Specialized', icon: 'fas fa-brain' },
];

const categoryKeywords: Record<Exclude<PreferenceCategory, 'all'>, string[]> = {
  programming: ['program', 'algorithm', 'software', 'code'],
  databases: ['database', 'data', 'sql'],
  systems: ['system', 'network', 'unix', 'assembly'],
  'web-mobile': ['web', 'mobile'],
  'ict-research': ['ict', 'project', 'research'],
  specialized: ['artificial', 'ai', 'compiler', 'graphics', 'retrieval'],
};

const filteredResources = computed<StudentResource[]>(() => {
  if (activeFilter.value === 'all') {
    return student.resources;
  }

  const keywords = categoryKeywords[activeFilter.value];
  if (!keywords) {
    return student.resources;
  }

  return student.resources.filter((resource) => {
    const haystack = `${resource.title} ${resource.description} ${resource.course}`.toLowerCase();
    return keywords.some((keyword) => haystack.includes(keyword));
  });
});

const updatedFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const formatUpdatedDate = (isoDate: string): string => {
  return updatedFormatter.format(new Date(isoDate));
};

onMounted(() => {
  loadResources();
});

const loadResources = (): void => {
  ui.loading = true;
};

const setActiveFilter = (filter: PreferenceCategory): void => {
  activeFilter.value = filter;
};

const getResourceIcon = (type: ResourceType): string => {
  const icons: Record<ResourceType | 'videos', string> = {
    lectures: 'fas fa-file-pdf',
    books: 'fas fa-book',
    papers: 'fas fa-file-alt',
    videos: 'fas fa-file-video',
  };
  return icons[type] || 'fas fa-file';
};

const handleResourceAction = (resource: StudentResource): void => {
  ui.notify(`${resource.actionLabel}: ${resource.title}`);
};

const openPreview = (resource: StudentResource): void => {
  ui.modals.preview = {
    ...resource,
    typeLabel: getTypeLabel(resource.type),
  };
};

const handleResourceDownload = (resource: StudentResource): void => {
  ui.notify(`Downloading: ${resource.title}`);
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