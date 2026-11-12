export type Mode = "hourly" | "daily";
export type Units = Record<string, string>;

export interface Location {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export interface GeoResult extends Omit<Location, "latitude" | "longitude"> {
  latitude?: number;
  longitude?: number;
}

export interface GeoResponse {
  results?: GeoResult[];
}

export interface ForecastResponse {
  current?: {
    time: string;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
    weather_code: number | null;
  };
  current_units?: Units;
  hourly?: {
    time: string[];
    temperature_2m: (number | null)[];
    relative_humidity_2m: (number | null)[];
    precipitation_probability: (number | null)[];
  };
  hourly_units?: Units;
  daily?: {
    time: string[];
    temperature_2m_max: (number | null)[];
    temperature_2m_min: (number | null)[];
    weather_code: (number | null)[];
    precipitation_sum: (number | null)[];
  };
  daily_units?: Units;
}
