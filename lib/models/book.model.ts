import mongoose from "mongoose";
import IBook from "@/lib/types/IBook";

const bookSchema = new mongoose.Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, default: "" },
    favorite: { type: Boolean, required: true, default: false },
    read: { type: Boolean, required: true, default: false },
});

const Book = mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);

export default Book;