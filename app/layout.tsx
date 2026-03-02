import "./global.css";
//import type { ReactNode } from "react";
import AnalyticsClient from "./providers/AnalyticsClient";
import AtmosphereBackground from "@/components/AtmosphereBackground";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="relative">
                <AtmosphereBackground />
                <AnalyticsClient>{children}</AnalyticsClient>
                {children}
            </body>
        </html>
    );
}