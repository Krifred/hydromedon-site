"use client"

import { useEffect, useRef, useState } from "react"

type Options = IntersectionObserverInit & {
    once?: boolean
}

export function useInView<T extends HTMLElement>(options: Options = {}) {
    const { once = true, ...observerOptions } = options
    const ref = useRef<T | null>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true)
                if (once) observer.disconnect()
            } else if (!once) {
                setInView(false)
            }
        }, observerOptions)

        observer.observe(el)
        return () => observer.disconnect()
    }, [once, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold])

    return { ref, inView }
}