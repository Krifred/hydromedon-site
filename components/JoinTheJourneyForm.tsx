"use client";

import { useState } from "react";

export default function JoinTheJourneyForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        const formData = new FormData(e.currentTarget);

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                setStatus("error");
                setMessage("Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
            setMessage("You're in. Check your inbox for a confirmation email.");
            e.currentTarget.reset();
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md mx-auto">
            <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="w-full rounded-md bg-black/20 border border-gray-600 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                disabled={status === "loading" || status === "success"}
            />

            <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" name="alerts" className="accent-yellow-400" />
                New release alerts
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" name="notes" className="accent-yellow-400" />
                Behind‑the‑song notes
            </label>

            <button
                type="submit"
                className="w-full rounded-md bg-yellow-500 text-black font-semibold py-3 hover:bg-yellow-400 transition disabled:opacity-50"
                disabled={status === "loading" || status === "success"}
            >
                {status === "loading" ? "Joining…" : "Join the Journey"}
            </button>

            {message && (
                <p
                    className={`text-center text-sm ${status === "success" ? "text-green-400" : "text-red-400"
                        }`}
                >
                    {message}
                </p>
            )}
        </form>
    );
}
