// types
import { Country, RawCountry } from "@/types/country";

export const API_CONFIG = {
  BASE_URL: "https://gist.githubusercontent.com",
  ENDPOINTS: {
    COUNTRIES:
      "/sanchezzzhak/8606e9607396fb5f8216/raw/39de29950198a7332652e1e8224f988b2e94b166/ISO3166_RU.json",
  },
} as const;

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);

    this.name = "ApiError";
  }
}

export async function fetcher<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        "FETCH_ERROR"
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
      undefined,
      "NETWORK_ERROR"
    );
  }
}

export const api = {
  getCountries: () => fetchCountries(),

  getCountry: async (code: string): Promise<Country | null> => {
    const countries = await api.getCountries();

    return (
      countries.find((country) => country.isoCode2 === code.toUpperCase()) ||
      null
    );
  },

  searchCountries: async (query: string): Promise<Country[]> => {
    const countries = await api.getCountries();

    if (!query.trim()) return countries;

    const normalizedQuery = query.toLowerCase().trim();

    return countries.filter(
      (country) =>
        country.nameRu.toLowerCase().includes(normalizedQuery) ||
        country.isoCode2.toLowerCase().includes(normalizedQuery) ||
        country.isoCode3.toLowerCase().includes(normalizedQuery)
    );
  },
} as const;

export async function fetchCountries(): Promise<Country[]> {
  const countries = await fetcher<RawCountry[]>(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COUNTRIES}`
  );

  return countries.map((country: RawCountry) => ({
    nameRu: country.name_ru,
    flagUrl: country.flag_url || "",
    isoCode2: country.iso_code2,
    isoCode3: country.iso_code3,
  }));
}
