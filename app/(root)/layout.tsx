import type { Metadata } from "next";
import "../globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/AppSidebar";
import {Toaster} from "@/components/ui/toaster";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {fetchUser} from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Book Repository",
  description: "Manage books and track activities",
};

export default async function RootLayout({ children }: { children: React.ReactNode } ) {
    const user = await currentUser();
    if(!user) redirect("/sign-in");

    const userInfo = await fetchUser(user.id);
    if(!userInfo) redirect("/onboarding");

    return (
      <ClerkProvider>
          <html className="min-h-screen">
            <body className="min-h-screen">
                <SidebarProvider>
                    <AppSidebar />
                    <main className="w-full h-full">
                        <SidebarTrigger />
                        {children}
                    </main>
                    <Toaster/>
                </SidebarProvider>
            </body>
          </html>
      </ClerkProvider>
  );
}