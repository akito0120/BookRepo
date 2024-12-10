import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import {ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/AppSidebar";

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Book Repository",
  description: "Manage books and track activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
        {/*<html lang="en">*/}
        {/*  <body lang="en">*/}

        {/*    <SidebarProvider>*/}
        {/*        <LeftSider />*/}
        {/*        <main>*/}
        {/*            <SidebarTrigger />*/}
        {/*            {children}*/}
        {/*        </main>*/}
        {/*    </SidebarProvider>*/}

        {/*  </body>*/}
        {/*</html>*/}

          <html>
            <body>
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </body>
          </html>
      </ClerkProvider>
  );
}
