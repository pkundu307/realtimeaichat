import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [
    {
      participantId: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        refPath: "participants.participantType", // Dynamic reference
      },
      participantType: {
        type: String,
        required: true,
        enum: ["User", "GeminiResponse"], // Allowed models
      },
    },
  ],
  title:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.chats || mongoose.model("chats", chatSchema);

export {Chat};
