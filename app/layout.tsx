import "./global.css";
import AnalyticsClient from "./providers/AnalyticsClient";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import SmallLogo from "@/components/icons/SmallLogo"; // <-- NEW

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="relative min-h-screen overflow-x-hidden">
                <SmallLogo />   {/* <-- This handles the conditional display */}

                <AtmosphereBackground />

                <AnalyticsClient>
                    {children}
                </AnalyticsClient>
            </body>
        </html>
    );
}