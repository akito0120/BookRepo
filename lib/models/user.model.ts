import mongoose from "mongoose";
import {Schema} from "node:inspector";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    clerkID: { type: String, required: true, unique: true },
    books: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;