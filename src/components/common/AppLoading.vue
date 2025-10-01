<template>
  <div class="loading-overlay">
    <div class="loading-container">
      <div class="loading-content">
        <!-- Logo -->
        <div class="loading-logo">
          <div class="logo">H</div>
        </div>
        
        <!-- Spinner -->
        <div class="spinner-container">
          <div class="spinner"></div>
          <div class="spinner-glow"></div>
        </div>
        
        <!-- Loading Text -->
        <div class="loading-text">
          <h3>Loading...</h3>
          <p>Please wait while we prepare your experience</p>
        </div>
        
        <!-- Progress Dots -->
        <div class="progress-dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  backdrop-filter: blur(20px);
}

.loading-container {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  padding: 3rem 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 320px;
  max-width: 400px;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loading-logo {
  margin-bottom: 0.5rem;
}

.logo {
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.spinner-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(17, 24, 39, 0.1);
  border-top: 3px solid #111827;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  z-index: 2;
}

.spinner-glow {
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(17, 24, 39, 0.1) 0%, transparent 70%);
  animation: pulse 2s ease-in-out infinite;
}

.loading-text h3 {
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(135deg, #111827 0%, #6b7280 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 0.5rem 0;
}

.loading-text p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.4;
}

.progress-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  background: #111827;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

.dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 480px) {
  .loading-container {
    margin: 1rem;
    padding: 2rem 1.5rem;
    min-width: auto;
  }
  
  .logo {
    width: 3rem;
    height: 3rem;
    font-size: 1.25rem;
  }
  
  .spinner {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .spinner-glow {
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>