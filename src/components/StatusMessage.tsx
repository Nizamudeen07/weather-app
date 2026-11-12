interface StatusMessageProps {
  type: "info" | "error";
  message: string;
  onRetry?: () => void;
}

function StatusMessage({ type, message, onRetry }: StatusMessageProps) {
  const colors =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-gray-200 bg-white text-gray-600";

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`mt-3 flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm ${colors}`}
    >
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded border border-red-300 bg-white px-3 py-1 font-medium hover:bg-red-100"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
