import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://DIM-assessment.test/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor to add authorization token to requests
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('bearer')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default instance
