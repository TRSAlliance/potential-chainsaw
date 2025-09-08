import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Brain, Eye, Cpu, Zap, Database, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const agentIcons = {
  language_model: Brain,
  computer_vision: Eye,
  data_processor: Cpu,
  task_executor: Zap,
  classifier: Database,
  generator: Brain
};

const statusColors = {
  active: "bg-emerald-500",
  inactive: "bg-slate-500",
  maintenance: "bg-yellow-500",
  error: "bg-red-500"
};

export default function AgentList({ agents, onSelectAgent, selectedAgent, isLoading }) {
  return (
    <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-700">
      <ScrollArea className="h-[300px] lg:h-[600px]">
        {isLoading ? (
          <div className="p-4 space-y-2">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <Skeleton className="w-10 h-10 rounded-lg bg-slate-700" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2 bg-slate-700" />
                  <Skeleton className="h-3 w-1/2 bg-slate-700" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {agents.map(agent => {
              const isSelected = selectedAgent?.id === agent.id;
              const IconComponent = agentIcons[agent.type] || Brain;
              
              return (
                <div
                  key={agent.id}
                  onClick={() => onSelectAgent(agent)}
                  className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 border-b border-slate-700 ${
                    isSelected 
                      ? 'bg-orange-400/10 border-l-4 border-l-orange-400' 
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="relative">
                    <div className="p-2 rounded-lg bg-slate-800">
                      <IconComponent className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${statusColors[agent.status]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{agent.name}</h3>
                    <p className="text-slate-300 text-sm truncate">{agent.type?.replace('_', ' ')}</p>
                  </div>
                  <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">v{agent.version}</Badge>
                </div>
              );
            })}
            {!agents.length && (
              <div className="text-center p-8">
                <Activity className="mx-auto w-12 h-12 text-slate-600 mb-3" />
                <p className="text-slate-400">No agents match your search.</p>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}