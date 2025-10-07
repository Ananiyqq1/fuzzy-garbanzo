<template>
  <div class="otp-page">
    <div class="container">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i> Back
      </button>

      <div class="otp-form">
        <div class="role-indicator" :class="role">
          {{ role === 'admin' ? 'Admin Account' : 'Student Account' }}
        </div>
        <h1>OTP Verification</h1>
        <p>Enter the 6-digit code sent to your email</p>

        <div class="otp-inputs">
          <input v-for="(digit, index) in otpDigits" :key="index" class="otp-input" type="text" maxlength="1"
            pattern="[0-9]" inputmode="numeric" v-model="otpDigits[index]" @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)" :ref="el => { if (el) otpInputs[index] = el }"
            :autofocus="index === 0" />
        </div>

        <button @click="verifyOtp" :disabled="!isOtpComplete || isLoading">
          <span v-if="isLoading">Verifying...</span>
          <span v-else>Verify</span>
        </button>

        <div class="resend-option">
          Didn't receive the code? <a @click="resendOtp">Resend</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { verify_otp } from './api/auth/VerifyOTP'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const route = useRoute()
const otp_session_id = route.params.session_id
const otpDigits = ref(['', '', '', '', '', ''])
const otpInputs = ref([])
const isLoading = ref(false)
const role = ref(route.query.role || 'peer')
const auth = useAuthStore()

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== '')
})

const handleInput = (index, event) => {
  const value = event.target.value

  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    otpDigits.value[index] = ''
    return
  }

  // Auto-tab to next input
  if (value.length === 1 && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

const handleKeydown = (index, event) => {
  // Handle backspace
  if (event.key === 'Backspace' && otpDigits.value[index] === '' && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

const verifyOtp = async () => {
  if (!isOtpComplete.value || isLoading.value) return
  const otpCode = otpDigits.value.join('')
  isLoading.value = true
  try { 
    const isValid = /^\d{6}$/.test(otpCode)
    if (!isValid) throw new Error('invalid-otp')
    const result = await verify_otp({
      session_id: otp_session_id,
      code: otpCode
    })
     
    if (result.status === 200) {
      await auth.fetchUser()
      if (auth.hasRole("admin")) {
        router.push('/admin')
        return;
      } else if (auth.hasRole("peer")) {
        router.push('/')
        return;
      }
      else {
        router.push('/auth')
        return;
      }
    }
    else if (result.status === 400) {
      alert('Invalid OTP code. Please try again.')
      otpDigits.value = ['', '', '', '', '', '']
      otpInputs.value[0]?.focus()
      return;
    }
    else {
      router.push('/auth')
      return;
    }
  } catch (error) {
    console.error('OTP verification error:', error)
    alert('Invalid OTP code. Please try again.')
    otpDigits.value = ['', '', '', '', '', '']
    otpInputs.value[0]?.focus()
  } finally {
    isLoading.value = false
  }
}

const resendOtp = async () => {
  // final_draft behavior: simple alert
  alert('New OTP code has been sent to your email')
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  // Focus first input on mount
  otpInputs.value[0]?.focus()
})
</script>

<style scoped>
.otp-page {
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
  font-size: 1.8rem;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #111827;
}

.otp-inputs {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  width: 100%;
  gap: 8px;
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
  min-width: 150px;
}

button:hover:not(:disabled) {
  background-color: #374151;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:active:not(:disabled) {
  transform: scale(0.98);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.2);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
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
  padding: 8px;
  min-width: auto;
}

.back-button:hover {
  color: #111827;
  background: none;
  transform: none;
  box-shadow: none;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .container {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }

  .otp-form {
    padding: 30px 20px;
  }

  .otp-inputs {
    gap: 6px;
  }

  .otp-input {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>