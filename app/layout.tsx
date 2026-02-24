import type { Metadata } from "next";
import "./globals.css";
import SmartPlayerWrapper from "@/components/SmartPlayerWrapper";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-black text-white">
                <Header />
                {children}
            </body>
        </html>
    );
}