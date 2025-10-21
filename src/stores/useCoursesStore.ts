import { defineStore } from 'pinia'
import type { Course } from '@/data/mockCourses'
import * as coursesApi from '@/services/adminCourses'

// Category mapping: backend uses numbers (enum), frontend uses strings
const categoryMap: Record<number, string> = {
  0: 'Programming',
  1: 'Databases',
  2: 'Systems',
  3: 'Web & Mobile',
  4: 'ICT & Research',
  5: 'Specialized'
}

const categoryReverseMap: Record<string, number> = {
  'Programming': 0,
  'Databases': 1,
  'Systems': 2,
  'Web & Mobile': 3,
  'ICT & Research': 4,
  'Specialized': 5
}

interface CoursesState {
  courses: Course[]
  isLoading: boolean
  error: string | null
}

export const useCoursesStore = defineStore('courses', {
  state: (): CoursesState => ({
    courses: [],
    isLoading: false,
    error: null,
  }),
  
  getters: {
    allCourses: (state) => state.courses,
    
    getCourseByCode: (state) => (code: string) => {
      return state.courses.find((c) => c.courseCode === code)
    },
    
    getCoursesByCategory: (state) => (category: string) => {
      return state.courses.filter((c) => c.category === category)
    },
    
    courseCount: (state) => state.courses.length,
  },
  
  actions: {
    async fetchCourses() {
      this.isLoading = true
      this.error = null
      try {
        const response = await coursesApi.fetchCourses()
        
        // Transform backend response to frontend format
        this.courses = response.map(course => ({
          courseCode: course.courseCode,
          name: course.name,
          description: course.description,
          creditHour: course.creditHour,
          category: this.mapCategoryToString(course.category)
        }))
        
        this.isLoading = false
        return this.courses
      } catch (error: any) {
        this.error = error?.message || 'Failed to fetch courses'
        this.isLoading = false
        throw error
      }
    },
    
    mapCategoryToString(category: number | string): Course['category'] {
      if (typeof category === 'string') {
        return category as Course['category']
      }
      const mapped = categoryMap[category] || 'programming'
      return mapped.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-') as Course['category']
    },
    
    mapCategoryToNumber(category: string): number {
      const normalized = category.toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ')
      for (const [key, value] of Object.entries(categoryReverseMap)) {
        if (key.toLowerCase().replace(/\s+&\s+/g, ' ').replace(/\s+/g, ' ') === normalized) {
          return value
        }
      }
      return 0 // Default to Programming
    },
    
    async createCourse(course: Omit<Course, 'courseCode'> & { courseCode: string }) {
      this.isLoading = true
      this.error = null
      try {
        const payload: coursesApi.CoursePayload = {
          CourseCode: course.courseCode,
          Name: course.name,
          Description: course.description,
          CreditHour: course.creditHour,
          Category: this.mapCategoryToNumber(course.category),
        }
        
        const response = await coursesApi.createCourse(payload)
        
        const newCourse: Course = {
          courseCode: response.courseCode,
          name: response.name,
          description: response.description,
          creditHour: response.creditHour,
          category: this.mapCategoryToString(response.category),
        }
        
        this.courses.push(newCourse)
        this.isLoading = false
        return newCourse
      } catch (error: any) {
        this.error = error?.response?.data?.message || error?.message || 'Failed to create course'
        this.isLoading = false
        throw error
      }
    },
    
    async updateCourse(courseCode: string, updates: Partial<Omit<Course, 'courseCode'>>) {
      this.isLoading = true
      this.error = null
      try {
        const currentCourse = this.courses.find((c) => c.courseCode === courseCode)
        if (!currentCourse) {
          throw new Error('Course not found')
        }
        
        const updatedCourse = { ...currentCourse, ...updates }
        
        const payload: coursesApi.CoursePayload = {
          CourseCode: updatedCourse.courseCode,
          Name: updatedCourse.name,
          Description: updatedCourse.description,
          CreditHour: updatedCourse.creditHour,
          Category: this.mapCategoryToNumber(updatedCourse.category),
        }
        
        const response = await coursesApi.updateCourse(courseCode, payload)
        
        const index = this.courses.findIndex((c) => c.courseCode === courseCode)
        if (index !== -1) {
          this.courses[index] = {
            courseCode: response.courseCode,
            name: response.name,
            description: response.description,
            creditHour: response.creditHour,
            category: this.mapCategoryToString(response.category),
          }
        }
        
        this.isLoading = false
        return this.courses[index]
      } catch (error: any) {
        this.error = error?.response?.data?.message || error?.message || 'Failed to update course'
        this.isLoading = false
        throw error
      }
    },
    
    async deleteCourse(courseCode: string) {
      this.isLoading = true
      this.error = null
      try {
        await coursesApi.deleteCourse(courseCode)
        
        const index = this.courses.findIndex((c) => c.courseCode === courseCode)
        if (index !== -1) {
          this.courses.splice(index, 1)
        }
        
        this.isLoading = false
      } catch (error: any) {
        this.error = error?.response?.data?.message || error?.message || 'Failed to delete course'
        this.isLoading = false
        throw error
      }
    },
  },
})
