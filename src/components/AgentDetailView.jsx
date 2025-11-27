import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Brain, Eye, Cpu, Zap, Database, Activity, Clock, CheckCircle, Percent } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const agentIcons = {
  language_model: Brain,
  computer_vision: Eye,
  data_processor: Cpu,
  task_executor: Zap,
  classifier: Database,
  generator: Brain
};

const statusColors = {
  active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  inactive: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  maintenance: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  error: "bg-red-500/20 text-red-300 border-red-500/30"
};

const sampleData = [
  { name: '12:00', response_time: 250, success_rate: 98 },
  { name: '12:05', response_time: 280, success_rate: 97 },
  { name: '12:10', response_time: 260, success_rate: 99 },
  { name: '12:15', response_time: 300, success_rate: 96 },
  { name: '12:20', response_time: 270, success_rate: 98 },
];

export default function AgentDetailView({ agent, isLoading }) {
  if (isLoading) {
    return (
      <div className="w-full lg:w-2/3 p-6 space-y-6">
        <Skeleton className="h-10 w-3/4 bg-slate-700" />
        <Skeleton className="h-5 w-1/2 bg-slate-700" />
        <div className="flex gap-2"><Skeleton className="h-6 w-20 rounded-full bg-slate-700" /><Skeleton className="h-6 w-20 rounded-full bg-slate-700" /></div>
        <div className="grid grid-cols-3 gap-4 pt-6">
          <Skeleton className="h-20 rounded-lg bg-slate-700" />
          <Skeleton className="h-20 rounded-lg bg-slate-700" />
          <Skeleton className="h-20 rounded-lg bg-slate-700" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg bg-slate-700" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="w-full lg:w-2/3 p-6 flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto w-16 h-16 text-slate-600 mb-4" />
          <h2 className="text-xl font-bold text-white">Select an Agent</h2>
          <p className="text-slate-400">Choose an agent from the list to view its details.</p>
        </div>
      </div>
    );
  }

  const IconComponent = agentIcons[agent.type] || Brain;

  return (
    <div className="w-full lg:w-2/3 p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <IconComponent className="w-8 h-8 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">{agent.name}</h2>
          </div>
          <p className="text-slate-300">{agent.description}</p>
        </div>
        <Badge className={statusColors[agent.status]}>{agent.status}</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {agent.capabilities?.map(cap => <Badge key={cap} variant="secondary" className="bg-slate-700 text-slate-300">{cap}</Badge>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
        <div className="p-4 bg-slate-800 rounded-lg">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1"><Clock className="w-4 h-4" /> Response Time</div>
          <p className="text-2xl font-bold text-white">{agent.performance_metrics?.response_time || '250'}ms</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1"><CheckCircle className="w-4 h-4" /> Success Rate</div>
          <p className="text-2xl font-bold text-white">{agent.performance_metrics?.success_rate || '96'}%</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg">
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1"><Percent className="w-4 h-4" /> Uptime</div>
          <p className="text-2xl font-bold text-white">{agent.performance_metrics?.uptime || '98'}%</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Live Performance</h3>
        <div className="h-64 bg-slate-800 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis yAxisId="left" stroke="#94a3b8" />
              <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }} />
              <Line yAxisId="left" type="monotone" dataKey="response_time" stroke="#fb923c" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="success_rate" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
