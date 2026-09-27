import React from "react";
import { CheckCircle2, Circle, Eye, Code2 } from "lucide-react";
import { useProgress } from "../context/ProgressContext";

export default function ProblemCard({ problem, onView, onPractice }) {
  const { isCompleted, toggleCompleted } = useProgress();
  const done = isCompleted(problem.id);

  return (
    <div
      className={`group relative flex flex-col rounded-lg border bg-white p-4 shadow-card transition-all hover:shadow-raised ${
        done ? "border-emerald-300" : "border-ink-200"
      }`}
    >
      {done && <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-emerald-500" />}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-semibold text-ink-500">{problem.id}</span>
        </div>
        <button
          onClick={() => toggleCompleted(problem.id)}
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
            done ? "bg-emerald-50 text-emerald-700" : "bg-ink-50 text-ink-400 hover:bg-ink-100"
          }`}
        >
          {done ? <CheckCircle2 size={14} /> : <Circle size={14} />}
          {done ? "Completed" : "Mark done"}
        </button>
      </div>

      <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-ink-900">{problem.title}</h3>

      <div className="mt-1.5 text-xs font-medium text-amber-600">{problem.concept}</div>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
        {problem.statement.slice(0, 140)}
        {problem.statement.length > 140 ? "…" : ""}
      </p>

      <div className="mt-3 flex-1" />

      <div className="mt-2 flex items-center gap-2 border-t border-ink-100 pt-3">
        <button
          onClick={() => onView(problem)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-ink-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-ink-800"
        >
          <Eye size={14} /> View Problem
        </button>
        <button
          onClick={() => onPractice(problem)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-ink-50"
        >
          <Code2 size={14} /> Practice
        </button>
      </div>
    </div>
  );
}
