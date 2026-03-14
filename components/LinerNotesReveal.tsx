"use client";

import * as React from "react";

type LinerNotesRevealProps = {
    /** Heading/title for aria + optional visible label */
    title?: string;
    /** Optional short subtitle shown above the description */
    subtitle?: string;
    /** Main description content (JSX allowed) */
    children: React.ReactNode;
    /** Optional: start open */
    defaultOpen?: boolean;
    /** Optional: anchor id to link directly */
    id?: string;
    /** Optional: className override */
    className?: string;
};

function usePrefersReducedMotion() {
    const [reduced, setReduced] = React.useState(false);

    React.useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setReduced(mq.matches);
        apply();

        // Safari fallback
        if (mq.addEventListener) {
            mq.addEventListener("change", apply);
            return () => mq.removeEventListener("change", apply);
        } else {
            mq.addListener(apply);
            return () => mq.removeListener(apply);
        }
    }, []);

    return reduced;
}

export default function LinerNotesReveal({
    title = "Liner Notes",
    subtitle,
    children,
    defaultOpen = false,
    id = "liner-notes",
    className = "",
}: LinerNotesRevealProps) {
    const [open, setOpen] = React.useState(defaultOpen);
    const reducedMotion = usePrefersReducedMotion();
    const panelRef = React.useRef<HTMLDivElement | null>(null);

    // Close on Escape
    React.useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    // On open, scroll the panel into view gently (optional but nice)
    React.useEffect(() => {
        if (!open) return;
        const el = panelRef.current;
        if (!el) return;

        // keep it subtle; do not jump to top
        el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }, [open, reducedMotion]);

    const buttonId = `${id}-button`;
    const panelId = `${id}-panel`;

    return (
        <section id={id} className={`mt-14 ${className}`}>
            {/* Quiet invitation */}
            <div className="flex flex-col items-center justify-center text-center">
                <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen((v) => !v)}
                    className={[
                        "group inline-flex items-center gap-2 rounded-full px-4 py-2",
                        "text-sm md:text-base font-medium tracking-wide",
                        "text-yellow-200/80 hover:text-yellow-200",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60",
                        "transition-colors",
                    ].join(" ")}
                >
                    <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                        — {open ? "Close liner notes" : "Read the story behind this song"} —
                    </span>

                    {/* subtle chevron */}
                    <span
                        aria-hidden
                        className={[
                            "inline-block translate-y-[1px] text-yellow-200/70",
                            "transition-transform duration-300",
                            open ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                    >
                        ▼
                    </span>
                </button>

                {/* optional micro shimmer line */}
                <div
                    aria-hidden
                    className="mt-4 h-px w-40 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"
                />
            </div>

            {/* Cinematic reveal panel */}
            <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                ref={panelRef}
                className={[
                    "relative mx-auto mt-6 max-w-3xl",
                    // smooth height without layout thrash
                    "overflow-hidden",
                    reducedMotion ? "transition-none" : "transition-[max-height] duration-700 ease-out",
                    open ? "max-h-[1200px]" : "max-h-0",
                ].join(" ")}
            >
                <div
                    className={[
                        "relative",
                        // fade + slight rise
                        reducedMotion ? "" : "transition-[opacity,transform] duration-700 ease-out",
                        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                    ].join(" ")}
                >
                    {/* container */}
                    <div className="relative rounded-2xl border border-yellow-400/20 bg-black/40 backdrop-blur-md">
                        {/* top accent line */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />

                        {/* soft vignette */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(80%_60%_at_50%_20%,rgba(212,175,55,0.14),transparent_60%)]"
                        />

                        <div className="relative px-6 py-8 md:px-10 md:py-10">
                            {/* Title */}
                            <div className="mb-6 text-center">
                                <p className="text-xs tracking-[0.25em] text-yellow-200/55">
                                    {title.toUpperCase()}
                                </p>
                                {subtitle ? (
                                    <p className="mt-2 text-sm md:text-base text-gray-300/90">{subtitle}</p>
                                ) : null}
                            </div>

                            {/* Content */}
                            <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-gray-200/90 max-w-none">
                                {children}
                            </div>

                            {/* close link at bottom */}
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className={[
                                        "rounded-full px-4 py-2",
                                        "text-sm font-medium tracking-wide",
                                        "text-yellow-200/80 hover:text-yellow-200",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60",
                                        "transition-colors",
                                    ].join(" ")}
                                >
                                    — Close liner notes —
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}