import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";
import * as Sentry from "@sentry/react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat = () => {
    const { user } = useUser();
    const [chatClient, setChatClient] = useState(null);

    // ✅ keep only one client for the app lifetime
    const clientRef = useRef(StreamChat.getInstance(STREAM_API_KEY));

    const { data: tokenData, isLoading, error } = useQuery({
        queryKey: ["streamToken"],
        queryFn: getStreamToken,
        enabled: !!user?.id,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    useEffect(() => {
        if (!tokenData?.token || !user?.id) return;
        const client = clientRef.current;

        const initChat = async () => {
            try {
                // prevent duplicate connect
                if (client.userID) {
                    setChatClient(client);
                    return;
                }

                await client.connectUser(
                    {
                        id: user.id,
                        name: user.fullName || user.username || user.id,
                        image: user.imageUrl,
                    },
                    tokenData.token
                );

                setChatClient(client);
            } catch (err) {
                console.error(err);
                Sentry.captureException(err, {
                    tags: { component: "useStreamChat" },
                    extra: {
                        context: "stream_chat_connection",
                        userId: user?.id,
                        streamApiKey: STREAM_API_KEY ? "present" : "missing",
                    },
                });
            }
        };

        initChat();
    }, [tokenData?.token, user?.id]);

    return { chatClient, isLoading, error };
};
