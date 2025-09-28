<template>
  <div class="admin-container">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/useAuthStore.js'

const router = useRouter()

const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    router.push('/login')
  }
})
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
}
</style>