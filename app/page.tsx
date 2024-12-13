"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const SidebarItem = ({ chat, handleDragEnd }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: chat,
  });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="cursor-pointer hover:bg-gray-300 p-2 rounded"
      onDragEnd={handleDragEnd}
    >
      {chat}
    </li>
  );
};

const DroppableArea = ({ children, handleDrop }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div ref={setNodeRef} className="flex-1 p-4 bg-gray-700 text-white">
      {children}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isNewChatOpen, setIsNewChatOpen] = useState<boolean>(false);

  const chats = ["Chat 1", "Chat 2", "Chat 3"]; // Replace with dynamic chat data

  const handleDragEnd = (event) => {
    if (event.over && event.over.id === "droppable") {
      setSelectedChat(event.active.id);
      setIsNewChatOpen(false); // Close "New Chat" section if a chat is selected
    }
  };

  const handleNewChat = () => {
    setIsNewChatOpen(true); // Open the new chat section
    setSelectedChat(null); // Close any selected chat
  };

  if (!session) {
    // Show a message for users who are not logged in
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-center">
          <p>Please log in to access the dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Main content */}
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-black p-4">
          <div className="text-lg font-semibold text-white">Previous Conversations</div>
          <ul className="mt-4">
            {chats.map((chat) => (
              <SidebarItem key={chat} chat={chat} handleDragEnd={handleDragEnd} />
            ))}
          </ul>
          <button
            onClick={handleNewChat}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            New Chat
          </button>
        </div>

        {/* Right Section - Selected Chat or New Chat */}
        <DroppableArea handleDrop={handleDragEnd}>
          <div className="text-lg font-semibold">Selected Chat</div>
          <div className="mt-4">
            {isNewChatOpen ? (
              <div>
                <h2 className="text-xl">New Chat</h2>
                <p>Start a new conversation here...</p>
                {/* Add your chat input form or messages here */}
              </div>
            ) : selectedChat ? (
              <p>This is the content of {selectedChat}.</p>
            ) : (
              <p>Select a chat from the left sidebar.</p>
            )}
          </div>
        </DroppableArea>
      </div>
    </DndContext>
  );
};

export default Dashboard;
