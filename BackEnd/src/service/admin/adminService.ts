import mongoose from "mongoose";
import { Iuser } from "../../interface/user.models.interface";
import { IadminRepository } from "../../repository/admin/IadminRepository";
import { IadminService } from "./IadminService";
import { Iadmin } from "../../interface/admin.models.interface";
import { bcryptPassword } from "../../utils/bcrypt";


export class adminService implements IadminService{
    private adminRepository : IadminRepository
    private bcryptPassword : bcryptPassword
    constructor(adminRepository:IadminRepository){
        this.adminRepository = adminRepository
        this.bcryptPassword = new bcryptPassword()
    }
    async createAdmin(name: string, email: string, password: string): Promise<Iuser> {
        const existingEmail = await this.adminRepository.getuserByEmail(email)
        if(existingEmail){
            throw new Error('This email already exists....')
        }
        const hashedPassword = await this.bcryptPassword.hashPassword(password)
        return await this.adminRepository.createAdmin(name,email,hashedPassword)
    }
    async isAdminExists(email: string, password: string): Promise<Iuser> {
        const adminEmailExists = await this.adminRepository.getuserByEmail(email)
        if(!adminEmailExists){
            throw new Error('Invalid email')
        }
        const passwordMatch = await this.bcryptPassword.comparePassword(password,adminEmailExists.password)
        if(!passwordMatch){
            throw new Error('Invalid Password')
        }
        if(adminEmailExists.role=='admin'){
            return adminEmailExists
        }
        else{
            throw new Error('This is not an Admin')
        }
    }
    async getAllusers(): Promise<Iuser[] | []> {
        return this.adminRepository.getAllusers()
    }
    async deleteusersById(id: string): Promise<Iuser | null> {
        const user = await this.adminRepository.finduserByIdAndDelete(id)
        if(!user){
            throw new Error('No user found')
        }
        return user
    }
    async getuserById(id: string): Promise<Iuser | null> {
        const user = await this.adminRepository.getuserById(id)
        if(!user){
            throw new Error("No user found")
        }
        return user
    }
}