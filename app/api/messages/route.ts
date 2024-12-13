import { NextRequest, NextResponse } from "next/server";
import Message from "@/app/models/message.model.schema"; // Adjust the import based on your file structure
import connectionToDatabase from "@/lib/mongoose"; // Ensure you have a utility function for DB connection
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Part {
  text: string;
}

interface Content {
  parts: Part[];
  role: string;
}

interface Candidate {
  content: Content;
  finishReason: string;
  avgLogprobs: number;
}

interface UsageMetadata {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

interface Response {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  modelVersion: string;
}

interface Message {
  response: Response;
}

interface Result {
  message: Message;
}



export async function POST(req: NextRequest) {
  try {
    // Initialize Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.geminiapi || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Connect to the database
    await connectionToDatabase();

    // Parse the request body
    const body = await req.json();
    const { chatId, senderId, senderType, message } = body;

    // Validate input
    if (!chatId || !senderId || !senderType || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!["User", "GeminiResponse"].includes(senderType)) {
      return NextResponse.json(
        { success: false, error: "Invalid senderType." },
        { status: 400 }
      );
    }
    const prompt =  'hy how are you';
    // Generate content using Google Generative AI

   
    const result: Result = await model.generateContent(prompt as string); // Log the result to the console
     console.log('Generated Result:', result); // Extract the generated text
      const text = result.message.response.candidates[0].content.parts[0].text; console.log('Generated Text:', text);
      

      // Extract the generated text
     

   

    // Create the new message
    const newMessage = await Message.create({
      chat: chatId,
      sender: {
        senderId: senderId,
        senderType,
      },
      message,
      result: result, // Store the extracted content
    });

    // Return the created message
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error adding new message:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error." },
      { status: 500 }
    );
  }
}











export async function GET(req:NextRequest) {
  try {
    // Connect to the database
    await connectionToDatabase();

    // Extract chatId from the query parameters
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");

    // Validate input
    if (!chatId) {
      return NextResponse.json(
        { success: false, error: "chatId is required." },
        { status: 400 }
      );
    }

    // Fetch all messages for the given chatId
    const messages = await Message.find({ chat: chatId })
      .populate("sender.senderId", "name email") // Populate sender information if needed
      .sort({ createdAt: 1 }); // Sort by creation time (oldest first)

    // Return the messages
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
