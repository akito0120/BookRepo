"use client";

import {useUser} from "@clerk/nextjs";
import {createUser} from "@/lib/actions/user.actions";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userSchema} from "@/lib/validation/user";
import { z } from 'zod';
import {redirect} from "next/navigation";


interface FormData {
    name: string
}

export default function UserInfoForm() {
    const { user } = useUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userSchema)
    });

    async function onSubmit(data: FormData) {
        const { name } = data;
        if(user) {
            await createUser(name, user.id);
        }else {
            console.log("User is null");
        }
        redirect("/");
    }

    return (
        <Card className="w-[500px] shadow-lg">
            <CardHeader>
                <CardTitle>Welcome to Book Repository!</CardTitle>
                <CardDescription>Fill in the form below to start using Book Repository</CardDescription>

            </CardHeader>
            <CardContent>
                <div className="mb-3">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl || ""} />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <div className="flex gap-3 flex-col w-full gap-2">
                            <Input
                                placeholder="Name"
                                type="text"
                                id="name"
                                {...register('name')}
                            />
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="What is the main purpose of using this app?"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">To manage book information</SelectItem>
                                    <SelectItem value="dark">To record reading activities</SelectItem>
                                    <SelectItem value="system">To view statistics on past activities</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end w-full mt-5">
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}