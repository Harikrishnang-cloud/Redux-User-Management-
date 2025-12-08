import { Iuser } from "../../interface/user.models.interface";
import { IuserRepository } from "./IuserRepository";
import userModel from "../../models/userModel";

export class userRepository implements IuserRepository{
    async createuser(user: Iuser): Promise<Iuser> {
        return userModel.create(user)
    }
    async findByuserByEmail(email: String): Promise<Iuser | null> {
        return userModel.findOne({email})
    }
    async findByuserById(id: String): Promise<Iuser | null> {
        return userModel.findById(id)
    }
    async updateuser(id: String, user: Partial<Iuser>): Promise<Iuser | null> {
        return userModel.findByIdAndUpdate(id,user,{new:true})
    }
}