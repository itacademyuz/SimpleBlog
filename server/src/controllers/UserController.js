import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const signin = async (req, res)=>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email});
    if(!existingUser)return res.status(404).json({message: 'User does not exist'})
    const isPassword = await bcrypt.compare(password, existingUser.password)
    if(!isPassword) return res.status(404).json({message: "Invalid credentials"})
    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "24h"})
    res.status(200).json({result: existingUser, token: token})
}

export const signup = async (req, res)=>{
    const {firstName, lastName, email, password, confirmPassword} = req.body
    const existingUser = await User.findOne({email});
    if(existingUser)return res.status(400).json({message: 'User already exists'})
    if(password!==confirmPassword) return res.status(400).json({message: 'Passwords do not match'})
    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`})
    const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET, {expiresIn: "24h"})
    res.status(201).json({result, token})
}