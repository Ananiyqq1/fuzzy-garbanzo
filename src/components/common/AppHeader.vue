<template>
  <header class="app-header">
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup>
defineProps({ title: String });
</script>

<style scoped>
.app-header { padding: 16px; border-bottom: 1px solid #eee; background: #fafafa; }
</style>