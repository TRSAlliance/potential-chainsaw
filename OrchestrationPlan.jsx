import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Users
} from "lucide-react";

export default function OrchestrationPlan({ task, agents, onExport }) {
  if (!task) {
    return (
      <Card className="bg-white border-slate-300">
        <CardContent className="p-8 text-center">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">No Task Selected</h3>
          <p className="text-slate-600">Select a task from the queue to view its orchestration plan</p>
        </CardContent>
      </Card>
    );
  }

  const orchestrationPlan = task.orchestration_plan;
  const steps = orchestrationPlan?.steps || [];
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progressPercentage = steps.length ? (completedSteps / steps.length) * 100 : 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress': return <Play className="w-4 h-4 text-blue-600" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'failed': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <Card className="bg-white border-slate-300">
      <CardHeader className="border-b border-slate-200">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 mb-2">{task.title}</CardTitle>
            <p className="text-slate-600">{task.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                {task.priority} priority
              </Badge>
              <Badge className={getStatusColor(task.status)}>
                {task.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-slate-400 text-slate-700 hover:bg-slate-50">
              <Play className="w-4 h-4 mr-2" />
              Execute
            </Button>
            <Button size="sm" variant="outline" onClick={() => onExport('json')} className="border-slate-400 text-slate-700 hover:bg-slate-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Progress Overview */}
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-900">Execution Progress</h3>
            <span className="text-sm text-slate-600">{completedSteps}/{steps.length} steps completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-slate-900 font-medium">{orchestrationPlan?.estimated_duration || 'N/A'} min</p>
              <p className="text-slate-600">Est. Duration</p>
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-medium">{orchestrationPlan?.complexity_score || 'N/A'}/10</p>
              <p className="text-slate-600">Complexity</p>
            </div>
            <div className="text-center">
              <p className="text-slate-900 font-medium">{task.assigned_agents?.length || 0}</p>
              <p className="text-slate-600">Agents</p>
            </div>
          </div>
        </div>

        {/* Orchestration Steps */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Orchestration Plan</h3>
          <div className="space-y-3">
            {steps.map((step, index) => {
              const agent = agents.find(a => a.id === step.agent_id);
              return (
                <div key={step.step_id} className="p-4 border border-slate-200 rounded-lg bg-white">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">Step {index + 1}: {step.description}</h4>
                        <Badge className={getStatusColor(step.status)}>
                          {step.status}
                        </Badge>
                      </div>
                      {agent && (
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">Assigned to: {agent.name}</span>
                        </div>
                      )}
                      {step.dependencies && step.dependencies.length > 0 && (
                        <p className="text-xs text-slate-500">
                          Dependencies: {step.dependencies.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}