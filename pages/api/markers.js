import Marker from "@/models/Marker";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Not Allowed" });
  }

  try {
   
    const userId = req.query.userId;
    const markers = await Marker.find({ userId });
    
    if (!markers || markers.length === 0) {
      return res.status(404).json({ message: "No markers found for the provided user ID" });
    }
    res.status(200).json(markers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching markers" });
  }
}
