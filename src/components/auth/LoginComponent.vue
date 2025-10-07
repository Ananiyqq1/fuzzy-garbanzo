<template>
  <div class="auth-page">
    <div class="container" :class="{ 'right-panel-active': isSignUpMode }">
      <!-- Sign Up Form -->
      <div class="form-container sign-up-container">
        <SignUp @switch-to-signin="switchToSignIn" />
      </div>
      
      <!-- Sign In Form -->
      <div class="form-container sign-in-container">
        <SignIn @switch-to-signup="switchToSignUp" />
      </div>
      
      <!-- Overlay -->  
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" @click="switchToSignIn" type="button">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>HiLCoE Peer</h1>
            <p>Enter your credentials to start your journey with us</p>
            <button class="ghost" @click="switchToSignUp" type="button">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SignIn from '../../components/auth/SignIn.vue'
import SignUp from '../../components/auth/SignUp.vue'

const isSignUpMode = ref(false)
let isTransitioning = false

const switchToSignUp = () => {
  if (!isTransitioning && window.innerWidth > 768) {
    isTransitioning = true
    isSignUpMode.value = true
    setTimeout(() => { isTransitioning = false }, 600)
  } else if (window.innerWidth <= 768) {
    isSignUpMode.value = true
  }
}

const switchToSignIn = () => {
  if (!isTransitioning && window.innerWidth > 768) {
    isTransitioning = true
    isSignUpMode.value = false
    setTimeout(() => { isTransitioning = false }, 600)
  } else if (window.innerWidth <= 768) {
    isSignUpMode.value = false
  }
}

onMounted(() => {
  // Set initial state based on route query
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('mode') === 'signup') {
    isSignUpMode.value = true
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.auth-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: white;
}

span {
  font-size: 12px;
  color: #6b7280;
}

a {
  color: #4b5563;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: color 0.3s ease;
}

a:hover {
  color: #111827;
}

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

button:active {
  transform: scale(0.98);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.2);
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

button.ghost:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.container {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 580px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  transition: all 0.6s ease-in-out;
  visibility: visible;
}

.sign-in-container {
  left: 0;
  z-index: 2;
  opacity: 1;
}

.sign-up-container {
  left: 0;
  opacity: 0;
  z-index: 1;
  visibility: hidden;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
    visibility: hidden;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
    visibility: visible;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(0%);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
  opacity: 0;
  z-index: 1;
  visibility: hidden;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  visibility: visible;
  animation: show 0.6s;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .container {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
  
  .form-container {
    width: 100%;
    position: relative;
  }
  
  .overlay-container {
    display: none;
  }
  
  .sign-in-container,
  .sign-up-container {
    position: relative;
    width: 100%;
    height: auto;
    opacity: 1;
    visibility: visible;
    transform: none;
  }
  
  .container.right-panel-active .sign-in-container {
    display: none;
  }
  
  .sign-up-container {
    display: none;
  }
  
  .container.right-panel-active .sign-up-container {
    display: block;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 10px;
  }
  
  .overlay-panel {
    padding: 0 20px;
  }
  
  .overlay-panel h1 {
    font-size: 1.5rem;
  }
}
</style>