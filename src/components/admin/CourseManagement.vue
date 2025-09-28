<template>
  <div>
    <h2>Course Management</h2>
    <div class="row">
      <AppInput v-model="filters.q" placeholder="Search courses..." />
      <AppButton @click="load">View Courses</AppButton>
      <AppButton variant="secondary" @click="openCreate">Create New</AppButton>
    </div>

    <div class="grid">
      <AppCard v-for="c in filtered" :key="c.id" :title="c.title" :subtitle="c.code">
        <div class="muted">{{ c.category }}</div>
        <div class="row">
          <AppButton variant="secondary" @click="edit(c)">Edit</AppButton>
          <AppButton variant="secondary" @click="remove(c)">Delete</AppButton>
        </div>
      </AppCard>
    </div>

    <AppModal v-if="ui.modals.editCourse" :title="editing.id ? 'Edit Course' : 'Create Course'" @close="ui.closeModal('editCourse')">
      <form @submit.prevent="save">
        <AppInput v-model="editing.title" label="Title" />
        <AppInput v-model="editing.code" label="Code" />
        <AppInput v-model="editing.category" label="Category" />
        <label class="app-input">
          <span>Description</span>
          <textarea v-model="editing.description" rows="4"></textarea>
        </label>
        <div class="row end">
          <AppButton variant="secondary" type="button" @click="ui.closeModal('editCourse')">Cancel</AppButton>
          <AppButton type="submit">Save</AppButton>
        </div>
      </form>
    </AppModal>

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useAdminStore } from '../../stores/useAdminStore';
import { useUIStore } from '../../stores/useUIStore';
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
import AppInput from '../common/AppInput.vue';
import AppModal from '../common/AppModal.vue';
import AppLoading from '../common/AppLoading.vue';

const admin = useAdminStore();
const ui = useUIStore();

const filters = reactive({ q: '' });
const editing = reactive({ id: null, title: '', code: '', category: '', description: '' });

const filtered = computed(() =>
  admin.courses.filter(c => [c.title, c.code, c.category].join(' ').toLowerCase().includes(filters.q.toLowerCase()))
);

function load() {
  admin.loadCourses();
}
function openCreate() {
  Object.assign(editing, { id: null, title: '', code: '', category: '', description: '' });
  ui.openModal('editCourse', true);
}
function edit(c) {
  Object.assign(editing, c);
  ui.openModal('editCourse', true);
}
async function save() {
  if (editing.id) {
    await admin.updateCourse(editing);
  } else {
    await admin.createCourse(editing);
  }
  ui.closeModal('editCourse');
}
async function remove(c) {
  if (confirm(`Delete course ${c.title}?`)) {
    await admin.deleteCourse(c.id);
  }
}
</script>

<style scoped>
.row { display: flex; gap: 8px; align-items: center; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 12px; }
.muted { color: #6b7280; font-size: 13px; margin: 6px 0; }
.row.end { justify-content: flex-end; }
textarea { width: 100%; padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; }
</style>