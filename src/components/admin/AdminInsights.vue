<template>
  <div class="insights-wrapper">
    <AppContentHeader
      title="Weekly Academic Insights"
      subtitle="Aggregate discussion logs and generate executive summaries"
    />

    <div class="insights-grid">
      <AppCard class="controls-card" variant="elevated">
        <h2>Actions</h2>
        <p class="helper-text">
          Retrieve weekly logs then send them to the Gemini service for an academic summary.
        </p>
        <div class="actions">
          <AppButton :disabled="isLoadingLogs" @click="handleFetchLogs">
            <span v-if="isLoadingLogs">Fetching Logs...</span>
            <span v-else>Fetch Weekly Logs</span>
          </AppButton>
          <AppButton
            :disabled="!logsContent || isGeneratingSummary"
            variant="secondary"
            @click="handleGenerateSummary"
          >
            <span v-if="isGeneratingSummary">Generating Summary...</span>
            <span v-else>Generate Summary</span>
          </AppButton>
          <AppButton
            variant="ghost"
            :disabled="!summaryHtml"
            @click="copySummary"
          >
            Copy Summary
          </AppButton>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </AppCard>

      <AppCard class="logs-card" variant="elevated">
        <div class="card-header">
          <h3>Raw Logs</h3>
          <AppButton size="small" variant="ghost" :disabled="!logsContent" @click="clearLogs">
            Clear
          </AppButton>
        </div>
        <textarea
          v-model="logsContent"
          class="logs-textarea"
          placeholder="Logs will appear here after fetching..."
          readonly
        />
      </AppCard>

      <AppCard class="summary-card" variant="elevated">
        <div class="card-header">
          <h3>Executive Summary</h3>
          <AppButton size="small" variant="ghost" :disabled="!summaryHtml" @click="clearSummary">
            Clear
          </AppButton>
        </div>
        <div class="summary-output" v-html="summaryHtml || placeholderHtml" />
      </AppCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppContentHeader from '@/components/common/AppContentHeader.vue'
import { fetchWeeklyLogs, generateWeeklySummary } from '@/services/adminInsights'
import { useClipboard } from '@vueuse/core'

const logsContent = ref('')
const summaryMarkdown = ref('')
const isLoadingLogs = ref(false)
const isGeneratingSummary = ref(false)
const errorMessage = ref('')
const { copy: copyToClipboard } = useClipboard()

const placeholderHtml = `
  <p class="placeholder">Waiting for summary...</p>
`

const summaryHtml = computed(() => {
  if (!summaryMarkdown.value) return ''
  const renderer = document.createElement('div')
  renderer.innerHTML = summaryMarkdown.value
  return renderer.innerHTML
})

const handleFetchLogs = async () => {
  errorMessage.value = ''
  isLoadingLogs.value = true
  try {
    const { logs } = await fetchWeeklyLogs()
    logsContent.value = logs
  } catch (error: any) {
    errorMessage.value = error?.message || 'Failed to fetch logs.'
  } finally {
    isLoadingLogs.value = false
  }
}

const handleGenerateSummary = async () => {
  errorMessage.value = ''
  isGeneratingSummary.value = true
  try {
    const { summaryMarkdown: summary } = await generateWeeklySummary({ logs: logsContent.value })
    summaryMarkdown.value = summary
  } catch (error: any) {
    errorMessage.value = error?.message || 'Failed to generate summary.'
  } finally {
    isGeneratingSummary.value = false
  }
}

const clearLogs = () => {
  logsContent.value = ''
}

const clearSummary = () => {
  summaryMarkdown.value = ''
}

const copySummary = async () => {
  if (!summaryMarkdown.value) return
  try {
    await copyToClipboard(summaryMarkdown.value)
  } catch (error: any) {
    errorMessage.value = 'Unable to copy summary to clipboard.'
  }
}
</script>

<style scoped>
.insights-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.insights-grid {
  display: grid;
  gap: 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.controls-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.controls-card h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.helper-text {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.logs-card,
.summary-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logs-textarea {
  width: 100%;
  min-height: 320px;
  resize: vertical;
  padding: 1rem;
  font-family: 'Fira Code', 'Roboto Mono', monospace;
  font-size: 0.95rem;
  color: #111827;
  background: rgba(249, 250, 251, 0.9);
  border: 1px solid rgba(209, 213, 219, 0.8);
  border-radius: 0.75rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.logs-textarea:focus {
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
}

.summary-output {
  min-height: 320px;
  padding: 1rem 1.25rem;
  background: rgba(249, 250, 251, 0.95);
  border: 1px solid rgba(209, 213, 219, 0.8);
  border-radius: 0.75rem;
  overflow-y: auto;
  color: #111827;
  line-height: 1.6;
}

.summary-output h1,
.summary-output h2,
.summary-output h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.summary-output ul {
  margin: 0.75rem 0;
  padding-left: 1.25rem;
}

.summary-output li {
  margin-bottom: 0.35rem;
}

.placeholder {
  margin: 0;
  color: #6b7280;
  font-style: italic;
}

.error-message {
  color: #dc2626;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .insights-wrapper {
    padding: 0.5rem;
  }

  .insights-grid {
    grid-template-columns: 1fr;
  }
}
</style>
