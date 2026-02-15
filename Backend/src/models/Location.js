import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    coordinates: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [lng, lat]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

locationSchema.index({ coordinates: "2dsphere" });

export default mongoose.model("Location", locationSchema);
