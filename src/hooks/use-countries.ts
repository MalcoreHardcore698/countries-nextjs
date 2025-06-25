// vendors
import useSWR from "swr";
import { useState, useEffect } from "react";

// lib
import { api, API_CONFIG, ApiError } from "@/lib/api";

// constants
export const SWR_KEYS = {
  COUNTRIES: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COUNTRIES}`,
  COUNTRY: (code: string) => `/country/${code}`,
  SEARCH: (query: string) => `/search?q=${query}`,
} as const;

export function useCountries() {
  const {
    data: countries,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR(SWR_KEYS.COUNTRIES, () => api.getCountries(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    onError: (error) => {
      console.error("Error fetching countries:", error);
    },
  });

  return {
    countries: countries || [],
    loading: isLoading,
    error: error instanceof ApiError ? error : null,
    refresh: mutate,
    isValidating,
  };
}

// Hook for getting a single country
export function useCountry(code: string | null) {
  const shouldFetch = Boolean(code);

  const {
    data: country,
    error,
    isLoading,
    mutate,
  } = useSWR(
    shouldFetch ? SWR_KEYS.COUNTRY(code!) : null,
    () => (code ? api.getCountry(code) : null),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
      errorRetryCount: 2,
    }
  );

  return {
    country,
    loading: isLoading,
    error: error instanceof ApiError ? error : null,
    refresh: mutate,
  };
}

// Hook for searching countries with debouncing
export function useCountriesSearch(query: string, debounceMs: number = 300) {
  const debouncedQuery = useDebounce(query, debounceMs);
  const shouldSearch = debouncedQuery.trim().length > 0;

  const {
    data: searchResults,
    error,
    isLoading,
    mutate,
  } = useSWR(
    shouldSearch ? SWR_KEYS.SEARCH(debouncedQuery) : null,
    () => api.searchCountries(debouncedQuery),
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000, // 30 seconds
      errorRetryCount: 1,
    }
  );

  return {
    results: searchResults || [],
    loading: isLoading,
    error: error instanceof ApiError ? error : null,
    refresh: mutate,
    hasQuery: shouldSearch,
  };
}

export function useCountryActions() {
  const { countries, refresh: refreshCountries } = useCountries();

  const removeCountry = (countryCode: string) => {
    const filteredCountries = countries.filter(
      (country) => country.isoCode2 !== countryCode
    );

    refreshCountries(filteredCountries, false);
  };

  return {
    removeCountry,
    isRemoving: false,
  };
}

// Custom hook for debouncing values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
