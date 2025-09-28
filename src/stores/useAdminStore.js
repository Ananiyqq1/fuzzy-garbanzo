import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [
      { id: 1, name: 'Alice Student', email: 'alice@hilcoe.edu', role: 'student' },
      { id: 2, name: 'Bob Admin', email: 'adminbob@hilcoe.edu', role: 'admin' },
    ],
    courses: [
      { id: 1, title: 'Data Structures', code: 'CS201', category: 'Programming' },
      { id: 2, title: 'Database Systems', code: 'CS202', category: 'Databases' },
    ],
    topics: [
      { id: 1, title: 'Sorting Algorithms', courseCode: 'CS201', type: 'Lecture Notes', description: '' },
      { id: 2, title: 'Relational Algebra', courseCode: 'CS202', type: 'Lecture Notes', description: '' },
    ],
    analytics: {
      activeUsers: 128,
      sessionsThisWeek: 34,
      resourcesUploaded: 76,
      weeklyActive: [40, 60, 80, 45, 70, 90, 55],
    },
  }),
  actions: {
    // Users
    loadUsers() {},
    async createUser(u) {
      this.users.push({ ...u, id: Date.now() });
    },
    async updateUser(u) {
      const i = this.users.findIndex(x => x.id === u.id);
      if (i >= 0) this.users[i] = { ...u };
    },
    async deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
    },

    // Courses
    loadCourses() {},
    
    async createCourse(c) {
      this.courses.push({ ...c, id: Date.now() });
    },
    async updateCourse(c) {
      const i = this.courses.findIndex(x => x.id === c.id);
      if (i >= 0) this.courses[i] = { ...c };
    },
    async deleteCourse(id) {
      this.courses = this.courses.filter(c => c.id !== id);
    },

    // Topics
    loadTopics() {},
    async createTopic(t) {
      this.topics.push({ ...t, id: Date.now() });
    },
    async updateTopic(t) {
      const i = this.topics.findIndex(x => x.id === t.id);
      if (i >= 0) this.topics[i] = { ...t };
    },
    async deleteTopic(id) {
      this.topics = this.topics.filter(t => t.id !== id);
    },

    // Analytics & Settings
    loadAnalytics() {},
    generateReport() {
      console.log('Report generated');
    },
    saveSettings(settings) {
      console.log('Settings saved', settings);
    },
    resetSettings() {
      console.log('Settings reset');
    },
  },
});