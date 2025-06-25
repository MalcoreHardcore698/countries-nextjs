export interface Country {
  nameRu: string;
  flagUrl: string;
  isoCode2: string;
  isoCode3: string;
}

export interface RawCountry {
  name_ru: string;
  flag_url?: string;
  iso_code2: string;
  iso_code3: string;
}
