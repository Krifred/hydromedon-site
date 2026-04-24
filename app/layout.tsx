import "./global.css";
import type { Viewport } from "next";
import AnalyticsClient from "./providers/AnalyticsClient";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import Header from "@/components/Header";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="relative min-h-screen overflow-x-hidden">
                <AtmosphereBackground />

                <Header />

                <AnalyticsClient>
                    {children}
                </AnalyticsClient>
            </body>
        </html>
    );
}