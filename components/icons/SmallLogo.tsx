"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SmallLogo() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    if (isHome) return null;

    return (
        <div className="fixed top-4 left-4 z-50">
            <Link href="/">
                <Image
                    src="/icons/apple-touch-icon.png"
                    alt="Hydromedon"
                    width={48}
                    height={48}
                    className="opacity-80 hover:opacity-100 transition"
                />
            </Link>
        </div>
    );
}
