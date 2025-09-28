<template>
  <form @submit.prevent="submit">
    <h2>Sign In</h2>
    <AppInput v-model="email" label="Institute Email" placeholder="you@hilcoe.edu" :error="emailError" />
    <AppInput v-model="password" label="Password" type="password" :error="passwordError" />
    <div class="row">
      <router-link to="/forgot-password">Forgot your password?</router-link>
    </div>
    <AppButton type="submit">Sign In</AppButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import AppInput from '../common/AppInput.vue';
import AppButton from '../common/AppButton.vue';

const email = ref('');
const password = ref('');
const emailError = computed(() => (!email.value.includes('@') ? 'Please enter a valid email address.' : ''));
const passwordError = computed(() => (password.value.length < 8 ? 'Password must be at least 8 characters long.' : ''));

const router = useRouter();
// const auth = useAuthStore();

async function submit() {
  // if (emailError.value || passwordError.value) return;
  // try {
    await auth.signIn({ email: email.value, password: password.value });
    // if check otp verified 
    router.push(email.value.includes('admin') ? '/admin/dashboard' : '/student/dashboard');
  // } catch (e) {
    // alert(e.message);
  // }
}
</script>