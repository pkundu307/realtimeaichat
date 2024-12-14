import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  chat:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    }
  ]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User };
