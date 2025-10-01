<template>
  <div class="user-management">
    <AppContentHeader
      title="User Management"
      subtitle="Manage user accounts, roles, and permissions"
    >
      <template #actions>
        <AppButton icon="fas fa-plus" @click="openUserModal">Add New User</AppButton>
      </template>
    </AppContentHeader>

    <AppFilterBar>
      <AppSelect v-model="filters.role" label="Role">
        <option value="all">All Roles</option>
        <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
      </AppSelect>
      <AppSelect v-model="filters.status" label="Status">
        <option value="all">All Status</option>
        <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
      </AppSelect>
      <AppInput
        v-model="filters.search"
        placeholder="Search users..."
        left-icon="fas fa-search"
      />
      <template #actions>
        <AppButton
          variant="secondary"
          icon="fas fa-download"
          @click="exportUsers"
        >
          Export
        </AppButton>
      </template>
    </AppFilterBar>

    <AppFormSection title="Create New User">
      <div class="form-grid">
        <AppInput
          v-model="newUser.firstName"
          label="First Name"
          placeholder="Enter first name"
        />
        <AppInput
          v-model="newUser.lastName"
          label="Last Name"
          placeholder="Enter last name"
        />
        <AppInput
          v-model="newUser.email"
          type="email"
          label="Email Address"
          placeholder="Enter email address"
        />
        <AppSelect v-model="newUser.role" label="Role">
          <option value="">Select role</option>
          <option v-for="role in roleOptions" :key="`role-${role}`" :value="role">{{ role }}</option>
        </AppSelect>
        <AppInput
          v-model="newUser.password"
          type="password"
          label="Password"
          placeholder="Enter password"
        />
        <AppInput
          v-model="newUser.confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
        />
      </div>
      <template #footer>
        <AppButton icon="fas fa-user-plus" @click="createUser">Create User</AppButton>
      </template>
    </AppFormSection>

    <AppDataTable
      :columns="columns"
      :rows="filteredUsers"
      row-key="email"
    >
      <template #cell-status="{ row }">
        <AppStatusBadge :variant="statusVariants[row.status]">
          {{ row.statusLabel }}
        </AppStatusBadge>
      </template>
      <template #cell-actions="{ row }">
        <div class="table-actions">
          <button class="icon-button edit" @click="editUser(row)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="icon-button delete" @click="removeUser(row)">
            <i class="fas fa-trash"></i>
          </button>
          <button class="icon-button view" @click="viewUser(row)">
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

const roleOptions = ['Student', 'Instructor', 'Administrator'];
const statusOptions = ['Active', 'Inactive', 'Suspended'];

const state = reactive({
  users: [
    { name: 'Abebe Kebede', email: 'abebe.kebede@example.com', role: 'Instructor', joined: 'Jan 15, 2023', lastActive: 'Today', status: 'Active', statusLabel: 'Active' },
    { name: 'Selamawit Tadesse', email: 'selamawit.t@example.com', role: 'Instructor', joined: 'Mar 10, 2023', lastActive: 'Yesterday', status: 'Active', statusLabel: 'Active' },
    { name: 'Michael Berhanu', email: 'michael.b@example.com', role: 'Student', joined: 'Feb 5, 2023', lastActive: '2 days ago', status: 'Active', statusLabel: 'Active' },
    { name: 'Hanna Girma', email: 'hanna.girma@example.com', role: 'Administrator', joined: 'Dec 20, 2022', lastActive: 'Today', status: 'Active', statusLabel: 'Active' },
    { name: 'Yordanos Lemma', email: 'yordanos.l@example.com', role: 'Student', joined: 'Apr 18, 2023', lastActive: '1 week ago', status: 'Inactive', statusLabel: 'Inactive' }
  ],
  filters: {
    role: 'all',
    status: 'all',
    search: ''
  },
  newUser: {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  }
});

const filters = state.filters;
const newUser = state.newUser;

const columns = [
  { key: 'name', label: 'Name', minWidth: '200px' },
  { key: 'email', label: 'Email', minWidth: '220px' },
  { key: 'role', label: 'Role', width: '140px' },
  { key: 'joined', label: 'Joined', width: '140px' },
  { key: 'lastActive', label: 'Last Active', width: '160px' },
  { key: 'status', label: 'Status', width: '140px', align: 'center' },
  { key: 'actions', label: 'Actions', width: '140px', align: 'center' },
];

const statusVariants = {
  Active: 'success',
  Inactive: 'danger',
  Suspended: 'info',
};

const filteredUsers = computed(() => {
  return state.users
    .map(user => ({
      ...user,
      actions: 'actions',
    }))
    .filter(user => {
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesStatus = filters.status === 'all' || user.statusLabel === filters.status;
      const query = filters.search.trim().toLowerCase();
      const matchesSearch = !query || `${user.name} ${user.email}`.toLowerCase().includes(query);
      return matchesRole && matchesStatus && matchesSearch;
    });
});

function openUserModal() {
  console.log('Open user creation modal');
}

function createUser() {
  console.log('Create user clicked', { ...newUser });
}

function editUser(user) {
  console.log('Edit user', user);
}

function removeUser(user) {
  console.log('Remove user', user);
}

function viewUser(user) {
  console.log('View user', user);
}

function exportUsers() {
  console.log('Export users');
}
</script>

<style scoped>
.user-management {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
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
  .user-management {
    padding: 1.5rem;
  }
}
</style>