import {siderItems} from "@/lib/constants";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {UserButton} from "@clerk/nextjs";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchUser} from "@/lib/actions/user.actions";

export default async function AppSidebar() {
    const user = await currentUser();

    if(!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);

    if(!userInfo) redirect("/onboarding");

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {siderItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="pl-3 pb-2 flex flex-row gap-3 items-center">
                    <UserButton />
                    <p className="text-black text-sm">Logged in as {userInfo.name}</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}