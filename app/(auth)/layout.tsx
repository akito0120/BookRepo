import {ClerkProvider} from "@clerk/nextjs";


export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <ClerkProvider>
            <html className="w-full h-full">
                <body className="w-full h-full">
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}