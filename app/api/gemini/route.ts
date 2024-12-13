import { NextRequest,NextResponse } from 'next/server';
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



export async function GET(): Promise<NextResponse> {

    try {
      // Initialize GoogleGenerativeAI with your API key
      const genAI = new GoogleGenerativeAI(process.env.geminiapi||'');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Prompt for the model
      const prompt =  'hy how are you'; // Use a default if no prompt is provided

      // Generate content
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
      

      // Return the result as a JSON response
      return NextResponse.json(
        { message: result },
        { status: 200 }
      );
    } catch (error) {
      // Handle errors
      console.error('Error generating content:', error);
      return NextResponse.json(
        { message: "fail" },
        { status: 500 }
      );
    }
  }

