<template>
  <div class="post-container " :class="{ mine: props.mine }">
    <div class="chat-post">
      <div class="chat-username">{{ props.name }}</div>
      <div class="chat-content">{{ props.content }}
      </div>
    </div>
  </div>

</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  name: String,
  content: String,
  mine: Boolean
})

</script>
<style scoped>
.post-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.post-container.mine {
  justify-content: flex-end;
}

.chat-post {
  width: 40%;
  max-height: 700px;
  margin: 10px 18px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.mine .chat-post {
  width: 40%;
  max-height: 700px;
  margin: 10px 18px;
  padding: 15px;
  border-radius: 8px;
  background-color: #353333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.mine .chat-username {
  font-weight: bold;
  color: #ddd4d4;
  margin-bottom: 8px;
  font-size: 1rem;
}

.chat-username {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  font-size: 1rem;
}

.mine .chat-content {
  font-size: 0.95rem;
  color: #ddd4d4;
  line-height: 1.5;
  white-space: pre-wrap;
}

.chat-content {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
