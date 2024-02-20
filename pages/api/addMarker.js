
import connectDB from "@/utils/db";
import Marker from "@/helper/Marker";



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    
    const db = await connectDB();

  
    const { name, title, desc, latitude, longitude, rating } = req.body;

    const newMarker = new Marker({
      name,
      title,
      desc,
      latitude,
      longitude,
      rating,
    });

    // Save the new marker to the database
    await newMarker.save();

    // Respond with the newly created marker
    res.status(201).json(newMarker);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error" });
  }
}
