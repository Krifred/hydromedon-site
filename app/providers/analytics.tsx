"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { usePathname } from "next/navigation";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

type AnalyticsContextType = {
    setComponentContext: (component: string) => void;
};

const AnalyticsContext = createContext<AnalyticsContextType>({
    setComponentContext: () => { },
});

export function AnalyticsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [componentContext, setComponentContext] = useState("unknown_component");

    // ✅ Safe for build + SSR
    const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    /* ---------------------------
       Load GA4 once
       --------------------------- */
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!MEASUREMENT_ID) return;
        if (window.gtag) return;

        const script1 = document.createElement("script");
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        document.head.appendChild(script1);

        const script2 = document.createElement("script");
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${MEASUREMENT_ID}', { send_page_view: false });
    `;
        document.head.appendChild(script2);
    }, [MEASUREMENT_ID]);

    /* ---------------------------
       Track SPA page views
       --------------------------- */
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!window.gtag) return;

        window.gtag("event", "page_view", {
            page_path: pathname,
            page_location: window.location.href,
            page_title: document.title,
        });
    }, [pathname]);

    /* ---------------------------
       Campaign name (stable)
       --------------------------- */
    const campaign = useMemo(() => {
        if (pathname === "/") return "homepage";

        const parts = pathname.split("/").filter(Boolean);
        if (parts.length >= 2) {
            return `${parts[0]}_${parts[1].replace(/-/g, "_")}`;
        }

        return parts[0]?.replace(/-/g, "_") ?? "unknown";
    }, [pathname]);

    /* ---------------------------
       Outbound tracking
       --------------------------- */
    useEffect(() => {
        if (typeof window === "undefined") return;

        function handleClick(event: MouseEvent) {
            const link = (event.target as HTMLElement)?.closest("a");
            if (!link) return;

            // Respect modified clicks
            if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.button !== 0
            ) {
                return;
            }

            const href = link.href;
            if (!href) return;

            const isSpotify = href.includes("open.spotify.com");
            const isYouTube =
                href.includes("youtube.com") || href.includes("youtu.be");
            if (!isSpotify && !isYouTube) return;

            event.preventDefault();

            const url = new URL(href);
            url.searchParams.set("utm_source", "website");
            url.searchParams.set("utm_medium", componentContext);
            url.searchParams.set("utm_campaign", campaign);

            const eventName = isSpotify ? "spotify_click" : "youtube_click";

            const openInNewTab =
                link.getAttribute("target") === "_blank" ||
                link.rel?.includes("noopener") ||
                link.rel?.includes("noreferrer");

            let navigated = false;

            const navigate = () => {
                if (navigated) return;
                navigated = true;

                if (openInNewTab) {
                    window.open(url.toString(), "_blank", "noopener,noreferrer");
                } else {
                    window.location.href = url.toString();
                }
            };

            const fallbackTimer = window.setTimeout(navigate, 500);

            window.gtag?.("event", eventName, {
                link_url: url.toString(),
                component: componentContext,
                campaign,
                event_callback: () => {
                    window.clearTimeout(fallbackTimer);
                    navigate();
                },
            });
        }

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [componentContext, campaign]);

    return (
        <AnalyticsContext.Provider value={{ setComponentContext }}>
            {children}
        </AnalyticsContext.Provider>
    );
}

export function useAnalytics() {
    return useContext(AnalyticsContext);
}