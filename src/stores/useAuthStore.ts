import { defineStore } from 'pinia';

export type UserRole = 'student' | 'admin';
export type OtpStatus = 'sent' | 'verified' | null;

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  otpStatus: OtpStatus;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface ResetPasswordPayload {
  newPassword: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    otpStatus: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },
  actions: {
    async signIn(payload: SignInPayload): Promise<boolean> {
      if (payload.email.endsWith('@hilcoe.edu') && payload.password.length >= 8) {
        const role: UserRole = payload.email.startsWith('admin') ? 'admin' : 'student';
        this.user = { id: 1, name: 'User', email: payload.email, role };
        this.token = 'mock-token';
        return true;
      }
      throw new Error('Invalid credentials');
    },
    async signUp(payload: SignUpPayload): Promise<boolean> {
      return true;
    },
    async sendResetCode(email: string): Promise<boolean> {
      this.otpStatus = 'sent';
      return true;
    },
    async verifyOtp(code: string | number): Promise<boolean> {
      if (String(code).length === 6) {
        this.otpStatus = 'verified';
        return true;
      }
      throw new Error('Invalid code');
    },
    async resetPassword(payload: ResetPasswordPayload): Promise<boolean> {
      if (payload.newPassword.length >= 8 && this.otpStatus === 'verified') {
        return true;
      }
      throw new Error('Unable to reset password');
    },
    signOut(): void {
      this.user = null;
      this.token = null;
      this.otpStatus = null;
    },
  },
});