////"use client";

////export default function AtmosphereBackground() {
////    return (
////        <div
////            aria-hidden
////            className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
////        >
////            {/* Base gradient */}
////            <div className="absolute inset-0 bg-atmosphere-gradient" />

////            {/* Subtle noise texture */}
////            <div className="absolute inset-0 bg-noise opacity-10" />

////            {/* Slow drifting light */}
////            <div className="absolute inset-0 animate-atmosphere-drift bg-atmosphere-glow" />
////        </div>
////    );
////}

"use client";

import Starfield from "./Starfield";

export default function AtmosphereBackground() {
    return (
        <div
            aria-hidden
            className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        >
            <div className="absolute inset-0 bg-atmosphere-gradient" />
            <Starfield />
            <div className="absolute inset-0 bg-noise" />
            <div className="absolute inset-0 animate-atmosphere-drift bg-atmosphere-glow" />
        </div>
    );
}