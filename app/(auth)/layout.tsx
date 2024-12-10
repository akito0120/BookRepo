import {ClerkProvider} from "@clerk/nextjs";
import "@/app/globals.css";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <html className="w-screen h-screen">
                <body className="w-screen h-screen">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}