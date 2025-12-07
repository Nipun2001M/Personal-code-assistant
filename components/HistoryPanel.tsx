import { HistoryItem } from "@/types";
import React from "react";
interface HistoryItemProps {
  history: HistoryItem[];
}

const HistoryPanel = ({ history }: HistoryItemProps) => {
  const formatContent = (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };
  const getTypeConfig = (type: HistoryItem["type"]) => {
    switch (type) {
      case "explain":
        return {
          color: "from-purple-500 to-pink-500",
          icon: "🔍",
          bg: "bg-purple-500/10",
        };
      case "debug":
        return {
          color: "from-red-500 to-orange-500",
          icon: "🐞",
          bg: "bg-red-500/10",
        };
      case "generate":
        return {
          color: "from-green-500 to-blue-500",
          icon: "⚡",
          bg: "bg-green-500/10",
        };

      default:
        return {
          color: "from-gray-500 to-gray-600",
          icon: "⚡",
          bg: "bg-gray-500/10",
        };
    }
  };
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl">
      <div className="p-6 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        </div>

        <p className="text-gray-400 text-sm mt-1">
          Your recent AI interactions
        </p>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-500 text-2xl">📚</span>
            </div>

            <p className="text-gray-500 text-sm">No activity yet</p>

            <p className="text-gray-600 text-xs mt-1">
              Your interactions will appear here
            </p>
          </div>
        ) : (
          <div>
            {history.map((item) => {
              const config = getTypeConfig(item.type);
              return (
                <div
                  key={item.id}
                  className={`
      p-4 mb-3 rounded-xl 
      ${config.bg}
      backdrop-blur-lg
      border border-gray-600/20
      hover:border-transparent
      hover:bg-opacity-20
      transition-all
    `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
            w-10 h-10 rounded-lg flex items-center justify-center text-xl
            bg-gradient-to-r ${config.color}
          `}
                      >
                        {config.icon}
                      </div>

                      <span className="text-sm font-semibold text-white capitalize">
                        {item.type}
                      </span>
                    </div>

                    <span className="text-xs text-gray-400">
                      {item.timeStamp}
                    </span>
                  </div>

                  <p className="text-white text-sm font-medium mb-1">
                    {formatContent(item.input)}
                  </p>

                  <p className="text-gray-400 text-xs">
                    {formatContent(item.output, 140)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
