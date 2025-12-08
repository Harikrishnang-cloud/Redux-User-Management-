import {Request,Response} from 'express';
import { IadminService } from '../../service/admin/IadminService';
export class adminController{
    private adminService : IadminService
    constructor(adminService:IadminService){
        this.adminService = adminService
    }
    async adminLogin(req:Request,res:Response):Promise<void>{
        try {
            const {email,password}=req.body as {email:string,password:string}
            const admin=await this.adminService.isAdminExists(email,password)
            if(admin){
                res.status(200).json({success:true,message:"Successfully Login...",admin})
            }
        } catch (error) {
            console.log('error while admin login...',error)
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    async getAllusers(req:Request,res:Response):Promise<void>{
        try {
            const usersList=await this.adminService.getAllusers()
            if(usersList){
                res.status(200).json({success:true,message:"users Deatils Fetched Successfully...",usersList})
            }
        } catch (error) {
            console.log('error while fetching users details....')
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    async getuserDetails(req:Request,res:Response):Promise<void>{
        try {
            const {id}=req.params as {id:string}
            const users = await this.adminService.getuserById(id)
            if(users){
                res.status(200).json({success:true,message:"user Deatils Fetched SuccessFully....",users})
            }
        } catch (error) {
            console.log("error while fetching specific user Details..",error)
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
    async Deleteuser(req:Request,res:Response):Promise<void>{
        try {
            const {id} = req.params as {id:string}
            const deleteduser = await this.adminService.deleteusersById(id)
            if(deleteduser){
                res.status(200).json({success:true,messsage:"delete a user successfully....",deleteduser})
            }
        } catch (error) {
            console.log("error while deleting a user data...",error)
            if(error instanceof Error){
                res.status(500).json({success:false,message:error.message})
            }
        }
    }
}