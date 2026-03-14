"use client"

import { PropsWithChildren } from "react"
import { useInView } from "./useInView"

type FadeInProps = PropsWithChildren<{
    className?: string
    delayMs?: number
    durationMs?: number
    y?: number
    blurPx?: number
    once?: boolean
}>

export default function FadeIn({
    children,
    className = "",
    delayMs = 120,
    durationMs = 800,
    y = 18,
    blurPx = 6,
    once = true,
}: FadeInProps) {
    const { ref, inView } = useInView<HTMLDivElement>({
        threshold: 0.25,
        rootMargin: "0px 0px -20% 0px",
        once,
    })

    return (
        <div
            ref={ref}
            data-fadein
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : `translateY(${y}px)`,
                filter: inView ? "blur(0px)" : `blur(${blurPx}px)`,
                transitionProperty: "opacity, transform, filter",
                transitionDuration: `${durationMs}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)", // nice slow-out
                transitionDelay: `${delayMs}ms`,
                willChange: "opacity, transform, filter",
            }}
        >
            {children}
        </div>
    )
}