"use client";

import { useSyncExternalStore } from "react";

let clientNow: number | null = null;

const subscribe = () => () => {};
const getSnapshot = () => (clientNow ??= Date.now());
const getServerSnapshot = () => null;

/**
 * Current time in ms on the client, null during SSR and hydration.
 * Lets release-date logic run client-side without hydration mismatches.
 */
export function useClientNow(): number | null {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
