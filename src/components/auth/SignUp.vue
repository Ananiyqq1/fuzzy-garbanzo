<template>
  <form @submit.prevent="submit" class="auth-form">
    <div class="form-header">
      <h1>Create Account</h1>
    </div>

    <div class="form-body" role="presentation">
      <div class="form-body-inner">
        <div class="role-selector" role="group" aria-label="Account type">
          <div class="role-option selected" aria-selected="true">
            <div class="role-icon"><i class="fas fa-user-graduate"></i></div>
            <div>Student</div>
          </div>
        </div>

        <div class="form-field">
          <label for="signup-name">Full Name</label>
          <input
            type="text"
            id="signup-name"
            name="fullName"
            v-model="name"
            placeholder="Full Name"
            required
            minlength="2"
            autocomplete="name"
          />
          <div class="error-message" :class="{ show: nameError }">
            {{ nameError }}
          </div>
        </div>

        <div class="form-field">
          <label for="signup-username">Username</label>
          <input
            type="text"
            id="signup-username"
            name="username"
            v-model="username"
            placeholder="Username"
            required
            minlength="3"
            autocomplete="off"
          />
          <div class="error-message" :class="{ show: usernameError }">
            {{ usernameError }}
          </div>
        </div>

        <div class="form-field">
          <label for="signup-personal-email">Personal Email</label>
          <input
            type="email"
            id="signup-personal-email"
            name="personalEmail"
            v-model="personalEmail"
            placeholder="Personal Email"
            autocomplete="email"
            inputmode="email"
          />
          <div class="error-message" :class="{ show: personalEmailError }">
            {{ personalEmailError }}
          </div>
        </div>

        <div class="form-field">
          <label for="signup-institute-email">Institute Email</label>
          <input
            type="email"
            id="signup-institute-email"
            name="instituteEmail"
            v-model="instituteEmail"
            placeholder="Institute Email"
            required
            autocomplete="email"
            inputmode="email"
          />
          <div class="error-message" :class="{ show: instituteEmailError }">
            {{ instituteEmailError }}
          </div>
        </div>

        <div class="form-field">
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
        </div>

        <div class="form-field">
          <label for="signup-bio">Bio</label>
          <textarea
            id="signup-bio"
            name="bio"
            v-model="bio"
            placeholder="Share a short bio about yourself"
            rows="3"
          ></textarea>
          <div class="helper-text">Optional · Let peers know more about you.</div>
        </div>
      </div>

      <button type="submit" :disabled="!isFormValid || isLoading">
        <span v-if="isLoading">Creating Account...</span>
        <span v-else>Sign Up</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { useSignUpData } from '../../composables/useSignUpData'

const { signUpData, setSignUpData } = useSignUpData()

const name = ref(signUpData.name)
const username = ref(signUpData.username)
const instituteEmail = ref(signUpData.instituteEmail)
const personalEmail = ref(signUpData.personalEmail)
const password = ref('')
const bio = ref(signUpData.bio)
const isLoading = ref(false)

const router = useRouter()
const auth = useAuthStore()

const nameError = computed(() => {
  if (!name.value) return ''
  if (name.value.trim().length < 2) return 'Name must be at least 2 characters long.'
  return ''
})

const usernameError = computed(() => {
  if (!username.value) return ''
  if (username.value.trim().length < 3) return 'Username must be at least 3 characters long.'
  return ''
})

const instituteEmailError = computed(() => {
  if (!instituteEmail.value) return ''
  if (!instituteEmail.value.includes('@')) return 'Please enter a valid institute email address.'
  return ''
})

const personalEmailError = computed(() => {
  if (!personalEmail.value) return ''
  if (!personalEmail.value.includes('@')) return 'Please enter a valid personal email address.'
  return ''
})

const passwordError = computed(() => {
  if (!password.value) return ''
  if (password.value.length < 8) return 'Password must be at least 8 characters long.'
  return ''
})

const isFormValid = computed(() => {
  return (
    name.value &&
    username.value &&
    instituteEmail.value &&
    password.value &&
    !nameError.value &&
    !usernameError.value &&
    !instituteEmailError.value &&
    !passwordError.value
  )
})

async function submit() {
  if (!isFormValid.value || isLoading.value) return

  try {
    auth.setTempPayload({
      name: name.value.trim(),
      user_name: username.value.trim(),
      institute_email: instituteEmail.value.trim(),
      email: personalEmail.value.trim(),
      password: password.value
    })

    setSignUpData({
      name: name.value.trim(),
      username: username.value.trim(),
      instituteEmail: instituteEmail.value.trim(),
      personalEmail: personalEmail.value.trim(),
      bio: bio.value.trim()
    })

    router.push('/auth/preferences')
  } catch (error) {
    console.error('Sign up navigation error:', error)
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
.auth-form {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 50px 40px;
  height: 100%;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
}

.form-header {
  width: 100%;
  margin-bottom: 0.5rem;
}

.form-header h1 {
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
}


.form-body {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.form-body::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.form-body-inner {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.form-field:last-of-type {
  margin-bottom: 0;
}

button {
  border-radius: 20px;
  border: 1px solid #111827;
  background-color: #111827;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 1rem;
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

.auth-form label {
  font-size: 12px;
  color: #4b5563;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
}

.auth-form input,
.auth-form select,
.auth-form textarea {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 14px;
}

.auth-form textarea {
  resize: vertical;
  min-height: 96px;
  font-size: 14px;
}

.auth-form textarea::placeholder {
  font-size: 14px;
}

.auth-form input:focus,
.auth-form select:focus,
.auth-form textarea:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.1);
}

.auth-form input:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
}

.helper-text {
  font-size: 12px;
  color: #6b7280;
  text-align: left;
  width: 100%;
  margin-top: -4px;
  margin-bottom: 12px;
}

.error-message {
  color: #ef4444;
  font-size: 12px;
  min-height: 16px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.error-message.show {
  opacity: 1;
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

@media (max-width: 1024px) {
  .auth-form {
    padding: 0 32px 32px;
  }

  .form-body {
    padding-right: 0;
  }
}

@media (max-width: 640px) {
  .auth-form {
    padding: 0 24px 28px;
  }

  .form-body {
    padding-right: 0;
  }
}
</style>