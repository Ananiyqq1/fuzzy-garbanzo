<template>
  <div class="container" id="container">
    <!-- Sign Up Container -->
    <div class="form-container sign-up-container">
      <form @submit.prevent="handleSignUp" id="signup-form">
        <h1>Create Account</h1>
        
        <div class="role-selector">
          <div 
            class="role-option" 
            :class="{ selected: selectedRole === 'student' }"
            @click="selectRole('student')"
            data-role="student"
          >
            <div class="role-icon"><i class="fas fa-user-graduate"></i></div>
            <div>Student</div>
          </div>
          <div 
            class="role-option" 
            :class="{ selected: selectedRole === 'admin' }"
            @click="selectRole('admin')"
            data-role="admin"
          >
            <div class="role-icon"><i class="fas fa-user-tie"></i></div>
            <div>Admin</div>
          </div>
        </div>
        <input type="hidden" v-model="formData.role" name="role">
        
        <label for="signup-name">Full Name</label>
        <input 
          v-model="formData.name" 
          type="text" 
          id="signup-name" 
          placeholder="Full Name" 
          required 
          minlength="2"
        />
        <div class="error-message" v-if="errors.name">Name must be at least 2 characters long.</div>
        
        <label for="signup-id">Student/Staff ID</label>
        <input 
          v-model="formData.id" 
          type="text" 
          id="signup-id" 
          :placeholder="selectedRole === 'student' ? 'Student ID' : 'Staff ID'" 
          required 
          pattern="[A-Za-z0-9]+"
        />
        <div class="error-message" v-if="errors.id">Please enter a valid ID number.</div>
        
        <label for="signup-email">Institute Email</label>
        <input 
          v-model="formData.email" 
          type="email" 
          id="signup-email" 
          placeholder="Institute Email" 
          required 
        />
        <div class="error-message" v-if="errors.email">Please enter a valid email address.</div>
        
        <label for="signup-password">Password</label>
        <input 
          v-model="formData.password" 
          type="password" 
          id="signup-password" 
          placeholder="Password" 
          required 
          minlength="8" 
        />
        <div class="error-message" v-if="errors.password">Password must be at least 8 characters long.</div>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>

    <!-- Sign In Container -->
    <div class="form-container sign-in-container">
      <form @submit.prevent="handleSignIn" id="signin-form">
        <h1>Sign In</h1>
        
        <div class="role-selector">
          <div 
            class="role-option" 
            :class="{ selected: loginRole === 'student' }"
            @click="selectLoginRole('student')"
            data-role="student"
          >
            <div class="role-icon"><i class="fas fa-user-graduate"></i></div>
            <div>Student</div>
          </div>
          <div 
            class="role-option" 
            :class="{ selected: loginRole === 'admin' }"
            @click="selectLoginRole('admin')"
            data-role="admin"
          >
            <div class="role-icon"><i class="fas fa-user-tie"></i></div>
            <div>Admin</div>
          </div>
        </div>
        <input type="hidden" v-model="loginFormData.role" name="role">
        
        <label for="signin-email">Institute Email</label>
        <input 
          v-model="loginFormData.email" 
          type="email" 
          id="signin-email" 
          placeholder="Institute Email" 
          required 
        />
        <div class="error-message" v-if="loginErrors.email">Please enter a valid email address.</div>
       
        <label for="signin-password">Password</label>
        <input 
          v-model="loginFormData.password" 
          type="password" 
          id="signin-password" 
          placeholder="Password" 
          required 
          minlength="8" 
        />
        <div class="error-message" v-if="loginErrors.password">Password must be at least 8 characters long.</div>
        
        <router-link to="/ForgotPassword">Forgot your password?</router-link>
        <button type="submit">Sign In</button>
      </form>
    </div>

    <!-- Overlay -->
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" @click="showSignIn" type="button">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>HiLCoE Peer</h1>
          <p>Enter your credentials to start your journey with us</p>
          <button class="ghost" @click="showSignUp" type="button">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/useAuthStore.js'

const router = useRouter()
const authStore = useAuthStore()

const selectedRole = ref('student')
const loginRole = ref('student')
const isSignUpActive = ref(false)
const formData = reactive({
  name: '',
  id: '',
  email: '',
  password: '',
  role: 'student'
})
const loginFormData = reactive({
  email: '',
  password: '',
  role: 'student'
})
const errors = reactive({})
const loginErrors = reactive({})

const selectRole = (role) => {
  selectedRole.value = role
  formData.role = role
  const idInput = document.getElementById('signup-id')
  if (idInput) {
    idInput.placeholder = role === 'student' ? 'Student ID' : 'Staff ID'
  }
}

const selectLoginRole = (role) => {
  loginRole.value = role
  loginFormData.role = role
}

const showSignUp = () => {
  isSignUpActive.value = true
  document.getElementById('container').classList.add('right-panel-active')
}

const showSignIn = () => {
  isSignUpActive.value = false
  document.getElementById('container').classList.remove('right-panel-active')
}

const validateForm = (data, errorObj) => {
  const newErrors = {}
  
  if (data.name && data.name.length < 2) {
    newErrors.name = true
  }
  
  if (!data.id || !/^[A-Za-z0-9]+$/.test(data.id)) {
    newErrors.id = true
  }
  
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = true
  }
  
  if (data.password && data.password.length < 8) {
    newErrors.password = true
  }
  
  Object.assign(errorObj, newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSignUp = async () => {
  errors.value = {}
  
  if (!validateForm(formData, errors)) {
    return
  }
  
  try {
    // In real app, call API
    await authStore.login(formData)
    // For demo, redirect based on role
    if (formData.role === 'student') {
      router.push('/student')
    } else {
      router.push('/admin')
    }
  } catch (error) {
    console.error('Sign up failed:', error)
  }
}

const handleSignIn = async () => {
  loginErrors.value = {}
  
  if (!loginFormData.email || !/\S+@\S+\.\S+/.test(loginFormData.email)) {
    loginErrors.email = true
  }
  
  if (loginFormData.password.length < 8) {
    loginErrors.password = true
  }
  
  if (Object.keys(loginErrors).length > 0) {
    return
  }
  
  try {
    // Mock credentials for demo
    const mockCredentials = {
      ...loginFormData,
      role: loginFormData.role
    }
    await authStore.login(mockCredentials)
    
    // Redirect based on role
    if (loginFormData.role === 'student') {
      router.push('/student')
    } else {
      router.push('/admin')
    }
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}

onMounted(() => {
  authStore.initializeAuth()
  if (authStore.isAuthenticated) {
    const rolePath = authStore.isAdmin ? '/admin' : '/student'
    router.push(rolePath)
  }
})
</script>

<style scoped>
/* Login form styling using CSS variables */
.container {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
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
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
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

form {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  border-radius: 10px;
}

h1 {
  font-weight: bold;
  margin: 0;
  font-size: 2rem;
  color: var(--primary-color);
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: var(--text-tertiary);
}

.role-selector {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px 0;
}

.role-option {
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  transition: var(--transition);
  background: var(--bg-secondary);
}

.role-option.selected {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.role-option:hover {
  background-color: var(--bg-tertiary);
}

.role-option.selected:hover {
  background-color: var(--secondary-color);
}

.role-icon {
  font-size: 16px;
  margin-bottom: 8px;
}

button {
  border-radius: 20px;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: var(--transition);
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: var(--secondary-color);
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
  color: #FFFFFF;
}

button.ghost:hover {
  background-color: rgba(255, 255, 255, 0.2);
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

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    width: 90%;
    min-height: 500px;
    margin: 1rem auto;
  }
  
  form {
    padding: 0 30px;
  }
  
  .role-selector {
    flex-direction: column;
    gap: 10px;
  }
  
  .role-option {
    margin: 0;
  }
}

@media (max-width: 480px) {
  .container {
    width: 95%;
    min-height: 450px;
    margin: 0.5rem auto;
  }
  
  form {
    padding: 0 20px;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 12px;
    margin: 15px 0 20px;
  }
  
  button {
    padding: 10px 30px;
    font-size: 11px;
  }
}
</style>