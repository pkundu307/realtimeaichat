"use client";
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface user{
  email: string;
  name: string;
  image: string;
  googleId: string;
  id: string;
}
const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Function to send user details to the backend API
  const storeUserDetails = async (user: user) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.name,
          image: user?.image,
          // googleId: user.googleId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User details stored:", data);
      } else {
        console.error("Failed to store user details:", data);
      }
    } catch (error) {
      console.error("Error sending user details:", error);
    }
  };

  const handleSignIn = async () => {
    await signIn("google");
    router.push("/");
  };

  useEffect(() => {
    if (session && session.user) {
      // Store user details if session exists
      storeUserDetails(session.user);
    }
  }, [session]);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">MyApp</div>
      {session && (
        <div className="flex gap-4 items-center">
          <span>Welcome, {session.user?.name}!</span>
          <span>{session.user?.email}</span>
        </div>
      )}
      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt={session.user?.name || "User"}
              className="w-8 h-8 rounded-full"
              width={10}
              height={10}
            />
            <span>{session.user?.name}</span>
            <button
              className="bg-red-500 px-4 py-2 rounded"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            onClick={handleSignIn}
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
