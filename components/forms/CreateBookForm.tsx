"use client";

import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createBookSchema} from "@/lib/validation/book";
import {useUser} from "@clerk/nextjs";
import {addBook} from "@/lib/actions/user.actions";
import {useToast} from "@/hooks/use-toast";

interface FormData {
    title: string,
    author: string,
    description: string,
}

export default function CreateBookForm() {
    const { user } = useUser();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(createBookSchema)
    });

    async function onSubmit(data: FormData) {
        const { title, author, description } = data;

        if(!user) return;

        console.log(data);

        await addBook({
            clerkID: user.id,
            title: title,
            author: author,
            description: description
        });

        reset();
        toast({
            title: `Successfully added: ${title}`
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col px-5 gap-4">
                    <Input
                        type="text"
                        placeholder="Title"
                        id="title"
                        {...register("title")}
                    />
                    <Input
                        type="text"
                        placeholder="Author"
                        id="author"
                        {...register("author")}
                    />
                    <Textarea
                        placeholder="description"
                        id="description"
                        {...register("description")}
                        rows={10}
                    />
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </div>
    );
}