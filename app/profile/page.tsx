"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../GlobalRedux/store'; // Assuming you have a `store.ts` where RootState is defined
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage: React.FC = () => {
  // Fetch user data from the Redux store
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        {/* Profile Information */}
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name || "User"}
            className="w-32 h-32 rounded-full mb-4 object-cover"
            height={30}
            width={30}
          />
          
          {/* User Name */}
          <h2 className="text-2xl font-semibold text-gray-900">{user.name || "User Name"}</h2>
          
          {/* User Email */}
          <p className="text-sm text-gray-500">{user.email || "user@example.com"}</p>

          {/* Additional Styling for Responsiveness */}
          <div className="mt-6 w-full">
            <Link href={"/"}>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Go Home
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
