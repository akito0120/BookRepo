"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";

export default function PaginationInput({ isNext }: { isNext : boolean }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get("page")) || 1;
    const { replace }  = useRouter();
    const isPrev = currentPage > 1;

    const prevClicked = () => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(currentPage - 1));
        replace(`${pathname}?${params.toString()}`);
    }

    const nextClicked = () => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(currentPage + 1));
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="w-full p-3 flex justify-between">
            <Button onClick={prevClicked} disabled={!isPrev} variant="link">
                <ArrowLeft />
                Previous
            </Button>
            <Button onClick={nextClicked} disabled={!isNext} variant="link">
                Next
                <ArrowRight />
            </Button>
        </div>
    )
}