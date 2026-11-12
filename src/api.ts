import type { ForecastResponse, GeoResponse, Location, Mode } from "./types";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong";
}

export async function searchCities(query: string): Promise<Location[]> {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=5`;
  const data = await getJson<GeoResponse>(url);

  return (data.results ?? []).filter(
    (city): city is Location =>
      Number.isFinite(city.latitude) && Number.isFinite(city.longitude)
  );
}

export function fetchWeather(location: Location, mode: Mode): Promise<ForecastResponse> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    timezone: "auto",
  });

  if (mode === "hourly") {
    params.set("current", "temperature_2m,wind_speed_10m,weather_code");
    params.set("hourly", "temperature_2m,relative_humidity_2m,precipitation_probability");
  } else {
    params.set("daily", "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum");
    params.set("forecast_days", "7");
  }

  return getJson<ForecastResponse>(`${FORECAST_URL}?${params}`);
}
