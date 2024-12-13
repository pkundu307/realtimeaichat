import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

module.exports = Chat;
