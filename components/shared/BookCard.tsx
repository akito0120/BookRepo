import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Edit, Edit2, Play, Trash, Trash2} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export default async function BookCard() {

    return (
        <Card className="w-[280px]">
            <CardHeader className="px-3 pt-3">
                <div className="w-full flex justify-center">
                    <Skeleton className="h-[130px] w-[300px] rounded-md" />
                </div>
            </CardHeader>
            <CardContent className="px-4">
                <div className="px-1">
                    <h1 className="font-bold text-lg">Title</h1>
                    <span className="text-sm">Author Name</span>
                    <div className="font-extralight text-xs mt-3 line-clamp-2 text-gray-600">This is the description. This is the description. This is the description. This is the description.</div>
                </div>
                <div className="pt-4 flex flex-wrap gap-3">
                    <Badge variant="secondary" className="rounded">Tag1</Badge>
                    <Badge variant="secondary" className="rounded">Tag2</Badge>
                    <Badge variant="secondary" className="rounded">Tag3</Badge>
                </div>
            </CardContent>
            <CardFooter className="px-4">
                <TooltipProvider>
                    <div className="flex justify-evenly gap-3 w-full">
                        <Tooltip>
                            <TooltipTrigger className="w-1/3">
                                <Button className="w-full" variant="ghost">
                                    <Play/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Read
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger className="w-1/3">
                                <Button className="w-full" variant="ghost">
                                    <Edit2/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Edit
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger className="w-1/3" asChild>
                                <Button className="w-full" variant="ghost">
                                    <Trash/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Delete
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </CardFooter>
        </Card>
    )
}