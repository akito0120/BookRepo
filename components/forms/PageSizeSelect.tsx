"use client";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function PageSizeSelect() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("pagesize", value);
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Select defaultValue={searchParams.get("pagesize") || "8"} onValueChange={onChange}>
            <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"8"}>8 items/page</SelectItem>
                <SelectItem value={"16"}>16 items/page</SelectItem>
                <SelectItem value={"32"}>32 items/page</SelectItem>
            </SelectContent>
        </Select>
    )
}