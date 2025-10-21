<template>
  <div class="course-management">
    <AppLoading :show="isLoading" size="large" :duration="0" />
    <AppContentHeader
      title="Course Management"
      subtitle="Create, edit, and manage courses and learning materials"
    />

    <AppFilterBar>
      <div class="filter-row">
        <AppSelect v-model="filters.category" label="Category">
          <option value="all">All Categories</option>
          <option
            v-for="option in categoryOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </AppSelect>
        <AppInput
          v-model="filters.search"
          placeholder="Search courses..."
          left-icon="fas fa-search"
          label="Search"
          class="filter-search"
        />
      </div>
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
          :disabled="!!editingCourseCode"
        />
        <AppInput
          v-model="newCourse.creditHour"
          type="number"
          min="0"
          label="Credit Hours"
          placeholder="3"
        />
        <AppSelect v-model="newCourse.category" label="Category">
          <option value="">Select category</option>
          <option
            v-for="option in categoryOptions"
            :key="`form-${option.value}`"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </AppSelect>
        <AppTextarea
          v-model="newCourse.description"
          label="Course Description"
          placeholder="Enter course description"
          :rows="4"
          class="full-width"
        />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <template #footer>
        <div class="form-actions">
          <AppButton
           
            :disabled="isSaving"
            @click="submitCourse"
          >
            {{ editingCourseCode ? 'Update Course' : 'Create Course' }}
          </AppButton>
          <AppButton
            v-if="editingCourseCode"
            variant="secondary"
           
            @click="resetForm"
          >
            Cancel
          </AppButton>
        </div>
      </template>
    </AppFormSection>

    <AppDataTable
      :columns="columns"
      :rows="filteredCourses"
      :row-key="rowKey"
    >
      <template #cell-actions="{ row }">
        <div class="table-actions">
          <button class="icon-button edit" @click="editCourse(row)" title="Edit course">
            <i class="fas fa-edit"></i>
          </button>
          <button class="icon-button delete" @click="removeCourse(row)" title="Delete course">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </template>
    </AppDataTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import AppButton from '../common/AppButton.vue'
import AppContentHeader from '../common/AppContentHeader.vue'
import AppDataTable from '../common/AppDataTable.vue'
import AppFilterBar from '../common/AppFilterBar.vue'
import AppFormSection from '../common/AppFormSection.vue'
import AppInput from '../common/AppInput.vue'
import AppSelect from '../common/AppSelect.vue'
import AppTextarea from '../common/AppTextarea.vue'
import AppLoading from '../common/AppLoading.vue'
import { useCoursesStore } from '@/stores/useCoursesStore'
import type { Course } from '@/data/mockCourses'


const categoryOptions = [
  { value: 'programming', label: 'Programming & Software Development' },
  { value: 'databases', label: 'Databases & Data Management' },
  { value: 'systems', label: 'Systems & Infrastructure' },
  { value: 'web-mobile', label: 'Web & Mobile Development' },
  { value: 'ict-research', label: 'ICT Management & Research' },
  { value: 'specialized', label: 'Specialized & Emerging Areas' }
]

const filters = reactive({
  category: 'all',
  search: ''
})

const coursesStore = useCoursesStore()
const courses = computed(() => coursesStore.allCourses)
const isLoading = computed(() => coursesStore.isLoading)
const isSaving = ref(false)
const errorMessage = ref('')
const editingCourseCode = ref<string | null>(null)

const newCourse = reactive({
  title: '',
  code: '',
  creditHour: '',
  category: '',
  description: ''
})

const getCategoryLabel = (category: string) => {
  const match = categoryOptions.find((option) => option.value === category)
  return match ? match.label : category
}

const columns = [
  { key: 'courseCode', label: 'Course Code', minWidth: '140px' },
  { key: 'name', label: 'Course Title', minWidth: '220px' },
  { key: 'categoryLabel', label: 'Category', minWidth: '200px' },
  { key: 'creditHour', label: 'Credit Hours', width: '140px', align: 'center' },
  { key: 'actions', label: 'Actions', width: '140px', align: 'center' }
]

const filteredCourses = computed(() => {
  const query = filters.search.trim().toLowerCase()
  return courses.value
    .map((course) => ({
      ...course,
      categoryLabel: getCategoryLabel(course.category),
      actions: 'actions'
    }))
    .filter((course) => {
      const matchesCategory = filters.category === 'all' || course.category === filters.category
      const matchesSearch =
        !query || `${course.courseCode} ${course.name} ${course.description}`.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
})

const rowKey = (row: { courseCode: string }) => row.courseCode

const resetForm = () => {
  editingCourseCode.value = null
  newCourse.title = ''
  newCourse.code = ''
  newCourse.creditHour = ''
  newCourse.category = ''
  newCourse.description = ''                                                                                    
  errorMessage.value = ''
}
                                                                                                                                                                                                                                                                                                                                                                                                                                            
const loadCourses = async () => {
  errorMessage.value = ''
  console.log('Loading courses...')
  try {
    await coursesStore.fetchCourses()
    console.log('Courses loaded successfully:', courses.value.length)
  } catch (error: any) {
    console.error('Failed to load courses', error)
    errorMessage.value = error?.message || 'Failed to load courses.'
  }
}

const submitCourse = async () => {
  errorMessage.value = ''
  if (!newCourse.title.trim() || !newCourse.code.trim() || !newCourse.category) {
    errorMessage.value = 'Course title, code, and category are required.'
    return
  }

  const creditHourNumber = Number(newCourse.creditHour)
  if (Number.isNaN(creditHourNumber) || creditHourNumber < 0) {
    errorMessage.value = 'Credit hours must be a non-negative number.'
    return
  }

  const payload = {
    courseCode: newCourse.code.trim(),
    name: newCourse.title.trim(),
    description: newCourse.description.trim(),
    creditHour: creditHourNumber,
    category: newCourse.category as Course['category']
  }

  isSaving.value = true
  try {
    if (editingCourseCode.value) {
      await coursesStore.updateCourse(editingCourseCode.value, payload)
    } else {
      await coursesStore.createCourse(payload)
    }
    resetForm()
  } catch (error: any) {
    console.error('Failed to save course', error)
    errorMessage.value = error?.message || 'Failed to save course.'
  } finally {
    isSaving.value = false
  }
}

const editCourse = (course: Course & { categoryLabel?: string }) => {
  editingCourseCode.value = course.courseCode
  newCourse.title = course.name
  newCourse.code = course.courseCode
  newCourse.creditHour = String(course.creditHour ?? '')
  newCourse.category = course.category
  newCourse.description = course.description
  errorMessage.value = ''
}

const removeCourse = async (course: Course) => {
  isSaving.value = true
  errorMessage.value = ''
  try {
    await coursesStore.deleteCourse(course.courseCode)
  } catch (error: any) {
    console.error('Failed to delete course', error)
    errorMessage.value = error?.message || 'Failed to delete course.'
  } finally {
    isSaving.value = false
  }
}


onMounted(() => {
  loadCourses()
})
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

.error-message {
  color: #b91c1c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.full-width {
  grid-column: 1 / -1;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.table-actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.icon-button {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.06);
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.icon-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-button:active {
  transform: translateY(0);
}

.icon-button.edit {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.icon-button.edit:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.icon-button.delete {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.icon-button.delete:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #b91c1c;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
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