import { HistoryItem } from "@/types";
import React, { useState } from "react";

interface CodeExplanationProps {
  addToHistory: (
    type: HistoryItem["type"],
    input: string,
    output: string
  ) => void;
}

const CodeExplanation = ({ addToHistory }: CodeExplanationProps) => {
  const [code, setCode] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleExplain = async () => {
    if (!code.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        const explanationText =
          data.data?.explanation || "No explanation exists.";
        setExplanation(explanationText);
        addToHistory("explain", code, explanationText);
      } else {
        setExplanation(`Error: ${data.error}`);
      }
    } catch {
      setExplanation("Failed to get explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-xl p-8 bg-gray-900 overflow-hidden before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-tr before:from-purple-500 before:via-yellow-500 before:to-pink-500 before:opacity-20 before:blur-3xl">
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Explain Code</h2>
          <button
            onClick={handleExplain}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Explaining..." : "Explain"}
          </button>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          rows={6}
        />

        {explanation && (
          <pre className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-md text-white font-mono whitespace-pre-wrap overflow-x-auto max-h-72">
            {explanation}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeExplanation;
