// pages/api/auth/login.ts
import { User } from "../../../models/user.model"; // Assuming you have a User model defined
import connectionToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

// Define the expected request body type
interface LoginRequestBody {
  email: string;
  name: string;
  image: string;
  googleId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method === "POST") {
    try {
      // Parse the request body into JSON, adhering to the defined types
      const { email, name, image }: LoginRequestBody = await req.json();
      console.log(email, name);

      await connectionToDatabase();

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "User already exists", user: existingUser },
          { status: 200 }
        );
      }

      // Create a new user if it doesn't exist
      const newUser = new User({
        // googleId,
        email,
        name,
        profilePicture: image || "",
      });

      await newUser.save();

      return NextResponse.json(
        { message: "User created successfully", user: newUser },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error storing user details" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: any }
): Promise<NextResponse> {

  try {
    await connectionToDatabase();
    // Ensure the database is connected
  
     const { email } =params;
      console.log('Parsed Email:', email);
    console.log(email);
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email provided." },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email }).select("_id"); // Fetch user ID by email
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
    return NextResponse.json({ userId: user._id }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user ID:", error); // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Invalid JSON in request." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
