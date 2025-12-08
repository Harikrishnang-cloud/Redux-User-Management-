import { Iadmin } from "../../interface/admin.models.interface";
import { Iuser } from "../../interface/user.models.interface";

export interface IadminRepository{
    createAdmin(email:string, name:string, password:string):Promise<Iuser>
    getuserByEmail(email:string):Promise<Iuser | null>
    getAllusers():Promise<Iuser[]>
    getuserById(id:string):Promise<Iuser | null>
    finduserByIdAndDelete(id:string):Promise<Iuser | null>
}