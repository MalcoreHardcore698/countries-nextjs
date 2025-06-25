"use client";

// vendors
import React, { useCallback, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";

// components
import CountryCard from "@/components/common/country-card";

// constants
const DEFAULT_OVERSCAN = 1200;

// styles
import "./styles.scss";

// types
import { Country } from "@/types/country";

interface PageListProps {
  countries: Country[];
  onRemoveCountry: (isoCode2: string) => void;
}

function PageList({ countries, onRemoveCountry }: PageListProps) {
  const style = { height: "100%" } as const;

  const computeItemKey = useCallback(
    (_: number, country: Country) => country.isoCode2,
    []
  );

  const itemContent = useCallback(
    (_: number, country: Country) => {
      if (!country) return null;

      return (
        <CountryCard
          key={country.isoCode2}
          country={country}
          onRemove={onRemoveCountry}
        />
      );
    },
    [onRemoveCountry]
  );

  const virtuosoComponents = useMemo(
    () => ({
      List: React.forwardRef<HTMLDivElement>(function List(props, ref) {
        return (
          <div ref={ref} {...props} className="page-list__virtuoso-list" />
        );
      }),
    }),
    []
  );

  return (
    <div className="page-list">
      <Virtuoso
        data={countries}
        style={style}
        overscan={DEFAULT_OVERSCAN}
        className="page-list__virtuoso"
        itemContent={itemContent}
        computeItemKey={computeItemKey}
        components={virtuosoComponents}
      />
    </div>
  );
}

export default PageList;
