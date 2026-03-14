"use client";

import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="py-12 text-center text-hydra-gold">
            <SocialLinks />
            <p className="mt-6 text-sm opacity-70">
                © {year} Hydromedon. All rights reserved.
            </p>
        </footer>
    );
}
``