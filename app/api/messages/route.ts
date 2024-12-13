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
    const prompt = message;
    // Generate content using Google Generative AI

   
    const result: Result = await model.generateContent(prompt as string); 

    // Log the result to the console
    console.log('Generated Result:', result); 
    
    // Function to extract the generated text
    function findText(obj: any): string[] {
        let texts: string[] = [];
        function recurse(current: any) {
            if (typeof current === "object" && current !== null) {
                for (const key in current) {
                    if (key === "text") {
                        texts.push(current[key]);
                    } else {
                        recurse(current[key]);
                    }
                }
            }
        }
        recurse(obj);
        return texts;
    }
    
    // Call findText and log the extracted texts
    const texts = findText(result);
    console.log('Extracted Texts:', texts[0]);
    
     

   

    // Create the new message
    const newMessage = await Message.create({
      chat: chatId,
      sender: {
        senderId: senderId,
        senderType,
      },
      message,
    });

    const responseMessage = await Message.create({
      chat:chatId,
      sender:{
        senderId:"675c48ac7adfa5f119475e01",
        senderType:"GeminiResponse"
      },
      message: texts[0], // Use the extracted text as the response message
    })

    // Return the created message
    return NextResponse.json({ success: true, message: texts[0] });
  } catch (error) {
    console.error("Error adding new message:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error." },
      { status: 500 }
    );
  }
}










