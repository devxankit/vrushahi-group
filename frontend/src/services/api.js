import axios from 'axios'
import { env } from '@/config/env'

// Single axios instance for the whole app. Import this instead of
// calling axios directly so base URL / auth headers / interceptors
// stay in one place.
export const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralised place to handle 401s, logging, toasts, etc. as the
    // app grows.
    return Promise.reject(error)
  }
)
