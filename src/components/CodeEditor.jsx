import React, { useEffect, useState } from "react";
import { Play, RotateCcw, Copy, Check, AlertTriangle } from "lucide-react";

const TEMPLATES = {
  Java: (title) =>
    `import java.util.*;\n\npublic class Solution {\n    // TODO: implement "${title}"\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // read input here\n\n    }\n}\n`,
  Python: (title) => `# TODO: implement "${title}"\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()\n`,
  "C++": (title) =>
    `#include <bits/stdc++.h>\nusing namespace std;\n\n// TODO: implement "${title}"\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    return 0;\n}\n`,
};

const LANGUAGES = ["Java", "Python", "C++"];

export default function CodeEditor({ problem }) {
  const [language, setLanguage] = useState("Java");
  const [code, setCode] = useState(TEMPLATES.Java(problem.title));
  const [copied, setCopied] = useState(false);
  const [ranOnce, setRanOnce] = useState(false);

  useEffect(() => {
    setLanguage("Java");
    setCode(TEMPLATES.Java(problem.title));
    setCopied(false);
    setRanOnce(false);
  }, [problem.id, problem.title]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(TEMPLATES[lang](problem.title));
  };

  const handleReset = () => setCode(TEMPLATES[language](problem.title));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API unavailable — nothing further to do
    }
  };

  return (
    <div className="rounded-lg border border-ink-200 bg-ink-950 overflow-hidden">
      <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900 px-3 py-2">
        <div className="flex gap-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                language === lang ? "bg-amber-500 text-ink-950" : "text-ink-300 hover:bg-ink-800"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setRanOnce(true)}
            className="flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium text-emerald-400 hover:bg-ink-800"
          >
            <Play size={12} /> Run
          </button>
          <button onClick={handleReset} className="flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium text-ink-300 hover:bg-ink-800">
            <RotateCcw size={12} /> Reset
          </button>
          <button onClick={handleCopy} className="flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium text-ink-300 hover:bg-ink-800">
            {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="h-56 w-full resize-y bg-ink-950 p-4 font-mono text-[13px] leading-relaxed text-ink-100 outline-none"
      />
      {ranOnce && (
        <div className="flex items-start gap-2 border-t border-ink-800 bg-ink-900 px-3 py-2.5 text-xs text-amber-300">
          <AlertTriangle size={14} className="mt-0.5 shrink-0" />
          <span>
            Code execution requires an execution backend, which this project does not include. This editor is a workspace for
            drafting your solution and copying it to an IDE or an online judge to actually run it.
          </span>
        </div>
      )}
    </div>
  );
}
