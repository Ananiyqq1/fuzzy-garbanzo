<template>
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <header class="header">
        <h3>{{ title }}</h3>
        <button class="x" @click="$emit('close')">×</button>
      </header>
      <section class="content">
        <slot />
      </section>
    </div>
  </div>
</template>

<script setup>
defineProps({ title: String });
defineEmits(['close']);
</script>

<style scoped>
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: grid; place-items: center; z-index: 1000; padding: 16px; }
.modal { width: 100%; max-width: 720px; background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); overflow: hidden; }
.header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #eee; }
.x { background: transparent; border: none; font-size: 24px; cursor: pointer; }
.content { padding: 16px; }
</style>