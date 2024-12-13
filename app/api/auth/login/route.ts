// pages/api/auth/login.ts
import { User } from "../../../models/user.model"; // Assuming you have a User model defined
import connectionToDatabase from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Define the expected request body type
interface LoginRequestBody {
  email: string;
  name: string;
  image: string;
  googleId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method === 'POST') {
    try {
      // Parse the request body into JSON, adhering to the defined types
      const { email, name, image }: LoginRequestBody = await req.json();
      console.log(email, name);

      await connectionToDatabase();

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: 'User already exists', user: existingUser },{status: 200});
      }

      // Create a new user if it doesn't exist
      const newUser = new User({
        // googleId,
        email,
        name,
        profilePicture: image || '',
      });

      await newUser.save();

      return NextResponse.json({ message: 'User created successfully', user: newUser },{status:201});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error storing user details' },{status:500});
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' },{status:405});
  }
}
