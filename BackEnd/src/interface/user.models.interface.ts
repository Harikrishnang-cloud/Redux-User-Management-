export interface Iuser{
    _id? : string;
    name : string;
    email : string;
    password : string;
    role : 'admin'|'user'
    enrollmentDate : string;
    profileImage?:string
}