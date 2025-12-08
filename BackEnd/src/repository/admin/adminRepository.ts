import { IadminRepository } from "./IadminRepository";
import { Iuser } from "../../interface/user.models.interface";
import userModel from "../../models/userModel";



export class adminRepository implements IadminRepository{
    async createAdmin(email: string, name: string, password: string): Promise<Iuser> {
        return await userModel.create({name,email,password,role:'admin'})
    }
    async getAllusers(): Promise<Iuser[]> {
        return await userModel.find({role:'user'})
    }
    async getuserByEmail(email: string): Promise<Iuser | null> {
        return userModel.findOne({email})
    }
    async finduserByIdAndDelete(id: string): Promise<Iuser | null> {
        return userModel.findByIdAndDelete(id)
    }
    async getuserById(id: string): Promise<Iuser | null> {
        return userModel.findById(id)
    }
}