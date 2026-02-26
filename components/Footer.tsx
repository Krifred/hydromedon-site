"use client";

import { useEffect, useState } from "react";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="py-12 text-center text-hydra-gold">
            <SocialLinks />
            <p className="mt-6 text-sm opacity-70">
                © {year ?? ""} Hydromedon. All rights reserved.
            </p>
        </footer>
    );
}