import React, { useEffect, useRef, useState } from "react";
import { X, CheckCircle2, Circle, FileText, ExternalLink } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import PlatformLinks from "./PlatformLinks";
import CodeEditor from "./CodeEditor";

function Section({ label, children }) {
  if (!children) return null;
  return (
    <div className="mb-5">
      <h4 className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink-400">{label}</h4>
      <div className="whitespace-pre-line text-sm leading-relaxed text-ink-800">{children}</div>
    </div>
  );
}

export default function ProblemModal({ problem, onClose, initialTab = "problem" }) {
  const { isCompleted, toggleCompleted } = useProgress();
  const [tab, setTab] = useState(initialTab);
  const previousBodyOverflow = useRef("");

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, problem.id]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    previousBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousBodyOverflow.current;
    };
  }, [onClose]);

  if (!problem) return null;
  const done = isCompleted(problem.id);
  const platformLinks = Object.values(problem.platformLinks || {});
  const primaryPlatformLink = platformLinks.find((link) => link.type === "exact") || platformLinks.find((link) => link.type === "related") || platformLinks.find((link) => link.url);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-950/50 p-4 pt-8 animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-3xl rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-ink-400">
              <span className="font-mono">{problem.id}</span>
              <span>·</span>
              <span>{problem.topic}</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-ink-900">{problem.title}</h2>
            {problem.concept && <div className="mt-0.5 text-sm font-medium text-amber-600">{problem.concept}</div>}
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-700">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-ink-100 px-6 pt-3">
          {["problem", "practice"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-t-md px-3 py-2 text-sm font-semibold capitalize transition-colors ${
                tab === t ? "border-b-2 border-amber-500 text-ink-900" : "text-ink-400 hover:text-ink-600"
              }`}
            >
              {t === "problem" ? "Problem" : "Code Workspace"}
            </button>
          ))}
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {tab === "problem" ? (
            <>
              <Section label="Problem Statement">{problem.statement}</Section>
              <Section label="Input">{problem.input}</Section>
              <Section label="Output">{problem.output}</Section>
              <Section label="Constraints">{problem.constraints}</Section>

              {problem.examples && problem.examples.length > 0 && (
                <div className="mb-5">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">Examples</h4>
                  <div className="space-y-3">
                    {problem.examples.map((ex, i) => (
                      <div key={i} className="rounded-lg border border-ink-100 bg-ink-50 p-3 text-sm">
                        <div className="mb-1">
                          <span className="font-semibold text-ink-600">Input: </span>
                          <span className="whitespace-pre-line font-mono text-[13px] text-ink-800">{ex.input}</span>
                        </div>
                        <div className="mb-1">
                          <span className="font-semibold text-ink-600">Output: </span>
                          <span className="whitespace-pre-line font-mono text-[13px] text-ink-800">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div>
                            <span className="font-semibold text-ink-600">Explanation: </span>
                            <span className="text-ink-700">{ex.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Section label="Notes">{problem.notes}</Section>

              <div className="mb-5 flex items-center gap-2 rounded-lg border border-ink-100 bg-ink-50 px-3 py-2.5 text-xs text-ink-500">
                <FileText size={14} className="shrink-0" />
                <span>Source: IBM Coding Assessment Problem Bank PDF (Aditya University, Dept. of Technical Training)</span>
              </div>

              <div className="mb-5 rounded-lg border border-ink-100 bg-white p-3 text-sm text-ink-500">
                <span className="font-semibold text-ink-700">Solution: </span>
                Solution not included in the source PDF. Use the links below for verified external explanations where a real
                match was found.
              </div>

              <div>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-400">External Practice / Learn</h4>
                <PlatformLinks platformLinks={problem.platformLinks} />
              </div>
            </>
          ) : (
            <CodeEditor problem={problem} />
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-3 border-t border-ink-100 px-6 py-4">
          <button
            onClick={() => toggleCompleted(problem.id)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
              done ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-ink-900 text-white hover:bg-ink-800"
            }`}
          >
            {done ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            {done ? "Marked Completed" : "Mark as Completed"}
          </button>
          <a
            href={primaryPlatformLink?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            Practice on Platform <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
