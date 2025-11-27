import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Brain, Eye, Speaker, Database } from "lucide-react";

const modelIcons = {
  llm: Brain,
  vision: Eye,
  audio: Speaker,
  multimodal: Brain,
  custom: Database,
};

const statusColors = {
  active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  deprecated: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  beta: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  archived: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function ModelCard({ model, onSelect }) {
  const Icon = modelIcons[model.type] || Brain;
  return (
    <div 
      onClick={onSelect}
      className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800/50 cursor-pointer transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-slate-700 rounded-lg">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <Badge className={statusColors[model.status]}>{model.status}</Badge>
        </div>
        <h3 className="text-lg font-bold text-slate-100">{model.name}</h3>
        <p className="text-slate-400 text-sm mt-1 mb-4 h-10 overflow-hidden">{model.description}</p>
      </div>
      <div className="space-y-3 pt-3 border-t border-slate-700/50">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Provider:</span>
          <span className="font-medium text-slate-200">{model.provider}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-400">
          <span>Version:</span>
          <span className="font-medium text-slate-200">{model.version}</span>
        </div>
      </div>
    </div>
  );
}
