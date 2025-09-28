<template>
  <button :class="['btn', variant]" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
});
</script>

<style scoped>
    button {
            border-radius: 20px;
            border: 1px solid #111827;
            background-color: #111827;
            color: #FFFFFF;
            font-size: 12px;
            font-weight: bold;
            padding: 12px 45px;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        button:hover {
            background-color: #374151;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

</style>