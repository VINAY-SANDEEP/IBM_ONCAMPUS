import React from "react";
import { RotateCcw } from "lucide-react";
import { TOPICS, PROBLEMS } from "../data/problems";
import { useProgress } from "../context/ProgressContext";

function ProgressBar({ value, colorClass = "bg-amber-500" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
      <div className={`h-full rounded-full ${colorClass} transition-all duration-300`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function Dashboard() {
  const { completed, completedCount, totalCount, percent, resetProgress } = useProgress();

  const topicStats = TOPICS.map((t) => {
    const probs = PROBLEMS.filter((p) => p.topicId === t.id);
    const done = probs.filter((p) => completed[p.id]).length;
    return { ...t, done, total: probs.length, pct: probs.length ? Math.round((done / probs.length) * 100) : 0 };
  });

  const handleReset = () => {
    if (window.confirm("Reset all progress? This clears every completed problem and cannot be undone.")) {
      resetProgress();
    }
  };

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink-900">Study Dashboard</h2>
          <p className="text-sm text-ink-400">Your progress across the full IBM 2026 problem bank.</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-md border border-ink-200 px-3 py-1.5 text-xs font-semibold text-ink-500 hover:bg-ink-50 hover:text-red-600"
        >
          <RotateCcw size={13} /> Reset Progress
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBlock label="Total Problems" value={totalCount} />
        <StatBlock label="Completed" value={completedCount} accent="text-emerald-600" />
        <StatBlock label="Remaining" value={totalCount - completedCount} accent="text-ink-600" />
        <StatBlock label="Progress" value={`${percent}%`} accent="text-amber-600" />
      </div>

      <div className="mt-3">
        <ProgressBar value={percent} />
      </div>

      <h3 className="mb-3 mt-6 text-xs font-bold uppercase tracking-wide text-ink-400">Topic-wise Progress</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {topicStats.map((t) => (
          <div key={t.id} className="rounded-lg border border-ink-100 p-3">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="truncate font-medium text-ink-800" title={t.name}>
                {t.name}
              </span>
              <span className="ml-2 shrink-0 font-mono text-xs text-ink-400">
                {t.done} / {t.total}
              </span>
            </div>
            <ProgressBar value={t.pct} colorClass={t.pct === 100 ? "bg-emerald-500" : "bg-ink-700"} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatBlock({ label, value, accent = "text-ink-900" }) {
  return (
    <div className="rounded-lg bg-ink-50 p-3 text-center">
      <div className={`font-mono text-2xl font-bold ${accent}`}>{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-ink-400">{label}</div>
    </div>
  );
}
