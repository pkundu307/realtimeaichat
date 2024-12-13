import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chats",
    required: true,
  },
  sender: {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "sender.senderType", // Dynamic reference
    },
    senderType: {
      type: String,
      required: true,
      enum: ["User", "GeminiResponse"], // Allowed models
    },
  },
  message: {
    type: String,
    required: true,
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

const Message = mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Message;
