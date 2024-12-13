import mongoose from "mongoose";

const connectionToDatabase = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL||'')
        console.log('connected to database');
        
    } catch (error) {
        console.error(error)
    }
}


export default connectionToDatabase