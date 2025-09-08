import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp } from "lucide-react";

const suggestions = [
  {
    title: "Tune Vision Inspector",
    description: "Response time is high. Consider using a smaller model variant for non-critical tasks.",
    impact: "High",
  },
  {
    title: "Scale Data Processor",
    description: "High success rate and low response time indicate it can handle more load.",
    impact: "Medium",
  },
  {
    title: "Review Task Executor Errors",
    description: "A slight dip in success rate was observed. Review recent failed tasks for patterns.",
    impact: "Low",
  },
];

export default function OptimizationSuggestions() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-400" />
          AI-Powered Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {suggestions.map((s, i) => (
          <div key={i} className="p-4 bg-slate-900 rounded-lg border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <h4 className="font-semibold text-white">{s.title}</h4>
            </div>
            <p className="text-slate-300 text-sm">{s.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}