import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    if(!process.env.MONGODB_URL) {
        console.log("MongoDB URI is missing");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("Connected to MongoDB");
    }catch(error) {
        console.log("Failed to connect to MongoDB : " + error);
    }
}
