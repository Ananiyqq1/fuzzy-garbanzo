<template>
  <div class="container">
    <button class="back-button" @click="$router.go(-1)">
      <i class="fas fa-arrow-left"></i> Back
    </button>
    
    <div class="otp-form">
      <div class="role-indicator" :class="roleClass">{{ roleText }} Account</div>
      <h1>OTP Verification</h1>
      <p>Enter the 6-digit code sent to your email</p>
      
      <div class="otp-inputs">
        <input 
          v-model="otpDigits[0]" 
          class="otp-input" 
          type="text" 
          maxlength="1" 
          pattern="[0-9]" 
          inputmode="numeric" 
          autofocus 
          @input="handleOtpInput(0, $event)"
        />
        <input 
          v-model="otpDigits[1]" 
          class="otp-input" 
          type="text" 
          maxlength="1" 
          pattern="[0-9]" 
          inputmode="numeric" 
          @input="handleOtpInput(1, $event)"
        />
        <input 
          v-model="otpDigits[2]" 
          class="otp-input" 
          type="text" 
          maxlength="1" 
          pattern="[0-9]" 
          inputmode="numeric" 
          @input="handleOtpInput(2, $event)"
        />
        <input 
          v-model="otpDigits[3]" 
          class="otp-input" 
          type="text" 
          maxlength="1" 
          pattern="[0-9]" 
          inputmode="numeric" 
          @input="handleOtpInput(3, $event)"
        />
        <input 
          v-model="otpDigits[4]" 
          class="otp-input" 
          type="text" 
          maxlength="1" 
          pattern="[0-9]" 
          inputmode="numeric" 
          @input="handleOtpInput(4, $event)"
        />
        <input 
          v-model="otpDigits[5]" 
          class="otp-input" 
          type="text" 
          maxlength="1" 
          pattern="[0-9]" 
          inputmode="numeric" 
          @input="handleOtpInput(5, $event)"
        />
      </div>
      
      <button @click="verifyOtp">Verify</button>
      
      <div class="resend-option">
        Didn't receive the code? <a @click="resendOtp">Resend</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const route = useRoute()
const authStore = useAuthStore()

const role = ref(route.query.role || 'student')
const otpDigits = ref(['', '', '', '', '', ''])

const roleText = computed(() => role.value === 'admin' ? 'Admin' : 'Student')
const roleClass = computed(() => role.value === 'admin' ? 'admin' : 'student')

const handleOtpInput = (index, event) => {
  const value = event.target.value
  if (value.length === 1 && index < 5) {
    // Auto-tab to next input
    const nextInput = document.querySelectorAll('.otp-input')[index + 1]
    if (nextInput) {
      nextInput.focus()
    }
  } else if (value.length === 0 && index > 0) {
    // Backspace to previous input
    const prevInput = document.querySelectorAll('.otp-input')[index - 1]
    if (prevInput) {
      prevInput.focus()
    }
  }
}

const verifyOtp = () => {
  const otp = otpDigits.value.join('')
  
  if (otp.length !== 6) {
    alert('Please enter the complete 6-digit OTP code')
    return
  }
  
  // Simulate OTP verification
  console.log('Verifying OTP:', otp, 'for role:', role.value)
  
  // In real app, verify with backend and then login
  // For demo, assume success
  authStore.login({ otp, role: role.value })
  
  // Redirect based on role after successful verification
  if (role.value === 'admin') {
    // Redirect to admin dashboard
    // router.push('/admin')
    // For demo, redirect to admin dashboard
    window.location.href = '/admin'
  } else {
    // Redirect to student dashboard
    // For demo, redirect to student dashboard
    window.location.href = '/student'
  }
}

const resendOtp = () => {
  // Simulate resending OTP
  console.log('Resending OTP for role:', role.value)
  alert('New OTP code has been sent to your email')
  
  // Clear OTP inputs
  otpDigits.value = ['', '', '', '', '', '']
  
  // Focus first input
  const firstInput = document.querySelector('.otp-input')
  if (firstInput) {
    firstInput.focus()
  }
}

// Simulate receiving OTP via email (for demo purposes)
onMounted(() => {
  // Simulate OTP for demo
  setTimeout(() => {
    alert('Demo: Your OTP is 123456')
  }, 1000)
})
</script>

<style scoped>
/* Styles from otp_verification.html */
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
  padding: 20px;
}

.container {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 400px;
  max-width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.otp-form {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  text-align: center;
  border-radius: 10px;
}

.otp-inputs {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  width: 100%;
}

.otp-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  transition: all 0.3s ease;
}

.otp-input:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
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
  margin-top: 20px;
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

.resend-option {
  margin-top: 25px;
  font-size: 14px;
  color: #111827;
}

.resend-option a {
  color: #111827;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.resend-option a:hover {
  color: #374151;
  text-decoration: underline;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #111827;
}

.role-indicator {
  margin-bottom: 15px;
  padding: 8px 15px;
  background-color: #f3f4f6;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.role-indicator.student {
  background-color: #e0f2fe;
  color: #0369a1;
}

.role-indicator.admin {
  background-color: #fce7f3;
  color: #be185d;
}

h1 {
  font-weight: bold;
  margin: 0;
  color: #111827;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #111827;
}
</style>