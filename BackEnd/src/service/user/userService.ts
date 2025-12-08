import { Iuser } from "../../interface/user.models.interface";
import { IuserRepository } from "../../repository/user/IuserRepository";
import { ILoginResponse, IuserService } from "./IuserService";
import { bcryptPassword } from "../../utils/bcrypt";

export class userService implements IuserService{
    private userrepository : IuserRepository
    private bcryptPassword : bcryptPassword;
    constructor(userRepository:IuserRepository){
        this.userrepository = userRepository
        this.bcryptPassword = new bcryptPassword()
    }
    async createuser(user: Iuser): Promise<Iuser> {
        const existingEmail = await this.userrepository.findByuserByEmail(user.email)
        if(existingEmail){
            throw new Error('email already exists...')
        }
        const hashPassword = await this.bcryptPassword.hashPassword(user.password)
        const userData = {...user,password:hashPassword}
        return await this.userrepository.createuser(userData)
    }
    async loginuser(email: string, password: string): Promise<Iuser> {
        const existingEmail = await this.userrepository.findByuserByEmail(email)
        if(!existingEmail){
            throw new Error('Invalid Email...')
        }
        const MatchPassword = await this.bcryptPassword.comparePassword(password,existingEmail.password)
        if(!MatchPassword){
            throw new Error('Invalid Password...')
        }

        return existingEmail
    }
    async updateuser(id: string, user: Partial<Iuser>): Promise<Iuser> {
        if(!user.name){
            throw new Error('name is required...')
        }
        const updateName = await this.userrepository.updateuser(id,{name:user.name, profileImage: user.profileImage})
        if(!updateName){
            throw new Error("user not found")
        }
        return updateName
    }
    async finduserById(id: string): Promise<Iuser | null> {
        const user = await this.userrepository.findByuserById(id)
        if(!user){
            throw new Error("No user found, Please Check...")
        }
        return user
    }
}