import Marker from "@/models/Marker";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Not Allowed' });
  }

  try {
  
    const markers = await Marker.find();

 
    res.status(200).json(markers);
  } catch (error) {
    
    res.status(500).json({ message: 'Error fetching markers' });
  }
}