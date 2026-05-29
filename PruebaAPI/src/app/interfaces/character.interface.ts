export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryMaps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Country {
  name: CountryName;
  capital: string[];
  flags: CountryFlags;
}

export interface CountryDetail {
  name: CountryName;
  capital: string[];
  flags: CountryFlags;
  maps: CountryMaps;
  population: number;
}
