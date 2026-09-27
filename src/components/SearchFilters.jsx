import React from "react";
import { Search, X } from "lucide-react";
import { TOPICS } from "../data/problems";

export default function SearchFilters({
  query,
  onQueryChange,
  topicFilter,
  onTopicChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-4 shadow-card">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by ID, title, topic, or keyword (e.g. 'Fibonacci', 'binary')…"
          className="w-full rounded-lg border border-ink-200 bg-ink-50 py-2.5 pl-9 pr-9 text-sm text-ink-900 outline-none transition-colors focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
          >
            <X size={15} />
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <FilterPill active={topicFilter === "all"} onClick={() => onTopicChange("all")}>
          All Topics
        </FilterPill>
        {TOPICS.map((t) => (
          <FilterPill key={t.id} active={topicFilter === t.id} onClick={() => onTopicChange(t.id)} title={t.name}>
            {t.name.split(",")[0].split("&")[0].trim()}
          </FilterPill>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-ink-100 pt-3">
        <span className="text-xs font-semibold text-ink-400">Status:</span>
        {[
          { key: "all", label: "All" },
          { key: "completed", label: "Completed" },
          { key: "incomplete", label: "Not Completed" },
        ].map((s) => (
          <FilterPill key={s.key} active={statusFilter === s.key} onClick={() => onStatusChange(s.key)} small>
            {s.label}
          </FilterPill>
        ))}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children, title, small }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        small ? "px-2.5 py-0.5" : ""
      } ${
        active
          ? "border-ink-900 bg-ink-900 text-white"
          : "border-ink-200 bg-white text-ink-600 hover:border-ink-400 hover:bg-ink-50"
      }`}
    >
      {children}
    </button>
  );
}
