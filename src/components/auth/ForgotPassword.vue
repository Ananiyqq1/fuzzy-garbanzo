<template>
  <div class="container">
    <button class="back-button" @click="$router.go(-1)">
      <i class="fas fa-arrow-left"></i> Back
    </button>
    
    <div class="form-container">
      <h1>Reset Password</h1>
      <p>Follow these steps to reset your password</p>
      
      <div class="steps-container">
        <div class="step" :class="{ active: currentStep === 1 }">
          <div class="step-number">1</div>
          <div class="step-title">Verify Email</div>
        </div>
        <div class="step" :class="{ active: currentStep === 2 }">
          <div class="step-number">2</div>
          <div class="step-title">Verify OTP</div>
        </div>
        <div class="step" :class="{ active: currentStep === 3 }">
          <div class="step-number">3</div>
          <div class="step-title">New Password</div>
        </div>
      </div>
      
      <!-- Step 1: Email Verification -->
      <div class="form-step" :class="{ active: currentStep === 1 }">
        <label for="email">Email Address</label>
        <input 
          v-model="formData.email" 
          type="email" 
          id="email" 
          placeholder="Enter your email address" 
          required 
        />
        <button @click="sendResetEmail">Send Reset Code</button>
      </div>
      
      <!-- Step 2: OTP Verification -->
      <div class="form-step" :class="{ active: currentStep === 2 }">
        <label for="otp">Verification Code</label>
        <div class="otp-inputs">
          <input 
            v-model="otpDigits[0]" 
            class="otp-input" 
            type="text" 
            maxlength="1" 
            pattern="[0-9]" 
            inputmode="numeric" 
            autofocus 
          />
          <input 
            v-model="otpDigits[1]" 
            class="otp-input" 
            type="text" 
            maxlength="1" 
            pattern="[0-9]" 
            inputmode="numeric" 
          />
          <input 
            v-model="otpDigits[2]" 
            class="otp-input" 
            type="text" 
            maxlength="1" 
            pattern="[0-9]" 
            inputmode="numeric" 
          />
          <input 
            v-model="otpDigits[3]" 
            class="otp-input" 
            type="text" 
            maxlength="1" 
            pattern="[0-9]" 
            inputmode="numeric" 
          />
          <input 
            v-model="otpDigits[4]" 
            class="otp-input" 
            type="text" 
            maxlength="1" 
            pattern="[0-9]" 
            inputmode="numeric" 
          />
          <input 
            v-model="otpDigits[5]" 
            class="otp-input" 
            type="text" 
            maxlength="1" 
            pattern="[0-9]" 
            inputmode="numeric" 
          />
        </div>
        <button @click="verifyResetCode">Verify Code</button>
      </div>
      
      <!-- Step 3: New Password -->
      <div class="form-step" :class="{ active: currentStep === 3 }">
        <label for="newPassword">New Password</label>
        <input 
          v-model="formData.newPassword" 
          type="password" 
          id="newPassword" 
          placeholder="Enter new password" 
          required 
        />
        <label for="confirmPassword">Confirm Password</label>
        <input 
          v-model="formData.confirmPassword" 
          type="password" 
          id="confirmPassword" 
          placeholder="Confirm new password" 
          required 
        />
        <button @click="updatePassword">Update Password</button>
      </div>
      
      <!-- Success Message -->
      <div class="success-message" v-if="showSuccess">
        <i class="fas fa-check-circle"></i> Your password has been successfully reset!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(1)
const showSuccess = ref(false)
const formData = reactive({
  email: '',
  newPassword: '',
  confirmPassword: ''
})
const otpDigits = ref(['', '', '', '', '', ''])

const sendResetEmail = () => {
  if (!formData.email) {
    alert('Please enter your email address')
    return
  }
  
  // Simulate sending email
  console.log(`Sending reset email to: ${formData.email}`)
  currentStep.value = 2
  
  // Simulate OTP for demo
  setTimeout(() => {
    alert('Demo: Your reset code is 123456')
  }, 1000)
}

const verifyResetCode = () => {
  const otp = otpDigits.value.join('')
  
  if (!otp || otp.length !== 6) {
    alert('Please enter the complete 6-digit verification code')
    return
  }
  
  // Simulate verification
  console.log(`Verifying OTP: ${otp}`)
  currentStep.value = 3
}

const updatePassword = () => {
  if (!formData.newPassword || !formData.confirmPassword) {
    alert('Please enter and confirm your new password')
    return
  }
  
  if (formData.newPassword !== formData.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  
  if (formData.newPassword.length < 8) {
    alert('Password must be at least 8 characters long')
    return
  }
  
  // Simulate password update
  console.log(`Updating password for ${formData.email}`)
  showSuccess.value = true
  
  // Redirect to login after success
  setTimeout(() => {
    router.push('/login')
  }, 2000)
}

// Auto-focus next input for OTP
const handleOtpInput = (index, event) => {
  if (event.target.value.length === 1 && index < 5) {
    otpDigits.value[index + 1] = ''
    document.querySelectorAll('.otp-input')[index + 1].focus()
  }
}
</script>

<style scoped>
/* Styles from forget_password.html */
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

label {
  font-size: 12px;
  color: #4b5563;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
}

input {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  transition: all 0.3s ease;
}

input:focus {
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

.steps-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
}

.step {
  text-align: center;
  flex: 1;
  position: relative;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background-color: #111827;
  color: white;
}

.step-title {
  font-size: 12px;
  color: #6b7280;
}

.step.active .step-title {
  color: #111827;
  font-weight: bold;
}

.step:not(:last-child):after {
  content: '';
  position: absolute;
  top: 15px;
  right: -50%;
  width: 100%;
  height: 2px;
  background-color: #e5e7eb;
  z-index: -1;
}

.success-message {
  background-color: #111827;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
}

.form-step {
  display: none;
  width: 100%;
}

.form-step.active {
  display: block;
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
</style>