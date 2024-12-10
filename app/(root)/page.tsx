import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchUser} from "@/lib/actions/user.actions";

export default async function Home() {
    const user = await currentUser();

    if(!user) redirect("/sign-in");
    const userInfo: any = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    return (
        <div className="px-10">
            <div className="text-3xl">Home</div>
        </div>
    );
}
