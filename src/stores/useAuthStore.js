import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    userRole: null
  }),

  getters: {
    isAdmin: (state) => state.userRole === 'admin',
    isStudent: (state) => state.userRole === 'student'
  },

  actions: {
    async login(credentials) {
      // Mock login - in real app, call API
      // For demo, assume success with role from credentials or fixed
      this.isAuthenticated = true
      this.user = { id: 1, name: 'User', email: credentials.email }
      this.userRole = credentials.role || 'student' // Default to student
      // In real app, store token in localStorage
      localStorage.setItem('authToken', 'mock-token')
      localStorage.setItem('userRole', this.userRole)
    },

    logout() {
      this.isAuthenticated = false
      this.user = null
      this.userRole = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('userRole')
    },

    initializeAuth() {
      const token = localStorage.getItem('authToken')
      const role = localStorage.getItem('userRole')
      if (token && role) {
        this.isAuthenticated = true
        this.userRole = role
        // Fetch user data if needed
      }
    }
  }
})