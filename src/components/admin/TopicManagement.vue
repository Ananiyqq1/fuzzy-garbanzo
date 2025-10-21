<template>
  <div class="topic-management">
    <AppLoading :show="isLoading" size="large" :duration="0" />
    <AppContentHeader
      title="Topic Management"
      subtitle="Organize and manage learning topics and subtopics"
    />

    <AppFilterBar>
      <div class="filter-row">
        <AppSelect v-model="filters.course" label="Course">
          <option value="all">All Courses</option>
          <option
            v-for="option in courseOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </AppSelect>
        <AppInput
          v-model="filters.search"
          placeholder="Search topics..."
          left-icon="fas fa-search"
          label="Search"
          class="filter-search"
        />
      </div>
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
          <option
            v-for="option in courseOptions"
            :key="`parent-${option.value}`"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </AppSelect>
        <AppTextarea
          v-model="newTopic.description"
          label="Topic Description"
          placeholder="Enter topic description"
          :rows="4"
          class="full-width"
        />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <template #footer>
        <div class="form-actions">
          <AppButton
            :disabled="isSaving"
            @click="submitTopic"
          >
            {{ editingTopicId ? 'Update Topic' : 'Create Topic' }}
          </AppButton>
          <AppButton
            v-if="editingTopicId"
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
      :rows="filteredTopics"
      :row-key="rowKey"
    >
      <template #cell-actions="{ row }">
        <div class="table-actions">
          <button class="icon-button edit" @click="editTopic(row)" title="Edit topic">
            <i class="fas fa-edit"></i>
          </button>
          <button class="icon-button delete" @click="removeTopic(row)" title="Delete topic">
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
import { useTopicsStore } from '@/stores/useTopicsStore'
import { useCoursesStore } from '@/stores/useCoursesStore'
import type { Topic } from '@/data/mockTopics'
import type { Course } from '@/data/mockCourses'


const topicsStore = useTopicsStore()
const coursesStore = useCoursesStore()
const courses = computed(() => coursesStore.allCourses)
const topics = computed(() => topicsStore.allTopics)

const filters = reactive({
  course: 'all',
  search: ''
})

const isLoading = computed(() => topicsStore.isLoading || coursesStore.isLoading)
const isSaving = ref(false)
const errorMessage = ref('')
const editingTopicId = ref<string | null>(null)

const newTopic = reactive({
  title: '',
  course: '',
  description: ''
})

const courseOptions = computed(() =>
  courses.value.map((course) => ({
    value: course.courseCode,
    label: course.name
  }))
)

const courseLabelLookup = computed(() => {
  const map = new Map<string, string>()
  for (const course of courses.value) {
    map.set(course.courseCode, course.name)
  }
  return map
})

const columns = [
  { key: 'name', label: 'Topic Title', minWidth: '220px' },
  { key: 'courseLabel', label: 'Course', minWidth: '200px' },
  { key: 'description', label: 'Description', minWidth: '260px' },
  { key: 'actions', label: 'Actions', width: '140px', align: 'center' }
]

const filteredTopics = computed(() => {
  const query = filters.search.trim().toLowerCase()
  return topics.value
    .map((topic) => ({
      ...topic,
      courseLabel: courseLabelLookup.value.get(topic.courseCode) ?? topic.courseCode,
      actions: 'actions'
    }))
    .filter((topic) => {
      const matchesCourse = filters.course === 'all' || topic.courseCode === filters.course
      const matchesSearch = !query || `${topic.name} ${topic.courseLabel}`.toLowerCase().includes(query)
      return matchesCourse && matchesSearch
    })
})

const rowKey = (row: Topic) => row.topicId

const resetForm = () => {
  editingTopicId.value = null
  newTopic.title = ''
  newTopic.course = ''
  newTopic.description = ''
  errorMessage.value = ''
}

const loadTopics = async () => {
  try {
    await topicsStore.fetchTopics()
    console.log('Topics loaded:', topics.value.length)
  } catch (error: any) {
    console.error('Failed to load topics', error)
    throw error // Propagate error to loadData
  }
}

const loadCourses = async () => {
  try {
    await coursesStore.fetchCourses()
    console.log('Courses loaded for topics:', courses.value.length)
  } catch (error: any) {
    console.error('Failed to load courses for topics', error)
    throw error // Propagate error to loadData
  }
}

const loadData = async () => {
  errorMessage.value = ''
  try {
    await Promise.all([loadCourses(), loadTopics()])
  } catch (error: any) {
    console.error('Failed to load data', error)
    errorMessage.value = error?.message || 'Failed to load data.'
  }
}

const submitTopic = async () => {
  errorMessage.value = ''
  if (!newTopic.title.trim() || !newTopic.course) {
    errorMessage.value = 'Topic title and course are required.'
    return
  }

  const payload = {
    courseCode: newTopic.course,
    name: newTopic.title.trim(),
    description: newTopic.description.trim()
  }

  isSaving.value = true
  try {
    if (editingTopicId.value) {
      await topicsStore.updateTopic(editingTopicId.value, payload)
    } else {
      await topicsStore.createTopic(payload)
    }
    resetForm()
  } catch (error: any) {
    console.error('Failed to save topic', error)
    errorMessage.value = error?.message || 'Failed to save topic.'
  } finally {
    isSaving.value = false
  }
}

const editTopic = (topic: Topic & { courseLabel?: string }) => {
  editingTopicId.value = topic.topicId
  newTopic.title = topic.name
  newTopic.course = topic.courseCode
  newTopic.description = topic.description
  errorMessage.value = ''
}

const removeTopic = async (topic: Topic) => {
  isSaving.value = true
  errorMessage.value = ''
  try {
    await topicsStore.deleteTopic(topic.topicId)
  } catch (error: any) {
    console.error('Failed to delete topic', error)
    errorMessage.value = error?.message || 'Failed to delete topic.'
  } finally {
    isSaving.value = false
  }
}


onMounted(() => {
  loadData()
})
</script>

<style scoped>
.topic-management {
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

.error-message {
  color: #b91c1c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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

@media (max-width: 768px) {
  .topic-management {
    padding: 1.5rem;
  }
}
</style>