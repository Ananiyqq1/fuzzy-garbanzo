import { defineStore } from "pinia";
import api from "@/common/axios";

const USER_STORAGE_KEY = "hilcoe_demo_current_user";
const TEMP_STORAGE_KEY = "hilcoe_demo_temp_signup";

const isBrowser = typeof window !== "undefined";

const loadFromStorage = <T>(key: string): T | null => {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Failed to parse storage key ${key}`, err);
    window.localStorage.removeItem(key);
    return null;
  }
};

const saveToStorage = (key: string, value: unknown) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to persist storage key ${key}`, err);
  }
};

const clearStorageKey = (key: string) => {
  if (!isBrowser) return;
  window.localStorage.removeItem(key);
};

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
export interface TempPayload {
  name: string;
  user_name: string;
  institute_email?: string;
  email: string;
  password: string;
  bio?: string;
  interests?: string[];
}

interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
  tempPayload: TempPayload | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: loadFromStorage<CurrentUser>(USER_STORAGE_KEY),
    loading: false,
    tempPayload: loadFromStorage<TempPayload>(TEMP_STORAGE_KEY),
  }),
  actions: {
    setTempPayload(payload: TempPayload) {
      this.tempPayload = payload;
      saveToStorage(TEMP_STORAGE_KEY, payload);
    },
    updateTempPayload(payload: Partial<TempPayload>) {
      if (!this.tempPayload) {
        this.tempPayload = {
          name: "",
          user_name: "",
          email: "",
          password: "",
          ...payload,
        } as TempPayload;
        saveToStorage(TEMP_STORAGE_KEY, this.tempPayload);
        return;
      }
      this.tempPayload = {
        ...this.tempPayload,
        ...payload,
      };
      saveToStorage(TEMP_STORAGE_KEY, this.tempPayload);
    },
    clearTempPayload() {
      this.tempPayload = null;
      clearStorageKey(TEMP_STORAGE_KEY);
    },
    setUser(payload: CurrentUser | null) {
      this.user = payload;
      this.loading = false;
      if (payload) {
        saveToStorage(USER_STORAGE_KEY, payload);
      } else {
        clearStorageKey(USER_STORAGE_KEY);
      }
    },
    completeLocalSignup(
      interests: string[] = [],
      bio?: string,
      options?: { preserveTemp?: boolean }
    ) {
      if (!this.tempPayload) {
        return null;
      }

      const temp = this.tempPayload;
      const preserveTemp = options?.preserveTemp ?? false;
      const generateId = () => {
        if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
          return crypto.randomUUID();
        }
        return `local-${Date.now()}`;
      };

      const mergedInterests = interests.length
        ? interests
        : Array.isArray(temp.interests)
        ? temp.interests
        : [];

      const user: CurrentUser = {
        user_id: generateId(),
        username:
          temp.user_name || (temp.email ? temp.email.split("@")[0] : "student"),
        name: temp.name || temp.user_name || "Student",
        institute_email: temp.institute_email || "",
        email: temp.email,
        overall_score: 0,
        profile_photo: "",
        online_status: true,
        bio: bio ?? temp.bio ?? "",
        roles: ["peer"],
        interests: mergedInterests,
        created_at: new Date().toISOString(),
      };

      this.setUser(user);
      if (!preserveTemp) {
        this.clearTempPayload();
      }
      return user;
    },
    logout() {
      this.user = null;
      this.tempPayload = null;
      this.loading = false;
      clearStorageKey(USER_STORAGE_KEY);
      clearStorageKey(TEMP_STORAGE_KEY);
    },
    async fetchUser() {
      if (this.loading) return;
      this.loading = true;
      try {
        const { data } = await api.get("/api/bridge/auth/me");
        this.user = data as CurrentUser;
      } catch (err) {
        console.warn("fetchUser failed", err);
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