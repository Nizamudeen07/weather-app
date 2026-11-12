import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import type { Location, Mode } from "../types";
import CurrentWeather from "./CurrentWeather";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import StatusMessage from "./StatusMessage";
import ViewToggle from "./ViewToggle";

function WeatherPanel({ location }: { location: Location }) {
  const [mode, setMode] = useState<Mode>("hourly");
  const { forecast, isLoading, error, refresh } = useWeather(location, mode);

  const isFirstLoad = isLoading && !forecast;
  const isUpdating = isLoading && forecast;

  return (
    <section className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">{location.name}</h2>
          <p className="text-sm text-gray-500">
            {[location.admin1, location.country].filter(Boolean).join(", ")}
          </p>
        </div>
        <div className="flex gap-2">
          <ViewToggle mode={mode} onChange={setMode} />
          <button
            onClick={refresh}
            disabled={isLoading}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {isFirstLoad && <StatusMessage type="info" message="Loading weather…" />}
      {isUpdating && <p className="mt-3 text-sm text-gray-500">Updating…</p>}
      {error && <StatusMessage type="error" message={`Could not load weather: ${error}`} onRetry={refresh} />}

      {forecast && mode === "hourly" && (
        <>
          <CurrentWeather forecast={forecast} />
          <HourlyForecast forecast={forecast} />
        </>
      )}
      {forecast && mode === "daily" && <DailyForecast forecast={forecast} />}
    </section>
  );
}

export default WeatherPanel;
