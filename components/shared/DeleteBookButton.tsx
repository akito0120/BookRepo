"use client";

import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {deleteBook} from "@/lib/actions/user.actions";
import {useUser} from "@clerk/nextjs";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

export default function DeleteBookButton({ bookID, title }: { bookID: string, title: string }) {
    const { toast } = useToast();
    const { user } = useUser();

    async function onDeleteClick() {
        if(!user || !user.id) return;
        await deleteBook(user.id, bookID);

        toast({
            title: `Successfully Deleted: ${title}`,
        });
    }

    return (
        <Popover>

            <Tooltip>
                <TooltipTrigger className="w-1/3" asChild>
                    <PopoverTrigger asChild>
                        <Button className="w-full" variant="ghost">
                            <Trash/>
                        </Button>
                    </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Delete
                </TooltipContent>
            </Tooltip>

            <PopoverContent className="w-[1]">
                <div className="p-1 flex flex-col gap-2">
                    <div>
                        <p className="text-xs">Do you want to delete "{title}"?</p>
                    </div>
                    <Button
                        className="font-extralight"
                        onClick={onDeleteClick}
                    >
                        Confirm
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}