import { useRef, useState } from "react";
import { searchCities, getErrorMessage } from "../api";
import type { Location } from "../types";

type SearchStatus = "idle" | "empty-query" | "loading" | "success" | "error";

export function useCitySearch() {
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [results, setResults] = useState<Location[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  const latestRequestId = useRef(0);

  async function search(query: string) {
    const trimmedQuery = query.trim();
    latestRequestId.current += 1;
    const requestId = latestRequestId.current;
    setLastQuery(trimmedQuery);

    if (!trimmedQuery) {
      setResults([]);
      setStatus("empty-query");
      return;
    }

    setStatus("loading");
    try {
      const cities = await searchCities(trimmedQuery);
      if (requestId !== latestRequestId.current) return;
      setResults(cities);
      setStatus("success");
    } catch (error) {
      if (requestId !== latestRequestId.current) return;
      setErrorMessage(getErrorMessage(error));
      setStatus("error");
    }
  }

  function retry() {
    search(lastQuery);
  }

  function clear() {
    latestRequestId.current += 1;
    setResults([]);
    setStatus("idle");
  }

  return { status, results, errorMessage, lastQuery, search, retry, clear };
}
