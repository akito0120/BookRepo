"use client";

import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editBookSchema} from "@/lib/validation/book";
import {useUser} from "@clerk/nextjs";
import {updateBook} from "@/lib/actions/user.actions";
import {useToast} from "@/hooks/use-toast";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {FormField} from "@/components/ui/form";
import {Skeleton} from "@/components/ui/skeleton";

interface FormData {
    title: string,
    author: string,
    description: string,
    favorite: boolean,
    read: boolean
}

interface Props {
    id: string,
    defaultTitle: string,
    defaultAuthor: string,
    defaultDescription: string,
    defaultFavorite: boolean,
    defaultRead: boolean,
}

export default function EditBookForm(
    { id, defaultTitle, defaultAuthor, defaultDescription, defaultFavorite, defaultRead }
    : Props
) {
    const { user } = useUser();
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        reset,
        control
    } = useForm<FormData>({
        resolver: zodResolver(editBookSchema)
    });

    async function onSubmit(data: FormData) {
        const { title, author, description, favorite, read } = data;

        if(!user) return;

        await updateBook({
            id: id,
            title: title,
            author: author,
            description: description,
            favorite: favorite,
            read: read,
        });

        toast({
            title: `Successfully updated: ${title}`,
        });
    }

    return (
        <div className="flex gap-1 items-center">
            <Skeleton className="w-[200px] h-[280px] rounded-md drop-shadow-xl"/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col px-5 gap-4">
                    <h2 className="font-bold">Edit Book Information</h2>
                    <div className="flex gap-8 justify-start">
                        <Controller
                            render={({field}: any) => (
                                <div className="flex items-center gap-2">
                                    <Switch checked={field.value} onCheckedChange={field.onChange}/>
                                    <Label>Favorite</Label>
                                </div>
                            )}
                            name="favorite"
                            control={control}
                            defaultValue={defaultFavorite}
                        />

                        <Controller
                            render={({field}: any) => (
                                <div className="flex items-center gap-2">
                                    <Switch id="read" checked={field.value} onCheckedChange={field.onChange}/>
                                    <Label htmlFor="read">Read</Label>
                                </div>
                            )}
                            name="read"
                            control={control}
                            defaultValue={defaultRead}
                        />

                    </div>
                    <Input
                        type="text"
                        placeholder="Title"
                        id="title"
                        {...register("title")}
                        defaultValue={defaultTitle}
                    />
                    <Input
                        type="text"
                        placeholder="Author"
                        id="author"
                        {...register("author")}
                        defaultValue={defaultAuthor}
                    />
                    <Textarea
                        placeholder="description"
                        id="description"
                        {...register("description")}
                        rows={5}
                        defaultValue={defaultDescription}
                    />
                    <Button type="submit">Apply</Button>
                </div>
            </form>
        </div>
    );
}