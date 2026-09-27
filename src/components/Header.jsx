import React from "react";
import { Code2 } from "lucide-react";
import { useProgress } from "../context/ProgressContext";

export default function Header() {
  const { completedCount, totalCount, percent } = useProgress();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-ink-900">
            <Code2 size={18} className="text-amber-400" />
          </div>
          <div>
            <div className="text-[15px] font-bold leading-tight text-ink-900">IBM Coding Practice Hub</div>
            <div className="text-[11px] leading-tight text-ink-400">IBM Campus Drive 2026 · Problem Bank</div>
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <div className="text-center">
            <div className="font-mono text-base font-bold text-ink-900">{totalCount}</div>
            <div className="text-[10px] uppercase tracking-wide text-ink-400">Total</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-base font-bold text-emerald-600">{completedCount}</div>
            <div className="text-[10px] uppercase tracking-wide text-ink-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="font-mono text-base font-bold text-amber-600">{percent}%</div>
            <div className="text-[10px] uppercase tracking-wide text-ink-400">Progress</div>
          </div>
        </div>
      </div>
    </header>
  );
}
