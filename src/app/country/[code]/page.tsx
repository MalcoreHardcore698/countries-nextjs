// vendors
import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// lib
import { api } from "@/lib/api";

// components
import PageCountry from "@/components/features/page-country";

// types
interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;

  const country = await api.getCountry(code);

  if (!country) {
    return {
      title: "Country not found",
      description: "The requested country was not found in the database",
    };
  }

  return {
    title: `${country.nameRu} (${country.isoCode2})`,
    description: `Information about the country ${country.nameRu}. ISO code: ${country.isoCode2}`,
    openGraph: {
      title: `${country.nameRu} (${country.isoCode2})`,
      description: `Information about the country ${country.nameRu}`,
      images: country.flagUrl ? [{ url: country.flagUrl }] : [],
    },
  };
}

async function Page({ params }: PageProps) {
  const { code: countryCode } = await params;

  const country = await api.getCountry(countryCode);

  if (!country) {
    notFound();
  }

  return <PageCountry country={country} />;
}

export default Page;
