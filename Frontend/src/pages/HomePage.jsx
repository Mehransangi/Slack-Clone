import "../styles/streamChatTheme.css"
import { UserButton } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useStreamChat } from '../hooks/useStreamChat.js'
// import PageLoader from '../components/PageLoader.jsx'
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { HashIcon, PlusIcon, UsersIcon } from "lucide-react"
import CreateChannelModel from "../components/CreateChannelModel.jsx"
import CustomChannelPreview from "../components/CustomChannelPreview.jsx"
import UsersList from "../components/UsersList.jsx"


const HomePage = () => {
  const [isCreatedModalOpen, setIsCreatedModalOpen] = useState(false)
  const [activeChannel, setActiveChannel] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const { chatClient, isLoading, error } = useStreamChat()

  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel")
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId)
        setActiveChannel(channel)
      }
    }
  }, [chatClient, searchParams])


  // if(isLoading || !chatClient) return <PageLoader />

  return (
    <div className='chat-wrapper'>
      {chatClient && (
        <Chat client={chatClient}>
          <div className="chat-container">
            {/* LEFT SIDEBAR */}
            <div className="str-chat__channel-list">
              <div className="team-channel-list">
                {/* HEADER */}
                <div className="team-channel-list__header gap-4">
                  <div className="brand-container">
                    <img src="/slack-logo.png" alt="Logo" className="brand-logo" />
                    <span className='brand-name'>Slap</span>
                  </div>
                  <div className="user-button-wrapper">
                    <UserButton />
                  </div>
                </div>
                {/* CHANNEL LIST */}
                <div className="team-channel-list__content">
                  <div className="create-channel-section">
                    <button onClick={() => setIsCreatedModalOpen(true)} className="create-channel-btn">
                      <PlusIcon className="size-4" />
                      <span>Create Channel</span>
                    </button>
                  </div>

                  {/* CHANNEL LIST */}
                  <ChannelList
                    filters={{ members: { $in: [chatClient.user?.id] } }}
                    options={{ state: true, watch: true }}
                    Preview={({ channel }) => (
                      <CustomChannelPreview
                        channel={channel}
                        activeChannel={activeChannel}
                        setActiveChannel={(channel) => setSearchParams({ channel: channel.id })} />
                    )}
                    List={({ children, loading, error }) => (
                      <div className="channel-sections">
                        <div className="section-header">
                          <div className="section-title">
                            <HashIcon className="size-4" />
                            <span>Channels</span>
                          </div>
                        </div>

                        {loading && <div className="loading-message">Loading Message...</div>}
                        {error && <div className="error-message">Error loading channels...</div>}

                        <div className="channels-list">{children}</div>

                        <div className="section-header direct-messages">
                          <div className="section-title">
                            <UsersIcon className="size-4" />
                            <span>Direct Messages</span>
                          </div>
                        </div>

                        <UsersList activeChannel={activeChannel} />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT CONTAINER */}
            <div className="chat-main">
              <Channel channel={activeChannel}>
                <Window>
                  <MessageList />
                  <MessageInput />
                </Window>

                <Thread />
              </Channel>
            </div>
          </div>

          {isCreatedModalOpen && (
            <CreateChannelModel
              onClose={() => setIsCreatedModalOpen(false)} />
          )}
        </Chat>
      )}
    </div>
  )
}

export default HomePage