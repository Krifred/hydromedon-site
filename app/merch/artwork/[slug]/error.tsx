"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="p-8 text-center">
      <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
      >
        Try again
      </button>
    </div>
  );
}
``