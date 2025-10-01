<template>
  <div class="settings-page">
    <AppContentHeader
      title="Platform Settings"
      subtitle="Configure system settings and preferences"
    >
      <template #actions>
        <AppButton icon="fas fa-save" @click="saveSettings">Save Changes</AppButton>
      </template>
    </AppContentHeader>

    <AppTabs v-model="activeTab" :tabs="tabItems">
      <AppTabPanel value="general">
        <AppFormSection title="General Settings">
          <div class="form-grid">
            <AppInput
              v-model="general.platformName"
              label="Platform Name"
              placeholder="Enter platform name"
            />
            <AppInput
              v-model="general.contactEmail"
              type="email"
              label="Contact Email"
              placeholder="contact@example.com"
            />
            <AppSelect v-model="general.language" label="Default Language">
              <option value="English">English</option>
              <option value="Amharic">Amharic</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </AppSelect>
            <AppSelect v-model="general.timezone" label="Time Zone">
              <option value="Africa/Addis_Ababa (EAT)">Africa/Addis_Ababa (EAT)</option>
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </AppSelect>
            <AppSelect v-model="general.dateFormat" label="Date Format">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </AppSelect>
            <AppSelect v-model="general.uploadSize" label="Max File Upload Size">
              <option value="10MB">10MB</option>
              <option value="25MB">25MB</option>
              <option value="50MB">50MB</option>
              <option value="100MB">100MB</option>
            </AppSelect>
            <AppTextarea
              v-model="general.description"
              label="Platform Description"
              placeholder="Describe the platform"
              :rows="4"
              class="full-width"
            />
          </div>
        </AppFormSection>
      </AppTabPanel>

      <AppTabPanel value="notifications">
        <AppFormSection title="Notification Settings">
          <div class="notification-groups">
            <div>
              <p class="section-label">Email Notifications</p>
              <div
                v-for="item in notifications.email"
                :key="item.key"
                class="checkbox-group"
              >
                <label>
                  <input type="checkbox" v-model="item.enabled" />
                  {{ item.label }}
                </label>
              </div>
            </div>
            <div>
              <p class="section-label">Push Notifications</p>
              <div
                v-for="item in notifications.push"
                :key="item.key"
                class="checkbox-group"
              >
                <label>
                  <input type="checkbox" v-model="item.enabled" />
                  {{ item.label }}
                </label>
              </div>
            </div>
          </div>
        </AppFormSection>
      </AppTabPanel>

      <AppTabPanel value="privacy">
        <div class="privacy-grid">
          <AppFormSection title="Data Privacy">
            <div class="checkbox-stack">
              <div
                v-for="item in privacy.data"
                :key="item.key"
                class="checkbox-group"
              >
                <label>
                  <input type="checkbox" v-model="item.enabled" />
                  {{ item.label }}
                </label>
              </div>
            </div>
          </AppFormSection>
          <AppFormSection title="Security">
            <div class="form-grid">
              <AppSelect v-model="privacy.security.sessionTimeout" label="Session Timeout">
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
              </AppSelect>
              <AppSelect v-model="privacy.security.passwordPolicy" label="Password Policy">
                <option value="Standard (8+ characters)">Standard (8+ characters)</option>
                <option value="Strong (12+ characters with complexity)">Strong (12+ characters with complexity)</option>
                <option value="Very Strong (16+ characters with complexity)">Very Strong (16+ characters with complexity)</option>
              </AppSelect>
              <AppSelect v-model="privacy.security.twoFactor" label="Two-Factor Authentication">
                <option value="Optional">Optional</option>
                <option value="Required">Required</option>
                <option value="Disabled">Disabled</option>
              </AppSelect>
            </div>
          </AppFormSection>
        </div>
      </AppTabPanel>

      <AppTabPanel value="appearance">
        <AppFormSection title="Appearance Settings">
          <div class="form-grid">
            <AppSelect v-model="appearance.theme" label="Theme">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="System">System</option>
            </AppSelect>
            <div class="color-picker full-width">
              <label class="section-label">Primary Accent Color</label>
              <input v-model="appearance.accentColor" type="color" class="color-input" />
            </div>
          </div>
        </AppFormSection>
      </AppTabPanel>

      <AppTabPanel value="integrations">
        <AppFormSection title="Integrations">
          <div class="integration-list">
            <div
              v-for="integration in integrations"
              :key="integration.name"
              class="integration-item"
            >
              <div>
                <div class="integration-name">{{ integration.name }}</div>
                <div class="integration-description">{{ integration.description }}</div>
              </div>
              <AppButton
                variant="secondary"
                :icon="integration.connected ? 'fas fa-unlink' : 'fas fa-link'"
                @click="toggleIntegration(integration)"
              >
                {{ integration.connected ? 'Disconnect' : 'Connect' }}
              </AppButton>
            </div>
          </div>
        </AppFormSection>
      </AppTabPanel>
    </AppTabs>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import AppButton from '../common/AppButton.vue';
import AppContentHeader from '../common/AppContentHeader.vue';
import AppFormSection from '../common/AppFormSection.vue';
import AppInput from '../common/AppInput.vue';
import AppSelect from '../common/AppSelect.vue';
import AppTabs from '../common/AppTabs.vue';
import AppTabPanel from '../common/AppTabPanel.vue';
import AppTextarea from '../common/AppTextarea.vue';

const tabItems = [
  { value: 'general', label: 'General' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'privacy', label: 'Privacy & Security' },
  { value: 'appearance', label: 'Appearance' },
  { value: 'integrations', label: 'Integrations' }
];

const activeTab = ref('general');

const general = reactive({
  platformName: 'HiLCoE Peer',
  contactEmail: 'support@hilcoepeer.edu',
  language: 'English',
  timezone: 'Africa/Addis_Ababa (EAT)',
  dateFormat: 'MM/DD/YYYY',
  uploadSize: '25MB',
  description:
    'HiLCoE Peer is a collaborative learning platform designed to enhance student engagement and learning outcomes through peer-to-peer interactions and resource sharing.'
});

const notifications = reactive({
  email: [
    { key: 'courseAnnouncements', label: 'Course announcements', enabled: true },
    { key: 'assignmentDeadlines', label: 'Assignment deadlines', enabled: true },
    { key: 'newMessages', label: 'New messages', enabled: true },
    { key: 'forumReplies', label: 'Forum replies', enabled: false },
    { key: 'systemUpdates', label: 'System updates', enabled: true }
  ],
  push: [
    { key: 'sessionReminders', label: 'Session reminders', enabled: true },
    { key: 'newContent', label: 'New content available', enabled: false },
    { key: 'gradePublications', label: 'Grade publications', enabled: true },
    { key: 'weeklyDigest', label: 'Weekly digest', enabled: false }
  ]
});

const privacy = reactive({
  data: [
    { key: 'analyticsCollection', label: 'Allow data collection for analytics', enabled: true },
    { key: 'personalizedAds', label: 'Allow personalized advertising', enabled: false },
    { key: 'anonymizeData', label: 'Anonymize user data in reports', enabled: true }
  ],
  security: {
    sessionTimeout: '1 hour',
    passwordPolicy: 'Strong (12+ characters with complexity)',
    twoFactor: 'Optional'
  }
});

const appearance = reactive({
  theme: 'Light',
  accentColor: '#111827'
});

const integrations = reactive([
  { name: 'Google Classroom', description: 'Sync classes, assignments, and announcements.', connected: true },
  { name: 'Microsoft Teams', description: 'Enable virtual meetings and collaboration.', connected: false },
  { name: 'Slack', description: 'Send real-time notifications to team channels.', connected: false }
]);

function saveSettings() {
  console.log('Saving settings', {
    general,
    notifications,
    privacy,
    appearance,
    integrations
  });
}

function toggleIntegration(integration) {
  integration.connected = !integration.connected;
}
</script>

<style scoped>
.settings-page {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.full-width {
  grid-column: 1 / -1;
}

.notification-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.section-label {
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(229, 231, 235, 0.6);
  background: rgba(243, 244, 246, 0.7);
}

.checkbox-group label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
  font-size: 0.95rem;
}

.privacy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.checkbox-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.color-picker {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.color-input {
  width: 60px;
  height: 40px;
  border-radius: 0.75rem;
  border: 1px solid rgba(229, 231, 235, 0.8);
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.7);
}

.integration-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.integration-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 1.25rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(229, 231, 235, 0.6);
  background: rgba(243, 244, 246, 0.65);
}

.integration-name {
  font-weight: 600;
  color: #111827;
}

.integration-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .settings-page {
    padding: 1.5rem;
  }
}
</style>