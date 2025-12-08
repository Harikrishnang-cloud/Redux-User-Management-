import express,{Request,Response} from "express";
import { userController } from "../../controllers/user/user.controller";

export class userRoute{
    private userController :userController
    private userRouter : express.Router;
    constructor(userController:userController){
        this.userController = userController
        this.userRouter = express.Router()
        this.setRouter()
        
    }
    private setRouter(){
        this.userRouter.post('/signup',(req:Request,res:Response)=>{
            this.userController.userRegister(req,res)
        })
        this.userRouter.post('/login',(req:Request,res:Response)=>{
            this.userController.userLogin(req,res)
        })
        this.userRouter.get('/profile/:id',(req:Request,res:Response)=>{
            this.userController.showProfile(req,res)
        })
        this.userRouter.put('/editProfile/:id',(req:Request,res:Response)=>{
            this.userController.updateProfile(req,res)
        })
        this.userRouter.get('/logout',(req:Request,res:Response)=>{
            this.userController.logout(req,res)
        })
    }
    public getuserRouter(){
        return this.userRouter;
    }
}