import {currentUser, User} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchBooks, fetchUser} from "@/lib/actions/user.actions";
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
import {Search, Square, SquarePlus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import CreateBookForm from "@/components/forms/CreateBookForm";

export default async function Page() {
    const user = await currentUser();

    if(!user) redirect("/sign-in");
    const userInfo: any = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    const books: any = await fetchBooks(user.id);

    return (
        <div className="px-10 py-5">
            <div className="w-full my-7 flex gap-5 pr-10">
                <div className="text-3xl font-bold text-gray-900 underline underline-offset-2 px-5">BOOKS</div>

                <div className="flex gap-3 w-full">
                    <Input type="text" placeholder="Search"/>
                    <Button>
                        <Search />
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap justify-start gap-2">
                {
                    books.map((book: any) => (
                        <>
                            <BookCard
                                key={JSON.stringify(book._id)}
                                title={book.title}
                                author={book.author}
                                description={book.description}
                                id={book._id.toString()}
                                favorite={book.favorite}
                                read={book.read}
                            />
                        </>
                    ))
                }
            </div>
            <div className="fixed bottom-4 left-1/2">
                <Dialog>
                    <DialogTrigger>
                        <Button>
                            <SquarePlus />
                            Add New Book
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <h1 className="px-5">
                                    Add new book
                                </h1>
                            </DialogTitle>
                        </DialogHeader>
                        <CreateBookForm />
                    </DialogContent>
                </Dialog>

                {/*<Pagination>*/}
                {/*    <PaginationContent>*/}
                {/*        <PaginationItem>*/}
                {/*            <PaginationPrevious href="#" />*/}
                {/*        </PaginationItem>*/}
                {/*        <PaginationItem>*/}
                {/*            <PaginationLink href="#">1</PaginationLink>*/}
                {/*        </PaginationItem>*/}
                {/*        <PaginationItem>*/}
                {/*            <PaginationLink href="#" isActive>*/}
                {/*                2*/}
                {/*            </PaginationLink>*/}
                {/*        </PaginationItem>*/}
                {/*        <PaginationItem>*/}
                {/*            <PaginationLink href="#">3</PaginationLink>*/}
                {/*        </PaginationItem>*/}
                {/*        <PaginationItem>*/}
                {/*            <PaginationEllipsis />*/}
                {/*        </PaginationItem>*/}
                {/*        <PaginationItem>*/}
                {/*            <PaginationNext href="#" />*/}
                {/*        </PaginationItem>*/}
                {/*    </PaginationContent>*/}
                {/*</Pagination>*/}
            </div>
            <div className="py-10"></div>
        </div>
    );
}
