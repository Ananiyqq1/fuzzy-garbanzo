<template>
  <div class="card">
    <div class="head">
      <h3>{{ title }}</h3>
      <small v-if="subtitle" class="muted">{{ subtitle }}</small>
    </div>
    <div class="body"><slot /></div>
  </div>
</template>

<script setup>
defineProps({ title: String, subtitle: String });
</script>

<style scoped>
.card { border: 1px solid #eee; border-radius: 12px; padding: 12px; background: #fff; }
.head h3 { margin: 0; }
.muted { color: #6b7280; }
.body { margin-top: 8px; }
</style>