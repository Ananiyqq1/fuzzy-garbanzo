import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    loading: false,
    modals: {
      sessionDetails: null,
      sessionMaterials: null,
      sessionFeedback: null,
      studyRoomChat: null,
      courseEvaluation: null,
      createSession: false,
      createStudyGroup: false, // New modal for creating study groups
      viewEvaluation: null, // New modal for viewing submitted evaluations
      editCourse: false,
      topicEditor: false,
      userEditor: false,
    },
    toasts: [],
  }),
  actions: {
    setLoading(v) { this.loading = v; },
    openModal(name, payload) {
      this.modals[name] = payload || true;
    },
    closeModal(name) {
      this.modals[name] = null;
    },
    notify(message, type = 'info') {
      const id = Date.now();
      this.toasts.push({ id, message, type });
      setTimeout(() => { this.toasts = this.toasts.filter(t => t.id !== id); }, 3000);
      console.log(`[${type}] ${message}`);
    },
  },
});