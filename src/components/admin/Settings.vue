<template>
  <div>
    <div class="content-header">
      <div>
        <h1>Platform Settings</h1>
        <p>Configure system settings and preferences</p>
      </div>
      <button class="admin-btn admin-btn-primary" @click="saveAllChanges">Save All Changes</button>
    </div>

    <div class="settings-tabs">
      <div class="settings-tab active" data-tab="general" @click="switchTab('general')">General</div>
      <div class="settings-tab" data-tab="notifications" @click="switchTab('notifications')">Notifications</div>
      <div class="settings-tab" data-tab="privacy" @click="switchTab('privacy')">Privacy & Security</div>
      <div class="settings-tab" data-tab="appearance" @click="switchTab('appearance')">Appearance</div>
      <div class="settings-tab" data-tab="integrations" @click="switchTab('integrations')">Integrations</div>
    </div>

    <!-- General Settings -->
    <div class="settings-panel active" id="general-panel">
      <div class="form-container">
        <h3>General Settings</h3>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Platform Name</label>
            <input type="text" class="form-input" v-model="settings.general.platformName" value="HiLCoE Peer">
          </div>
          <div class="form-group">
            <label class="form-label">Contact Email</label>
            <input type="email" class="form-input" v-model="settings.general.contactEmail" value="support@hilcoepeer.edu">
          </div>
          <div class="form-group">
            <label class="form-label">Default Language</label>
            <select class="form-select" v-model="settings.general.defaultLanguage">
              <option>English</option>
              <option>Amharic</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Time Zone</label>
            <select class="form-select" v-model="settings.general.timeZone">
              <option>Africa/Addis_Ababa (EAT)</option>
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Date Format</label>
            <select class="form-select" v-model="settings.general.dateFormat">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Max File Upload Size</label>
            <select class="form-select" v-model="settings.general.maxFileSize">
              <option>10MB</option>
              <option>25MB</option>
              <option>50MB</option>
              <option>100MB</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Platform Description</label>
            <textarea class="form-textarea" v-model="settings.general.platformDescription">HiLCoE Peer is a collaborative learning platform designed to enhance student engagement and learning outcomes through peer-to-peer interactions and resource sharing.</textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Settings -->
    <div class="settings-panel" id="notifications-panel">
      <div class="form-container">
        <h3>Notification Settings</h3>
        <div class="form-grid">
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Email Notifications</label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.email.courseAnnouncements"> Course announcements
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.email.assignmentDeadlines"> Assignment deadlines
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.email.newMessages"> New messages
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.email.forumReplies"> Forum replies
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.email.systemUpdates"> System updates
            </label>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Push Notifications</label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.push.sessionReminders"> Session reminders
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.push.newContent"> New content available
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.push.gradePublications"> Grade publications
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.notifications.push.weeklyDigest"> Weekly digest
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Privacy & Security Settings -->
    <div class="settings-panel" id="privacy-panel">
      <div class="form-container">
        <h3>Privacy & Security Settings</h3>
        <div class="form-grid">
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Data Privacy</label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.privacy.dataCollection"> Allow data collection for analytics
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.privacy.personalizedAds"> Allow personalized advertising
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.privacy.anonymizeData"> Anonymize user data in reports
            </label>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Security</label>
          </div>
          <div class="form-group">
            <label class="form-label">Session Timeout</label>
            <select class="form-select" v-model="settings.privacy.sessionTimeout">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option selected>1 hour</option>
              <option>2 hours</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Password Policy</label>
            <select class="form-select" v-model="settings.privacy.passwordPolicy">
              <option>Standard (8+ characters)</option>
              <option selected>Strong (12+ characters with complexity)</option>
              <option>Very Strong (16+ characters with complexity)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Two-Factor Authentication</label>
            <select class="form-select" v-model="settings.privacy.twoFactorAuth">
              <option>Optional</option>
              <option selected>Required for instructors</option>
              <option>Required for all users</option>
            </select>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Content Visibility</label>
          </div>
          <div class="form-group">
            <label class="form-label">Profile Visibility</label>
            <select class="form-select" v-model="settings.privacy.profileVisibility">
              <option>Public</option>
              <option selected>Logged-in users only</option>
              <option>Private</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Course Content Visibility</label>
            <select class="form-select" v-model="settings.privacy.courseContentVisibility">
              <option>Public</option>
              <option selected>Enrolled students only</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Appearance Settings -->
    <div class="settings-panel" id="appearance-panel">
      <div class="form-container">
        <h3>Appearance Settings</h3>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Theme</label>
            <select class="form-select" v-model="settings.appearance.theme">
              <option selected>Light</option>
              <option>Dark</option>
              <option>Auto (system preference)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Primary Color</label>
            <input type="color" class="form-input" v-model="settings.appearance.primaryColor" value="#111827" style="height: 42px;">
          </div>
          <div class="form-group">
            <label class="form-label">Font Family</label>
            <select class="form-select" v-model="settings.appearance.fontFamily">
              <option selected>System UI</option>
              <option>Roboto</option>
              <option>Open Sans</option>
              <option>Poppins</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Font Size</label>
            <select class="form-select" v-model="settings.appearance.fontSize">
              <option>Small</option>
              <option selected>Medium</option>
              <option>Large</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Navigation Layout</label>
            <select class="form-select" v-model="settings.appearance.navigationLayout">
              <option selected>Sidebar</option>
              <option>Top Navigation</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Card Style</label>
            <select class="form-select" v-model="settings.appearance.cardStyle">
              <option selected>Rounded</option>
              <option>Square</option>
              <option>Minimal</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label class="form-label">Custom CSS</label>
            <textarea class="form-textarea" v-model="settings.appearance.customCSS" placeholder="Enter custom CSS code"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Integrations Settings -->
    <div class="settings-panel" id="integrations-panel">
      <div class="form-container">
        <h3>Integration Settings</h3>
        <div class="form-grid">
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Learning Tools Interoperability (LTI)</label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.integrations.ltiEnabled"> Enable LTI integrations
            </label>
          </div>
          <div class="form-group">
            <label class="form-label">Consumer Key</label>
            <input type="text" class="form-input" v-model="settings.integrations.ltiConsumerKey" placeholder="Enter consumer key">
          </div>
          <div class="form-group">
            <label class="form-label">Shared Secret</label>
            <input type="password" class="form-input" v-model="settings.integrations.ltiSharedSecret" placeholder="Enter shared secret">
          </div>
          
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Google Workspace</label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.integrations.googleSignIn"> Enable Google sign-in
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.integrations.googleDrive"> Enable Google Drive integration
            </label>
          </div>
          <div class="form-group">
            <label class="form-label" style="font-weight: normal;">
              <input type="checkbox" v-model="settings.integrations.googleCalendar"> Enable Google Calendar sync
            </label>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label" style="font-weight: bold;">Video Conferencing</label>
          </div>
          <div class="form-group">
            <label class="form-label">Default Video Platform</label>
            <select class="form-select" v-model="settings.integrations.defaultVideoPlatform">
              <option selected>Integrated Video</option>
              <option>Zoom</option>
              <option>Microsoft Teams</option>
              <option>Google Meet</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Zoom API Key</label>
            <input type="text" class="form-input" v-model="settings.integrations.zoomApiKey" placeholder="Enter Zoom API key">
          </div>
          <div class="form-group">
            <label class="form-label">Zoom Secret</label>
            <input type="password" class="form-input" v-model="settings.integrations.zoomSecret" placeholder="Enter Zoom secret">
          </div>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="form-container">
      <h3>Danger Zone</h3>
      <div class="form-grid">
        <div class="form-group full-width">
          <p style="color: #6b7280; margin-bottom: 1rem;">These actions are irreversible. Please be cautious.</p>
        </div>
        <div class="form-group">
          <button class="admin-btn" style="background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;" @click="clearAllData">
            <i class="fas fa-trash"></i> Clear All Data
          </button>
        </div>
        <div class="form-group">
          <button class="admin-btn" style="background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;" @click="deactivatePlatform">
            <i class="fas fa-ban"></i> Deactivate Platform
          </button>
        </div>
        <div class="form-group">
          <button class="admin-btn" style="background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;" @click="deleteAccount">
            <i class="fas fa-trash-alt"></i> Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeTab = ref('general')

const settings = reactive({
  general: {
    platformName: 'HiLCoE Peer',
    contactEmail: 'support@hilcoepeer.edu',
    defaultLanguage: 'English',
    timeZone: 'Africa/Addis_Ababa (EAT)',
    dateFormat: 'MM/DD/YYYY',
    maxFileSize: '10MB',
    platformDescription: 'HiLCoE Peer is a collaborative learning platform designed to enhance student engagement and learning outcomes through peer-to-peer interactions and resource sharing.'
  },
  notifications: {
    email: {
      courseAnnouncements: true,
      assignmentDeadlines: true,
      newMessages: true,
      forumReplies: false,
      systemUpdates: true
    },
    push: {
      sessionReminders: true,
      newContent: false,
      gradePublications: true,
      weeklyDigest: false
    }
  },
  privacy: {
    dataCollection: true,
    personalizedAds: false,
    anonymizeData: true,
    sessionTimeout: '1 hour',
    passwordPolicy: 'Strong (12+ characters with complexity)',
    twoFactorAuth: 'Required for instructors',
    profileVisibility: 'Logged-in users only',
    courseContentVisibility: 'Enrolled students only'
  },
  appearance: {
    theme: 'Light',
    primaryColor: '#111827',
    fontFamily: 'System UI',
    fontSize: 'Medium',
    navigationLayout: 'Sidebar',
    cardStyle: 'Rounded',
    customCSS: ''
  },
  integrations: {
    ltiEnabled: true,
    ltiConsumerKey: '',
    ltiSharedSecret: '',
    googleSignIn: false,
    googleDrive: false,
    googleCalendar: false,
    defaultVideoPlatform: 'Integrated Video',
    zoomApiKey: '',
    zoomSecret: ''
  }
})

const switchTab = (tabName) => {
  activeTab.value = tabName
  // Update active tab and show corresponding panel
  document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'))
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active')
  
  document.querySelectorAll('.settings-panel').forEach(panel => panel.classList.remove('active'))
  document.getElementById(`${tabName}-panel`).classList.add('active')
}

const saveAllChanges = () => {
  console.log('Saving all settings changes:', settings)
  alert('Settings saved successfully!')
}

const clearAllData = () => {
  if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
    console.log('Clearing all data...')
    alert('All data cleared!')
  }
}

const deactivatePlatform = () => {
  if (confirm('Are you sure you want to deactivate the platform? This will make it unavailable to all users.')) {
    console.log('Deactivating platform...')
    alert('Platform deactivated!')
  }
}

const deleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    console.log('Deleting account...')
    alert('Account deleted!')
  }
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

.settings-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.settings-tab {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  font-weight: 500;
  color: #6b7280;
}

.settings-tab.active {
  color: #111827;
  border-bottom-color: #111827;
}

.settings-tab:hover {
  color: #111827;
}

.settings-panel {
  display: none;
}

.settings-panel.active {
  display: block;
}

.form-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #111827;
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.admin-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.admin-btn-primary {
  background: #111827;
  color: white;
}

.admin-btn-primary:hover {
  background: #374151;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.full-width {
    grid-column: span 1;
  }
  
  .settings-tabs {
    flex-direction: column;
  }
  
  .settings-tab {
    border: none;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .settings-tab.active {
    border-bottom: 2px solid #111827;
  }
}
</style>