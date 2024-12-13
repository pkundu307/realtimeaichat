import { NextRequest,NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET(req: NextRequest): Promise<NextResponse> {

    try {
      // Initialize GoogleGenerativeAI with your API key
      const genAI = new GoogleGenerativeAI(process.env.geminiapi||'');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Prompt for the model
      const prompt =  'hy how are you'; // Use a default if no prompt is provided

      // Generate content
      const result = await model.generateContent(prompt as string);

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

