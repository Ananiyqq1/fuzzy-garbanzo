<template>
  <form @submit.prevent="submit" class="auth-form">
    <h1>Create Account</h1>

    <div class="role-selector" role="group" aria-label="Account type">
      <div class="role-option selected" aria-selected="true">
        <div class="role-icon"><i class="fas fa-user-graduate"></i></div>
        <div>Student</div>
      </div>
    </div>

    <!-- Full Name Input -->
    <label for="signup-name">Full Name</label>
    <input 
      type="text" 
      id="signup-name" 
      v-model="name"
      placeholder="Full Name" 
      required 
      minlength="2"
    />
    <div class="error-message" :class="{ show: nameError }">
      {{ nameError }}
    </div>
    
    <!-- Student ID Input -->
    <label for="signup-id">Student ID</label>
    <input 
      type="text" 
      id="signup-id" 
      v-model="idNumber"
      placeholder="Student ID"
      required 
      pattern="[A-Za-z0-9]+"
    />
    <div class="error-message" :class="{ show: idError }">
      {{ idError }}
    </div>
    
    <!-- Email Input -->
    <label for="signup-email">Institute Email</label>
    <input 
      type="email" 
      id="signup-email" 
      v-model="email"
      placeholder="Institute Email" 
      required 
    />
    <div class="error-message" :class="{ show: emailError }">
      {{ emailError }}
    </div>
    
    <!-- Password Input -->
    <label for="signup-password">Password</label>
    <input 
      type="password" 
      id="signup-password" 
      v-model="password"
      placeholder="Password" 
      required 
      minlength="8" 
    />
    <div class="error-message" :class="{ show: passwordError }">
      {{ passwordError }}
    </div>

    <!-- Submit Button -->
    <button type="submit" :disabled="!isFormValid || isLoading">
      <span v-if="isLoading">Creating Account...</span>
      <span v-else>Sign Up</span>
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const idNumber = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const router = useRouter()

// Validation
const nameError = computed(() => {
  if (!name.value) return ''
  if (name.value.trim().length < 2) return 'Name must be at least 2 characters long.'
  return ''
})

const idError = computed(() => {
  if (!idNumber.value) return ''
  if (!/^[A-Za-z0-9]+$/.test(idNumber.value)) return 'Please enter a valid ID number.'
  return ''
})

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
  return name.value && idNumber.value && email.value && password.value && 
         !nameError.value && !idError.value && !emailError.value && !passwordError.value
})

// Methods
async function submit() {
  if (!isFormValid.value || isLoading.value) return
  
  isLoading.value = true
  
  try {
    // final_draft sign-up flow (no API): direct to student onboarding
    router.push('/student/preferences')
  } catch (error) {
    console.error('Sign up error:', error)
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
h1 {
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
 

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

input, select {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
}

input:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 5px;
  display: none;
}
.error-message.show {
  display: block;
}

.role-selector {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 15px 0 20px;
}

.role-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  color: #111827;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 10px 25px -12px rgba(0, 0, 0, 0.2);
  min-width: 140px;
}

.role-option.selected {
  background: linear-gradient(135deg, #111827 0%, #374151 100%);
  color: #ffffff;
  border-color: #111827;
}

.role-icon {
  font-size: 20px;
  margin-bottom: 8px;
}
</style>