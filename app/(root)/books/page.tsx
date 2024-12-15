import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchBooks, fetchUser} from "@/lib/actions/user.actions";
import BookCard from "@/components/shared/BookCard";
import {Button} from "@/components/ui/button";
import {SquarePlus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import CreateBookForm from "@/components/forms/CreateBookForm";
import SearchInput from "@/components/forms/SearchInput";
import PaginationInput from "@/components/forms/PaginationInput";
import SelectBookSort from "@/components/forms/SelectBookSort";

export default async function Page({ searchParams }: { searchParams?: { search: string, sort: string, page: number } }) {
    const user = await currentUser();

    if(!user) redirect("/sign-in");
    const userInfo: any = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    const search = (await searchParams)?.search;
    const sort = (await searchParams)?.sort || "unsort";
    const page = (await searchParams)?.page;
    const { books, isNext } = await fetchBooks(user.id, search, sort, page, 8) || { books: [], isNext: false };

    return (
        <div className="px-10 py-5">
            <div className="w-full mt-2 mb-5 flex gap-5 pr-10">
                <div className="text-3xl font-bold text-gray-900 underline underline-offset-2 px-5">BOOKS</div>

                <div className="flex gap-3 w-full">
                    <SearchInput />
                    <SelectBookSort />
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
                    <DialogTitle></DialogTitle>
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
            </div>
            <div className="flex justify-center mt-10 pr-10">
                <PaginationInput isNext={isNext}/>
            </div>
            <div className="py-10"></div>
        </div>
    );
}
