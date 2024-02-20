import connectDB from "@/utils/db";
import Marker from "@/helper/Marker";




const db = connectDB();
export default async function handler (req, res) {
    if (req.method !== 'GET'){
        return;
    }

    try {
        const markers = await Marker.find({userId});
        res.status(200).json(markers)
    } catch(error){
        res.status(500).json({message: 'Server Error'})
    }
}