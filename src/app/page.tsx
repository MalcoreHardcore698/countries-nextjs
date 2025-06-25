// vendors
import React from "react";
import { Metadata } from "next";

// lib
import { api } from "@/lib/api";

// components
import PageCountries from "@/components/features/page-countries";

// metadata
export const metadata: Metadata = {
  title: "Countries of the world",
  description:
    "List of all countries of the world with their flags and ISO codes",
  openGraph: {
    title: "Countries of the world",
    description:
      "List of all countries of the world with their flags and ISO codes",
  },
};

async function Countries() {
  const countries = await api.getCountries();

  return <PageCountries countries={countries} />;
}

export default Countries;
