"use client";

import { useEffect } from "react";

export default function MerchError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
            <p className="text-sm text-white/40 tracking-widest uppercase">
                Something went wrong
            </p>
            <button
                onClick={reset}
                className="px-6 py-2 text-xs tracking-widest uppercase border
                           border-yellow-500/40 text-yellow-400 rounded-sm
                           hover:bg-yellow-500/10 transition-all duration-200"
            >
                Try again
            </button>
        </main>
    );
}
