<template>
  <div>
    <h2>Platform Settings</h2>
    <div class="grid">
      <AppCard title="General">
        <AppInput v-model="settings.appName" label="App Name" />
        <AppInput v-model="settings.supportEmail" label="Support Email" />
      </AppCard>

      <AppCard title="Permissions">
        <label class="row">
          <input type="checkbox" v-model="settings.allowStudentCreateSessions" />
          <span>Allow students to create sessions</span>
        </label>
        <label class="row">
          <input type="checkbox" v-model="settings.requireOtpForPreferences" />
          <span>Require OTP after setting preferences</span>
        </label>
      </AppCard>

      <AppCard title="Security">
        <AppInput v-model="settings.passwordMinLength" label="Password Min Length" />
      </AppCard>
    </div>

    <div class="row end">
      <AppButton variant="secondary" @click="reset">Reset</AppButton>
      <AppButton @click="save">Save</AppButton>
    </div>

    <AppLoading v-if="ui.loading" />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAdminStore } from '../../stores/useAdminStore';
import { useUIStore } from '../../stores/useUIStore';
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';
import AppInput from '../common/AppInput.vue';
import AppLoading from '../common/AppLoading.vue';

const admin = useAdminStore();
const ui = useUIStore();

const settings = reactive({
  appName: 'HiLCoE Peer',
  supportEmail: 'support@hilcoe.edu',
  allowStudentCreateSessions: true,
  requireOtpForPreferences: true,
  passwordMinLength: 8,
});

function save() {
  admin.saveSettings({ ...settings });
}
function reset() {
  admin.resetSettings();
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.row { display: flex; align-items: center; gap: 8px; }
.row.end { justify-content: flex-end; }
</style>