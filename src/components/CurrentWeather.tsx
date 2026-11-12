import { formatValue } from "../format";
import type { ForecastResponse } from "../types";
import { getWeatherLabel } from "../weatherCodes";

function CurrentWeather({ forecast }: { forecast: ForecastResponse }) {
  const { current, current_units: units } = forecast;
  if (!current) return null;

  return (
    <div className="mt-4 rounded-md border border-gray-200 bg-white p-4">
      <p className="text-sm text-gray-500">Right now</p>
      <p className="mt-1 text-4xl font-semibold">
        {formatValue(current.temperature_2m, units?.temperature_2m)}
      </p>
      <p className="mt-1 text-gray-700">{getWeatherLabel(current.weather_code)}</p>
      <p className="text-sm text-gray-500">
        Wind {formatValue(current.wind_speed_10m, units?.wind_speed_10m)}
      </p>
    </div>
  );
}

export default CurrentWeather;
