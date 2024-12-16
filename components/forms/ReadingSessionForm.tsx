"use client";

import {JSX, useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import {Button} from "@/components/ui/button";
import {Check, Play, Square} from "lucide-react";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useUser} from "@clerk/nextjs";
import {addRecentlyRead, addRecord} from "@/lib/actions/user.actions";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";

interface Props {
    bookID: string
    title: string,
    author: string
}

type SessionState = "unstarted" | "proceeding" | "paused";

export default function ReadingSessionForm({ bookID, title, author }: Props) {
    const startPageRef = useRef<HTMLInputElement>(null);
    const finishPageRef = useRef<HTMLInputElement>(null);
    const [time, setTime] = useState<number>(0);
    const [state, setState] = useState<SessionState>("unstarted");
    const { toast } = useToast();
    const [timerID, setTimerID] = useState<NodeJS.Timeout | undefined>(undefined);
    const { user } = useUser();

    useEffect(() => {
        if(state === "proceeding" && timerID === undefined) {
            const id = setInterval(() => {
                setTime(t => t + 1);
            }, 1000);

            setTimerID(id);
        }else if(state === "paused" || state === "unstarted") {
            clearInterval(timerID);
            setTimerID(undefined);
        }
    }, [state]);

    function startSession() {
        if(state === "unstarted" || state === "paused") {
            setState("proceeding");
        }
    }

    function pauseSession() {
        if(state === "proceeding") {
            setState("paused");
        }
    }

    async function finishSession() {
        if(state !== "unstarted") {
            if(!startPageRef?.current?.value || !finishPageRef?.current?.value) return;
            if(!user || !user.id) return;

            setState("unstarted");
            setTime(0);

            const startPage = +startPageRef?.current?.value;
            const finishPage = +finishPageRef?.current?.value;
            const totalPage = finishPage - startPage + 1;

            const totalTime = Math.floor(time / 60);

            const date = new Date();

            await addRecord({
                clerkID: user.id,
                title: title,
                author: author,
                date: date,
                page: totalPage,
                time: totalTime
            });

            await addRecentlyRead(user.id, bookID);

            toast({
                title: "Finished a reading session",
                description: `You read ${totalPage} page(s) in ${totalTime} minute(s)`,
            });
        }
    }

    function formatTimeString(time: number): string {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const paddedHours = String(hours).padStart(2, "0");
        const paddedMinutes = String(minutes).padStart(2, "0");
        const paddedSeconds = String(seconds).padStart(2, "0");

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }

    return (
        <div className="w-1/2 gap-3 p-5 flex items-center h-full mb-10">
            <div className="flex justify-center w-full gap-5">
                <Skeleton className="w-[320px] h-[320px] drop-shadow-xl"/>
                <div className="w-full px-3 flex flex-col gap-3">

                    <div className="px-3 gap-4">
                        <span className="text-xs text-gray-500">You are reading...</span>
                        <h2 className="font-semibold text-lg">{title}</h2>
                        <span className="text-gray-700">{author}</span>
                    </div>

                    <div className="px-3 py-2 gap-3">
                        <span className="text-6xl font-semibold">{formatTimeString(time)}</span>
                    </div>

                    <div className="flex p-3 gap-2">
                        <Button
                            onClick={startSession}
                            disabled={state !== "unstarted" && state !== "paused"}
                        >
                            <Play />
                            {state === "unstarted" ? "Start" : "Resume"}
                        </Button>
                        <Button
                            onClick={pauseSession}
                            disabled={state !== "proceeding"}
                        >
                            <Square />
                            Pause
                        </Button>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    // onClick={finishSession}
                                    disabled={state === "unstarted"}
                                >
                                    <Check />
                                    Finish
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="gap-2 flex flex-col justify-center w-full">
                                <p className="text-center text-sm">Do you want to finish reading?</p>
                                <Button
                                    onClick={finishSession}
                                >
                                    Confirm
                                </Button>
                            </PopoverContent>
                        </Popover>

                    </div>

                    <div className="flex flex-row gap-3 items-center w-[330px] px-3">
                        <div >
                            <Label className="pl-2">From</Label>
                            <Input
                                type="number"
                                min={0}
                                placeholder="From"
                                defaultValue={0}
                                ref={startPageRef}
                            />
                        </div>

                        <div>
                            <Label className="pl-2">To</Label>
                            <Input
                                type="number"
                                placeholder="To"
                                min={0}
                                defaultValue={0}
                                ref={finishPageRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}