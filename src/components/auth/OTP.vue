<template>
  <div>
    <h1>HiLCoE Peer - OTP Verification</h1>
    <h2>Student Account</h2>
    <p>Enter the 6-digit code sent to your email</p>
    <form @submit.prevent="verify">
      <AppInput v-model="code" label="OTP Code" placeholder="______" />
      <AppButton type="submit">Verify</AppButton>
    </form>
    <div class="row">
      <span>Didn't receive the code?</span>
      <AppButton variant="text" @click="resend">Resend</AppButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import AppInput from '../common/AppInput.vue';
import AppButton from '../common/AppButton.vue';

const code = ref('');
const router = useRouter();
const auth = useAuthStore();

async function verify() {
  try {
    await auth.verifyOtp(code.value);
    router.push('/sign');
  } catch (e) {
    alert('Invalid code');
  }
}

function resend() {
  // Could call sendResetCode or dedicated resend
  alert('Code resent');
}
</script>