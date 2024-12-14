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
  chat: Chat[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Sender {
  senderId: string;
  senderType: string;
}

interface Message {
  _id: string;
  chat: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  sender: Sender;
}

interface FetchMessagesResponse {
  success: boolean;
  messages: Message[];
}

const ChatLayout = () => {
  const email = useSelector((state: RootState) => state.user.email);

  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ message: string; time: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Chat[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchMessages = async (chatId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/messages/${chatId}`);
      const data: FetchMessagesResponse = await response.json();

      if (response.ok) {
        // Map the messages to include the time in a human-readable format
        const structuredMessages = data.messages.map((msg) => ({
          message: msg.message,
          time: new Date(msg.createdAt).toLocaleString(), // Convert ISO date to a readable format
        }));
        setMessages(structuredMessages);
      } else {
        setError("Failed to fetch messages.");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Network error or server is unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  const handleAddChat = async () => {
    if (!newChatName.trim()) return;

    const requestBody = {
      participants: [
        { participantId: userId, participantType: "User" },
        { participantId: "64fcc42df43e710", participantType: "GeminiResponse" },
      ],
      title: newChatName,
    };

    try {
      const response = await fetch("/api/chats/createChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setNewChatName("");
        setIsModalOpen(false);
        location.reload(); // Reload to fetch updated chat list
      } else {
        console.error("Failed to create chat:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

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
          const response = await fetch(`/api/chats/${userId}`);
          const data: UserData = await response.json();

          if (response.ok) {
            setConversations(data.chat);
            setSelectedConversationId(data.chat[0]?._id || null); // Select the first conversation by default
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

  const handleSendMessage = async () => {
    console.log("clicked");
    setNewMessage("");
    setSending(true);
    if (!newMessage.trim() || !selectedConversationId || !userId) return;

    const requestBody = {
      chatId: selectedConversationId,
      senderId: userId,
      senderType: "User",
      message: newMessage,
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Message sent successfully:", data);

        // Refresh messages for the selected chat
        await fetchMessages(selectedConversationId);

        // Clear the input field
        setNewMessage("");
        setSending(false);
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen bg-gray-950 p-4 overflow-y-auto transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64`}
      >
        <h2 className="text-lg font-bold mb-4 text-white">Conversations</h2>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="block md:hidden w-full p-2 bg-red-300 text-white rounded mb-4 mt-10"
        >
          ❌
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full p-2 bg-blue-600 text-white rounded mt-4 mb-4"
        >
          + Add Chat
        </button>
        {conversations.map((conversation) => (
          <div
            key={conversation._id}
            onClick={() => setSelectedConversationId(conversation._id)}
            className={`p-2 mb-2 cursor-pointer rounded text-white ${
              selectedConversationId === conversation._id
                ? "bg-gray-800"
                : "bg-gray-700"
            }`}
          >
            {conversation.title}
          </div>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white w-[90vh]">
        {/* Header for toggle */}
        <div className="p-4 bg-gray-100 border-b border-gray-300 flex items-center md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-blue-200 text-white p-2 rounded"
          >
            ➡️
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {loading && <div>Loading messages...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !messages.length && !error && (
            <div className="text-black">
              No messages found for this conversation.
            </div>
          )}
        {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded text-black  ${
                index % 2 === 0
                  ? "bg-green-300 ml-0" // Odd messages
                  : "bg-blue-200 ml-4 font-semibold" // Even messages with margin
              }`}
            >
              <div>{msg.message}</div>
              <div className="text-sm text-gray-500">{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Input field */}
        <div className="p-4 border-t border-gray-300 flex">
          <input
            type="text"
            value={newMessage}
            
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 border border-gray-600 p-2 rounded focus:outline-none text-black"
          />
       <button
  onClick={() => handleSendMessage()}
  disabled={sending} // Prevent multiple submissions while sending
  className={`ml-2 px-4 py-2 rounded ${
    sending
      ? "bg-gray-400 text-white cursor-not-allowed" // Disabled style
      : "bg-blue-500 text-black hover:bg-blue-600" // Normal style
  }`}
>
  {sending ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="24"
      height="24"
      className="animate-spin"
    >
      <circle
        fill="#49FF6D"
        stroke="#49FF6D"
        strokeWidth="15"
        r="15"
        cx="40"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="0.8s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4s"
        />
      </circle>
      <circle
        fill="#49FF6D"
        stroke="#49FF6D"
        strokeWidth="15"
        r="15"
        cx="100"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="0.8s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2s"
        />
      </circle>
      <circle
        fill="#49FF6D"
        stroke="#49FF6D"
        strokeWidth="15"
        r="15"
        cx="160"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="0.8s"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>
  ) : (
    "Send"
  )}
</button>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">New Chat</h3>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Enter chat name"
              className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddChat}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
