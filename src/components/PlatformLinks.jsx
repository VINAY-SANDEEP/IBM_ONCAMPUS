import React from "react";
import { CheckCircle2, GitCompareArrows, Search } from "lucide-react";

const PLATFORM_LABELS = {
  leetcode: "LeetCode",
  geeksforgeeks: "GeeksforGeeks",
  code360: "Code360",
  hackerrank: "HackerRank",
};

const TYPE_META = {
  exact: {
    icon: CheckCircle2,
    label: "Exact Match",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconClassName: "text-emerald-600",
  },
  related: {
    icon: GitCompareArrows,
    label: "Related Problem",
    className: "bg-amber-100 text-amber-700 border-amber-300",
    iconClassName: "text-amber-600",
  },
  search: {
    icon: Search,
    label: "Search Platform",
    className: "bg-ink-100 text-ink-600 border-ink-200",
    iconClassName: "text-ink-500",
  },
};

export default function PlatformLinks({ platformLinks, compact = false }) {
  if (!platformLinks) return null;
  const entries = Object.entries(platformLinks).filter(([, v]) => v && v.url);

  return (
    <div className={compact ? "flex flex-wrap gap-1.5" : "grid grid-cols-1 sm:grid-cols-2 gap-2"}>
      {entries.map(([key, link]) => {
        const meta = TYPE_META[link.type] || TYPE_META.search;
        const Icon = meta.icon;
        return (
          <a
            key={key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:brightness-95 ${meta.className}`}
            title={link.type === "search" ? "Exact platform match not verified — opens a search for this exact title" : meta.label}
          >
            <Icon size={13} className={meta.iconClassName} strokeWidth={2.25} />
            <span>{PLATFORM_LABELS[key] || key}</span>
            {!compact && <span className="ml-auto text-[10px] uppercase tracking-wide opacity-70">{meta.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
