import type { Metadata } from "next";
import "./global.css";
import AnalyticsClient from "./providers/AnalyticsClient";
import AtmosphereBackground from "@/components/AtmosphereBackground";
import SmallLogo from "@/components/icons/SmallLogo";
import {
    SITE_NAME,
    SITE_URL,
    SITE_DESCRIPTION,
    DEFAULT_OG_IMAGE,
    TWITTER_HANDLE,
} from "@/lib/seo";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${SITE_NAME} — Christian Dream Pop`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
        type: "website",
        siteName: SITE_NAME,
        locale: "en_US",
        url: SITE_URL,
        title: `${SITE_NAME} — Christian Dream Pop`,
        description: SITE_DESCRIPTION,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
        card: "summary_large_image",
        site: TWITTER_HANDLE,
        creator: TWITTER_HANDLE,
        title: `${SITE_NAME} — Christian Dream Pop`,
        description: SITE_DESCRIPTION,
        images: [DEFAULT_OG_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    alternates: { canonical: SITE_URL },
};

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