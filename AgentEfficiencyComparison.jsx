import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'Content Analyzer', response_time: 245, success_rate: 97.2 },
  { name: 'Vision Inspector', response_time: 1820, success_rate: 94.7 },
  { name: 'Data Processor', response_time: 156, success_rate: 99.1 },
  { name: 'Task Executor', response_time: 89, success_rate: 96.8 },
  { name: 'Smart Classifier', response_time: 123, success_rate: 95.3 },
];

export default function AgentEfficiencyComparison() {
  return (
    <Card className="glass-effect border-slate-800/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-100">Agent Efficiency Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
            <XAxis dataKey="name" stroke="#94a3b8" angle={-20} textAnchor="end" height={60} />
            <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
            <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155' }} />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            <Bar yAxisId="left" dataKey="response_time" fill="#8B5CF6" name="Response Time (ms)" />
            <Bar yAxisId="right" dataKey="success_rate" fill="#10B981" name="Success Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}