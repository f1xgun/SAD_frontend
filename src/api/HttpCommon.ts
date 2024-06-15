import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    'Content-Type': 'application/json'
  }
})

export const csvApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    'Content-Type': 'text/csv'
  }
})

csvApi.interceptors.request.use(
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