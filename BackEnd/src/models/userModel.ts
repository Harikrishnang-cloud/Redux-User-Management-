import mongoose from "mongoose";
import { Iuser } from "../interface/user.models.interface";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : "user"
    },
    enrollmentDate : {
        type : Date,
        default : Date.now()
    },
    profileImage:{
        type:String,
    }
})

const userModel = mongoose.model<Iuser>("users",userSchema)
export default userModel