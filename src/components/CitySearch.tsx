import { useCitySearch } from "../hooks/useCitySearch";
import type { Location } from "../types";
import SearchBar from "./SearchBar";
import StatusMessage from "./StatusMessage";

interface CitySearchProps {
  onSelectCity: (city: Location) => void;
}

function CitySearch({ onSelectCity }: CitySearchProps) {
  const { status, results, errorMessage, lastQuery, search, retry, clear } = useCitySearch();

  function handleSelect(city: Location) {
    onSelectCity(city);
    clear();
  }

  return (
    <section>
      <SearchBar onSearch={search} isLoading={status === "loading"} />

      {status === "empty-query" && <StatusMessage type="info" message="Please type a city name." />}
      {status === "loading" && <StatusMessage type="info" message="Searching…" />}
      {status === "error" && (
        <StatusMessage type="error" message={`Search failed: ${errorMessage}`} onRetry={retry} />
      )}
      {status === "success" && results.length === 0 && (
        <StatusMessage type="info" message={`No cities found for "${lastQuery}".`} />
      )}

      {status === "success" && results.length > 0 && (
        <ul className="mt-3 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
          {results.map((city) => (
            <li key={city.id ?? `${city.latitude},${city.longitude}`}>
              <button
                onClick={() => handleSelect(city)}
                className="flex w-full flex-col px-4 py-3 text-left hover:bg-gray-50 sm:flex-row sm:justify-between"
              >
                <span className="font-medium">{city.name}</span>
                <span className="text-sm text-gray-500">
                  {[city.admin1, city.country].filter(Boolean).join(", ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CitySearch;
