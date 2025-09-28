<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* Global styles using CSS variables */
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  background: var(--bg-gradient);
  min-height: 100vh;
}

/* Ensure proper layout for all views */
.student-layout,
.admin-layout {
  min-height: 100vh;
  background: var(--bg-gradient);
}

/* Loading state */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--bg-gradient);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--bg-tertiary);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error state */
.error-container {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  margin: 2rem auto;
  max-width: 500px;
}

.error-container h2 {
  color: #ef4444;
  margin-bottom: 1rem;
}

.error-container p {
  color: var(--text-tertiary);
  margin-bottom: 1.5rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  #app {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  #app {
    font-size: 13px;
  }
  
  .error-container {
    margin: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  #app {
    font-size: 12px;
  }
  
  .error-container {
    margin: 0.5rem;
    padding: 1rem;
  }
}
</style>