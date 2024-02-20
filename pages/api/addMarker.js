import connectDB from "@/utils/db";
import Marker from "@/helper/Marker";

const db = connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return
  }
  try {
    const { name, title, desc, latitude, longitude } = req.body;

    const userId = req.user._id; 

    const newMarker = new Marker({
      userId,
      name,
      title,
      desc,
      latitude,
      longitude,
    });
    await newMarker.save();

    res.status(201).json(newMarker);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
