import { formatValue } from "../format";
import type { ForecastResponse } from "../types";
import { getWeatherLabel } from "../weatherCodes";

function DailyForecast({ forecast }: { forecast: ForecastResponse }) {
  const { daily, daily_units: units } = forecast;
  if (!daily) return <p className="mt-4 text-gray-600">No daily data available.</p>;

  const dayCount = Math.min(
    daily.time.length,
    daily.temperature_2m_max.length,
    daily.temperature_2m_min.length,
    daily.weather_code.length,
    daily.precipitation_sum.length,
    7
  );

  const days = daily.time.slice(0, dayCount).map((date, i) => ({
    date,
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    code: daily.weather_code[i],
    precipitation: daily.precipitation_sum[i],
  }));

  if (days.length === 0) return <p className="mt-4 text-gray-600">No daily data available.</p>;

  return (
    <ul className="mt-4 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
      {days.map((day) => (
        <li key={day.date} className="grid grid-cols-2 gap-1 px-4 py-3 text-sm sm:grid-cols-4 sm:gap-4">
          <span className="font-medium">
            {new Date(`${day.date}T00:00`).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-gray-600 sm:text-left">{getWeatherLabel(day.code)}</span>
          <span>
            {formatValue(day.max, units?.temperature_2m_max)} /{" "}
            <span className="text-gray-500">{formatValue(day.min, units?.temperature_2m_min)}</span>
          </span>
          <span className="text-gray-600">Precip. {formatValue(day.precipitation, units?.precipitation_sum)}</span>
        </li>
      ))}
    </ul>
  );
}

export default DailyForecast;
