<template>
  <div class="loading">
    <div class="spinner" />
    <div>Loading...</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(255,255,255,0.6); z-index: 1100; }
.spinner { width: 36px; height: 36px; border: 4px solid #e5e7eb; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 8px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>