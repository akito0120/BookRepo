import mongoose, {Document} from "mongoose";

export default interface IUser extends Document {
    name: string,
    clerkID: string,
    books: mongoose.Types.ObjectId[],
    records: mongoose.Types.ObjectId[],
    recentlyRead: mongoose.Types.ObjectId[],
}