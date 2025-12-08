import mongoose from "mongoose";

export class connectMongo{
    private databaseUrl : string
    constructor(){
        
        if(!process.env.MONGODB){
            throw new Error('mongodb connection url is required')
        }
        this.databaseUrl = process.env.MONGODB
    }
    connectDB(){
        mongoose
            .connect(this.databaseUrl)
            .then(()=>{
                console.log("database Connected Successfully")
            })
            .catch((error)=>{
                console.error(error)
            })
    }
}