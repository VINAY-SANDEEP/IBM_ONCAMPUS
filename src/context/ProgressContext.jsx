import React, { createContext, useContext, useEffect, useState } from "react";
import { PROBLEMS } from "../data/problems";

const STORAGE_KEY = "ibm-hub-completed-v1";
const ProgressContext = createContext(null);
const PROBLEM_IDS = new Set(PROBLEMS.map((problem) => problem.id));

function loadCompleted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(([id, completedAt]) => PROBLEM_IDS.has(id) && typeof completedAt === "number")
    );
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(loadCompleted);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // localStorage unavailable (private browsing, quota, etc.) — progress
      // will still work for this session but won't persist across reloads.
    }
  }, [completed]);

  const toggleCompleted = (id) => {
    setCompleted((prev) => {
      const next = { ...prev };
      if (typeof next[id] === "number") {
        delete next[id];
      } else {
        next[id] = Date.now();
      }
      return next;
    });
  };

  const markCompleted = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: Date.now() }));
  };

  const resetProgress = () => {
    setCompleted({});
  };

  const isCompleted = (id) => typeof completed[id] === "number";

  const completedCount = Object.keys(completed).length;
  const totalCount = PROBLEMS.length;
  const percent = totalCount ? Math.round((completedCount / totalCount) * 1000) / 10 : 0;

  const value = {
    completed,
    toggleCompleted,
    markCompleted,
    resetProgress,
    isCompleted,
    completedCount,
    totalCount,
    percent,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
