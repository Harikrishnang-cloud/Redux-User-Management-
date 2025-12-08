import express, {Request,Response} from "express";
import { adminController } from "../../controllers/admin/admin.controller";


export class AdminRouter{
    private adminController:adminController
    private adminRouter = express.Router()
    constructor(adminController:adminController){
        this.adminController=adminController
        this.adminRouter=express.Router()
        this.setRoute()
    }
    setRoute(){
        this.adminRouter.post('/login',(req:Request,res:Response)=>{
            this.adminController.adminLogin(req,res)
        })
        this.adminRouter.get('/getallUser',(req:Request,res:Response)=>{
            this.adminController.getAllusers(req,res)
        })
        this.adminRouter.delete('/delete/:id',(req:Request,res:Response)=>{
            this.adminController.Deleteuser(req,res)
        })
        this.adminRouter.get('/getDetailsOfSpecificuser/:id',(req:Request,res:Response)=>{
            this.adminController.getuserDetails(req,res)
        })
    }
    public getAdminRouter(){
        return this.adminRouter;
    }
}