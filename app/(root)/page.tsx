"use server";

import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchRecentlyRead, fetchUser} from "@/lib/actions/user.actions";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Search} from "lucide-react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card} from "@/components/ui/card";
import BookCard from "@/components/shared/BookCard";
import Autoplay from "embla-carousel-autoplay";


export default async function Page() {
    const user = await currentUser();
    if(!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    const recentlyRead = await fetchRecentlyRead(user.id);

    return (
        <div className="px-10 py-5">
            <div className="w-full mt-2 mb-5 flex gap-5 pr-10">
                <div className="text-3xl font-bold text-gray-900 underline underline-offset-2 px-5">HOME</div>
            </div>
            <div className="px-5 flex justify-center">
                <div className="w-[320px] gap-5">
                    <h2 className="text-sm text-gray-600 mt-2 mb-5 text-center pr-5">Recently Read</h2>
                    <div>
                        <Carousel
                            className="w-full"
                        >
                            <CarouselContent className="-ml-1">
                                {recentlyRead.map((book: any) => (
                                    <CarouselItem className="px-6" key={book.id}>
                                        <div>
                                            <BookCard
                                                id={book.id}
                                                title={book.title}
                                                author={book.author}
                                                description={book.description}
                                                favorite={book.favorite}
                                                read={book.read}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}