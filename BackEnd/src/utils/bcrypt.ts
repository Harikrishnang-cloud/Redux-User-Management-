import bcrypt from 'bcrypt'

export class bcryptPassword{
    public async hashPassword(password:string):Promise<string>{
        const hashPassword = await bcrypt.hash(password,10)
        return hashPassword;
    }
    public async comparePassword(password:string,passwordInDB:string){
        return await bcrypt.compare(password,passwordInDB)
    }
}