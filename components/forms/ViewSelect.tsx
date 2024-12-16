
"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Grid, List} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function ViewSelect() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("view", value);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Tabs defaultValue={searchParams.get("view") || "card"} onValueChange={onChange}>
            <TabsList>
                <TabsTrigger value="card">
                    <Grid />
                </TabsTrigger>
                <TabsTrigger value="list">
                    <List />
                </TabsTrigger>
            </TabsList>
            <TabsContent value="card"></TabsContent>
            <TabsContent value="list"></TabsContent>
        </Tabs>
    )
}