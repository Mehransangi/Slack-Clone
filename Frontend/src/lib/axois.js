// https://slack-backend-hazel.vercel.app/api
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
// import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})