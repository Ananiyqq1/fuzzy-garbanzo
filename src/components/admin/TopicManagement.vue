<template>
  <div>
    <h2>Topic Management</h2>
    <div class="row">
      <AppInput v-model="q" placeholder="Search topics..." />
      <AppButton @click="load">Manage Content</AppButton>
      <AppButton variant="secondary" @click="openCreate">Add New</AppButton>
    </div>

    <ul class="list">
      <li v-for="t in filtered" :key="t.id" class="item">
        <div>
          <strong>{{ t.title }}</strong>
          <div class="muted">{{ t.courseCode }} • {{ t.type }}</div>
        </div>
        <div class="row">
          <AppButton variant="secondary" @click="edit(t)">Edit</AppButton>
          <AppButton variant="secondary" @click="remove(t)">Delete</AppButton>
        </div>
      </li>
    </ul>

    <AppModal v-if="ui.modals.topicEditor" :title="editing.id ? 'Edit Topic' : 'Add Topic'" @close="ui.closeModal('topicEditor')">
      <form @submit.prevent="save">
        <AppInput v-model="editing.title" label="Title" />
        <AppInput v-model="editing.courseCode" label="Course Code" />
        <AppInput v-model="editing.type" label="Type (Lecture Notes, Video, etc.)" />
        <label class="app-input">
          <span>Description</span>
          <textarea v-model="editing.description" rows="4"></textarea>
        </label>
        <div class="row end">
          <AppButton variant="secondary" type="button" @click="ui.closeModal('topicEditor')">Cancel</AppButton>
          <AppButton type="submit">Save</AppButton>
        </div>
      </form>
    </AppModal>

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAdminStore } from '../../stores/useAdminStore';
import { useUIStore } from '../../stores/useUIStore';
import AppButton from '../common/AppButton.vue';
import AppInput from '../common/AppInput.vue';
import AppModal from '../common/AppModal.vue';
import AppLoading from '../common/AppLoading.vue';

const admin = useAdminStore();
const ui = useUIStore();

const q = ref('');
const editing = ref({ id: null, title: '', courseCode: '', type: '', description: '' });

const filtered = computed(() =>
  admin.topics.filter(t => [t.title, t.courseCode, t.type].join(' ').toLowerCase().includes(q.value.toLowerCase()))
);

function load() {
  admin.loadTopics();
}
function openCreate() {
  editing.value = { id: null, title: '', courseCode: '', type: '', description: '' };
  ui.openModal('topicEditor', true);
}
function edit(t) {
  editing.value = { ...t };
  ui.openModal('topicEditor', true);
}
async function save() {
  if (editing.value.id) await admin.updateTopic(editing.value);
  else await admin.createTopic(editing.value);
  ui.closeModal('topicEditor');
}
async function remove(t) {
  if (confirm(`Delete topic ${t.title}?`)) {
    await admin.deleteTopic(t.id);
  }
}
</script>

<style scoped>
.row { display: flex; gap: 8px; align-items: center; }
.list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
.item { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #eee; border-radius: 8px; }
.muted { color: #6b7280; font-size: 13px; }
.row.end { justify-content: flex-end; }
textarea { width: 100%; padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; }
</style>