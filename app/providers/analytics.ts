"use client";

import { createContext, useContext, useEffect, useState } from "react";

const MEASUREMENT_ID = "G-6T99RSRGEF";

type AnalyticsContextType = {
    setComponentContext: (component: string) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
    setComponentContext: () => { },
});

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const [componentContext, setComponentContext] = useState<string>("");

    // Load GA4
    useEffect(() => {
        if (!window.gtag) {
            const script1 = document.createElement("script");
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
            document.head.appendChild(script1);

            const script2 = document.createElement("script");
            script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${MEASUREMENT_ID}');
      `;
            document.head.appendChild(script2);
        }
    }, []);

    // Build UTM campaign from pathname
    function getCampaignFromPath() {
        const path = window.location.pathname;

        if (path === "/") return "homepage";

        const parts = path.split("/").filter(Boolean);

        if (parts.length >= 2) {
            const category = parts[0]; // single, video, album, lyric, live
            const slug = parts[1].replace(/-/g, "_");
            return `${category}_${slug}`;
        }

        return parts[0].replace(/-/g, "_");
    }

    // Inject UTMs into outbound links
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const link = (event.target as HTMLElement).closest("a");
            if (!link) return;

            const href = link.href;

            const isSpotify = href.includes("open.spotify.com");
            const isYouTube =
                href.includes("youtube.com") || href.includes("youtu.be");

            if (!isSpotify && !isYouTube) return;

            const campaign = getCampaignFromPath();
            const medium = componentContext || "unknown_component";

            const url = new URL(href);
            url.searchParams.set("utm_source", "website");
            url.searchParams.set("utm_medium", medium);
            url.searchParams.set("utm_campaign", campaign);

            link.href = url.toString();

            if (isSpotify) {
                window.gtag?.("event", "spotify_click", {
                    href: url.toString(),
                    component: medium,
                    campaign,
                });
            }

            if (isYouTube) {
                window.gtag?.("event", "youtube_click", {
                    href: url.toString(),
                    component: medium,
                    campaign,
                });
            }
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [componentContext]);

    return (
        <AnalyticsContext.Provider value = {{ setComponentContext }
} >
    { children }
    </AnalyticsContext.Provider>
);

}

export function useAnalytics() {
    return useContext(AnalyticsContext);
}
