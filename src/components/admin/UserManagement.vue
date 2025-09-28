<template>
  <div>
    <h2>User Management</h2>

    <div class="row">
      <AppInput v-model="q" placeholder="Search users by name or email..." />
      <select v-model="role" class="select">
        <option value="">All Roles</option>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <AppButton @click="load">View Users</AppButton>
      <AppButton variant="secondary" @click="openCreate">Add New</AppButton>
    </div>

    <div class="table">
      <div class="th row">
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>Actions</div>
      </div>
      <div v-for="u in filtered" :key="u.id" class="tr row">
        <div>{{ u.name }}</div>
        <div>{{ u.email }}</div>
        <div>{{ u.role }}</div>
        <div class="row">
          <AppButton variant="secondary" @click="edit(u)">Edit</AppButton>
          <AppButton variant="secondary" @click="remove(u)">Delete</AppButton>
        </div>
      </div>
    </div>

    <AppModal v-if="ui.modals.userEditor" :title="editing.id ? 'Edit User' : 'Add User'" @close="ui.closeModal('userEditor')">
      <form @submit.prevent="save">
        <AppInput v-model="editing.name" label="Full Name" />
        <AppInput v-model="editing.email" label="Email" />
        <label class="app-input">
          <span>Role</span>
          <select v-model="editing.role" class="select">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <div class="row end">
          <AppButton variant="secondary" type="button" @click="ui.closeModal('userEditor')">Cancel</AppButton>
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
const role = ref('');
const editing = ref({ id: null, name: '', email: '', role: 'student' });

const filtered = computed(() =>
  admin.users
    .filter(u => (role.value ? u.role === role.value : true))
    .filter(u => [u.name, u.email].join(' ').toLowerCase().includes(q.value.toLowerCase()))
);

function load() {
  admin.loadUsers();
}
function openCreate() {
  editing.value = { id: null, name: '', email: '', role: 'student' };
  ui.openModal('userEditor', true);
}
function edit(u) {
  editing.value = { ...u };
  ui.openModal('userEditor', true);
}
async function save() {
  if (editing.value.id) await admin.updateUser(editing.value);
  else await admin.createUser(editing.value);
  ui.closeModal('userEditor');
}
async function remove(u) {
  if (confirm(`Delete user ${u.name}?`)) {
    await admin.deleteUser(u.id);
  }
}
</script>

<style scoped>
.row { display: grid; grid-template-columns: 2fr 2fr 1fr 1.5fr; gap: 8px; align-items: center; }
.table { margin-top: 12px; border: 1px solid #eee; border-radius: 8px; }
.th { background: #f9fafb; font-weight: 600; padding: 8px; border-bottom: 1px solid #eee; }
.tr { padding: 8px; border-bottom: 1px solid #f3f4f6; }
.select { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; background: white; }
.row.end { display: flex; justify-content: flex-end; gap: 8px; }
</style>