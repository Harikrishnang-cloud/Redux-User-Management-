import express,{application}from "express";
import dotenv from 'dotenv'
dotenv.config()
import { userController } from "./controllers/user/user.controller";
import { userRepository} from "./repository/user/userRepository";
import { userService } from "./service/user/userService";
import { userRoute } from "./Routes/user/user.Route";
import { adminController } from "./controllers/admin/admin.controller";
import { adminRepository } from "./repository/admin/adminRepository";
import { adminService} from "./service/admin/adminService";
import { AdminRouter } from "./Routes/admin/adminRoutes";
import cors from "cors"

export class App{
    private app = application
    constructor(){
        this.app = express()
        this.app.use(cors())
        this.setMiddlewares()
        this.setuserRoute()
        this.setAdminRoute()
    }
    private setMiddlewares(){
        this.app.use(express.json())
    }
    private injectuser():userController{
        const UserRepository = new userRepository()
        const UserService = new userService(UserRepository)
        return new userController(UserService)
    }
    private injectAdmin():adminController{
        const AdminRepository = new adminRepository()
        const AdminService = new adminService(AdminRepository)
        return new adminController(AdminService)
    }
    private setuserRoute(){
        const userController = this.injectuser()
        const userRouter = new userRoute(userController)
        this.app.use('/user',userRouter.getuserRouter())
    }
    private setAdminRoute(){
        const adminController = this.injectAdmin()
        const adminRouter = new AdminRouter(adminController)
        this.app.use('/admin',adminRouter.getAdminRouter())
    }
    public getApp(){
        return this.app
    }
}