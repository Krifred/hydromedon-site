import "./global.css";
import type { ReactNode } from "react";
import AnalyticsClient from "./providers/AnalyticsClient";

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AnalyticsClient>{children}</AnalyticsClient>
            </body>
        </html>
    );
}