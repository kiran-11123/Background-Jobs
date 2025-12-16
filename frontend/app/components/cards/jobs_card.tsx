"use client";

interface JobsCardProps {
  queueId: string;
  name: string;
  status: string;
  attempts: number;
  failedReason?: string;
}

export function JobsCard({
  queueId,
  name,
  status,
  attempts,
  failedReason,
}: JobsCardProps) {
  const statusColor =
    status === "completed"
      ? "bg-emerald-500/15 text-emerald-400"
      : status === "failed"
      ? "bg-red-500/15 text-red-400"
      : "bg-yellow-500/15 text-yellow-400";

  return (
    <div
      className="
        group relative w-full max-w-sm h-52
        rounded-2xl p-5
       bg-white/30
        border border-white/10
        shadow-lg backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 text-black
      "
    >
      <div className="flex h-full flex-col justify-between">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="font-roboto font-semibold text-lg  truncate">
            {name}
          </h1>
          <p className="text-xs">Queue ID: {queueId}</p>
        </div>

        {/* Status Row */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
          >
            {status.toUpperCase()}
          </span>

          <span className="text-sm">
            Attempts:{" "}
            <span className="font-semibold ">{attempts}</span>
          </span>
        </div>

        {/* Failed Reason */}
        {failedReason && (
          <div className="rounded-lg bg-red-500/10 p-2 text-xs text-red-300 line-clamp-2">
            {failedReason}
          </div>
        )}
      </div>
    </div>
  );
}
