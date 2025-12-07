"use client";
import CodeDebugging from "@/components/CodeDebugging";
import CodeExplanation from "@/components/CodeExplanation";
import CodeGeneration from "@/components/CodeGeneration";
import FeatureGrid from "@/components/FeatureGrid";
import Header from "@/components/Header";
import HistoryPanel from "@/components/HistoryPanel";
import tabs from "@/data/tabs";
import { HistoryItem, Tab } from "@/types";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState<Tab["id"]>("explain");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const addHistory = (
    type: HistoryItem["type"],
    input: string,
    output: string
  ) => {
    const newItem: HistoryItem = {
      id: Date.now(),
      type,
      timeStamp: new Date().toLocaleString(),
      input,
      output,
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 9)]);
  };
  return (
    <div className="relative min-h-screen p-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>

          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>

          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10">
        <Header />
        <div className="flex flex-col lg:flex-row gap-8  max-w-7xl mx-auto">
          <div className="w-full lg:2/3">
            <div>
              <div className="flex border-b border-gray-700/50 bg-gray-900/50 rounded-lg overflow-hidden">
                {tabs.map((tab) => {
                  const isActive = active === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActive(tab.id)}
                      className={`flex items-center px-6 py-3 font-semibold transition-all rounded-lg ${
                        isActive
                          ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <span className="text-xl mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <div className="p-6">
                {active === "explain" && (
                  <CodeExplanation addToHistory={addHistory} />
                )}
                {active === "debug" && (
                  <CodeDebugging addToHistory={addHistory} />
                )}
                {active === "generate" && (
                  <CodeGeneration addToHistory={addHistory} />
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <HistoryPanel history={history} />
          </div>
        </div>
        <FeatureGrid />
      </div>
      <footer className="relative z-10 text-center py-8 text-gray-400">
        Powered By Google Gemini
      </footer>
    </div>
  );
}
