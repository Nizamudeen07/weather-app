const weatherCodeRanges = [
  { from: 0, to: 0, label: "Clear" },
  { from: 1, to: 3, label: "Cloudy" },
  { from: 45, to: 48, label: "Fog" },
  { from: 51, to: 57, label: "Drizzle" },
  { from: 61, to: 67, label: "Rain" },
  { from: 71, to: 77, label: "Snow" },
  { from: 80, to: 82, label: "Rain showers" },
  { from: 85, to: 86, label: "Snow showers" },
  { from: 95, to: 99, label: "Thunderstorm" },
];

export function getWeatherLabel(code: number | null | undefined): string {
  if (code == null) return "Unknown";
  const match = weatherCodeRanges.find((range) => code >= range.from && code <= range.to);
  return match ? match.label : "Unknown";
}
