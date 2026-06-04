/**
 * API Integration Wrapper
 * Routes API calls to mock client while system is in standby mode
 * Will switch to real APIClient once system sync is complete
 */

import { mockAPIClient } from './mock'

// Feature flag: set to false to enable real API calls
const USE_MOCK_API = true

const apiClient = USE_MOCK_API ? mockAPIClient : null

// Main integration exports
export const InvokeLLM = async (config) => {
  if (USE_MOCK_API) {
    return apiClient.invokeLLM(config)
  }
  // TODO: Connect to real LLM endpoint
  throw new Error('LLM API not configured')
}

export const GetAgents = async () => {
  if (USE_MOCK_API) {
    return apiClient.getAgents()
  }
  // TODO: Connect to real agents endpoint
  throw new Error('Agents API not configured')
}

export const GetTasks = async () => {
  if (USE_MOCK_API) {
    return apiClient.getTasks()
  }
  // TODO: Connect to real tasks endpoint
  throw new Error('Tasks API not configured')
}

export const CreateTask = async (taskData) => {
  if (USE_MOCK_API) {
    return apiClient.createTask(taskData)
  }
  // TODO: Connect to real task creation endpoint
  throw new Error('Task creation API not configured')
}

export const UpdateTask = async (id, updates) => {
  if (USE_MOCK_API) {
    return apiClient.updateTask(id, updates)
  }
  // TODO: Connect to real task update endpoint
  throw new Error('Task update API not configured')
}

export const CreateOrchestrationPlan = async (taskData) => {
  if (USE_MOCK_API) {
    return apiClient.createOrchestrationPlan(taskData)
  }
  // TODO: Connect to real orchestration endpoint
  throw new Error('Orchestration API not configured')
}

export default {
  InvokeLLM,
  GetAgents,
  GetTasks,
  CreateTask,
  UpdateTask,
  CreateOrchestrationPlan,
  USE_MOCK_API,
  apiClient
}
