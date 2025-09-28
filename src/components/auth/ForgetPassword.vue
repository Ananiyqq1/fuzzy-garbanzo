<template>
  <div>
    <h1>HiLCoE Peer - Forgot Password</h1>
    <h2>Reset Password</h2>
    <ol>
      <li>Verify Email</li>
      <li>Verify OTP</li>
      <li>New Password</li>
    </ol>

    <div v-if="step===1">
      <AppInput v-model="email" label="Email Address" />
      <AppButton @click="send">Send Reset Code</AppButton>
    </div>

    <div v-else-if="step===2">
      <AppInput v-model="otp" label="Verification Code" />
      <AppButton @click="verify">Verify Code</AppButton>
    </div>

    <div v-else>
      <AppInput v-model="password" label="New Password" type="password" />
      <AppInput v-model="confirm" label="Confirm Password" type="password" />
      <AppButton @click="update">Update Password</AppButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';
import AppInput from '../common/AppInput.vue';
import AppButton from '../common/AppButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const auth = useAuthStore();
const step = ref(1);
const email = ref('');
const otp = ref('');
const password = ref('');
const confirm = ref('');

async function send() {
  await auth.sendResetCode(email.value);
  step.value = 2;
}
async function verify() {
  await auth.verifyOtp(otp.value);
  step.value = 3;
}
async function update() {
  if (password.value.length < 8) return alert('Password must be at least 8 characters long.');
  if (password.value !== confirm.value) return alert('Passwords do not match.');
  await auth.resetPassword({ newPassword: password.value });
  alert('Your password has been successfully reset!');
  router.push('/sign')
}
</script>