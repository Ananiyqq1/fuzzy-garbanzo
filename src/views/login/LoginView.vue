<template>
  <div class="auth-layout">
    <section class="left">
      <h1>HiLCoE Peer - Sign In or Sign Up</h1>
      <p>Enter your credentials to start your journey with us</p>
      <div class="tabs">
        <button   @click="tab='sign-in'">Sign In</button>
        <button :class="['btn', variant]" @click="tab='sign-up'">Create Account</button>
      </div>
      <SignIn v-if="tab==='sign-in'" />
      <SignUp v-else />
      <p class="welcome">Welcome Back! To keep connected with us please login with your personal info</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SignIn from '../../components/auth/SignIn.vue';
import SignUp from '../../components/auth/SignUp.vue';

const tab = ref('sign-in');
</script>


<style scoped>
.auth-layout{
              background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            border-radius: 1.5rem;
            border: 1px solid rgba(229, 231, 235, 0.5);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            width: 768px;
            max-width: 100%;
            min-height: 580px;
}
</style>