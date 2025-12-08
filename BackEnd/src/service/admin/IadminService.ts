import { Iadmin } from "../../interface/admin.models.interface";
import { Iuser } from "../../interface/user.models.interface";


export interface IadminService{
    getAllusers():Promise<Iuser[] | []>
    getuserById(id:string):Promise<Iuser | null>
    deleteusersById(id:string):Promise<Iuser | null>
    createAdmin(name:string,email:string,password:string):Promise<Iuser>
    isAdminExists(email:string,password:string):Promise<Iuser>
}