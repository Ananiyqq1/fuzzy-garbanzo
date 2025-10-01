import { defineStore } from "pinia";
import api from "@/common/axios";

export interface CurrentUser {
  user_id: string;
  username: string;
  name: string;
  institute_email: string;
  email?: string;
  overall_score: number;
  profile_photo: string;
  online_status: boolean;
  bio: string;
  roles: string[];
  interests: string[];
  created_at: string;
}

interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    loading: true,
  }),
  actions: {
    async fetchUser() {
      this.loading = true;
      try {
        const { data } = await api.get("/api/bridge/auth/me");
        this.user = data as CurrentUser;
      } catch (err) {
        this.user = null;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    hasRole: (state) => (role: string) => state.user?.roles.includes(role),
  },
});