import {z} from "zod";

export const editBookSchema = z.object({
    author: z.string().min(1, {message: "Author is required" }),
    title: z.string().min(1, {message: "Title is required" }),
    description: z.string(),
    favorite: z.boolean(),
    read: z.boolean(),
});

export const createBookSchema = z.object({
    author: z.string().min(1, {message: "Author is required" }),
    title: z.string().min(1, {message: "Title is required" }),
    description: z.string()
});