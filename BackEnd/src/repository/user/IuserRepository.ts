import { Iuser } from "../../interface/user.models.interface"

export interface IuserRepository{
    createuser(user:Iuser):Promise<Iuser>
    updateuser(id:String,user:Partial<Iuser>):Promise<Iuser|null>
    findByuserByEmail(email:String):Promise<Iuser|null>
    findByuserById(id:String):Promise<Iuser|null>
}