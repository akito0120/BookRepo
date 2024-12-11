import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchUser} from "@/lib/actions/user.actions";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/shared/BookCard";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";

export default async function Home() {
    const user = await currentUser();

    if(!user) redirect("/sign-in");
    const userInfo: any = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    return (
        <div className="px-10 py-5">
            <div className="w-full my-7 flex gap-5 pr-10">
                <div className="text-3xl font-extrabold text-gray-900 underline underline-offset-2 px-5">HOME</div>

                <div className="flex gap-3 w-full">
                    <Input type="text" placeholder="Search"/>
                    <Button>
                        <Search />
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap justify-start gap-2">
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
            </div>
            <div className="flex justify-center mt-10">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
