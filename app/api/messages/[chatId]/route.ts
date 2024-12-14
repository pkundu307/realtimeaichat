import Message from "@/app/models/message.model.schema";
import connectionToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  try {
    const { chatId } =await params; // Extract `chatId` from the route parameters

    console.log("Chat ID:", chatId);

    await connectionToDatabase(); // Connect to the database

    // Validate input
    if (!chatId) {
      return NextResponse.json(
        { success: false, error: "chatId is required." },
        { status: 400 }
      );
    }

    // Fetch all messages for the given `chatId`
    const messages = await Message.find({ chat: chatId })
    console.log(messages);

    // Return the formatted messages
    return NextResponse.json({ success: true, messages: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
