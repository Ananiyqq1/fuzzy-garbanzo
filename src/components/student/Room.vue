<template>
    <div class="scroll-container">
        <v-infinite-scroll side="start" @load="load" :items="state.posts">
            <RoomPost v-for="(item, index) in state.posts" :key="item" :name="item.userName||'dagm'" :content="item.content"
             :mine="item.userName==='bruk'" />

            <template v-slot:loading>
                <div class="spinner-container">
                    <div class="spinner"></div>
                </div>
            </template>
            <template v-slot:empty>
                <v-alert type="warning">No more chats to show!</v-alert>
            </template>

        </v-infinite-scroll>
    </div>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="message" append-icon="mdi-send" prepend-icon="mdi-paperclip"
                        clear-icon="mdi-close-circle" label="Message" type="text" variant="filled"
                        @click:append="postMessage" @click:prepend="openUploadModal"
                        @click:clear="clearMessage"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
    <UploadResourceModal v-if="docUpload" :initial-value="{}" @close="docUpload = false" @submit="submitUpload" 
    :roomId="roomId" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { onMounted, reactive, } from 'vue'
import RoomPost from '../common/RoomPost.vue'
import fetchPosts from './api/FetchChatPosts'
import UploadResourceModal from './modals/UploadResourceModal.vue'
import { useSignalR } from '@/common/useSignalR'
import { useRoute } from 'vue-router' 

const icons = [
    'mdi-emoticon',
    'mdi-emoticon-cool',
    'mdi-emoticon-dead',
    'mdi-emoticon-excited',
    'mdi-emoticon-happy',
    'mdi-emoticon-neutral',
    'mdi-emoticon-sad',
    'mdi-emoticon-tongue',
]

const message = ref('')
const marker = ref(true)
const docUpload = ref(false)

const iconIndex = ref(0)

const {connect, joinRoom,sendMessage,onMessage} = useSignalR();
const state = reactive({
    posts: []
})
const routes = useRoute()
const roomId = ref(routes.params.id)     
var pageNumber = 1;
var pageSize = 3;

const icon = computed(() => {
    return icons[iconIndex.value]
})
function toggleMarker() {
    marker.value = !marker.value
}

function postMessage() {
    if (message.value.trim() === '') return
    sendMessage(roomId.value, "0b8d4d93-7480-46ac-a052-37561e37ebc5", message.value)
    clearMessage()
}

function clearMessage() {
    message.value = ''
}
function resetIcon() {
    iconIndex.value = 0
}
function openUploadModal() {
    docUpload.value = true
}
onMounted(async () => {
    await connect();
    await joinRoom(roomId.value);
    const res = await fetchPosts(roomId.value, pageNumber, pageSize)
    console.log("got these init posts ", res)
    var anotherPost={
        userName: "bruk",
        content: "hello from broook"
    }
    state.posts = res.data.items
    state.posts.push(anotherPost)

    onMessage((senderId,message) => {
    state.posts.push({
        userName: senderId,
        content: message
    });
});
})


async function load({ done }) {
    // Perform API call
    const res = await fetchPosts("0b8d5d93-7480-46ac-a052-37561e37ebc5", ++pageNumber, pageSize)
    if (res.data.items.length == 0)
        return done('empty')
    state.posts.unshift(...res.data.items)
    done('ok')
}
</script>
<style scoped>
.spinner {
    text-align: center;
    padding: 20px;
    font-weight: bold;
    color: #555;
}

.scroll-container {
    margin-top: 70px;
    height: 700px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column-reverse; 
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #f9f9f9;
}

.spinner {
    width: 24px;
    height: 24px;
    border: 4px solid #ccc;
    border-top-color: #3f51b5;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>