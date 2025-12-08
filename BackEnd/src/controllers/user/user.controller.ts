import { Request,Response } from "express";
import { IuserService } from "../../service/user/IuserService";
import { Iuser } from "../../interface/user.models.interface";
import  Jwt  from "jsonwebtoken";
import {generateToken} from "../../utils/jwt"

export class userController{
    private userService : IuserService
    constructor(userService:IuserService){
        this.userService = userService
    }
    async userRegister(req:Request,res:Response):Promise<void>{
        try{
            const user:Iuser = req.body
            const result = await this.userService.createuser(user)
            res.status(201).json({message:"Successfully Created a user...", data:result})
        }
        catch(error){
            console.log("Error while creating user",error)
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    async userLogin(req:Request,res:Response):Promise<void>{
        try {
            const {email,password} = req.body
            const user = await this.userService.loginuser(email,password) 
            console.log("user checking...",email,password)

            const {accessToken, refreshToken} = generateToken(user._id)
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:true,
                sameSite:true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            res.cookie("accessToken",accessToken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            res.status(200).json({Message:"Login successful",user})

        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    async updateProfile(req:Request,res:Response):Promise<void>{
        try{
            const {id} = req.params as {id:string}
            const userData = req.body as Iuser
            const update = await this.userService.updateuser(id,userData)
            if(update){
                res.status(200).json({success:true,message:"Profile Updated Successfully...",update})
            }
        }
        catch(error){
            console.log("Error while updating user profile...")
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    async refreshToken(req:Request,res:Response):Promise<void>{
        try{
            const token = req.cookies.refreshToken
            if(!token){
                res.status(401).json({message:"No refresh token"})
                return
            }
            const secret = process.env.refreshToken
            const decoded = Jwt.verify(token,secret!)
            if(typeof decoded ==="string" || !("id" in decoded)){
                res.status(403).json({Message:"invalid token"})
                return
            }
            const user = await this.userService.finduserById(decoded.id)
            if(!user){
                res.status(401).json({Message:"User not found"})
                return
            }
            const {accessToken} = generateToken(user._id)
            res.cookie('accesstoken',accessToken,{
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            res.status(200).json({success:true, Message:"success",accessToken,user})
        }
        catch(error){
            console.error(error)
        }
    }
    async showProfile(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params as {id:string}
            const result = await this.userService.finduserById(id)
            if(result){
                res.status(200).json({success:true,message : "profile data fetched Successfully...",result})
            }
        } catch (error) {
            console.log("Error while fetching the data...",error)
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    async logout(req:Request,res:Response):Promise<void>{
        try{
            res.clearCookie('refreshtoken',{
                httpOnly:true,
                secure:true,
                sameSite:'strict'
            })
            res.clearCookie('accesstoken',{
                httpOnly:true,
                secure:true,
                sameSite:'strict'
            })
            res.status(200).json({Message:'Logged out successfully'})
        }
        catch(error){
            console.error(error)
        }
    }
}