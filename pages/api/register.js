import User from "@/helper/Users";
import connectDB from "@/utils/db";
import bcrypt from "bcrypt";



export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const db = await connectDB();
  const { username, email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server Error" });
  }
}
