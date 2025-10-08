<template>
  <div class="auth-page">
    <AppCard class="auth-shell" :class="containerClasses" variant="elevated" :clickable="false">
      <div class="mobile-toggle" v-if="isCompact">
        <button type="button" class="toggle-btn" :class="{ active: !isSignUpMode }" @click="switchToSignIn">
          Sign In
        </button>
        <button type="button" class="toggle-btn" :class="{ active: isSignUpMode }" @click="switchToSignUp">
          Sign Up
        </button>
      </div>

      <div class="form-container sign-in-container">
        <SignIn @switch-to-signup="switchToSignUp" />
      </div>

      <div class="form-container sign-up-container">
        <SignUp @switch-to-signin="switchToSignIn" />
      </div>

      <div class="overlay-container" v-if="!isMobile">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" type="button" @click="switchToSignIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>HiLCoE Peer</h1>
            <p>Enter your credentials to start your journey with us</p>
            <button class="ghost" type="button" @click="switchToSignUp">Sign Up</button>
          </div>
        </div>
      </div>
    </AppCard>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SignIn from '../../components/auth/SignIn.vue'
import SignUp from '../../components/auth/SignUp.vue'
import AppCard from '../../components/common/AppCard.vue'

const isSignUpMode = ref(false)
const isMobile = ref(false)
const isMidWidth = ref(false)
const isCompact = computed(() => isMobile.value || isMidWidth.value)
let isTransitioning = false
const DESKTOP_TRANSITION_MS = 600

const updateViewport = () => {
  const width = window.innerWidth
  isMobile.value = width <= 1024
  isMidWidth.value = width > 1024 && width <= 1500
}

const setSignUp = () => {
  isSignUpMode.value = true
}

const setSignIn = () => {
  isSignUpMode.value = false
}

const switchToSignUp = () => {
  if (isCompact.value) {
    setSignUp()
    return
  }
  if (isTransitioning) return
  isTransitioning = true
  setSignUp()
  setTimeout(() => {
    isTransitioning = false
  }, DESKTOP_TRANSITION_MS)
}

const switchToSignIn = () => {
  if (isCompact.value) {
    setSignIn()
    return
  }
  if (isTransitioning) return
  isTransitioning = true
  setSignIn()
  setTimeout(() => {
    isTransitioning = false
  }, DESKTOP_TRANSITION_MS)
}

const containerClasses = computed(() => ({
  'right-panel-active': !isCompact.value && isSignUpMode.value,
  'is-mobile': isCompact.value,
  'mobile-signup-active': isCompact.value && isSignUpMode.value
}))

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('mode') === 'signup') {
    setSignUp()
  }
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewport)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  padding: 2rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.auth-page::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.auth-shell {
  --auth-shell-width: clamp(768px, 60vw, 920px);
  position: relative;
  width: var(--auth-shell-width);
  max-width: 100%;
  min-height: 580px;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  transition: all 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container :deep(form) {
  width: 100%;
}

.sign-in-container {
  left: 0;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  opacity: 0;
  z-index: 1;
}

.auth-shell.right-panel-active .sign-in-container {
  transform: translateX(100%);
  opacity: 0;
  z-index: 1;
}

.auth-shell.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.form-container :deep(.auth-form) {
  max-height: 100%;
  overflow-y: auto;
  padding-right: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.form-container :deep(.auth-form::-webkit-scrollbar) {
  width: 0;
  height: 0;
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
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.auth-shell.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.auth-shell.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  text-align: center;
  height: 100%;
  width: 50%;
  top: 0;
}

.overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

h1 {
  font-weight: 700;
  margin: 0;
  color: #fff;
}

p {
  font-size: 14px;
  font-weight: 300;
  line-height: 1.5;
  margin: 20px 0 30px;
  color: #fff;
}

button {
  border-radius: 20px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #fff;
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

button:focus-visible {
  outline: 3px solid rgba(17, 24, 39, 0.35);
  outline-offset: 3px;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

button.ghost:hover {
  background: rgba(255, 255, 255, 0.25);
}

.mobile-toggle {
  display: none;
}

.toggle-btn {
  flex: 1;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.9);
  color: #111827;
  padding: 0.75rem 0.85rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: #111827;
  color: #fff;
  border-color: #111827;
}

.auth-shell.is-mobile {
  width: 100%;
  max-width: 480px;
  min-height: 100vh;
  padding: 0;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  border-radius: 0;
  box-shadow: none;
}

.auth-shell.is-mobile .form-container {
  position: relative;
  width: 100%;
  height: auto;
  transform: none !important;
  opacity: 1 !important;
  z-index: auto;
  pointer-events: auto;
  padding: 1.75rem 1.5rem 2.25rem;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 1.25rem;
  box-shadow: 0 24px 48px -24px rgba(17, 24, 39, 0.4);
  margin-top: 1.5rem;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  max-height: min(90vh, 780px);
  overflow-y: auto;
  scrollbar-width: none;
}

.auth-shell.is-mobile .form-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.auth-shell.is-mobile .sign-up-container {
  display: none;
}

.auth-shell.mobile-signup-active .sign-in-container {
  display: none;
}

.auth-shell.mobile-signup-active .sign-up-container {
  display: flex;
}

.auth-shell.is-mobile .overlay-container {
  display: none;
}

.auth-shell.is-mobile .mobile-toggle {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem 0;
}

@media (max-width: 1024px) {
  .auth-page {
    padding: 1.5rem;
  }
}

@media (min-width: 1025px) and (max-width: 1500px) {
  .auth-shell:not(.is-mobile) {
    --auth-shell-width: clamp(820px, 70vw, 980px);
    min-height: calc(var(--auth-shell-width) * 1.05);
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  .auth-shell:not(.is-mobile) .form-container {
    padding: 3rem 2.75rem;
  }

  .auth-shell:not(.is-mobile) .sign-up-container :deep(form) {
    max-height: calc(var(--auth-shell-width) * 1.05 - 4rem);
    overflow-y: auto;
  }
}

@media (max-width: 768px) {
  .auth-shell.is-mobile .form-container {
    padding: 2rem 1.5rem;
    margin-top: 1.25rem;
  }

  .toggle-btn {
    font-size: 0.9rem;
    padding: 0.7rem 0.75rem;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 1rem;
  }

  .auth-shell.is-mobile .mobile-toggle {
    padding: 1rem 1rem 0;
  }

  button {
    padding: 10px 35px;
    font-size: 11px;
  }
}
</style>