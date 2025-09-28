<template>
  <div class="study-rooms">
    <h1>Study Groups</h1>
    <p>Connect with peers, join existing study groups, or create your own for collaborative learning.</p>

    <div class="filter-controls">
      <AppInput v-model="filters.q" placeholder="Search study groups..." />
      <AppButton @click="loadStudyGroups">Refresh Groups</AppButton>
      <AppButton variant="secondary" @click="openCreateStudyGroup">Create New Group</AppButton>
    </div>

    <section class="group-list">
      <AppCard v-for="g in filteredStudyGroups" :key="g.id" :title="g.name" :subtitle="`${g.members} members`">
        <div class="muted">Topic: {{ g.topic || 'General Study' }}</div>
        <div class="row actions mt-8">
          <AppButton variant="secondary" @click="openChat(g)">Open Chat</AppButton>
          <AppButton v-if="!g.isJoined" @click="joinStudyGroup(g)">Join Group</AppButton>
          <AppButton v-else variant="tertiary">Joined</AppButton>
        </div>
      </AppCard>
      <p v-if="!filteredStudyGroups.length">No study groups found matching your criteria.</p>
    </section>

    <!-- Modals -->
    <StudyRoomChatModal
      v-if="ui.modals.studyRoomChat"
      :room="ui.modals.studyRoomChat"
      @close="ui.closeModal('studyRoomChat')"
    />

    <AppModal v-if="ui.modals.createStudyGroup" title="Create New Study Group" @close="ui.closeModal('createStudyGroup')">
      <form class="form" @submit.prevent="createStudyGroup">
        <AppInput v-model="newStudyGroup.name" label="Group Name" required />
        <AppInput v-model="newStudyGroup.topic" label="Study Topic" />
        <label class="app-input">
          <span>Description</span>
          <textarea v-model="newStudyGroup.description" rows="4"></textarea>
        </label>
        <div class="row end">
          <AppButton variant="secondary" type="button" @click="ui.closeModal('createStudyGroup')">Cancel</AppButton>
          <AppButton type="submit">Create Group</AppButton>
        </div>
      </form>
    </AppModal>

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from 'vue';
import { useStudentStore } from '../../stores/useStudentStore';
import { useUIStore } from '../../stores/useUIStore';
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
import AppInput from '../common/AppInput.vue';
import AppModal from '../common/AppModal.vue';
import AppLoading from '../common/AppLoading.vue';

// import StudyRoomChatModal from './modals/StudyRoomChatModal.vue';

const student = useStudentStore();
const ui = useUIStore();

const filters = reactive({
  q: '',
});

const newStudyGroup = reactive({
  name: '',
  topic: '',
  description: '',
});




const filteredStudyGroups = computed(() => {
  let groups = student.allStudyGroups;
  if (filters.q) {
    groups = groups.filter(g => g.name.toLowerCase().includes(filters.q.toLowerCase()) || (g.topic && g.topic.toLowerCase().includes(filters.q.toLowerCase())));
  }
  return groups;
});

onMounted(() => {
  loadStudyGroups();
});

function loadStudyGroups() {
  student.loadAllStudyGroups();
}

function openChat(group) {
  ui.openModal('studyRoomChat', {
    id: group.id,
    name: group.name,
    participants: group.participants || ['John Doe', 'You', 'Sarah Smith', 'Alex'],
    messages: [
      { author: 'John Doe', text: 'Hey everyone! What topic should we focus on today?', time: '10:05 AM' },
      { author: 'You', text: `Let's discuss ${group.topic || 'our current assignment'}.`, time: '10:06 AM' },
      { author: 'Sarah Smith', text: 'Sounds good!', time: '10:07 AM' },
    ],
  });
}

function openCreateStudyGroup() {
  Object.assign(newStudyGroup, { name: '', topic: '', description: '' });
  ui.openModal('createStudyGroup', true);
}

async function createStudyGroup() {
  await student.createStudyGroup({ ...newStudyGroup, members: 1, isJoined: true });
  
  ui.closeModal('createStudyGroup');
  ui.notify('Study group created successfully!', 'success');
}

async function joinStudyGroup(group) {
  await student.joinStudyGroup(group.id);
  ui.notify(`Joined "${group.name}"!`, 'success');
}
</script>

<style scoped>
.study-rooms { display: flex; flex-direction: column; gap: 16px; }
.filter-controls { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.group-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.row { display: flex; align-items: center; }
.actions { gap: 8px; }
.mt-8 { margin-top: 8px; }
.muted { color: #6b7280; font-size: 13px; }
.form textarea { padding: 10px 12px; border: 1px solid #ccc; border-radius: 8px; }
.row.end { justify-content: flex-end; gap: 8px; }
</style>