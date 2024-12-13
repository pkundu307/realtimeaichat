"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import ChatLayout from "./components/Chatlayout";

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
 <>
 <ChatLayout/>
 </>
  );
};

export default Dashboard;
