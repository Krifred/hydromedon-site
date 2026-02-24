import type { Metadata } from "next";
import "./globals.css";
import SmartPlayerWrapper from "@/components/SmartPlayerWrapper";

export const metadata: Metadata = {
    title: "Hydromedon",
    description: "Mythis, cinematic, kingdom-themed music experience",
    icons: [
        { rel: "icon", url: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
        { rel: "icon", url: "/icons/favicon-16.png", type: "image/png", sizes: "16x16" },
        { rel: "apple-touch-icon", url: "/icons/apple-touch-icon.png", sizes: "180x180" },
        { rel: "icon", url: "/icons/favicon-48.png", type: "image/png", sizes: "48x48" },
        { rel: "icon", url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-black text-white antialiased font-inter">
                <SmartPlayerWrapper>
                    {children}
                </SmartPlayerWrapper>
            </body>
        </html>
    );
}
