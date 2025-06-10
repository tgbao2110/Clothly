import bcrypt from 'bcryptjs'
import { User } from '../../models/Users.js';

// Register
const register = async(req, res) => {
    const {userName, email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashedPassword
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:'User registered successfully!'
        })
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            success:false,
            message: 'Error signing in: ' + e
        }) 
    }
}


// Login


// Logout


// Middleware

export { register };