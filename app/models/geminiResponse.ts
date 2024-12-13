import mongoose from "mongoose";

const geminiResponseSchema = new mongoose.Schema({
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GeminiResponse =
  mongoose.models.GeminiResponse || mongoose.model("GeminiResponse", geminiResponseSchema);

export default GeminiResponse;
