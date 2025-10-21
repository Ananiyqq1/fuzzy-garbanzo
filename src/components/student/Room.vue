<template>
  <div class="room-page">
    <div class="page-shell">
      <div class="header-row">
        <AppContentHeader
          title="Room Conversation"
          subtitle="Collaborate with your peers in real-time"
        />
      </div>

      <div class="chat-layout">
        <div class="chat-card">
          <div class="messages-scroll">
            <v-infinite-scroll
              ref="infiniteScrollRef"
              side="start"
              class="message-feed"
              :items="state.posts"
              @load="load"
            >
              <div
                v-for="(item, index) in state.posts"
                :key="index"
                class="message-item"
              >
                <TextPost
                  v-if="!item.isDoc"
                  :name="item.userName || 'dagm'"
                  :content="item.content"
                  :mine="item.senderId === userId"
                  :date="formatDate(item.createdAt)"
                />
                <DocPost
                  v-else
                  :userName="item.userName || 'dagm'"
                  :fileName="item.docTitle"
                  :fileKey="item.docKey"
                  :dateUploaded="formatDate(item.createdAt)"
                />
              </div>

              <template #loading>
                <div class="loading-indicator" role="status" aria-live="polite">
                  <div class="spinner-wrapper">
                    <div class="spinner-container">
                      <div class="spinner"></div>
                      <div class="spinner-glow"></div>
                    </div>
                  </div>
                  <span class="sr-only">Loading messages</span>
                </div>
              </template>

              <template #empty>
                <div class="empty-state">
                  <div class="empty-state-card empty-state-card--message">
                    <div class="empty-icon" aria-hidden="true">
                      <i class="fas fa-comments"></i>
                    </div>
                    <h3>No messages yet</h3>
                    <p>Start the conversation by sending the first message.</p>
                  </div>
                </div>
              </template>
            </v-infinite-scroll>
          </div>
        </div>

        <div class="composer-card">
          <v-form class="message-form" @submit.prevent="postMessage">
            <v-text-field
              v-model="message"
              append-icon="mdi-send"
              prepend-icon="mdi-paperclip"
              clear-icon="mdi-close-circle"
              label="Message"
              variant="filled"
              density="comfortable"
              hide-details
              @click:append="postMessage"
              @click:prepend="openUploadModal"
              @click:clear="clearMessage"
              @keyup.enter.prevent="postMessage"
            />
          </v-form>
        </div>
      </div>
    </div>

    <UploadResourceModal
      v-if="docUpload"
      :initial-value="{}"
      :roomId="roomId"
      @submit="postDocIntoChat"
      @close="handleUploadClosed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSignalR } from '@/common/useSignalR';
import { useDocStore } from '@/stores/useDocStore';
import fetchPosts from './api/FetchChatPosts';
import UploadResourceModal from './modals/UploadResourceModal.vue';
import DocPost from '../common/DocPost.vue';
import TextPost from '../common/TextPost.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import AppContentHeader from '../common/AppContentHeader.vue';

const message = ref('');
const docUpload = ref(false);
const infiniteScrollRef = ref<any>(null);
const docStore = useDocStore();

interface post { 
    senderId: string;
    docKey: string;
    docTitle: string;
    createdAt: string;
    isDoc: boolean;
    userName: string;
    content: string;
}

const state = reactive({
    posts: [] as Array<post>
});

const { joinRoom, sendMessage, onMessage, onDocument, checkConnection, connect } = useSignalR();
const route = useRoute();
const roomId: string = route.params.id as string;

var pageNumber:number = 0;
let pageSize = 3;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate));
const { user } = useAuthStore();
const userName = user?.username as string;
const userId = user?.user_id as string;
const scrollToBottom = async () => {
    await nextTick();
    const el = infiniteScrollRef.value?.$el;
    if (el) {
        el.scrollTo({
            top: el.scrollHeight,
            behavior: "smooth"
        });
    }
};

onMounted(async () => {
    pageNumber=1;
    if (!checkConnection()) {
        await connect();
    }
    await joinRoom(roomId);
    const res = await fetchPosts(roomId, pageNumber, pageSize);
    console.log("Initial posts ",res.data.items);
    state.posts = res.data.items.reverse();
    await scrollToBottom();

    onMessage((senderId:string,userName: string, message: string) => {
        state.posts.push({ 
            senderId,
            docKey: '',
            docTitle: '',
            createdAt: new Date().toISOString(),
            isDoc: false,
            userName: userName,
            content: message
        });
        scrollToBottom();
    });

    onDocument((senderId: string, docKey: string, docTitle: string) => {
        state.posts.push({ 
            senderId,
            docKey,
            docTitle,
            createdAt: new Date().toISOString(),
            isDoc: true,
            userName: userName,
            content: ''
        });
        scrollToBottom();
    });
});

function postMessage() {     
    if (!message.value.trim()) return;
    sendMessage(roomId, userId, userName, message.value, '', '');
    message.value = '';
}

function postDocIntoChat(result?: { docKey: string; docTitle: string }) {
    const docKey = result?.docKey || docStore.currentDocKey;
    const docTitle = result?.docTitle || docStore.currentDocTitle;
    if (docKey && docTitle) {
        docUpload.value = false;
        sendMessage(
            roomId,
            userId, userName,
            '',
            docKey,
            docTitle
        );
        docStore.clearUploadedDocument();
    }
}

function openUploadModal() {
    docUpload.value = true;
}

function handleUploadClosed() {
    docUpload.value = false;
    docStore.clearUploadedDocument();
}

function clearMessage() {
    message.value = '';
}

async function load({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) {
    const res = await fetchPosts(roomId, ++pageNumber, pageSize);
    if (res.data.items.length === 0) return done('empty');

    state.posts.unshift(...res.data.items.reverse());
    done('ok');
}
</script>

<style scoped>
.room-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.chat-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.chat-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(229, 231, 235, 0.55);
  border-radius: 1.25rem;
  padding: 2rem 2.25rem;
  box-shadow: 0 22px 40px -18px rgba(17, 24, 39, 0.4);
  display: flex;
  flex-direction: column;
}

.messages-scroll {
  max-height: 560px;
  overflow-y: auto;
  padding-right: 0.75rem;
}

.message-feed {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-item {
  display: flex;
}

.composer-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(229, 231, 235, 0.6);
  border-radius: 1.1rem;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 18px 32px -20px rgba(17, 24, 39, 0.35);
}

.message-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-form :deep(.v-field) {
  border-radius: 0.9rem;
  background: rgba(243, 244, 246, 0.85);
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  padding: 1.5rem 0;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  padding: 1.75rem 2.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(229, 231, 235, 0.4);
  box-shadow: 0 25px 55px -16px rgba(17, 24, 39, 0.28);
  text-align: center;
}

.spinner-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 3.5rem;
  height: 3.5rem;
  border: 4px solid rgba(17, 24, 39, 0.12);
  border-top: 4px solid #111827;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  z-index: 2;
}

.spinner-glow {
  position: absolute;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(17, 24, 39, 0.18) 0%, transparent 72%);
  animation: pulse 2s ease-in-out infinite;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

.empty-state-card {
  background: rgba(255, 255, 255, 0.78);
  border-radius: 1rem;
  padding: 2.5rem 3rem;
  box-shadow: 0 22px 40px -18px rgba(17, 24, 39, 0.4);
  border: 1px solid rgba(229, 231, 235, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 420px;
}

.empty-state-card--message {
  flex-direction: column;
  gap: 1.25rem;
  text-align: center;
}

.empty-state-card--message h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #111827;
  font-weight: 600;
}

.empty-state-card--message p {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(209, 213, 219, 0.65);
  color: rgb(156, 163, 175);
  font-size: 1.9rem;
  box-shadow: 0 18px 36px -20px rgba(17, 24, 39, 0.35);
}

.empty-icon i {
  color: inherit;
  font-size: 1.4em;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.messages-scroll::-webkit-scrollbar {
  width: 8px;
}

.messages-scroll::-webkit-scrollbar-thumb {
  background: rgba(17, 24, 39, 0.18);
  border-radius: 999px;
}

.messages-scroll::-webkit-scrollbar-track {
  background: transparent;
}

@media (max-width: 1024px) {
  .room-page {
    padding: 1.5rem;
  }

  .chat-card {
    padding: 1.75rem;
  }
}

@media (max-width: 768px) {
  .page-shell {
    padding: 0;
  }

  .chat-card {
    padding: 1.5rem;
  }

  .messages-scroll {
    max-height: 480px;
  }

  .composer-card {
    padding: 1.25rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .room-page {
    padding: 1rem;
  }

  .chat-card {
    padding: 1.25rem;
  }

  .messages-scroll {
    max-height: 420px;
  }

  .composer-card {
    padding: 1rem 1.25rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.45;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
