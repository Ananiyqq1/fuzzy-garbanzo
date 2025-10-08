<template>
  <div class="course-management">
    <AppContentHeader
      title="Course Management"
      subtitle="Create, edit, and manage courses and learning materials"
    >
      <template #actions>
      </template>
    </AppContentHeader>

    <AppFilterBar>
      <div class="filter-row">
        <AppSelect v-model="filters.category" label="Category">
          <option value="all">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </AppSelect>
        <AppSelect v-model="filters.status" label="Status">
          <option value="all">All Status</option>
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </AppSelect>
        <AppInput
          v-model="filters.search"
          placeholder="Search courses..."
          left-icon="fas fa-search"
          label="Search"
          class="filter-search"
        />
      </div>
      <template #actions>
      </template>
    </AppFilterBar>

    <AppFormSection title="Create New Course">
      <div class="form-grid">
        <AppInput
          v-model="newCourse.title"
          label="Course Title"
          placeholder="Enter course title"
        />
        <AppInput
          v-model="newCourse.code"
          label="Course Code"
          placeholder="e.g., CS101"
        />
        <AppSelect v-model="newCourse.category" label="Category">
          <option value="">Select category</option>
          <option v-for="category in categories" :key="`form-${category}`" :value="category">{{ category }}</option>
        </AppSelect>
        <AppTextarea
          v-model="newCourse.description"
          label="Course Description"
          placeholder="Enter course description"
          :rows="4"
          class="full-width"
        />
      </div>
      <template #footer>
        <AppButton icon="fas fa-save" @click="createCourse">Create Course</AppButton>
      </template>
    </AppFormSection>

    <AppDataTable
      :columns="columns"
      :rows="filteredCourses"
      :row-key="rowKey"
    >
      <template #cell-status="{ row }">
        <AppStatusBadge :variant="statusVariants[row.status]">
          {{ row.statusLabel }}
        </AppStatusBadge>
      </template>
      <template #cell-actions="{ row }">
        <div class="table-actions">
          <button class="icon-button edit" @click="editCourse(row)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="icon-button delete" @click="removeCourse(row)">
            <i class="fas fa-trash"></i>
          </button>
          <button class="icon-button view" @click="viewCourse(row)">
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

const categories = ['Computer Science', 'Engineering', 'Business', 'Mathematics'];
const statuses = ['Active', 'Inactive', 'Draft'];
const instructors = ['Dr. Abebe Kebede', 'Dr. Selamawit Tadesse', 'Dr. Michael Berhanu', 'Dr. Hanna Girma', 'Dr. Yordanos Lemma'];

const state = reactive({
  courses: [
    { code: 'CS321', title: 'Data Structures and Algorithms', category: 'Programming', instructor: 'Dr. Abebe Kebede', enrollments: 142, status: 'Active', statusLabel: 'Active' },
    { code: 'CS341', title: 'Database Systems', category: 'Databases % Data Management', instructor: 'Dr. Selamawit Tadesse', enrollments: 118, status: 'Active', statusLabel: 'Active' },
  ],
  filters: {
    category: 'all',
    status: 'all',
    search: ''
  },
  newCourse: {
    title: '',
    code: '',
    category: '',
    instructor: '',
    description: ''
  }
});

const filters = state.filters;
const newCourse = state.newCourse;

const columns = [
  { key: 'code', label: 'Course Code', minWidth: '140px' },
  { key: 'title', label: 'Course Title', minWidth: '220px' },
  { key: 'category', label: 'Category', minWidth: '160px' },
  { key: 'status', label: 'Status', width: '140px', align: 'center' },
  { key: 'actions', label: 'Actions', width: '140px', align: 'center' },
];

const statusVariants = {
  Active: 'success',
  Inactive: 'danger',
  Draft: 'warning',
};

const filteredCourses = computed(() => {
  return state.courses
    .map(course => ({
      ...course,
      actions: 'actions',
    }))
    .filter(course => {
      const matchesCategory = filters.category === 'all' || course.category === filters.category;
      const matchesStatus = filters.status === 'all' || course.statusLabel === filters.status;
      const query = filters.search.trim().toLowerCase();
      const matchesSearch = !query || `${course.code} ${course.title} ${course.instructor}`.toLowerCase().includes(query);
      return matchesCategory && matchesStatus && matchesSearch;
    });
});

const rowKey = (row) => row.code;

function openCourseModal() {
  console.log('Open course creation modal');
}

function createCourse() {
  console.log('Create course clicked', { ...newCourse });
}

function editCourse(course) {
  console.log('Edit course', course);
}

function removeCourse(course) {
  console.log('Remove course', course);
}

function viewCourse(course) {
  console.log('View course', course);
}

function exportCourses() {
  console.log('Export courses');
}
</script>

<style scoped>
.course-management {
  padding: 2rem;
}

.filter-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-row > * {
  flex: 1 1 220px;
}

.filter-search {
  min-width: 260px;
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

@media (max-width: 1024px) {
  .course-management {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .course-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .course-management {
    padding: 1rem;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .page-header h1 {
    font-size: 1.75rem;
  }

  .form-section {
    padding: 1.5rem;
  }

  .form-grid {
    gap: 1rem;
  }

  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .course-list {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .course-card {
    padding: 1rem;
  }

  .course-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .course-actions button {
    width: 100%;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .course-management {
    padding: 0.5rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .form-section {
    padding: 1rem;
  }

  .course-card {
    padding: 0.75rem;
  }

  .course-title {
    font-size: 1rem;
  }

  .course-meta {
    font-size: 0.85rem;
  }
}
</style>