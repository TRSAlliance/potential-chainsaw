import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Play, Pause } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  active: "text-green-500 bg-green-50",
  inactive: "text-gray-500 bg-gray-50",
  maintenance: "text-yellow-500 bg-yellow-50",
  error: "text-red-500 bg-red-50"
};

export default function ActiveAgents({ agents, isLoading }) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">Active AI Agents</CardTitle>
      </CardHeader>
      <div className="divide-y divide-gray-200">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="p-6">
              <Skeleton className="h-6 w-1/2 mb-2 bg-gray-200" />
              <Skeleton className="h-4 w-3/4 mb-3 bg-gray-200" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16 bg-gray-200" />
                <Skeleton className="h-4 w-16 bg-gray-200" />
                <Skeleton className="h-4 w-16 bg-gray-200" />
              </div>
            </div>
          ))
        ) : (
          agents.map((agent) => (
            <div key={agent.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
                      <div className="w-2 h-2 rounded-full bg-current mr-1"></div>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>v{agent.version}</span>
                    <span>↕ {agent.performance_metrics?.response_time}ms</span>
                    <span>✓ {agent.performance_metrics?.uptime}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600"><Settings className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-400 hover:text-green-600"><Play className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-400 hover:text-red-600"><Pause className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}