import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Play} from "lucide-react";
import {Input} from "@/components/ui/input";
import ReadingSessionForm from "@/components/forms/ReadingSessionForm";


interface Props {
    bookID: string,
    title: string,
    author: string
}

export default async function ReadBookButton( { bookID, title, author }: Props) {
    return (
        <Drawer>
            <Tooltip>
                <TooltipTrigger className="w-1/3" asChild>
                    <DrawerTrigger asChild>
                        <Button className="w-full" variant="ghost" size="sm">
                            <Play/>
                        </Button>
                    </DrawerTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    Read
                </TooltipContent>
            </Tooltip>

            <DrawerContent className="h-[650px] flex flex-col justify-start items-center gap-4">
                <ReadingSessionForm bookID={bookID} title={title} author={author}/>
            </DrawerContent>
        </Drawer>
    )
}