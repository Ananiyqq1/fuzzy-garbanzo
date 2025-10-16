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
        <AppButton
          icon="fas fa-save"
          :disabled="isSaving"
          @click="submitTopic"
        >
          {{ editingTopicId ? 'Update Topic' : 'Create Topic' }}
        </AppButton>
      </template>
    </AppFormSection>

    <AppDataTable
      :columns="columns"
      :rows="filteredTopics"
      :row-key="rowKey"
    >
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
import { fetchTopics, createTopic, updateTopic, deleteTopic, type TopicResponse } from '@/services/adminTopics'
import { fetchCourses, type CourseResponse } from '@/services/adminCourses'


const courses = ref<CourseResponse[]>([])
const topics = ref<TopicResponse[]>([])

const filters = reactive({
  course: 'all',
  search: ''
})

const isLoading = ref(false)
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

const rowKey = (row: TopicResponse) => row.topicId

const resetForm = () => {
  editingTopicId.value = null
  newTopic.title = ''
  newTopic.course = ''
  newTopic.description = ''
  errorMessage.value = ''
}

const loadTopics = async () => {
  try {
    topics.value = await fetchTopics()
    console.log('Topics loaded:', topics.value.length)
  } catch (error: any) {
    console.error('Failed to load topics', error)
    throw error // Propagate error to loadData
  }
}

const loadCourses = async () => {
  try {
    courses.value = await fetchCourses()
    console.log('Courses loaded for topics:', courses.value.length)
  } catch (error: any) {
    console.error('Failed to load courses for topics', error)
    throw error // Propagate error to loadData
  }
}

const loadData = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    await Promise.all([loadCourses(), loadTopics()])
  } catch (error: any) {
    console.error('Failed to load data', error)
    errorMessage.value = error?.response?.data || error?.message || 'Failed to load data.'
  } finally {
    isLoading.value = false
  }
}

const submitTopic = async () => {
  errorMessage.value = ''
  if (!newTopic.title.trim() || !newTopic.course) {
    errorMessage.value = 'Topic title and course are required.'
    return
  }

  const payload = {
    CourseCode: newTopic.course,
    Name: newTopic.title.trim(),
    Description: newTopic.description.trim()
  }

  isSaving.value = true
  try {
    if (editingTopicId.value) {
      await updateTopic(editingTopicId.value, payload)
    } else {
      await createTopic(payload)
    }
    await loadTopics()
    resetForm()
  } catch (error: any) {
    console.error('Failed to save topic', error)
    errorMessage.value = error?.response?.data || 'Failed to save topic.'
  } finally {
    isSaving.value = false
  }
}

const editTopic = (topic: TopicResponse & { courseLabel?: string }) => {
  editingTopicId.value = topic.topicId
  newTopic.title = topic.name
  newTopic.course = topic.courseCode
  newTopic.description = topic.description
  errorMessage.value = ''
}

const removeTopic = async (topic: TopicResponse) => {
  isSaving.value = true
  errorMessage.value = ''
  try {
    await deleteTopic(topic.topicId)
    await loadTopics()
  } catch (error: any) {
    console.error('Failed to delete topic', error)
    errorMessage.value = error?.response?.data || 'Failed to delete topic.'
  } finally {
    isSaving.value = false
  }
}

const viewTopic = (topic: TopicResponse) => {
  console.log('View topic', topic)
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