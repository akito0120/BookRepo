import mongoose from "mongoose";
import IUser from "@/lib/types/IUser";

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    clerkID: { type: String, required: true, unique: true },
    books: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ],
    records: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Record" },
    ],
    recentlyRead: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    ]
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;