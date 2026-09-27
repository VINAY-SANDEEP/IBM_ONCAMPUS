import React, { useState } from "react";
import { Shuffle, PlayCircle, History, Eye, RefreshCcw } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { useProgress } from "../context/ProgressContext";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TodaysPractice({ onView }) {
  const { isCompleted } = useProgress();
  const [count, setCount] = useState(5);
  const [list, setList] = useState(null);

  const generate = () => {
    const incomplete = PROBLEMS.filter((p) => !isCompleted(p.id));
    const pool = incomplete.length >= count ? incomplete : PROBLEMS;
    setList(shuffle(pool).slice(0, count));
  };

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-2">
        <PlayCircle size={18} className="text-amber-600" />
        <h3 className="font-bold text-ink-900">Today's Practice</h3>
      </div>
      <p className="mt-1 text-sm text-ink-400">Generate a focused practice list, prioritising problems you haven't completed.</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {[5, 10, 15].map((n) => (
          <button
            key={n}
            onClick={() => setCount(n)}
            className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors ${
              count === n ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-600 hover:bg-ink-50"
            }`}
          >
            {n} Problems
          </button>
        ))}
        <button
          onClick={generate}
          className="ml-auto rounded-md bg-amber-500 px-4 py-1.5 text-sm font-semibold text-ink-950 hover:bg-amber-400"
        >
          Start Practice
        </button>
      </div>

      {list && (
        <ul className="mt-4 divide-y divide-ink-100 border-t border-ink-100">
          {list.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <span className="font-mono text-xs text-ink-400">{p.id}</span>
                <span className="ml-2 truncate text-sm font-medium text-ink-800">{p.title}</span>
              </div>
              <button onClick={() => onView(p)} className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-600 hover:underline">
                <Eye size={13} /> View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RandomPractice({ onView }) {
  const { isCompleted } = useProgress();
  const [excludeDone, setExcludeDone] = useState(true);
  const [current, setCurrent] = useState(null);

  const pick = () => {
    const pool = excludeDone ? PROBLEMS.filter((p) => !isCompleted(p.id)) : PROBLEMS;
    const src = pool.length ? pool : PROBLEMS;
    setCurrent(src[Math.floor(Math.random() * src.length)]);
  };

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-2">
        <Shuffle size={18} className="text-amber-600" />
        <h3 className="font-bold text-ink-900">Random Practice</h3>
      </div>
      <p className="mt-1 text-sm text-ink-400">Pick one random problem from the full 61-problem bank.</p>

      <label className="mt-3 flex items-center gap-2 text-sm text-ink-600">
        <input type="checkbox" checked={excludeDone} onChange={(e) => setExcludeDone(e.target.checked)} className="h-4 w-4 rounded border-ink-300" />
        Exclude completed problems
      </label>

      <button
        onClick={pick}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-800"
      >
        <RefreshCcw size={14} /> Random Problem
      </button>

      {current && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-100/40 p-3">
          <div className="font-mono text-xs text-ink-500">{current.id}</div>
          <div className="mt-0.5 font-semibold text-ink-900">{current.title}</div>
          <div className="mt-0.5 text-xs text-ink-500">{current.topic}</div>
          <button onClick={() => onView(current)} className="mt-2 flex items-center gap-1 text-xs font-semibold text-amber-700 hover:underline">
            <Eye size={13} /> View Problem
          </button>
        </div>
      )}
    </div>
  );
}

export function RevisionMode({ onView }) {
  const { completed, isCompleted } = useProgress();
  const solved = PROBLEMS.filter((p) => isCompleted(p.id));

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-2">
        <History size={18} className="text-amber-600" />
        <h3 className="font-bold text-ink-900">Revision Mode</h3>
      </div>
      <p className="mt-1 text-sm text-ink-400">
        Showing only the {solved.length} problem{solved.length === 1 ? "" : "s"} you've marked completed, so you can revisit them.
      </p>

      {solved.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-ink-200 p-6 text-center text-sm text-ink-400">
          You haven't completed any problems yet. Solve a few, then come back here to revise them.
        </div>
      ) : (
        <ul className="mt-4 max-h-96 divide-y divide-ink-100 overflow-y-auto border-t border-ink-100">
          {solved
            .sort((a, b) => (completed[b.id] || 0) - (completed[a.id] || 0))
            .map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <span className="font-mono text-xs text-ink-400">{p.id}</span>
                  <span className="ml-2 truncate text-sm font-medium text-ink-800">{p.title}</span>
                </div>
                <button onClick={() => onView(p)} className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-600 hover:underline">
                  <Eye size={13} /> View
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
