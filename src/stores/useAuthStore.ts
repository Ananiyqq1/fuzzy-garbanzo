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
// export interface TempPayload {
//   name: string;
//   user_name: string;
//   institute_email?: string;
//   email: string;
//   password: string;
//   interests?: string[];
// }

interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
  //  tempPayload: TempPayload | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: {
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
      username: "dagm",
      name: "Dagmawi Asc",
      institute_email: "dagmawiaa84@gmail.com",
      overall_score: 4.2,
      profile_photo: "",
      online_status: true,
      bio: "I am a software developer with a passion for learning new technologies.",
      roles: ["peer"],
      interests: ["Computer Programming", "Logic Design"],
      created_at: "2023-10-01T12:00:00Z",
    },
    loading: true,
    // tempPayload: null,
  }),
  actions: {
    //  setTempPayload(payload: TempPayload) { 
      // this.tempPayload = payload;
    // },
    // clearTempPayload() {
    //   this.tempPayload = null;
    // },
    logout() {
      this.user = null;
      // this.tempPayload = null;
    },
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