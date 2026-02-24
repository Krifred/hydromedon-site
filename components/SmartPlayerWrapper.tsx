"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SmartPlayerBar from "./SmartPlayerBar";

export default function SmartPlayerWrapper({ children }) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by waiting for client mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const showPlayer =
        pathname === "/" ||
        pathname === "/music" ||
        pathname.startsWith("/music/");

    return (
        <>
            {children}
            {mounted && showPlayer && <SmartPlayerBar />}
        </>
    );
}
