"use server";

import {connectDB} from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export async function createUser(name: string, clerkID: string): Promise<void> {
    try{
        await connectDB();

        const newUser = new User({
            name: name,
            clerkID: clerkID,
            books: []
        });

        await newUser.save();
    }catch(error) {
        console.log("Failed to create user: " + error);
    }
}

export async function fetchUser(clerkID: string) {
    try{
        await connectDB();

        return await User.findOne({clerkID: clerkID});
    }catch(error) {
        console.log("Failed to fetch user: " + error);
    }
}