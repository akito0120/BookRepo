import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/shared/Header";
import LeftSider from "@/components/shared/LeftSider";
import {ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

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
        <html lang="en">
          <body>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {children}
          </body>
        </html>
      </ClerkProvider>
  );
}
