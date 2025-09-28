<template>
  <div>
    <h1>HiLCoE Peer - Course Preferences</h1>
    <h2>Select Your Course Preferences</h2>
    <p>Choose the courses you're interested in to personalize your learning experience. Select at least 3 to continue.</p>

    <p>Selection Progress: {{ selected.length }}/8 courses selected</p>
    <small>Minimum: 2 courses • Maximum: 6 courses</small>

    <div class="categories">
      <section v-for="cat in categories" :key="cat.title" class="cat">
        <h3>{{ cat.title }}</h3>
        <ul>
          <li v-for="c in cat.courses" :key="c">
            <label>
              <input type="checkbox" :value="c" v-model="selected" :disabled="isDisabled(c)" />
              {{ c }}
            </label>
          </li>
        </ul>
      </section>
    </div>

    <div class="actions">
      <AppButton variant="text" @click="skip">Skip for Now</AppButton>
      <AppButton :disabled="selected.length < 3" @click="continueOtp">Continue to Otp Verification</AppButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppButton from '../common/AppButton.vue';

const router = useRouter();
const selected = ref([]);

const categories = [
  { title: 'Programming & Software Development', courses: [
    'Programming I', 'Programming II', 'Data Structures & Algorithms',
    'Object-Oriented Programming', 'Windows Programming',
    'Object Oriented Software Engineering', 'Compiler Design', 'Software Testing'
  ]},
  { title: 'Databases and Data Management', courses: [
    'Database Management Systems', 'Database Programming & Admin', 'Data Mining', 'Information Retrieval'
  ]},
  { title: 'Systems & Infrastructure', courses: [
    'Introduction to Unix', 'Computer Organization & Assembly Language Programming',
    'Operating Systems', 'Computer Networks', 'Network Administration', 'Computer Systems Security', 'UNIX System Administration', 'Logic Design'
  ]},
  { title: 'Specialized & Emerging Areas', courses: [
    'Introduction to Emerging Techologies', 'Artificial Intelligence',
    'Geographic Information Systems', 'Computer Graphics'
  ]},
  { title: 'Web & Mobile Development', courses: [
    'Web Design & Development I', 'Web Design & Development II', 'Mobile Application'
  ]},
  { title: 'ICT Management & Research', courses: [
    'ICT Fundamentals', 'Systems Analysis & Design', 'Focusing Areas on ICT',
    'IT Research Methods', 'IT Project Management'
  ]},
];

function isDisabled(val) {
  return selected.value.length >= 6 && !selected.value.includes(val);
}

function skip() {
  router.push('/student/dashboard');
}

function continueOtp() {
  // Save preferences then go to OTP if needed
  router.push('/otp');
}
</script>

<style scoped>
.categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.cat { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
.actions { display: flex; gap: 12px; margin-top: 16px; }
</style>