import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Edit2} from "lucide-react";
import EditBookForm from "@/components/forms/EditBookForm";

export default function EditBookButton(
    {
        id,
        author,
        title,
        description,
        favorite,
        read
    }
    :
    {
        id: string,
        author: string,
        title: string,
        description: string,
        favorite: boolean,
        read: boolean
    }
) {
    return (
        <Tooltip>
            <Dialog>
                <DialogTrigger className="w-full" asChild>
                    <TooltipTrigger className="w-1/3" asChild>
                        <Button className="w-full" variant="ghost" size="sm">
                            <Edit2/>
                        </Button>
                    </TooltipTrigger>
                </DialogTrigger>
                <DialogContent className="w-full">
                    <EditBookForm
                        defaultAuthor={author}
                        defaultTitle={title}
                        defaultDescription={description}
                        id={id}
                        defaultFavorite={favorite}
                        defaultRead={read}
                    />
                </DialogContent>

            </Dialog>
            <TooltipContent>
                Edit
            </TooltipContent>
        </Tooltip>
    )
}