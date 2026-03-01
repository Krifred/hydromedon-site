"use client";

import dynamic from "next/dynamic";

const AnalyticsProvider = dynamic(
    () => import("./analytics").then((m) => m.AnalyticsProvider),
    { ssr: false }
);

export default function AnalyticsClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AnalyticsProvider>{children}</AnalyticsProvider>;
}