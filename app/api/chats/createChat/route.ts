import { NextRequest, NextResponse } from "next/server";

import {Chat} from "@/app/models/chat.model";
import connectionToDatabase from "@/lib/mongoose";
import { User } from "@/app/models/user.model";

export async function POST(req: NextRequest) {
  try {
    await connectionToDatabase();

    const body = await req.json();
    const { participants,title } = body;

    if (!participants || !Array.isArray(participants) || participants.length < 2) {
      return NextResponse.json(
        { message: "Invalid participants. At least two participants are required." },
        { status: 400 }
      );
    }

    // Validate participant structure
    for (const participant of participants) {
      if (!participant.participantId || !participant.participantType) {
        return NextResponse.json(
          { message: "Each participant must include participantId and participantType." },
          { status: 400 }
        );
      }
    }

    // Create new chat
    const newChat = new Chat({
      participants,
      title: title,
    });

    await newChat.save();

    const user = await User.findById(participants[0].participantId)
    user.chat.push(newChat.id);
    await user.save();

    return NextResponse.json(
      {
        message: "Chat created successfully.",
        chat: newChat,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
