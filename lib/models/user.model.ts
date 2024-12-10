import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    clerkID: { type: String, required: true, unique: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;