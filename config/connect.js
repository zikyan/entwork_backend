import mongoose from "mongoose";

export const connectDb = async ()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },()=>{
            console.log('Mongodb Connected');
        });   
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}