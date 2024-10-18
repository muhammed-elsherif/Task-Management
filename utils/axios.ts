import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Adjust according to your backend URL
  withCredentials: true // Ensure credentials are sent
})

instance.interceptors.request.use(
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

export default instance
