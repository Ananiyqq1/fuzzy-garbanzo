import api from '@/common/axios'

export interface TopicResponse {
  topicId: string
  name: string
  description: string
  courseCode: string
}

export interface TopicPayload {
  CourseCode: string
  Name: string
  Description: string
}

export async function fetchTopics() {
  const { data } = await api.get<TopicResponse[]>('/topics')
  return data
}

export async function createTopic(payload: TopicPayload) {
  const { data } = await api.post('/topics', payload)
  return data
}

export async function updateTopic(topicId: string, payload: TopicPayload) {
  const { data } = await api.put(`/topics/${topicId}`, payload)
  return data
}

export async function deleteTopic(topicId: string) {
  await api.delete(`/topics/${topicId}`)
}
