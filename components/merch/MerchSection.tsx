/* ==========================================================
   MerchSection — titled section wrapper
   ========================================================== */

import type { ReactNode } from "react";

interface MerchSectionProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

export default function MerchSection({
    title,
    subtitle,
    children,
}: MerchSectionProps) {
    return (
        <section className="max-w-6xl mx-auto px-6 py-14">
            {/* Section heading */}
            <div className="mb-10">
                <h2 className="font-cinzel text-2xl sm:text-3xl text-white/85 tracking-wide">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-2 text-sm text-white/40 leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>

            {children}
        </section>
    );
}
