import axios from 'axios'

/**
 * Get the API URL based on the environment
 * Server-side uses API_URL (Docker internal: backend:8000)
 * Client-side uses NEXT_PUBLIC_API_URL (Browser: localhost:8001)
 */
export function getApiUrl(): string {
  // Server-side (SSR)
  if (typeof window === 'undefined') {
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  }

  // Client-side (browser)
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'
}

const API_URL = getApiUrl()

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
