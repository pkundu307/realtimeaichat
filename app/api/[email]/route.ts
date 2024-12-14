import { User } from "@/app/models/user.model";
import connectionToDatabase from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  email: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> } // Correctly define `params` as a Promise
): Promise<NextResponse> {
  try {
    const resolvedParams = await params; // Await the `params` Promise

    await connectionToDatabase();

    const { email } = resolvedParams;

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
    console.error("Error fetching user ID:", error);

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
