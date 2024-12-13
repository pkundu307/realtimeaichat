"use client";
import { useSession } from "next-auth/react";

import ChatLayout from "./components/Chatlayout";
import Image from "next/image";




const Dashboard: React.FC = () => {
  const { data: session } = useSession();






  if (!session) {
    // Show a message for users who are not logged in
    return (
<div className="flex flex-col justify-center items-center h-screen bg-gray-950">
  {/* Main Content */}
  <div className="text-xl font-bold text-center mb-8">
    <p>Please log in to access the AI</p>
  </div>

  {/* Advertisement Section */}
  <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-8 mt-20">
    <div className="flex flex-col items-center text-center md:items-start">
      <div className="text-2xl font-semibold mb-4">Why Choose Our AI Assistant?</div>
      <ul className="space-y-6 text-lg text-gray-700">
        <li className="flex items-center ">
          <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
            <i className="fas fa-comments"></i>
          </div>
          <span className="text-white">Real-time AI Chat Assistance</span>
        </li>
        <li className="flex items-center">
          <div className="bg-green-500 text-white p-3 rounded-full mr-4">
            <i className="fas fa-clock"></i>
          </div>
          <span className="text-white">24/7 Availability</span>
        </li>
        <li className="flex items-center">
          <div className="bg-yellow-500 text-white p-3 rounded-full mr-4">
            <i className="fas fa-robot"></i>
          </div>
          <span className="text-white" >Instant Responses to Your Queries</span>
        </li>
        <li className="flex items-center">
          <div className="bg-purple-500 text-white p-3 rounded-full mr-4">
            <i className="fas fa-brain"></i>
          </div>
          <span className="text-white">Powered by Advanced AI Technology</span>
        </li>
      </ul>
    </div>

    <div className="mt-8 md:mt-0">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-tbBAEWWRpX3a6P9bXVxgnO5jGDdEbsmDWw&s"
        alt="AI Chat Assistant"
        className="rounded-lg shadow-lg"
        width={20}
        height={20}
      />
    </div>
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
