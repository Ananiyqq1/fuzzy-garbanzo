<template>
  <div class="api-test" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
    <h1>🧪 Backend API Connection Test</h1>
    <p style="color: #666; margin-bottom: 2rem;">Testing all student page endpoints</p>

    <div class="test-section">
      <h2>1. Test Rooms Endpoint</h2>
      <button @click="testRooms" :disabled="loading.rooms">
        {{ loading.rooms ? 'Testing...' : 'Test /rooms' }}
      </button>
      <div v-if="results.rooms" class="result">
        <strong>Status:</strong> {{ results.rooms.status }}<br>
        <strong>Count:</strong> {{ results.rooms.count }}<br>
        <strong>Data:</strong> <pre>{{ JSON.stringify(results.rooms.data, null, 2) }}</pre>
      </div>
      <div v-if="errors.rooms" class="error">❌ {{ errors.rooms }}</div>
    </div>

    <div class="test-section">
      <h2>2. Test Room Suggestions</h2>
      <button @click="testRoomSuggestions" :disabled="loading.roomSuggestions">
        {{ loading.roomSuggestions ? 'Testing...' : 'Test /rooms/suggestions' }}
      </button>
      <div v-if="results.roomSuggestions" class="result">
        <strong>Status:</strong> {{ results.roomSuggestions.status }}<br>
        <strong>Count:</strong> {{ results.roomSuggestions.count }}<br>
        <strong>Data:</strong> <pre>{{ JSON.stringify(results.roomSuggestions.data, null, 2) }}</pre>
      </div>
      <div v-if="errors.roomSuggestions" class="error">❌ {{ errors.roomSuggestions }}</div>
    </div>

    <div class="test-section">
      <h2>3. Test Documents Endpoint</h2>
      <button @click="testDocuments" :disabled="loading.documents">
        {{ loading.documents ? 'Testing...' : 'Test /documents' }}
      </button>
      <div v-if="results.documents" class="result">
        <strong>Status:</strong> {{ results.documents.status }}<br>
        <strong>Count:</strong> {{ results.documents.count }}<br>
        <strong>Data:</strong> <pre>{{ JSON.stringify(results.documents.data, null, 2) }}</pre>
      </div>
      <div v-if="errors.documents" class="error">❌ {{ errors.documents }}</div>
    </div>

    <div class="test-section">
      <h2>4. Test Document Suggestions</h2>
      <button @click="testDocSuggestions" :disabled="loading.docSuggestions">
        {{ loading.docSuggestions ? 'Testing...' : 'Test /documents/suggestions' }}
      </button>
      <div v-if="results.docSuggestions" class="result">
        <strong>Status:</strong> {{ results.docSuggestions.status }}<br>
        <strong>Count:</strong> {{ results.docSuggestions.count }}<br>
        <strong>Data:</strong> <pre>{{ JSON.stringify(results.docSuggestions.data, null, 2) }}</pre>
      </div>
      <div v-if="errors.docSuggestions" class="error">❌ {{ errors.docSuggestions }}</div>
    </div>

    <div class="test-section">
      <button @click="testAll" style="background: #10b981; font-size: 1.1rem; padding: 1rem 2rem;">
        🚀 Test All Endpoints
      </button>
    </div>

    <div class="info-section">
      <h3>Configuration:</h3>
      <p><strong>API Base URL:</strong> {{ apiBaseUrl }}</p>
      <p><strong>Test User ID:</strong> {{ userId }}</p>
      <p><strong>Test Courses:</strong> {{ testCourses.join(', ') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@/common/axios';
import loadRooms from '../student/api/GetRooms';
import getRoomSuggestions from '../student/api/GetSuggestedRooms';
import loadDocuments from '../student/api/GetDocs';
import getDocSuggestions from '../student/api/GetSuggestedDocs';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'Not set';
const userId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
const testCourses = ['Object Oriented Programming', 'Artificial Intelligence'];

const loading = ref({
  rooms: false,
  roomSuggestions: false,
  documents: false,
  docSuggestions: false
});

const results = ref<any>({
  rooms: null,
  roomSuggestions: null,
  documents: null,
  docSuggestions: null
});

const errors = ref<any>({
  rooms: null,
  roomSuggestions: null,
  documents: null,
  docSuggestions: null
});

const testRooms = async () => {
  loading.value.rooms = true;
  errors.value.rooms = null;
  results.value.rooms = null;

  try {
    const response = await loadRooms(false, userId);
    results.value.rooms = {
      status: response.status,
      count: response.data?.length || 0,
      data: response.data?.slice(0, 2) // Show first 2 items
    };
    console.log('✅ Rooms test passed:', results.value.rooms);
  } catch (error: any) {
    errors.value.rooms = error.message || 'Failed to fetch rooms';
    console.error('❌ Rooms test failed:', error);
  } finally {
    loading.value.rooms = false;
  }
};

const testRoomSuggestions = async () => {
  loading.value.roomSuggestions = true;
  errors.value.roomSuggestions = null;
  results.value.roomSuggestions = null;

  try {
    const response = await getRoomSuggestions(userId, testCourses);
    results.value.roomSuggestions = {
      status: response.status,
      count: response.data?.length || 0,
      data: response.data?.slice(0, 2)
    };
    console.log('✅ Room suggestions test passed:', results.value.roomSuggestions);
  } catch (error: any) {
    errors.value.roomSuggestions = error.message || 'Failed to fetch room suggestions';
    console.error('❌ Room suggestions test failed:', error);
  } finally {
    loading.value.roomSuggestions = false;
  }
};

const testDocuments = async () => {
  loading.value.documents = true;
  errors.value.documents = null;
  results.value.documents = null;

  try {
    const response = await loadDocuments('-1'); // All documents
    results.value.documents = {
      status: response.status,
      count: response.data?.length || 0,
      data: response.data?.slice(0, 2)
    };
    console.log('✅ Documents test passed:', results.value.documents);
  } catch (error: any) {
    errors.value.documents = error.message || 'Failed to fetch documents';
    console.error('❌ Documents test failed:', error);
  } finally {
    loading.value.documents = false;
  }
};

const testDocSuggestions = async () => {
  loading.value.docSuggestions = true;
  errors.value.docSuggestions = null;
  results.value.docSuggestions = null;

  try {
    const response = await getDocSuggestions(testCourses);
    results.value.docSuggestions = {
      status: response.status,
      count: response.data?.length || 0,
      data: response.data?.slice(0, 2)
    };
    console.log('✅ Document suggestions test passed:', results.value.docSuggestions);
  } catch (error: any) {
    errors.value.docSuggestions = error.message || 'Failed to fetch document suggestions';
    console.error('❌ Document suggestions test failed:', error);
  } finally {
    loading.value.docSuggestions = false;
  }
};

const testAll = async () => {
  console.log('🚀 Running all API tests...');
  await testRooms();
  await testRoomSuggestions();
  await testDocuments();
  await testDocSuggestions();
  console.log('✅ All tests complete!');
};
</script>

<style scoped>
.api-test {
  font-family: system-ui, -apple-system, sans-serif;
}

.test-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.test-section h2 {
  margin-top: 0;
  color: #1f2937;
}

button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
}

button:hover:not(:disabled) {
  background: #2563eb;
  transform: translateY(-1px);
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 4px;
}

.result pre {
  margin: 0.5rem 0 0;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
  max-height: 300px;
  overflow-y: auto;
}

.error {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fca5a5;
  border-radius: 4px;
  color: #991b1b;
}

.info-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
}

.info-section h3 {
  margin-top: 0;
}

.info-section p {
  margin: 0.5rem 0;
}
</style>
