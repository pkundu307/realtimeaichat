import { NextRequest, NextResponse } from "next/server";

import { User } from "@/app/models/user.model";  // Adjust the path to where your model is located
import connectionToDatabase from "@/lib/mongoose";

// Connect to the database if not already connected


export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } =await params;
  
  try {
    // Connect to the database
    await connectionToDatabase();


    const user = await User.findById(userId).populate("chat")
    

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Respond with the user's chats
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
