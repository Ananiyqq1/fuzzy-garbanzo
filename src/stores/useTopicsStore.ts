import { defineStore } from 'pinia'
import type { Topic } from '@/data/mockTopics'
import * as topicsApi from '@/services/adminTopics'

interface TopicsState {
  topics: Topic[]
  isLoading: boolean
  error: string | null
}

export const useTopicsStore = defineStore('topics', {
  state: (): TopicsState => ({
    topics: [],
    isLoading: false,
    error: null,
  }),
  
  getters: {
    allTopics: (state) => state.topics,
    
    getTopicById: (state) => (id: string) => {
      return state.topics.find((t) => t.topicId === id)
    },
    
    getTopicsByCourse: (state) => (courseCode: string) => {
      return state.topics.filter((t) => t.courseCode === courseCode)
    },
    
    topicCount: (state) => state.topics.length,
  },
  
  actions: {
    async fetchTopics() {
      this.isLoading = true
      this.error = null
      try {
        const response = await topicsApi.fetchTopics()
        
        // Backend response already matches frontend format
        this.topics = response.map(topic => ({
          topicId: topic.topicId,
          name: topic.name,
          description: topic.description,
          courseCode: topic.courseCode,
        }))
        
        this.isLoading = false
        return this.topics
      } catch (error: any) {
        this.error = error?.message || 'Failed to fetch topics'
        this.isLoading = false
        throw error
      }
    },
    
    async createTopic(topic: Omit<Topic, 'topicId'>) {
      this.isLoading = true
      this.error = null
      try {
        const payload: topicsApi.TopicPayload = {
          CourseCode: topic.courseCode,
          Name: topic.name,
          Description: topic.description,
        }
        
        const response = await topicsApi.createTopic(payload)
        
        const newTopic: Topic = {
          topicId: response.topicId,
          name: response.name,
          description: response.description,
          courseCode: response.courseCode,
        }
        
        this.topics.push(newTopic)
        this.isLoading = false
        return newTopic
      } catch (error: any) {
        this.error = error?.response?.data?.message || error?.message || 'Failed to create topic'
        this.isLoading = false
        throw error
      }
    },
    
    async updateTopic(topicId: string, updates: Partial<Omit<Topic, 'topicId'>>) {
      this.isLoading = true
      this.error = null
      try {
        const currentTopic = this.topics.find((t) => t.topicId === topicId)
        if (!currentTopic) {
          throw new Error('Topic not found')
        }
        
        const updatedTopic = { ...currentTopic, ...updates }
        
        const payload: topicsApi.TopicPayload = {
          CourseCode: updatedTopic.courseCode,
          Name: updatedTopic.name,
          Description: updatedTopic.description,
        }
        
        const response = await topicsApi.updateTopic(topicId, payload)
        
        const index = this.topics.findIndex((t) => t.topicId === topicId)
        if (index !== -1) {
          this.topics[index] = {
            topicId: response.topicId,
            name: response.name,
            description: response.description,
            courseCode: response.courseCode,
          }
        }
        
        this.isLoading = false
        return this.topics[index]
      } catch (error: any) {
        this.error = error?.response?.data?.message || error?.message || 'Failed to update topic'
        this.isLoading = false
        throw error
      }
    },
    
    async deleteTopic(topicId: string) {
      this.isLoading = true
      this.error = null
      try {
        await topicsApi.deleteTopic(topicId)
        
        const index = this.topics.findIndex((t) => t.topicId === topicId)
        if (index !== -1) {
          this.topics.splice(index, 1)
        }
        
        this.isLoading = false
      } catch (error: any) {
        this.error = error?.response?.data?.message || error?.message || 'Failed to delete topic'
        this.isLoading = false
        throw error
      }
    },
  },
})
