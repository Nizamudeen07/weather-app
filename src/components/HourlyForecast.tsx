import { formatValue } from "../format";
import type { ForecastResponse } from "../types";

function HourlyForecast({ forecast }: { forecast: ForecastResponse }) {
  const { hourly, hourly_units: units, current } = forecast;
  if (!hourly) return <p className="mt-4 text-gray-600">No hourly data available.</p>;

  const currentHour = current ? `${current.time.slice(0, 13)}:00` : "";
  const foundIndex = hourly.time.indexOf(currentHour);
  const startIndex = foundIndex === -1 ? 0 : foundIndex;

  const endIndex = Math.min(
    startIndex + 24,
    hourly.time.length,
    hourly.temperature_2m.length,
    hourly.relative_humidity_2m.length,
    hourly.precipitation_probability.length
  );

  const hours = hourly.time.slice(startIndex, endIndex).map((time, i) => ({
    time,
    temperature: hourly.temperature_2m[startIndex + i],
    humidity: hourly.relative_humidity_2m[startIndex + i],
    rainChance: hourly.precipitation_probability[startIndex + i],
  }));

  if (hours.length === 0) return <p className="mt-4 text-gray-600">No hourly data available.</p>;

  return (
    <div className="mt-4">
      <h3 className="mb-2 text-sm font-medium text-gray-700">Next 24 hours</h3>
      <ul className="flex gap-2 overflow-x-auto pb-2">
        {hours.map((hour) => (
          <li
            key={hour.time}
            className="min-w-24 shrink-0 rounded-md border border-gray-200 bg-white p-3 text-sm"
          >
            <p className="text-gray-500">{hour.time.slice(11, 16)}</p>
            <p className="mt-1 text-base font-semibold">
              {formatValue(hour.temperature, units?.temperature_2m)}
            </p>
            <p className="mt-1 text-gray-600">
              Humidity {formatValue(hour.humidity, units?.relative_humidity_2m)}
            </p>
            <p className="text-gray-600">
              Rain {formatValue(hour.rainChance, units?.precipitation_probability)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HourlyForecast;
