import type {Metadata} from "next";
import {Merriweather_Sans} from "next/font/google";
import "./globals.css";

const merriweather = Merriweather_Sans({weight: ["300", "400", "500"], subsets: ["latin"]})


export const metadata: Metadata = {
    title: "KAAM debt tracker",
    description: "To help in managing the debt we have inside of the shop",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${merriweather.className} antialiased`}
        >
        <div className="grid h-dvh">
            {children}
        </div>
        </body>
        </html>
    );
}
