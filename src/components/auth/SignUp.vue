<template>
  <form @submit.prevent="submit">
    <h2>Create Account</h2>
    <AppInput v-model="name" label="Full Name" :error="nameError" />
    <AppInput v-model="idNumber" label="Student/Staff ID" :error="idError" />
    <AppInput v-model="email" label="Institute Email" :error="emailError" />
    <AppInput v-model="password" label="Password" type="password" :error="passwordError" />
    <AppButton type="submit">Sign Up</AppButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import AppInput from '../common/AppInput.vue';
import AppButton from '../common/AppButton.vue';

const name = ref('');
const idNumber = ref('');
const email = ref('');
const password = ref('');

const nameError = computed(() => (name.value.trim().length < 2 ? 'Name must be at least 2 characters long.' : ''));
const idError = computed(() => (!/^\w{2,}$/.test(idNumber.value) ? 'Please enter a valid ID number.' : ''));
const emailError = computed(() => (!email.value.includes('@') ? 'Please enter a valid email address.' : ''));
const passwordError = computed(() => (password.value.length < 8 ? 'Password must be at least 8 characters long.' : ''));

const router = useRouter();
const auth = useAuthStore();

async function submit() {
  // if (nameError.value || idError.value || emailError.value || passwordError.value) return;
  // await auth.signUp({ name: name.value, idNumber: idNumber.value, email: email.value, password: password.value });
  router.push('/otp');
}
</script>