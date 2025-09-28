import { defineStore } from 'pinia';
import { useUIStore } from './useUIStore'; // Import UI store for notifications/loading
import axios from 'axios';


export const useStudentStore = defineStore('student', {
  state: () => ({
    courses: [],
    sessions: [], // For dashboard upcoming sessions
    allSessions: [], // For MySessions page
    assignments: [],
    studyGroups: [], // For dashboard
    allStudyGroups: [], // For StudyRooms page
    resources: [], // For Resources page
    coursesForEvaluation: [], // For Evaluations page
    submittedEvaluations: [], // For Evaluations page
  }),
  actions: {
    async loadDashboard() {
      const ui = useUIStore();
      ui.setLoading(true);

        const response = await axios.get('http://192.168.26.144:7027/api/Rooms?category=0'); // Replace with your API endpoint
        this.studyGroups = response.data
      // Simulate API call
      this.courses = [
        { id: 1, title: 'CS201 - Data Structures', code: 'CS201' },
        { id: 2, title: 'CS202 - Database Systems', code: 'CS202' },
        { id: 3, title: 'SE301 - Software Engineering', code: 'SE301' },
      ];
      this.sessions = [
        { id: 1, title: 'Web Development Project Meeting', status: 'Upcoming', datetime: 'Friday, 10:00 AM - 11:30 AM', type: 'Virtual Session', participants: ['AB','CD','EF'], description: 'Planning session for the group project. We\'ll assign tasks and set milestones.' },
        { id: 2, title: 'Data Structures Review - Trees', status: 'Upcoming', datetime: 'Monday, 02:00 PM - 03:00 PM', type: 'Study Session', participants: ['You', 'John'], description: 'Review session on tree data structures.' },
      ];
      this.assignments = [
        { id: 1, title: 'Data Structures - HW2', due: 'Oct 20' },
        { id: 2, title: 'DB Systems - Project Proposal', due: 'Oct 22' },
        { id: 3, title: 'Software Engineering - Design Doc', due: 'Nov 01' },
      ];
      this.studyGroups = [
        { id: 1, name: 'CS201 Study Group A', members: 4, topic: 'Data Structures' },
        { id: 2, name: 'Web Dev Project Team 3', members: 3, topic: 'Web Development Project' },
      ];
      console.log('Study Groups:', this.studyGroups);
      ui.setLoading(false);
    },

    async loadAllSessions() {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      this.allSessions = [
        { id: 1, title: 'Web Development Project Meeting', status: 'Upcoming', datetime: 'Friday, 10:00 AM - 11:30 AM', type: 'Virtual Session', participants: ['AB','CD','EF'], description: 'Planning session for the group project.' },
        { id: 2, title: 'Data Structures Review - Trees', status: 'Upcoming', datetime: 'Monday, 02:00 PM - 03:00 PM', type: 'Study Session', participants: ['You', 'John'], description: 'Review session on tree data structures.' },
        { id: 3, title: 'Database Normalization Workshop', status: 'Completed', datetime: 'Last Tuesday, 09:00 AM - 10:30 AM', type: 'Workshop', participants: ['You', 'Sarah', 'Mike'], description: 'Deep dive into database normalization forms.' },
        { id: 4, title: 'Intro to Agile Methodologies', status: 'Completed', datetime: 'Last Friday, 01:00 PM - 02:00 PM', type: 'Lecture', participants: ['You', 'Alex'], description: 'Overview of Agile and Scrum.' },
        { id: 5, title: 'Python Basics Refresher', status: 'Ongoing', datetime: 'Today, 11:00 AM - 12:00 PM', type: 'Tutorial', participants: ['You', 'Emily'], description: 'Interactive session on Python fundamentals.' },
      ];
      ui.setLoading(false);
    },

    async createSession(payload) {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const newSession = {
        id: Date.now(),
        title: payload.title,
        status: 'Upcoming',
        datetime: 'TBD', // Or generate a default date/time
        type: 'Virtual Session',
        participants: ['You'],
        description: payload.description,
      };
      this.sessions.push(newSession);
      this.allSessions.push(newSession); // Add to all sessions as well
      ui.setLoading(false);
      ui.notify('Session created successfully!', 'success');
    },

    async submitFeedback({ sessionId, rating, comments, recommend }) {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log('Feedback submitted:', { sessionId, rating, comments, recommend });
      // In a real app, this would send data to a backend
      ui.setLoading(false);
    },

    async loadResources() {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      this.resources = [
        { id: 1, title: 'CS201 Lecture 1 Slides', courseId: 1, courseTitle: 'CS201 - Data Structures', type: 'pdf', actionLabel: 'Download', url: '/mocks/CS201_Lec1_Slides.pdf' },
        { id: 2, title: 'CS202 Chapter 3 Notes', courseId: 2, courseTitle: 'CS202 - Database Systems', type: 'document', actionLabel: 'View', url: '/mocks/CS202_Ch3_Notes.docx' },
        { id: 3, title: 'Software Design Patterns Video', courseId: 3, courseTitle: 'SE301 - Software Engineering', type: 'video', actionLabel: 'Watch', url: 'https://www.youtube.com/watch?v=some_video_id' },
        { id: 4, title: 'External Article: Big O Notation', courseId: 1, courseTitle: 'CS201 - Data Structures', type: 'link', actionLabel: 'Open', url: 'https://example.com/big-o-notation' },
        { id: 5, title: 'CS201 Lab 1 Instructions', courseId: 1, courseTitle: 'CS201 - Data Structures', type: 'pdf', actionLabel: 'Download', url: '/mocks/CS201_Lab1.pdf' },
      ];
      ui.setLoading(false);
    },

    // async loadAllStudyGroups() {
    //   const ui = useUIStore();
    //   ui.setLoading(true);
    //   await new Promise(resolve => setTimeout(resolve, 500));
    //   this.allStudyGroups = [
    //     { id: 1, name: 'CS201 Study Group A', members: 4, topic: 'Data Structures', isJoined: true },
    //     { id: 2, name: 'Web Dev Project Team 3', members: 3, topic: 'Web Development Project', isJoined: true },
    //     { id: 3, name: 'Database Enthusiasts', members: 7, topic: 'Database Systems', isJoined: false },
    //     { id: 4, name: 'Algorithms Practice', members: 5, topic: 'Algorithms', isJoined: false },
    //   ];
    //   ui.setLoading(false);
    // }
    
    async loadAllStudyGroups() {
  const ui = useUIStore();
  ui.setLoading(true);

  try {
    // Send GET request to fetch study groups from the API
    const response = await axios.get('http://192.168.26.144:7027/api/Rooms?category=0'); // Replace with your API endpoint

    // Update the state with the fetched data
    this.allStudyGroups = response.data; // Assuming the API returns an array of study groups
  } catch (error) {
    console.error('Error loading study groups:', error);
    // Handle error (e.g., show a notification or set an error state)
  } finally {
    ui.setLoading(false);
  }
}

    ,

    async createStudyGroup(payload) {
      const ui = useUIStore();
      ui.setLoading(true);
     
      await new Promise(resolve => setTimeout(resolve, 300));
     
      const newGroup = {
        id: Date.now(),
        name: payload.name,
        topic: payload.topic,
        description: payload.description,
        members: 1,
        isJoined: true,
        participants: ['You'], // Initial participant
      };
     
      this.studyGroups.push(newGroup); // Add to dashboard list
      this.allStudyGroups.push(newGroup); // Add to all study groups list
   
   
      ui.setLoading(false);
   
   
    },

    async joinStudyGroup(groupId) {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const group = this.allStudyGroups.find(g => g.id === groupId);
      if (group && !group.isJoined) {
        group.isJoined = true;
        group.members++;
        if (!group.participants.includes('You')) {
          group.participants.push('You');
        }
      }
      ui.setLoading(false);
    },

    async loadCoursesForEvaluation() {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      this.coursesForEvaluation = [
        { id: 1, title: 'CS201 - Data Structures', code: 'CS201', instructor: 'Dr. Abebe Kebede' },
        { id: 2, title: 'CS202 - Database Systems', code: 'CS202', instructor: 'Prof. Genet Tadesse' },
      ];
      // Filter out courses that have already been evaluated
      const submittedCourseIds = new Set(this.submittedEvaluations.map(e => e.courseId));
      this.coursesForEvaluation = this.coursesForEvaluation.filter(c => !submittedCourseIds.has(c.id));
      ui.setLoading(false);
    },

    async loadSubmittedEvaluations() {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      this.submittedEvaluations = [
        {
          id: 101,
          courseId: 3,
          courseTitle: 'SE301 - Software Engineering',
          submissionDate: '2023-11-15',
          ratings: { overall: 4, content: 5, instructor: 4 },
          comments: 'Very insightful course, learned a lot about modern software development practices. The instructor was engaging.',
          recommend: true,
        },
      ];
      ui.setLoading(false);
    },

    async submitCourseEvaluation(payload) {
      const ui = useUIStore();
      ui.setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      console.log('Course evaluation submitted:', payload);
      const course = this.courses.find(c => c.id === payload.courseId);
      this.submittedEvaluations.push({
        id: Date.now(),
        courseId: payload.courseId,
        courseTitle: course ? `${course.title}` : `Course ID ${payload.courseId}`,
        submissionDate: new Date().toISOString().split('T')[0],
        ratings: payload.ratings,
        comments: payload.comments,
        recommend: payload.recommend,
      });
      // Remove from coursesForEvaluation after submission
      this.coursesForEvaluation = this.coursesForEvaluation.filter(c => c.id !== payload.courseId);
      ui.setLoading(false);
    },
  },
});