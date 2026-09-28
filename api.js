import axios from 'axios'

const BASE_URL = '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // 2 min for LLM calls
})

export const checkHealth = () => api.get('/health')

export const getDemoReadme = () => api.get('/demo-readme')

export const uploadReadme = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/upload-readme', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const generatePitch = ({ documentation, sessionId, feedback, preferences }) =>
  api.post('/generate', {
    documentation,
    session_id: sessionId,
    feedback: feedback || null,
    preferences: preferences || null,
  })

export const regeneratePitch = ({ documentation, sessionId, feedback, preferences }) =>
  api.post('/regenerate', {
    documentation,
    session_id: sessionId,
    feedback: feedback || null,
    preferences: preferences || null,
  })

export const saveFeedback = ({ sessionId, feedback, slideNumber }) =>
  api.post('/feedback', {
    session_id: sessionId,
    feedback,
    slide_number: slideNumber || null,
  })

export const getMemories = (sessionId) => api.get(`/memories/${sessionId}`)

export default api
