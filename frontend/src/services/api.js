import axios from 'axios'
import { env } from '@/config/env'

/**
 * Single axios instance for the whole app. Import this instead of calling axios
 * directly so base URL / headers / interceptors stay in one place.
 *
 * Note there is deliberately no default Content-Type: axios infers
 * application/json for plain objects and multipart/form-data (with the correct
 * boundary) for FormData. Pinning it here would corrupt the resume upload.
 */
export const api = axios.create({
  baseURL: env.apiUrl,
})

/**
 * Error shape the whole app can rely on, whatever went wrong underneath.
 */
export class ApiClientError extends Error {
  constructor(message, { fieldErrors, code, status } = {}) {
    super(message)
    this.name = 'ApiClientError'
    this.fieldErrors = fieldErrors
    this.code = code
    this.status = status
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data

    if (data?.message) {
      return Promise.reject(
        new ApiClientError(data.message, {
          fieldErrors: data.fieldErrors,
          code: data.code,
          status: error.response.status,
        })
      )
    }

    // No structured body — the server is unreachable, timed out, or returned
    // something unexpected. Don't surface an axios internal to the user.
    return Promise.reject(
      new ApiClientError(
        'We couldn’t reach the server. Please check your connection and try again.',
        { code: 'NETWORK_ERROR', status: error.response?.status }
      )
    )
  }
)
