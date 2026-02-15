import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
