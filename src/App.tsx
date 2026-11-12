import { useState } from "react";
import CitySearch from "./components/CitySearch";
import WeatherPanel from "./components/WeatherPanel";
import type { Location } from "./types";

function App() {
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">Weather Station</h1>

        <CitySearch onSelectCity={setSelectedCity} />

        {selectedCity ? (
          <WeatherPanel location={selectedCity} />
        ) : (
          <p className="mt-8 text-gray-500">Search for a city and select it to see the forecast.</p>
        )}

        <footer className="mt-12 text-sm text-gray-500">
          Weather data by Open-Meteo (CC BY 4.0).
        </footer>
      </main>
    </div>
  );
}

export default App;
