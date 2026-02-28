import "./global.css";
import type { ReactNode } from "react";
import { AnalyticsProvider } from "./providers/analytics";

export default function RootLayout({ 
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AnalyticsProvider>{children}</AnalyticsProvider>
            </body>
        </html>
    );
}