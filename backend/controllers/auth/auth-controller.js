import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../../models/User.js';
//
//
//
// Register
const register = async(req, res) => {
    const {userName, email, password} = req.body;
    try {
        //
        // Check if email exists
        const checkUser = await User.findOne({email});
        if(checkUser){
            console.error("Email existing")
            return res.status(401).json({
                success: false,
                message: 'Email already in use. Try loggin in'
            }) 
        }
        //
        // Hash pasword
        const hashedPassword = await bcrypt.hash(password, 12);
        //
        // Create user
        const newUser = new User({
            userName, email, password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({
            success: true,
            message:'User registered successfully!'
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Error signing up: ' + error
        }) 
    }
}
//
//
//
// Login
const login = async(req, res) => {
    const {email, password} = req.body;
    console.log("Email: ", email)
    console.log("Pw: ", password)
    try {
        //
        // Check if email exists
        const checkUser = await User.findOne({email});
        if (!checkUser) {
            console.error('Email not found');
            return res.status(401).json({
                success: false,
                message: 'Email not found. Try again or sign up'
            }) 
        }
        //
        // Check if password is correct
        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if (!checkPassword) {
            console.error('Password incorrect');
            return res.status(401).json({
                success: false,
                message: 'Password incorrect. Please try again'
            })
        }
        //
        // Create token
        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email,
            role: checkUser.role
        }, 'CLIENT_SECRET_KEY',{expiresIn: '60m'});
        //
        //
        res
        // Store token in cookie
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
        })
        // Response success msg and user obj
        .status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role
            }
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Error signing in: ' + error
        }) 
    }
}

//
//
//
// Logout
const logout = (req,res) => {
    res
    .clearCookie('token')
    .status(200)
    .json({
        success:true,
        message:'Logged out successfully'
    })
}
//
//
//
// Middleware
const authMiddleware = async (req,res,next) => {
    //
    // Get token from cookie
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({
            success:false,
            message: 'Unauthorized user!'
        })
    //
    //Decrypt token to get id, name, role
    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next(); // Express method
    }
    catch(error) {
        return res.status(401).json({
            success:false,
            message: 'Unauthorized user!'
        })
    }
}

export { register, login, logout, authMiddleware };