<template>
  <form @submit.prevent="submit" class="auth-form">
    <h1>Sign In</h1>

    <!-- Role Selector -->
    <div class="role-selector">
      <div class="role-option" :class="{ selected: selectedRole === 'student' }" @click="selectRole('student')">
        <div class="role-icon"><i class="fas fa-user-graduate"></i></div>
        <div>Student</div>
      </div>
      <div class="role-option" :class="{ selected: selectedRole === 'admin' }" @click="selectRole('admin')">
        <div class="role-icon"><i class="fas fa-user-tie"></i></div>
        <div>Admin</div>
      </div>
    </div>

    <!-- Email Input -->
    <label for="signin-email">Institute Email</label>
    <input type="email" id="signin-email" v-model="email" placeholder="Institute Email" required />
    <div class="error-message" :class="{ show: emailError }">
      {{ emailError }}
    </div>

    <!-- Password Input -->
    <label for="signin-password">Password</label>
    <input type="password" id="signin-password" v-model="password" placeholder="Password" required minlength="8" />
    <div class="error-message" :class="{ show: passwordError }">
      {{ passwordError }}
    </div>

    <!-- Forgot Password Link -->
    <a href="#" @click.prevent="goToForgotPassword">Forgot your password?</a>

    <!-- Submit Button -->
    <button type="submit" :disabled="!isFormValid || isLoading">
      <span v-if="isLoading">Signing In...</span>
      <span v-else>Sign In</span>
    </button>

    <!-- Switch to Sign Up -->

  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import login from './api/auth/Login'
import { useAuthStore } from '@/stores/useAuthStore'

const emit = defineEmits(['switch-to-signup'])
const email = ref('')
const password = ref('')
const selectedRole = ref('student')
const isLoading = ref(false)

const router = useRouter()
const auth = useAuthStore()

// Validation
const emailError = computed(() => {
  if (!email.value) return ''
  if (!email.value.includes('@')) return 'Please enter a valid email address.'
  return ''
})

const passwordError = computed(() => {
  if (!password.value) return ''
  if (password.value.length < 8) return 'Password must be at least 8 characters long.'
  return ''
})

const isFormValid = computed(() => {
  return email.value && password.value && !emailError.value && !passwordError.value
})

// Methods
function selectRole(role) {
  selectedRole.value = role
}

function goToForgotPassword() {
  router.push('/forgot-password')
}

function emitSwitchToSignUp() {
  emit('switch-to-signup')
}

async function submit() {
  if (!isFormValid.value || isLoading.value) return

  isLoading.value = true
  try {
    var result = await login({  
      institute_email: email.value,
      password: password.value,
    })
    if (result.data.verification_required) {
      router.push(`/auth/otp/${result.data.otp_session_id}`);
      return;
    }
    await auth.fetchUser()
    if (auth.hasRole("admin")) {
      router.push("/admin");
      return;

    } else if (auth.hasRole("peer")) {
      router.push("/");
      return;

    } else {
      router.push("/");
      return;
    }  
  } catch (error) {
    console.error('Sign in error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
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
  color: var(--white);

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

label {
  font-size: 12px;
  color: #4b5563;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
}

input,
select {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  transition: all 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-option.selected {
  background-color: #111827;
  color: white;
  border-color: #111827;
}

.role-option:hover {
  background-color: #f3f4f6;
}

.role-option.selected:hover {
  background-color: #374151;
}

.role-icon {
  font-size: 16px;
  margin-bottom: 8px;
}

.error-message.show {
  display: block;
}
</style>
