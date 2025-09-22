import { useUser } from '@clerk/clerk-react'
import { Component, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api'
import { StreamChat } from 'stream-chat'
import * as Sentry from '@sentry/react'

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

export const useStreamChat = () => {
    const { user } = useUser()
    const { chatClient, setChatClient } = useState(null)

    const { data: tokenData, isLoading: tokenLoading, error: tokenError } = useQuery({
        queryKey: ['streamToken'],
        queryFn: getStreamToken,
        enabled: !!user?.id,
    })

    useEffect(() => {
        if (!tokenData?.token || !user?.id || !STREAM_API_KEY) return
        const client = StreamChat.getInstance(STREAM_API_KEY)
        let cancelled = false

        const initChat = async () => {
            try {
                await client.connectUser({
                    id: user.id,
                    name: user.name,
                    image: user.imageUrl
                },
                    tokenData.token
                )
                if (!cancelled) {
                    setChatClient(client)
                }
            } catch (error) {
                console.log(error)
                Sentry.captureException(error, {
                    tags: { Component: "useStreamChat" },
                    extra: {
                        context: "stream_chat_connection",
                        userId: user?.id,
                        streamApiKey: STREAM_API_KEY ? "present" : "missing",
                    }
                })
            }
        }
        initChat()

        return () => {
            cancelled = true
            client.disconnectUser()
        }
    }, [tokenData?.token, user?.id])

    return { chatClient, isLoading: tokenLoading, error: tokenError }
}