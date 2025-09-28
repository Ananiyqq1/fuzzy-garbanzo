<template>
  <router-view />
</template>

<script setup>
</script>

<style>
/* as Kept within global inside of assets/global.css */
      * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
            background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
        }
</style>
