import { Iuser } from "../../interface/user.models.interface";

export interface IuserService{
    createuser(user:Iuser):Promise<Iuser>
    updateuser(id:string,user:Partial<Iuser>):Promise<Iuser>
    finduserById(id:string):Promise<Iuser | null>
    loginuser(email:string,password:string):Promise<Iuser>
}
export interface ILoginResponse{
    user:Iuser;
    accessToken :string;
    refreshToken : string;
}