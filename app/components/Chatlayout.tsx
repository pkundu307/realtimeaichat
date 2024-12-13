"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../GlobalRedux/store";

// Define the structure of a Participant
interface Participant {
  participantId: string;
  participantType: string;
  _id: string;
}

// Define the structure of a Chat
interface Chat {
  _id: string;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  title: string;
}

// Define the structure of the User Data
interface UserData {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  chats: Chat[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ChatLayout = () => {
  const email = useSelector((state: RootState) => state.user.email);

  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Chat[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Append the new message to the selected conversation (this is local-only logic).
    setConversations((prev) =>
      prev.map((conv) =>
        conv._id === selectedConversationId
          ? { ...conv, messages: [...(conv.messages || []), newMessage] }
          : conv
      )
    );

    setNewMessage("");
  };

  const selectedConversation = conversations.find(
    (conv) => conv._id === selectedConversationId
  );

  useEffect(() => {
    const fetchUserId = async () => {
      if (email) {
        try {
          const response = await fetch(`api/${email}`);
          const data = await response.json();

          if (response.ok) {
            setUserId(data.userId);
          } else {
            console.error("Failed to fetch user ID:", data.message);
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };

    fetchUserId();
  }, [email]);

  useEffect(() => {
    const fetchChats = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3000/api/chats/${userId}`);
          const data: UserData = await response.json();

          if (response.ok) {
            setConversations(data.chats);
            setSelectedConversationId(data.chats[0]?._id || null); // Select the first conversation by default
          } else {
            console.error("Failed to fetch chats:", data);
          }
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    };

    fetchChats();
  }, [userId]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-950 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => setSelectedConversationId(conversation._id)}
            className={`p-2 mb-2 cursor-pointer rounded ${
              selectedConversationId === conversation._id
                ? "bg-gray-800 text-white"
                : "bg-gray-700"
            }`}
          >
            {conversation.title}
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="w-3/4 flex flex-col bg-white">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedConversation ? (
            selectedConversation.messages?.map((message, index) => (
              <div
                key={index}
                className="mb-2 p-2 bg-gray-100 text-black rounded"
              >
                {message}
              </div>
            )) || (
              <div className="text-black">
                No messages in this conversation. Start the chat!
              </div>
            )
          ) : (
            <div className="text-black">
              Select a conversation to start chatting
            </div>
          )}
        </div>

        {/* Input field */}
        <div className="p-4 border-t border-gray-300 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-600 p-2 rounded focus:outline-none text-black"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-black px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
