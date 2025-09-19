import { ENV } from "./env.js";
import { StreamChat } from 'stream-chat'

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET)

export const uploadStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData)
    console.log(`User upserted: ${userData.name}`)
  } catch (error) {
    console.log(error)
  }
}

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId)
        console.log(`user deleted ${userId}`)
    } catch (error) {
        console.error(error)
    }
}

export const generateStreamToken = (userId) => {
    try {
        const uesrIdString = userId.toString()
        return streamClient.createToken(uesrIdString)
    } catch (error) {
        console.log(error)
    }
}