import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', tasks: 400, success_rate: 92, avg_duration: 120 },
  { month: 'Feb', tasks: 300, success_rate: 94, avg_duration: 115 },
  { month: 'Mar', tasks: 500, success_rate: 95, avg_duration: 110 },
  { month: 'Apr', tasks: 450, success_rate: 96, avg_duration: 105 },
  { month: 'May', tasks: 600, success_rate: 97, avg_duration: 100 },
  { month: 'Jun', tasks: 550, success_rate: 98, avg_duration: 95 },
];

export default function PerformanceTrendChart() {
  return (
    <Card className="glass-effect border-slate-800/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-100">Overall System Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }} />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            <Area type="monotone" dataKey="tasks" stroke="#00D4FF" fillOpacity={1} fill="url(#colorTasks)" />
            <Area type="monotone" dataKey="success_rate" stroke="#10B981" fillOpacity={1} fill="url(#colorSuccess)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}