import { HistoryItem } from "@/types";
import React, { useState } from "react";

interface CodeGenerationProps {
  addToHistory: (
    type: HistoryItem["type"],
    input: string,
    output: string
  ) => void;
}

const CodeGeneration = ({ addToHistory }: CodeGenerationProps) => {
  const [description, setDescription] = useState<string>("");
  const [language, setLanguage] = useState<string>("JavaScript");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, language }),
      });

      const data = await response.json();

      if (response.ok) {
        const code = data.data?.generatedCode || "No code generated.";
        setGeneratedCode(code);
        addToHistory("generate", description, code);
      } else {
        setGeneratedCode(`Error: ${data.error}`);
      }
    } catch {
      setGeneratedCode("Failed to generate code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-xl p-8 bg-gray-900 overflow-hidden before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-tr before:from-purple-500 before:via-yellow-500 before:to-pink-500 before:opacity-20 before:blur-3xl">
      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Generate Code</h2>
          <button
            onClick={handleGenerate}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="space-y-4">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what code you want..."
            className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="Go">Go</option>
            <option value="C++">C++</option>
          </select>
        </div>

        {generatedCode && (
          <pre className="p-4 rounded-lg bg-gray-800/50 backdrop-blur-md text-white font-mono whitespace-pre-wrap overflow-x-auto max-h-72">
            {generatedCode}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeGeneration;
