import "./globals.css";
import { AnalyticsProvider } from "./providers/analytics";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AnalyticsProvider>{children}</AnalyticsProvider>
            </body>
        </html>
    );
}
