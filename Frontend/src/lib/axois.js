// https://slack-backend-hazel.vercel.app/api
import axios from 'axios'

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:8080/api' : 'https://slack-backend-hazel.vercel.app/api'

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})