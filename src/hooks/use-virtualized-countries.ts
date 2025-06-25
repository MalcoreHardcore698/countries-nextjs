// vendors
import { useMemo, useCallback } from "react";

// constants
const DEFAULT_ITEM_HEIGHT = 200;

// types
import { Country } from "@/types/country";

interface UseVirtualizedCountriesOptions {
  countries: Country[];
  removingCountryId: string | null;
}

interface UseVirtualizedCountriesReturn {
  visibleCountries: Country[];
  getItemKey: (index: number) => string;
  estimatedItemHeight: number;
}

/**
 * Hook for optimizing the virtualized list of countries
 * Manages visible items and performance settings
 */
export function useVirtualizedCountries({
  countries,
  removingCountryId,
}: UseVirtualizedCountriesOptions): UseVirtualizedCountriesReturn {
  const visibleCountries = useMemo(() => {
    return countries.filter(
      (country) => !removingCountryId || country.isoCode2 === removingCountryId
    );
  }, [countries, removingCountryId]);

  const getItemKey = useCallback(
    (index: number) => {
      return visibleCountries[index]?.isoCode2 || `item-${index}`;
    },
    [visibleCountries]
  );

  return {
    visibleCountries,
    estimatedItemHeight: DEFAULT_ITEM_HEIGHT,
    getItemKey,
  };
}
