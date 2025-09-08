import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, CheckCircle, AlertCircle, Play, Pause } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const statusConfig = {
  pending: { color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", icon: Clock },
  in_progress: { color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: Play },
  completed: { color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: CheckCircle },
  failed: { color: "bg-red-500/20 text-red-300 border-red-500/30", icon: AlertCircle },
  cancelled: { color: "bg-slate-500/20 text-slate-300 border-slate-500/30", icon: Pause }
};

const priorityColors = {
  low: "text-slate-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  urgent: "text-red-400 font-bold"
};

export default function TaskQueue({ tasks, onSelectTask, selectedTask, isLoading }) {
  return (
    <Card className="glass-effect border-slate-800/50 h-[calc(100vh-200px)]">
      <CardHeader className="border-b border-slate-800/50">
        <CardTitle className="text-xl font-bold text-slate-100">
          Task Queue
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-full">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="p-4 border-b border-slate-800/50">
                  <Skeleton className="h-4 w-32 mb-2 bg-slate-700" />
                  <Skeleton className="h-3 w-48 mb-3 bg-slate-700" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16 rounded-full bg-slate-700" />
                    <Skeleton className="h-5 w-20 rounded-full bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {tasks.map((task) => {
                const config = statusConfig[task.status];
                const StatusIcon = config.icon;
                const isSelected = selectedTask?.id === task.id;
                
                return (
                  <div
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className={`p-4 border-b border-slate-800/50 cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-purple-500/10 border-l-4 border-l-purple-500' 
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-slate-800/50 mt-0.5">
                        <StatusIcon className="w-3 h-3 text-slate-400" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-slate-200 truncate text-sm">
                            {task.title}
                          </h3>
                          <span className={`text-xs ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>
                        
                        <p className="text-slate-400 text-xs truncate mb-2">
                          {task.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge className={`${config.color} text-xs`}>
                            {task.status.replace('_', ' ')}
                          </Badge>
                          {task.assigned_agents && task.assigned_agents.length > 0 && (
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {task.assigned_agents.length} agents
                            </Badge>
                          )}
                        </div>
                        
                        <div className="text-xs text-slate-500">
                          {format(new Date(task.created_date), "MMM d, HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {!isLoading && tasks.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No tasks in queue</p>
              <p className="text-slate-500 text-sm">Create your first task to get started</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}