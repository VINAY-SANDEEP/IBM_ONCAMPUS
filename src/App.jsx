import React, { useMemo, useState } from "react";
import { LayoutGrid, PlayCircle, Shuffle, History } from "lucide-react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SearchFilters from "./components/SearchFilters";
import ProblemCard from "./components/ProblemCard";
import ProblemModal from "./components/ProblemModal";
import ValidationSummary from "./components/ValidationSummary";
import { TodaysPractice, RandomPractice, RevisionMode } from "./components/PracticeTools";
import { PROBLEMS } from "./data/problems";
import { useProgress } from "./context/ProgressContext";

const VIEWS = [
  { key: "all", label: "All Problems", icon: LayoutGrid },
  { key: "today", label: "Today's Practice", icon: PlayCircle },
  { key: "random", label: "Random Practice", icon: Shuffle },
  { key: "revision", label: "Revision Mode", icon: History },
];

function matchesQuery(problem, q) {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    problem.id.toLowerCase().includes(needle) ||
    problem.title.toLowerCase().includes(needle) ||
    problem.topic.toLowerCase().includes(needle) ||
    problem.concept.toLowerCase().includes(needle) ||
    problem.statement.toLowerCase().includes(needle)
  );
}

export default function App() {
  const { isCompleted } = useProgress();
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeProblem, setActiveProblem] = useState(null);
  const [modalTab, setModalTab] = useState("problem");

  const filtered = useMemo(() => {
    return PROBLEMS.filter((p) => {
      if (!matchesQuery(p, query)) return false;
      if (topicFilter !== "all" && p.topicId !== topicFilter) return false;
      if (statusFilter === "completed" && !isCompleted(p.id)) return false;
      if (statusFilter === "incomplete" && isCompleted(p.id)) return false;
      return true;
    });
  }, [query, topicFilter, statusFilter, isCompleted]);

  const openView = (problem) => {
    setActiveProblem(problem);
    setModalTab("problem");
  };
  const openPractice = (problem) => {
    setActiveProblem(problem);
    setModalTab("practice");
  };

  return (
    <div className="min-h-screen">
      <Header />

      <nav className="border-b border-ink-100 bg-white">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {VIEWS.map((v) => {
            const Icon = v.icon;
            return (
              <button
                key={v.key}
                onClick={() => setView(v.key)}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  view === v.key ? "border-amber-500 text-ink-900" : "border-transparent text-ink-400 hover:text-ink-600"
                }`}
              >
                <Icon size={15} />
                {v.label}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {view === "all" && (
          <>
            <Dashboard />
            <SearchFilters
              query={query}
              onQueryChange={setQuery}
              topicFilter={topicFilter}
              onTopicChange={setTopicFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink-500">
                Showing <span className="font-semibold text-ink-800">{filtered.length}</span> of {PROBLEMS.length} problems
              </p>
            </div>
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-ink-200 bg-white p-10 text-center text-ink-400">
                No problems match your search and filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProblemCard key={p.id} problem={p} onView={openView} onPractice={openPractice} />
                ))}
              </div>
            )}
            <ValidationSummary />
          </>
        )}

        {view === "today" && <TodaysPractice onView={openView} />}
        {view === "random" && <RandomPractice onView={openView} />}
        {view === "revision" && <RevisionMode onView={openView} />}
      </main>

      <footer className="border-t border-ink-100 py-6 text-center text-xs text-ink-400">
        Source: IBM Campus Placement Drive 2026 — Coding Assessment Problem Bank, Department of Technical Training, Aditya
        University. For student practice and internal circulation only.
      </footer>

      {activeProblem && <ProblemModal problem={activeProblem} onClose={() => setActiveProblem(null)} initialTab={modalTab} />}
    </div>
  );
}
