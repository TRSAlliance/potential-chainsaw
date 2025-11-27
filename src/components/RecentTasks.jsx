import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const priorityColors = {
  low: "text-green-500 bg-green-50",
  medium: "text-yellow-500 bg-yellow-50",
  high: "text-red-500 bg-red-50",
  urgent: "text-red-700 bg-red-100"
};

const statusColors = {
  pending: "text-gray-600 bg-gray-50",
  in_progress: "text-blue-600 bg-blue-50",
  completed: "text-green-600 bg-green-50",
  failed: "text-red-600 bg-red-50",
  cancelled: "text-gray-600 bg-gray-50",
};

export default function RecentTasks({ tasks, isLoading }) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Tasks</CardTitle>
      </CardHeader>
      <div className="divide-y divide-gray-200">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="p-6"><Skeleton className="h-20 bg-gray-200" /></div>
          ))
        ) : (
          tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>{format(new Date(task.created_date), "MMM d, HH:mm")}</span>
                  <span>•</span>
                  <span>{task.assigned_agents?.length || 0} agents</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${statusColors[task.status]}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
