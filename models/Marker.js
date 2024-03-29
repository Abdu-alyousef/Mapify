import mongoose from "mongoose";

const MarkerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Marker = mongoose.models.Marker || mongoose.model("Marker", MarkerSchema);

export default Marker;
