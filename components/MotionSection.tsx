"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

type MotionPreset = "soft" | "spotlight" | "reveal";

function prefersReducedMotion() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MotionSection({
    id,
    className = "",
    preset = "soft",
    children,
}: {
    id?: string;
    className?: string;
    preset?: MotionPreset;
    children: ReactNode;
}) {
    const ref = useRef<HTMLElement>(null);
    const [active, setActive] = useState(false);

    const thresholds = useMemo(() => {
        const t: number[] = [];
        for (let i = 0; i <= 20; i++) t.push(i / 20);
        return t;
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (prefersReducedMotion()) {
            el.classList.add("is-active");
            el.style.setProperty("--vp", "1");
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                const ratio = entry.intersectionRatio;
                el.style.setProperty("--vp", ratio.toFixed(3));

                if (entry.isIntersecting) {
                    el.classList.add("is-active");
                    setActive(true);
                }
            },
            { threshold: thresholds, rootMargin: "0px 0px -10% 0px" }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [thresholds]);

    return (
        <section
            id={id}
            ref={ref}
            data-preset={preset}
            data-active={active ? "true" : "false"}
            className={`motion-section ${className}`}
        >
            {children}
        </section>
    );
}