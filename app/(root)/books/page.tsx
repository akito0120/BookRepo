import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchBooks, fetchUser} from "@/lib/actions/user.actions";
import BookCard from "@/components/shared/BookCard";
import {Button} from "@/components/ui/button";
import {
    BookCheck,
    CheckIcon,
    CheckSquare,
    CheckSquare2,
    CheckSquareIcon,
    Edit,
    Edit2,
    Square,
    SquarePlus,
    ThumbsUp
} from "lucide-react";
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
import PageSizeSelect from "@/components/forms/PageSizeSelect";
import ViewSelect from "@/components/forms/ViewSelect";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import EditBookForm from "@/components/forms/EditBookForm";
import ReadBookButton from "@/components/shared/ReadBookButton";
import DeleteBookButton from "@/components/shared/DeleteBookButton";
import EditBookButton from "@/components/shared/EditBookButton";

export default async function Page(
    { searchParams }
    :
    { searchParams?: Promise<{ search: string, sort: string, page: string, pagesize: string, view: string }>}
) {
    const user = await currentUser();

    if(!user) redirect("/sign-in");
    const userInfo: any = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    const search = (await searchParams)?.search;
    const sort = (await searchParams)?.sort || "unsort";
    const page = Number((await searchParams)?.page) || 1;
    const pageSize = Number((await searchParams)?.pagesize) || 8;
    const view = (await searchParams)?.view || "card";
    const { books, isNext, total }
        = await fetchBooks(user.id, search, sort, page, pageSize)
            || { books: [], isNext: false, total: 0 };

    return (
        <div className="px-10 py-5">
            <div className="w-full mt-2 mb-5 flex gap-5 pr-10">
                <div className="text-3xl font-bold text-gray-900 underline underline-offset-2 px-5">BOOKS</div>

                <div className="flex gap-3 w-full">
                    <SearchInput />
                    <SelectBookSort />
                    <PageSizeSelect />
                    <ViewSelect />
                </div>
            </div>
            <div className="ml-10 mt-10 pb-3">
                <span className="text-sm text-gray-700">{total} results</span>
            </div>
            <div className="flex flex-wrap justify-start gap-2">
                {
                    view === "card" && (
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
                    )
                }
                {
                    view === "list" && (
                        <div className="mx-10 w-full flex justify-center">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Title</TableHead>
                                        <TableHead>Author</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-center">Favorite</TableHead>
                                        <TableHead className="text-center">Read</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        books.map((book: any) => (
                                            <TableRow key={book.id}>
                                                <TableCell className="w-[250px]">
                                                    <span className="line-clamp-1">{book.title}</span>
                                                </TableCell>
                                                <TableCell className="w-[180px]">
                                                    <span className="line-clamp-1">{book.author}</span>
                                                </TableCell>
                                                <TableCell className="w-[300px]">
                                                    <span className="line-clamp-1">{book.description}</span>
                                                </TableCell>
                                                <TableCell>
                                                    {book.favorite && (
                                                        <div className="flex justify-center items-center">
                                                            <ThumbsUp size={20}/>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {book.read && (
                                                        <div className="flex justify-center items-center">
                                                            <BookCheck size={20}/>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right flex gap-1">
                                                    <ReadBookButton bookID={book.id} author={book.author} title={book.title}/>
                                                    <EditBookButton
                                                        id={book.id}
                                                        author={book.author}
                                                        title={book.title}
                                                        description={book.description}
                                                        favorite={book.favorite}
                                                        read={book.read}
                                                    />
                                                    <DeleteBookButton
                                                        bookID={book.id}
                                                        title={book.title}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    )
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
