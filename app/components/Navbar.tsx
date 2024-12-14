"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setUser } from "../GlobalRedux/Features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "../GlobalRedux/store";

type User= {
  email: string;
  name: string;
  image: string;
  // googleId: string;
  // id: string | null;
}

const Navbar: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup visibility
  const selectedColor = useSelector((state: RootState) => state.color.selectedColor);

  const handleAvatarClick = () => {
    setIsPopupOpen(true); // Open the popup on avatar click
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  // Function to send user details to the backend API
  const storeUserDetails = async (user: User) => {
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
          // id: user.googleId, // optional field
        }),
      });


      const data1 = await response.json();
      if (response.ok) {
        console.log("User details stored:", data1);
      } else {
        console.error("Failed to store user details:", data1);
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
    if (session?.user) {
      // Store user details if session exists
      console.log(session.user);
      
      const user: User = {
        name: session.user.name || "",
        // id: "5",
        email: session.user.email || "",
        image: session.user.image || "",
        // googleId:  "", // Assuming googleId is available in session
      };
      // Dispatch Redux action
      dispatch(setUser(user));

      storeUserDetails(user);
    }
  }, [session, dispatch]);

  return (
    <nav
    className="p-4 text-white flex justify-between items-center sticky top-0 z-50"
    style={{ backgroundColor: selectedColor }} // Dynamically apply the selected color
  >
      <div className="text-xl font-bold">CHATVAT</div>

      {session?.user && (
        <div className="flex gap-4 items-center">
          <span className="hidden md:block">Welcome, {session.user.name}!</span>
          <span className="hidden md:block">{session.user.email}</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt={session.user?.name || "User"}
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
              onClick={handleAvatarClick} // Handle click to show the popup
            />
            <span className="hidden md:block">{session.user?.name}</span>
            <button
              className="bg-red-500 px-4 py-2 rounded"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            onClick={handleSignIn}
          >
            Login with Google
          </button>
        )}
      </div>

      {isPopupOpen && (
   <div
   className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
   onClick={handleClosePopup} // Close popup when clicking outside
 >
   <div
     className="bg-gray-400 p-6 rounded-lg shadow-lg w-80"
     onClick={(e) => e.stopPropagation()} // Prevent popup close when clicking inside
   >

<div className="flex justify-end gap-2 mt-6">
       <button
         className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
         onClick={handleClosePopup}
       >
         ❌
       </button>
     </div>
     <div className="mb-4 space-y-4 text-black">
       {/* Profile Section */}
       <div className="border-b pb-4">
       <Link href={"/profile"}>  <h3 className="text-lg font-semibold" onClick={()=>setIsPopupOpen(false)}>Profile</h3></Link>
      
       </div>
       
       {/* Settings Section */}
       <div>
       <Link href={"/settingpage"}>  <h3 className="text-lg font-semibold text-black" onClick={()=>setIsPopupOpen(false)}>Settings</h3></Link>
        
       </div>
     </div>
   
   </div>
 </div>
 
      )}
    </nav>
  );
};

export default Navbar;
