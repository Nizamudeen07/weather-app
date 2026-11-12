export function formatValue(value: number | null | undefined, unit = ""): string {
  if (value == null) return "–";
  const rounded = Math.round(value * 10) / 10;
  return unit ? `${rounded} ${unit}` : String(rounded);
}
