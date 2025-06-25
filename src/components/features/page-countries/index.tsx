"use client";

// vendors
import React, { useState, useEffect } from "react";

// hooks
import { useCountriesSearch } from "@/hooks/use-countries";

// components
import PlaceholderEmpty from "@/components/common/placeholder-empty";
import PlaceholderLoader from "@/components/common/placeholder-loader";
import PageHeader from "./page-header";
import PageList from "./page-list";

// styles
import "./styles.scss";

// types
import { Country } from "@/types/country";

interface PageCountriesProps {
  countries: Country[];
}

function PageCountries({ countries }: PageCountriesProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentCountries, setCurrentCountries] = useState(countries);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    results: searchResults,
    loading: searchLoading,
    hasQuery,
  } = useCountriesSearch(searchTerm);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const removeCountry = (isoCode2: string) => {
    setCurrentCountries((prev) =>
      prev.filter((country) => country.isoCode2 !== isoCode2)
    );
  };

  if (!isMounted) {
    return <PlaceholderLoader />;
  }

  const displayedCountries = hasQuery ? searchResults : currentCountries;

  return (
    <div className="page-countries" suppressHydrationWarning>
      <PageHeader
        totalCount={currentCountries.length}
        shownCount={displayedCountries.length}
        searchTerm={searchTerm}
        searchLoading={searchLoading}
        onSearchChange={setSearchTerm}
      />

      {displayedCountries.length > 0 ? (
        <PageList
          countries={displayedCountries}
          onRemoveCountry={removeCountry}
        />
      ) : (
        <PlaceholderEmpty searchTerm={searchTerm} />
      )}
    </div>
  );
}

export default PageCountries;
