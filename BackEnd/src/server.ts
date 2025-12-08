import { App } from "./app";
import { connectMongo } from "./config/connectmongo";


const database = new connectMongo()
database.connectDB()
const app = new App()
app.getApp().listen(process.env.PORT,()=>{
    console.log(`server is running on the port ${process.env.PORT}`)
})