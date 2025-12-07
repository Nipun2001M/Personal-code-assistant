import React, { useState } from "react";
import { HistoryItem } from "@/types";

interface CodeDebuggingProps {
  addToHistory: (
    type: HistoryItem["type"],
    input: string,
    output: string
  ) => void;
}

const CodeDebugging = ({ addToHistory }: CodeDebuggingProps) => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [debugging, setDebugging] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDebug = async () => {
    if (!code.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, error }),
      });

      const data = await response.json();

      if (response.ok) {
        const debuggingText =
          data.data?.debugging || "No debugging suggestions.";
        setDebugging(debuggingText);
        addToHistory("debug", code, debuggingText);
      } else {
        setDebugging(`Error: ${data.error}`);
      }
    } catch {
      setDebugging("Failed to get debugging suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-xl p-8 bg-gray-900 overflow-hidden before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-tr before:from-purple-500 before:via-yellow-500 before:to-pink-500 before:opacity-20 before:blur-3xl">
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Debug Code</h2>
          <button
            onClick={handleDebug}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Debugging..." : "Debug"}
          </button>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          rows={6}
        />

        <input
          value={error}
          onChange={(e) => setError(e.target.value)}
          placeholder="Optional: Paste the error message here"
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {debugging && (
          <pre className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-md text-white font-mono whitespace-pre-wrap overflow-x-auto max-h-72">
            {debugging}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeDebugging;
