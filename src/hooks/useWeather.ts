import { useEffect, useState } from "react";
import { fetchWeather, getErrorMessage } from "../api";
import type { ForecastResponse, Location, Mode } from "../types";

export function useWeather(location: Location, mode: Mode) {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const requestKey = `${location.latitude},${location.longitude},${mode}`;

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);
    setError(null);

    fetchWeather(location, mode)
      .then((data) => {
        if (ignore) return;
        setForecast(data);
        setLoadedKey(requestKey);
      })
      .catch((err) => {
        if (ignore) return;
        setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [location, mode, requestKey, refreshCount]);

  function refresh() {
    setRefreshCount((count) => count + 1);
  }

  return {
    forecast: loadedKey === requestKey ? forecast : null,
    isLoading,
    error,
    refresh,
  };
}
