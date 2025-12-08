import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import dotenv from 'dotenv';

dotenv.config()

export const userAuth = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.cookies.accesstoken;
        console.log("Access token is : ",token)
        if(!token){
            return res.status(401).json({message:"No access token"})
        }
        const secret = process.env.ACCESS_SECRET
        const decoded = jwt.verify(token,secret!)
        if(typeof decoded === "string" || !("id" in decoded)){
            return res.status(403).json({Message:"Invalid token"})
        }
        const user = await userModel.findById(decoded.id)

        if(!user){
            return res.status(401).json({message:"user is not found"})
        }
        next()
    }
    catch(error){
        console.log(error)
        res.status(403).json({Message:"expired token"})
    }
}