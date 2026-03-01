"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { usePathname } from "next/navigation";

const MEASUREMENT_ID = "G-P4J0RB4GCZ";

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

    /* ---------------------------
       Load GA4 once
       --------------------------- */
    useEffect(() => {
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
      gtag('config', '${MEASUREMENT_ID}', {
        send_page_view: false
      });
    `;
        document.head.appendChild(script2);
    }, []);

    /* ---------------------------
       Track SPA page views
       --------------------------- */
    useEffect(() => {
        if (!window.gtag) return;

        window.gtag("event", "page_view", {
            page_path: pathname,
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
        return parts[0].replace(/-/g, "_");
    }, [pathname]);

    /* ---------------------------
       Outbound tracking
       --------------------------- */
    useEffect(() => {
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

            window.gtag?.("event", eventName, {
                link_url: url.toString(),
                component: componentContext,
                campaign,
                transport_type: "beacon",
