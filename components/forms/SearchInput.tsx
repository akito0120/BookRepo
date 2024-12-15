"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounce, useDebouncedCallback} from "use-debounce";


export default function SearchInput() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const handleInput = useDebouncedCallback((text: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if(text) {
            params.set("search", text);
        }else {
            params.delete("search");
        }
        router.replace(`${path}?${params.toString()}`);
    }, 300);

    return (
        <Input
            type="text"
            placeholder="Search"
            onChange={e => handleInput(e.target.value)}
            defaultValue={searchParams.get("search")?.toString()}
        />
    )
}