<template>
  <div>
    <div class="content-header">
      <h1>Learning Resources</h1>
      <p>Access study materials, lecture notes, and other resources</p>
    </div>

    <div class="filter-tabs">
      <div class="filter-tab active" data-filter="all" @click="filterResources('all')">All Resources</div>
      <div class="filter-tab" data-filter="lectures">Lecture Notes</div>
      <div class="filter-tab" data-filter="papers">Student Notes</div>
    </div>

    <div class="resources-grid">
      <div v-for="resource in filteredResources" :key="resource.id" class="resource-card" :data-type="resource.type">
        <div class="resource-header">
          <div class="resource-icon">
            <i :class="getResourceIcon(resource.type)"></i>
          </div>
          <div class="resource-title">{{ resource.title }}</div>
        </div>
        <div class="resource-meta">
          <span><i class="fas fa-book"></i> {{ resource.course }}</span>
          <span><i class="fas fa-calendar"></i> {{ resource.date }}</span>
        </div>
        <div class="resource-description">{{ resource.description }}</div>
        <div class="resource-actions">
          <button class="btn btn-secondary" @click="previewResource(resource.id)">Preview</button>
          <button class="btn" @click="downloadResource(resource.id)">{{ getResourceAction(resource.type) }}</button>
        </div>
      </div>
    </div>

    <button class="btn create-session-btn" @click="showUploadResourceModal">
      <i class="fas fa-upload"></i> Upload Resource
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const resources = ref([
  {
    id: 1,
    title: 'Data Structures Lecture Notes',
    type: 'lectures',
    course: 'CS201',
    date: 'Oct 15, 2023',
    description: 'Comprehensive notes covering arrays, linked lists, trees, and graphs with examples and algorithms.'
  },
  {
    id: 2,
    title: 'Introduction to Algorithms',
    type: 'books',
    course: 'CS301',
    date: '2020 Edition',
    description: 'The famous CLRS textbook covering fundamental algorithms and data structures.'
  },
  {
    id: 3,
    title: 'Neural Networks Overview',
    type: 'papers',
    course: 'CS401',
    date: 'Published: 2022',
    description: 'Recent survey paper on advances in deep learning and neural network architectures.'
  },
  {
    id: 4,
    title: 'Database Systems Video Lectures',
    type: 'lectures',
    course: 'CS202',
    date: '4h 25m',
    description: 'Recorded lectures covering SQL, normalization, and transaction processing.'
  },
  {
    id: 5,
    title: 'Computer Networking Textbook',
    type: 'books',
    course: 'CS305',
    date: 'Kurose & Ross',
    description: 'Complete textbook on computer networking principles and internet protocols.'
  },
  {
    id: 6,
    title: 'Blockchain Technology Review',
    type: 'papers',
    course: 'CS450',
    date: 'Published: 2023',
    description: 'Comprehensive review of blockchain technology, cryptocurrencies, and smart contracts.'
  }
])

const filteredResources = ref([...resources.value])

const filterResources = (type) => {
  if (type === 'all') {
    filteredResources.value = [...resources.value]
  } else {
    filteredResources.value = resources.value.filter(r => r.type === type)
  }
}

const previewResource = (resourceId) => {
  console.log('Previewing resource:', resourceId)
  alert(`Previewing ${resourceId}...`)
}

const downloadResource = (resourceId) => {
  console.log('Downloading resource:', resourceId)
  alert(`Downloading ${resourceId}...`)
}

const showUploadResourceModal = () => {
  console.log('Showing upload resource modal')
  alert('Upload resource functionality would be implemented here')
}

const getResourceIcon = (type) => {
  const icons = {
    lectures: 'fas fa-file-pdf',
    books: 'fas fa-book',
    papers: 'fas fa-file-alt'
  }
  return icons[type] || 'fas fa-file'
}

const getResourceAction = (type) => {
  return type === 'video' ? 'Watch' : 'Download'
}
</script>

<style scoped>
.content-header {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-header h1 {
  font-size: 2.25rem;
  font-weight: bold;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.75rem;
}

.content-header p {
  color: #6b7280;
  font-size: 1.125rem;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 20px;
  margin: 0 10px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  color: #111827;
}

.filter-tab:hover {
  background: rgba(17, 24, 39, 0.1);
}

.filter-tab.active {
  background: #111827;
  color: white;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.resource-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.resource-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.resource-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.resource-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.resource-icon i {
  color: white;
  font-size: 18px;
}

.resource-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.resource-meta {
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 15px;
}

.resource-meta span {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.resource-meta i {
  margin-right: 5px;
}

.resource-description {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
}

.resource-actions {
  display: flex;
  justify-content: space-between;
}

.btn {
  border-radius: 20px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn:hover {
  background-color: #374151;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: transparent;
  color: #111827;
}

.btn-secondary:hover {
  background-color: rgba(17, 24, 39, 0.1);
}

.create-session-btn {
  display: block;
  margin: 30px auto;
  padding: 12px 30px;
}

@media (max-width: 768px) {
  .resources-grid {
    grid-template-columns: 1fr;
  }

  .resource-actions {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>