import bcrypt from 'bcryptjs'
import { User } from '../../models/Users.js';

// Register
const register = async(req, res) => {
    const {userName, email, password} = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(checkUser){
            res.json({
            success:false,
            message: 'This email is already taken'
        }) 
        }
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
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success:false,
            message: 'Error signing up: ' + error
        }) 
    }
}


// Login
const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success:false,
            message: 'Error signing in: ' + error
        }) 
    }
}


// Logout


// Middleware

export { register };