"use client";

// vendors
import { SWRConfig } from "swr";
import { ReactNode } from "react";

// lib
import { fetcher, ApiError } from "@/lib/api";

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,

        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        revalidateIfStale: true,

        dedupingInterval: 30000, // 30 seconds

        errorRetryCount: 3,
        errorRetryInterval: 5000,
        shouldRetryOnError: (error) => {
          if (
            error instanceof ApiError &&
            error.status &&
            error.status >= 400 &&
            error.status < 500
          ) {
            return false;
          }
          return true;
        },

        loadingTimeout: 3000,

        provider: () => new Map(),

        compare: (a, b) => {
          return JSON.stringify(a) === JSON.stringify(b);
        },

        refreshInterval: 0,
        refreshWhenHidden: false,
        refreshWhenOffline: false,

        isPaused: () => {
          return typeof document !== "undefined" ? document.hidden : false;
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
