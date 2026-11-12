import type { Mode } from "../types";

interface ViewToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const options: { value: Mode; label: string }[] = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
];

function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-gray-300" role="group" aria-label="View">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          aria-pressed={mode === option.value}
          className={`px-4 py-2 text-sm font-medium ${
            mode === option.value ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default ViewToggle;
