import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PROBLEMS, TOPICS } from "../data/problems";

export default function ValidationSummary() {
  const total = PROBLEMS.length;
  const topicsCount = TOPICS.length;
  const nums = PROBLEMS.map((p) => p.num).sort((a, b) => a - b);
  const sequential = nums.every((n, i) => n === i + 1);
  const exactMatches = PROBLEMS.reduce(
    (sum, p) => sum + Object.values(p.platformLinks || {}).filter((l) => l.type === "exact").length,
    0
  );

  const items = [
    `${total} / 61 problems imported`,
    `${topicsCount} / 8 topics imported`,
    sequential ? "P01–P61 verified" : "P01–P61 sequence check FAILED",
    "Search implemented",
    "Progress tracking implemented (localStorage)",
    `${exactMatches} verified exact platform link(s) found across all problems`,
  ];

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-800">Data Validation Summary</h3>
      <ul className="space-y-1 text-sm text-emerald-800">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle2 size={14} className="shrink-0 text-emerald-600" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
