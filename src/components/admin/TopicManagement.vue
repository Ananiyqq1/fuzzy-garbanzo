<template>
  <div class="topic-management">
    <AppContentHeader
      title="Topic Management"
      subtitle="Organize and manage learning topics and subtopics"
    >
      <template #actions>
        <AppButton icon="fas fa-plus" @click="openTopicModal">Add New Topic</AppButton>
      </template>
    </AppContentHeader>

    <AppFilterBar>
      <AppSelect v-model="filters.course" label="Course">
        <option value="all">All Courses</option>
        <option v-for="course in courseOptions" :key="course" :value="course">{{ course }}</option>
      </AppSelect>
      <AppInput
        v-model="filters.search"
        placeholder="Search topics..."
        left-icon="fas fa-search"
      />
      <template #actions>
        <AppButton
          variant="secondary"
          icon="fas fa-download"
          @click="exportTopics"
        >
          Export
        </AppButton>
      </template>
    </AppFilterBar>

    <AppFormSection title="Create New Topic">
      <div class="form-grid">
        <AppInput
          v-model="newTopic.title"
          label="Topic Title"
          placeholder="Enter topic title"
        />
        <AppSelect v-model="newTopic.course" label="Parent Course">
          <option value="">Select course</option>
          <option v-for="course in courseOptions" :key="`parent-${course}`" :value="course">{{ course }}</option>
        </AppSelect>
        <AppSelect v-model="newTopic.difficulty" label="Difficulty Level">
          <option value="">Select difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </AppSelect>
        <AppInput
          v-model="newTopic.duration"
          type="number"
          label="Estimated Duration (hours)"
          placeholder="e.g., 5"
        />
        <AppTextarea
          v-model="newTopic.description"
          label="Topic Description"
          placeholder="Enter topic description"
          :rows="4"
          class="full-width"
        />
      </div>
      <template #footer>
        <AppButton icon="fas fa-save" @click="createTopic">Create Topic</AppButton>
      </template>
    </AppFormSection>

    <AppDataTable
      :columns="columns"
      :rows="filteredTopics"
      row-key="title"
    >
      <template #cell-status="{ row }">
        <AppStatusBadge :variant="statusVariants[row.status]">
          {{ row.statusLabel }}
        </AppStatusBadge>
      </template>
      <template #cell-actions="{ row }">
        <div class="table-actions">
          <button class="icon-button edit" @click="editTopic(row)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="icon-button delete" @click="removeTopic(row)">
            <i class="fas fa-trash"></i>
          </button>
          <button class="icon-button view" @click="viewTopic(row)">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </template>
    </AppDataTable>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppDataTable from '../common/AppDataTable.vue';
import AppFilterBar from '../common/AppFilterBar.vue';
import AppFormSection from '../common/AppFormSection.vue';
import AppInput from '../common/AppInput.vue';
import AppSelect from '../common/AppSelect.vue';
import AppStatusBadge from '../common/AppStatusBadge.vue';
import AppTextarea from '../common/AppTextarea.vue';

const courseOptions = [
  'Data Structures and Algorithms',
  'Database Systems',
  'Calculus I',
  'Business Management'
];

const state = reactive({
  topics: [
    { title: 'Linked Lists', course: 'Data Structures and Algorithms', difficulty: 'Intermediate', duration: '4 hours', resources: 12, status: 'Active', statusLabel: 'Active' },
    { title: 'SQL Queries', course: 'Database Systems', difficulty: 'Beginner', duration: '3 hours', resources: 8, status: 'Active', statusLabel: 'Active' },
    { title: 'Differential Calculus', course: 'Calculus I', difficulty: 'Advanced', duration: '6 hours', resources: 10, status: 'Draft', statusLabel: 'Draft' },
    { title: 'Marketing Fundamentals', course: 'Business Management', difficulty: 'Beginner', duration: '4 hours', resources: 6, status: 'Active', statusLabel: 'Active' },
    { title: 'Balanced Binary Trees', course: 'Data Structures and Algorithms', difficulty: 'Advanced', duration: '5 hours', resources: 9, status: 'Inactive', statusLabel: 'Inactive' }
  ],
  filters: {
    course: 'all',
    search: ''
  },
  newTopic: {
    title: '',
    course: '',
    difficulty: '',
    duration: '',
    description: ''
  }
});

const filters = state.filters;
const newTopic = state.newTopic;

const columns = [
  { key: 'title', label: 'Topic Title', minWidth: '220px' },
  { key: 'course', label: 'Course', minWidth: '200px' },
  { key: 'difficulty', label: 'Difficulty', width: '140px' },
  { key: 'duration', label: 'Duration', width: '140px', align: 'center' },
  { key: 'resources', label: 'Resources', width: '140px', align: 'center' },
  { key: 'status', label: 'Status', width: '140px', align: 'center' },
  { key: 'actions', label: 'Actions', width: '140px', align: 'center' },
];

const statusVariants = {
  Active: 'success',
  Inactive: 'danger',
  Draft: 'warning',
};

const filteredTopics = computed(() => {
  return state.topics
    .map(topic => ({
      ...topic,
      actions: 'actions',
    }))
    .filter(topic => {
      const matchesCourse = filters.course === 'all' || topic.course === filters.course;
      const query = filters.search.trim().toLowerCase();
      const matchesSearch = !query || `${topic.title} ${topic.course}`.toLowerCase().includes(query);
      return matchesCourse && matchesSearch;
    });
});

function openTopicModal() {
  console.log('Open topic creation modal');
}

function createTopic() {
  console.log('Create topic clicked', { ...newTopic });
}

function editTopic(topic) {
  console.log('Edit topic', topic);
}

function removeTopic(topic) {
  console.log('Remove topic', topic);
}

function viewTopic(topic) {
  console.log('View topic', topic);
}

function exportTopics() {
  console.log('Export topics');
}
</script>

<style scoped>
.topic-management {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.full-width {
  grid-column: 1 / -1;
}

.table-actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.icon-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.08);
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px -10px rgba(17, 24, 39, 0.25);
}

.icon-button.edit:hover {
  background: rgba(37, 99, 235, 0.15);
  color: #1d4ed8;
}

.icon-button.delete:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #b91c1c;
}

.icon-button.view:hover {
  background: rgba(16, 185, 129, 0.15);
  color: #047857;
}

@media (max-width: 768px) {
  .topic-management {
    padding: 1.5rem;
  }
}
</style>