import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: String,
    media: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
