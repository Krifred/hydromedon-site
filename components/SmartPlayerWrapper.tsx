"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SmartPlayerBar from "./SmartPlayerBar";

type Props = {
    children: ReactNode;
};

export default function SmartPlayerWrapper({ children }: Props) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Optional: routes on which you want to hide the bar
    const hideOnRoutes: string[] = []; // e.g., ["/privacy", "/terms"]
    const shouldHide = pathname ? hideOnRoutes.includes(pathname) : false;

    return (
        <>
            {children}
            {mounted && !shouldHide && <SmartPlayerBar />}
        </>
    );
}