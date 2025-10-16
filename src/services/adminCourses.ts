import api from '@/common/axios'

export interface CourseResponse {
  courseCode: string
  name: string
  description: string
  creditHour: number
  category: number | string  // Backend returns number (enum), we convert to string for display
}

export interface CoursePayload {
  CourseCode: string
  Name: string
  Description: string
  CreditHour: number
  Category: string
}

export async function fetchCourses() {
  const { data } = await api.get<CourseResponse[]>('/courses')
  return data
}

export async function createCourse(payload: CoursePayload) {
  const { data } = await api.post('/courses', payload)
  return data
}

export async function updateCourse(courseCode: string, payload: CoursePayload) {
  const { data } = await api.put(`/courses/${courseCode}`, payload)
  return data
}

export async function deleteCourse(courseCode: string) {
  await api.delete(`/courses/${courseCode}`)
}
