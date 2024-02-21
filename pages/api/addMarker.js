import Marker from "@/models/Marker";
import connectToDatabase from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, userId, title, desc, latitude, longitude, rating } = req.body;

  try {
    const db = await connectToDatabase();
    if (
      !userId ||
      !name ||
      !title ||
      !desc ||
      !latitude ||
      !longitude ||
      !rating
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newMarker = new Marker({
      userId,
      name,
      title,
      desc,
      latitude,
      longitude,
      rating,
    });
    await newMarker.save();
    res.status(201).json({ message: "Marker created", marker: newMarker });
  } catch (error) {
    res.status(500).json({ message: "Error creating marker" });
  }
}
