import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    tags: [
        { type: String, required: true },
    ],
    favorite: { type: Boolean, required: true, default: false },
    read: { type: Boolean, required: true, default: false },
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;