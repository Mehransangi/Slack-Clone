import { axiosInstance } from './axois.js'

export async function getStreamToken() {
    const res = await axiosInstance.get("/chat/token")
    return res.data
}