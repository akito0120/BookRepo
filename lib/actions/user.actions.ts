"use server";

import {connectDB} from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import Book from "@/lib/models/book.model";
import {revalidatePath} from "next/cache";
import Record from "@/lib/models/record.model";

export async function createUser(name: string, clerkID: string): Promise<void> {
    try{
        await connectDB();

        const newUser = new User({
            name: name,
            clerkID: clerkID,
            books: [],
            records: [],
            recentlyRead: [],
        });

        await newUser.save();
        console.log("Successfully created user");
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

export async function addBook(
    {
        clerkID,
        title,
        author,
        description
    }
    :
    {
        clerkID: string
        title: string;
        author: string;
        description: string;
    }
) {
    try{
        await connectDB();

        const book = new Book({
            title: title,
            author: author,
            description: description.trim() === "" ? "" : description,
            favorite: false,
            read: false
        });

        const bookID = await book.save();

        const user = await User.findOne({clerkID: clerkID});
        user.books.push(bookID);
        await user.save();
        revalidatePath("/books");
        console.log("Successfully added book: " + bookID);
    }catch(error) {
        console.log("Failed to add book: " + error);
    }
}

export async function fetchBooks(
    clerkID: string,
    search: string | undefined,
    sort: string,
    page: number = 1,
    pageSize: number = 8
) {
    try{
        const skipAmount = (page - 1) * pageSize;

        await connectDB();

        let sortOption: any = {};
        if(sort === "author" ){
            sortOption.author = 1;
        }else if(sort === "title"){
            sortOption.title = 1;
        }

        if(search) {
            const user = await User
                .findOne({clerkID: clerkID})
                .populate({
                    path: "books",
                    model: Book,
                    match: {
                        $or: [
                            { title: { $regex: search, $options: "i" } },
                            { author: { $regex: search, $options: "i" } },
                            { description: { $regex: search, $options: "i" } },
                        ]
                    },
                    options: { sort: sortOption }
                })
                .exec();

            const isNext = user.books.length > skipAmount + pageSize;

            return {
                books: user.books.slice(skipAmount, skipAmount + pageSize),
                isNext: isNext,
                total: user.books.length
            }
        }else {
            const user = await User
                .findOne({clerkID: clerkID})
                .populate({
                    path: "books",
                    model: Book,
                    options: { sort: sortOption }
                })
                .exec();

            const isNext = user.books.length > skipAmount + pageSize;

            return {
                books: user.books.slice(skipAmount, skipAmount + pageSize),
                isNext: isNext,
                total: user.books.length
            }
        }


    }catch(error) {
        console.log("Failed to fetch books: " + error);
    }
}

export async function updateBook(
    {
        id,
        title,
        author,
        description,
        favorite,
        read
    }
    :
    {
        id: string,
        title: string,
        author: string,
        description: string,
        favorite: boolean,
        read: boolean
    }
) {
    try{
        await connectDB();

        const updatedBook = await Book.findByIdAndUpdate(id, {
            $set: {
                title: title,
                author: author,
                description: description,
                favorite: favorite,
                read: read,
            }
        });

        revalidatePath("/books");
        revalidatePath("/");
        console.log("Successfully updated book: " + updatedBook);
    }catch(error) {
        console.log("Failed to update book: " + error);
    }
}


export async function deleteBook(clerkID: string, bookID: string) {
    try{
        await connectDB();

        const deletedBook = await Book.findByIdAndDelete(bookID);

        await User.updateOne({clerkID: clerkID}, {
            $pull: {
                books: bookID,
                recentlyRead: bookID
            }
        });

        revalidatePath("/books");
        revalidatePath("/");

        console.log("Successfully deleted book: " + deletedBook);
    }catch(error) {
        console.log("Failed to delete book: " + error);
    }
}

export async function addRecord(
    {
        clerkID,
        title,
        author,
        date,
        page,
        time
    }
    :
    {
        clerkID: string;
        title: string,
        author: string,
        date: Date,
        page: number,
        time: number
    }
) {
    try{
        await connectDB();

        const record = new Record({
            title: title,
            author: author,
            date: date,
            page: page,
            time: time
        });

        const savedRecord = await record.save();

        const user = await User.findOne({clerkID: clerkID});

        if(user) {
            user.records.push(savedRecord);
            await user.save();
            console.log("Successfully added record: " + record);
        }else {
            console.log("User does not exist");
        }
    }catch(error) {
        console.log("Failed to add record: " + error);
    }
}

export async function fetchRecords(clerkID: string) {
    try{
        await connectDB();

        const user = await User
            .findOne({clerkID: clerkID})
            .populate({
                path: "records",
                model: Record
            })
            .exec();

        return user.records;
    }catch(error) {
        console.log("Failed to fetch records: " + error);
    }
}

export async function addRecentlyRead(clerkID: string, bookID: string) {
    try{
        await connectDB();

        await User.findOneAndUpdate({clerkID: clerkID}, {
            $addToSet: {
                recentlyRead: bookID,
            }
        });

        await User.findOneAndUpdate({clerkID: clerkID}, {
            $push: {
                recentlyRead: {
                    $each: [],
                    $slice: -5
                }
            }
        });

    }catch(error) {
        console.log("Failed to add recently read book: " + error);
    }
}

export async function fetchRecentlyRead(clerkID: string) {
    try{
        await connectDB();

        const user = await User
            .findOne({clerkID: clerkID})
            .populate({
                path: "recentlyRead",
                model: Book
            })
            .exec();

        return user.recentlyRead;
    }catch(error) {
        console.log("Failed to fetch recently read book: " + error);
    }
}
