"use client";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function SelectBookSort() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const onSelectChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Select onValueChange={onSelectChange} defaultValue={searchParams.get("sort") || "unsort"}>
            <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="unsort">No sorting</SelectItem>
                <SelectItem value="author">Sort by author</SelectItem>
                <SelectItem value="title">Sort by title</SelectItem>
            </SelectContent>
        </Select>
    );
}