<template>
  <div class="forgot-password-page">
    <div class="container">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i> Back
      </button>
      
      <div class="form-container">
        <h1>Forgot Password</h1>
        <p>{{ stepDescriptions[currentStep - 1] }}</p>
        
        <!-- Steps Indicator -->
        <div class="steps-container">
          <div 
            v-for="(stepLabel, index) in stepLabels" 
            :key="index"
            class="step"
            :class="{ 
              active: currentStep === index + 1, 
              completed: currentStep > index + 1 
            }"
          >
            <div class="step-number">
              <i v-if="currentStep > index + 1" class="fas fa-check"></i>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <div class="step-label">{{ stepLabel }}</div>
          </div>
        </div>

        <!-- Step 1: Email Verification -->
        <form v-if="currentStep === 1" @submit.prevent="sendResetCode" class="step-form">
          <label for="email">Institute Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email"
            placeholder="your.email@hilcoe.edu" 
            required 
          />
          <div class="error-message" :class="{ show: emailError }">
            {{ emailError }}
          </div>
          
          <button type="submit" :disabled="!email || isLoading">
            <span v-if="isLoading">Sending...</span>
            <span v-else>Send Reset Code</span>
          </button>
        </form>

        <!-- Step 2: OTP Verification -->
        <form v-else-if="currentStep === 2" @submit.prevent="verifyCode" class="step-form">
          <div class="otp-inputs">
            <input
              v-for="(digit, index) in otpDigits"
              :key="index"
              class="otp-input"
              type="text"
              maxlength="1"
              pattern="[0-9]"
              inputmode="numeric"
              v-model="otpDigits[index]"
              @input="handleOtpInput(index, $event)"
              @keydown="handleOtpKeydown(index, $event)"
              :ref="el => { if (el) otpInputs[index] = el }"
              :autofocus="index === 0"
            />
          </div>
          
          <button type="submit" :disabled="!isOtpComplete || isLoading">
            <span v-if="isLoading">Verifying...</span>
            <span v-else>Verify Code</span>
          </button>
          
          <div class="resend-option">
            Didn't receive the code? <a @click="resendCode">Resend</a>
          </div>
        </form>

        <!-- Step 3: New Password -->
        <form v-else @submit.prevent="updatePassword" class="step-form">
          <label for="new-password">New Password</label>
          <input 
            type="password" 
            id="new-password" 
            v-model="newPassword"
            placeholder="Enter new password" 
            required 
            minlength="8"
          />
          <div class="error-message" :class="{ show: passwordError }">
            {{ passwordError }}
          </div>
          
          <label for="confirm-password">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            v-model="confirmPassword"
            placeholder="Confirm new password" 
            required 
            minlength="8"
          />
          <div class="error-message" :class="{ show: confirmError }">
            {{ confirmError }}
          </div>
          
          <button type="submit" :disabled="!isPasswordValid || isLoading">
            <span v-if="isLoading">Updating...</span>
            <span v-else>Update Password</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref(1)
const email = ref('')
const otpDigits = ref(['', '', '', '', '', ''])
const otpInputs = ref([])
const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const stepLabels = ['Verify Email', 'Verify OTP', 'New Password']
const stepDescriptions = [
  'Enter your institute email to receive a reset code',
  'Enter the 6-digit code sent to your email',
  'Create a new secure password for your account'
]

// Validation
const emailError = computed(() => {
  if (!email.value) return ''
  if (!email.value.includes('@')) return 'Please enter a valid email address.'
  return ''
})

const passwordError = computed(() => {
  if (!newPassword.value) return ''
  if (newPassword.value.length < 8) return 'Password must be at least 8 characters long.'
  return ''
})

const confirmError = computed(() => {
  if (!confirmPassword.value) return ''
  if (newPassword.value !== confirmPassword.value) return 'Passwords do not match.'
  return ''
})

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== '')
})

const isPasswordValid = computed(() => {
  return newPassword.value && confirmPassword.value && 
         !passwordError.value && !confirmError.value
})

// Methods
const handleOtpInput = (index, event) => {
  const value = event.target.value
  
  if (!/^\d*$/.test(value)) {
    otpDigits.value[index] = ''
    return
  }
  
  if (value.length === 1 && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

const handleOtpKeydown = (index, event) => {
  if (event.key === 'Backspace' && otpDigits.value[index] === '' && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

const sendResetCode = async () => {
  if (!email.value || emailError.value || isLoading.value) return
  isLoading.value = true
  try {
    // final_draft behavior: proceed to OTP step
    await new Promise(r => setTimeout(r, 600))
    currentStep.value = 2
    setTimeout(() => { otpInputs.value[0]?.focus() }, 100)
  } catch (error) {
    console.error('Send reset code error:', error)
    alert('Failed to send reset code. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const verifyCode = async () => {
  if (!isOtpComplete.value || isLoading.value) return
  const otpCode = otpDigits.value.join('')
  isLoading.value = true
  try {
    const isValid = /^\d{6}$/.test(otpCode)
    if (!isValid) throw new Error('invalid-otp')
    currentStep.value = 3
  } catch (error) {
    console.error('OTP verification error:', error)
    alert('Invalid OTP code. Please try again.')
    otpDigits.value = ['', '', '', '', '', '']
    otpInputs.value[0]?.focus()
  } finally {
    isLoading.value = false
  }
}

const resendCode = async () => {
  alert('New reset code has been sent to your email')
}

const updatePassword = async () => {
  if (!isPasswordValid.value || isLoading.value) return
  isLoading.value = true
  try {
    await new Promise(r => setTimeout(r, 600))
    alert('Your password has been successfully reset!')
    router.push('/auth')
  } catch (error) {
    console.error('Update password error:', error)
    alert('Failed to update password. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.back()
  }
}
</script>

<style scoped>
.forgot-password-page {
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
  width: 450px;
  max-width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-container {
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
  color: #4b5563;
}

label {
  font-size: 12px;
  color: #4b5563;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 15px;
}

input {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  transition: all 0.3s ease;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  margin-top: 5px;
  display: none;
  text-align: left;
  width: 100%;
}

.error-message.show {
  display: block;
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

.steps-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  gap: 10px;
}

.step {
  text-align: center;
  flex: 1;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background-color: #111827;
  color: white;
}

.step.completed .step-number {
  background-color: #111827;
  color: white;
}

.step-label {
  font-size: 12px;
  color: #6b7280;
}

.step.active .step-label {
  color: #111827;
  font-weight: 500;
}

.step-form {
  width: 100%;
  margin-top: 20px;
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
  padding: 0;
  margin: 0;
}

.otp-input:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
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

/* Mobile responsive */
@media (max-width: 480px) {
  .container {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
  
  .form-container {
    padding: 30px 20px;
  }
  
  .steps-container {
    gap: 5px;
  }
  
  .step-number {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
  
  .step-label {
    font-size: 10px;
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
  
  button {
    padding: 10px 35px;
    font-size: 11px;
  }
}
</style>