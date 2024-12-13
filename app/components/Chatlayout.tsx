// components/ChatLayout.tsx
"use client";

import { useState } from "react";

const ChatLayout = () => {
  const [conversations, setConversations] = useState([
    { id: 1, title: "Conversation 1", messages: ["Hi!", "How can I help you?"] },
    { id: 2, title: "Conversation 2", messages: ["Hello", "What's up?"] },
  ]);

  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(
    conversations[0]?.id || null
  );

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversationId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    );

    setNewMessage("");
  };

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-950 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedConversationId(conversation.id)}
            className={`p-2 mb-2 cursor-pointer rounded ${
              selectedConversationId === conversation.id
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
            selectedConversation.messages.map((message, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 text-black rounded">
                {message}
              </div>
            ))
          ) : (
            <div className="text-black">Select a conversation to start chatting</div>
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
