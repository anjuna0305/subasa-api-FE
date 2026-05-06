"use client";

import { useSyncExternalStore } from "react";

export function useIsMounted() {
  return useSyncExternalStore(
    () => () => {}, // no-op subscribe
    () => true, // client snapshot
    () => false, // server snapshot
  );
}
