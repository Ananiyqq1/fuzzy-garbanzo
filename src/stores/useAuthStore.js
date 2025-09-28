import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // { id, name, email, role: 'student' | 'admin' }
    token: null,
    otpStatus: null, // 'sent' | 'verified' | null
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    async signIn({ email, password }) {
      // TODO: replace with API
      if (email.endsWith('@hilcoe.edu') && password.length >= 8) {
        const role = email.startsWith('admin') ? 'admin' : 'student';
        this.user = { id: 1, name: 'User', email, role };
        this.token = 'mock-token';
        return true;
      }
      throw new Error('Invalid credentials');
    },
    async signUp(payload) {
      // TODO: API call
      return true;
    },
    async sendResetCode(email) {
      // TODO: API call
      this.otpStatus = 'sent';
      return true;
    },
    async verifyOtp(code) {
      if (String(code).length === 6) {
        this.otpStatus = 'verified';
        return true;
      }
      throw new Error('Invalid code');
    },
    async resetPassword({ newPassword }) {
      if (newPassword.length >= 8 && this.otpStatus === 'verified') {
        return true;
      }
      throw new Error('Unable to reset password');
    },
    signOut() {
      this.user = null;
      this.token = null;
      this.otpStatus = null;
    },
  },
});