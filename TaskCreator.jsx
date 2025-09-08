import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvokeLLM } from "@/api/integrations";
import { Plus, Zap, Brain } from "lucide-react";

export default function TaskCreator({ agents, onTaskCreated, isLoading }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTask = async () => {
    if (!taskTitle.trim() || !taskDescription.trim()) return;
    
    setIsCreating(true);
    try {
      // Generate orchestration plan using AI
      const orchestrationPlan = await InvokeLLM({
        prompt: `Create an orchestration plan for this task:
        Title: ${taskTitle}
        Description: ${taskDescription}
        
        Available agents: ${agents.map(a => `${a.name} (${a.type}): ${a.description}`).join(', ')}
        
        Generate a step-by-step plan with agent assignments, dependencies, and estimated complexity (1-10).`,
        response_json_schema: {
          type: "object",
          properties: {
            steps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  step_id: { type: "string" },
                  description: { type: "string" },
                  agent_id: { type: "string" },
                  dependencies: { type: "array", items: { type: "string" } },
                  status: { type: "string" }
                }
              }
            },
            estimated_duration: { type: "number" },
            complexity_score: { type: "number" }
          }
        }
      });

      const taskData = {
        title: taskTitle,
        description: taskDescription,
        priority,
        status: 'pending',
        orchestration_plan: orchestrationPlan,
        assigned_agents: orchestrationPlan.steps?.map(s => s.agent_id) || []
      };

      await onTaskCreated(taskData);
      
      // Reset form
      setTaskTitle('');
      setTaskDescription('');
      setPriority('medium');
    } catch (error) {
      console.error("Error creating task:", error);
    }
    setIsCreating(false);
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-400" />
          Create New Task
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-slate-100 font-medium">Task Title</Label>
          <Input
            id="title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="e.g., Analyze customer feedback and generate report"
            className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-100 font-medium">Natural Language Description</Label>
          <Textarea
            id="description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Describe what you want to accomplish. The AI will break it down into steps and assign appropriate agents..."
            rows={4}
            className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-100 font-medium">Priority Level</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="low" className="text-slate-100">Low Priority</SelectItem>
                <SelectItem value="medium" className="text-slate-100">Medium Priority</SelectItem>
                <SelectItem value="high" className="text-slate-100">High Priority</SelectItem>
                <SelectItem value="urgent" className="text-slate-100">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-100 font-medium">Available Agents</Label>
            <div className="text-slate-300 text-sm bg-slate-900 p-2 rounded border border-slate-600">
              {agents.filter(a => a.status === 'active').length} active agents ready
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-lg border border-slate-600">
          <Brain className="w-5 h-5 text-blue-400" />
          <div className="flex-1">
            <p className="text-white text-sm font-medium">AI-Powered Orchestration</p>
            <p className="text-slate-300 text-xs">
              Our AI will analyze your task and create an optimal execution plan with agent assignments
            </p>
          </div>
        </div>

        <Button
          onClick={handleCreateTask}
          disabled={isCreating || !taskTitle.trim() || !taskDescription.trim() || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isCreating ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Creating Orchestration Plan...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Create & Orchestrate Task
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}