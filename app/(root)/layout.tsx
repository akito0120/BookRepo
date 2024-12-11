import type { Metadata } from "next";
import "../globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/AppSidebar";

export const metadata: Metadata = {
  title: "Book Repository",
  description: "Manage books and track activities",
};

export default function RootLayout({ children }: { children: React.ReactNode } ) {
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
                </SidebarProvider>
            </body>
          </html>
      </ClerkProvider>
  );
}