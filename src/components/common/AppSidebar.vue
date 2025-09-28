<template>
  <aside class="sidebar">
    <router-link v-for="i in items" :key="i.to" :to="i.to" class="item">{{ i.label }}</router-link>
  </aside>
</template>

<script setup>
defineProps({ items: { type: Array, default: () => [] } });
</script>

<style scoped>
/* .sidebar { width: 240px; padding: 16px; border-right: 1px solid #eee; }
.item { display: block; margin: 8px 0; }
@media (max-width: 800px) {
  .sidebar { width: 100%; border-right: none; border-bottom: 1px solid #eee; display: flex; gap: 12px; overflow:auto; }
  .item { white-space: nowrap; }
} */
 .sidebar{
           background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            border-radius: 1.5rem;
            border: 1px solid rgba(229, 231, 235, 0.5);
            padding: 2rem 1.5rem;
            position: sticky;
            top: 6rem;
            height: fit-content;
 }
 .item{
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
 }
 .item.active{

            background: #111827;
            color: white;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
 }
 .item:hover{
 }
</style>