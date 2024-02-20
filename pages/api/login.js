import User from '@/helper/Users';
import connectDB from '@/utils/db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const db = connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') { return }
        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Check password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ success: false, message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

            res.status(200).json({ success: true, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
   
}