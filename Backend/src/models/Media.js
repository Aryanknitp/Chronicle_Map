import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: String,
    type: { type: String, enum: ["image", "video", "audio"] },
    url: String,
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Media", mediaSchema);
