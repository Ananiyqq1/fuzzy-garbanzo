<template>
  <AppModal :show="true" :title="chat.name" size="lg" @close="$emit('close')">
    <div class="chat">
      <div class="messages">
        <div
          v-for="(message, index) in chat.messages"
          :key="index"
          class="message"
        >
          <strong>{{ message.author }}:</strong>
          {{ message.text }}
          <span class="time">{{ message.time }}</span>
        </div>
      </div>

      <div class="participants" v-if="chat.participants && chat.participants.length">
        <span class="label">Participants:</span>
        <div class="participant-list">
          <span v-for="participant in chat.participants" :key="participant" class="participant">
            {{ participant }}
          </span>
        </div>
      </div>

      <div class="chat-input">
        <input v-model="draft" type="text" placeholder="Type your message..." />
        <AppButton size="small" @click="sendMessage">Send</AppButton>
      </div>

      <div class="actions">
        <AppButton variant="secondary" @click="$emit('close')">Close</AppButton>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppButton from '../../common/AppButton.vue'
import AppModal from '../../common/AppModal.vue'

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
})

const messages = computed(() => props.chat?.messages ?? [])
const draft = ref('')

const emit = defineEmits(['message', 'close'])

function sendMessage() {
  if (!draft.value.trim()) return
  emit('message', { text: draft.value.trim() })
  draft.value = ''
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 320px;
  overflow-y: auto;
}

.message {
  background: rgba(243, 244, 246, 0.85);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  color: #1f2937;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.time {
  margin-left: auto;
  font-size: 0.75rem;
  color: #6b7280;
}

.participants {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat-input {
  display: flex;
  gap: 0.75rem;
}

.chat-input input {
  flex: 1;
  border-radius: 0.85rem;
  border: 1px solid rgba(209, 213, 219, 0.8);
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  background: rgba(249, 250, 251, 0.9);
}

.label {
  font-weight: 600;
  color: #374151;
}

.participant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.participant {
  background: rgba(17, 24, 39, 0.08);
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  color: #4b5563;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
