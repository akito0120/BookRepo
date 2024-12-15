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
        <Select onValueChange={onSelectChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="unsort">UnSort</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="title">Title</SelectItem>
            </SelectContent>
        </Select>
    );
}