import connectDB from "@/utils/db";
import Marker from "@/helper/Marker";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
  
    const db = await connectDB();

    const markers = await Marker.find();

    // Return the fetched markers as a JSON response
    res.status(200).json(markers);
  } catch (error) {
    console.error('Error fetching markers:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}