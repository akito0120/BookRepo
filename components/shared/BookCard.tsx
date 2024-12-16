import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Edit, Edit2, Play, Trash, Trash2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import CreateBookForm from "@/components/forms/CreateBookForm";
import EditBookForm from "@/components/forms/EditBookForm";
import {deleteBook} from "@/lib/actions/user.actions";
import {currentUser} from "@clerk/nextjs/server";
import DeleteBookButton from "@/components/shared/DeleteBookButton";
import ReadBookButton from "@/components/shared/ReadBookButton";
import EditBookButton from "@/components/shared/EditBookButton";

interface Props {
    id: string;
    title: string,
    author: string,
    description: string,
    favorite: boolean,
    read: boolean
}

export default async function BookCard({ id, title, author, description, favorite, read }: Props) {
    const user: any = currentUser();

    async function onDeleteClick() {
        if(!user) return;
        await deleteBook(user.id, id);
    }

    return (
        <Card className="w-[280px] flex flex-col justify-between drop-shadow-sm">
            <div>
                <CardHeader className="px-3 pt-3">
                    <div className="w-full flex justify-center pt-2 px-2">
                        <Skeleton className="h-[130px] w-[250px] rounded-md drop-shadow-sm" />
                    </div>
                </CardHeader>
                <CardContent className="px-4">
                    <div className="px-1">
                        <div className="flex gap-2 mb-2">

                            {favorite && <Badge className="font-extralight rounded-sm px-1">Favorite</Badge>}
                            {!read && <Badge className="font-extralight rounded-sm px-1" variant="secondary">Unread</Badge>}

                        </div>
                        <h1 className="font-bold text-lg">{title}</h1>
                        <span className="text-sm">{author}</span>

                        <div className="font-extralight text-xs mt-3 line-clamp-2 text-gray-600">{description}</div>
                    </div>
                </CardContent>
            </div>
            <CardFooter className="px-4">
                <TooltipProvider>
                    <div className="flex justify-evenly gap-2 w-full py-0">
                        <ReadBookButton bookID={id} author={author} title={title}/>
                        <EditBookButton
                            id={id}
                            author={author}
                            title={title}
                            description={description}
                            favorite={favorite}
                            read={read}
                        />
                        <DeleteBookButton
                            bookID={id}
                            title={title}
                        />
                    </div>
                </TooltipProvider>
            </CardFooter>
        </Card>
    )
}