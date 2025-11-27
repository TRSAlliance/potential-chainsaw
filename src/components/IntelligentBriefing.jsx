import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Zap, 
  BarChart3, 
  CheckCircle,
  Activity
} from 'lucide-react';

export default function IntelligentBriefing({ agentFormation, onCommand }) {
  const tacticalCommands = [
    { id: 'status', label: 'System Status', icon: CheckCircle, color: 'bg-lime-600 hover:bg-lime-700' },
    { id: 'threats', label: 'Threat Assessment', icon: Shield, color: 'bg-red-600 hover:bg-red-700' },
    { id: 'performance', label: 'Performance Brief', icon: BarChart3, color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'deploy', label: 'Agent Deployment', icon: Zap, color: 'bg-purple-600 hover:bg-purple-700' }
  ];

  return (
    <Card className="bg-white border-slate-300">
      <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          TACTICAL INTELLIGENCE BRIEFING
        </CardTitle>
        <p className="text-sm text-slate-600">Live agent formation status and command interface</p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Agent Formation Status */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
            Current Agent Formation
          </h3>
          <div className="space-y-3">
            {agentFormation.map((agent, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{agent.name}</p>
                    <p className="text-xs text-slate-600">{agent.status}</p>
                  </div>
                </div>
                <Badge className="bg-lime-100 text-lime-800 border-lime-300">
                  READY
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Commands */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
            Tactical Commands
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {tacticalCommands.map(command => {
              const IconComponent = command.icon;
              return (
                <Button
                  key={command.id}
                  onClick={() => onCommand(command.id)}
                  className={`${command.color} text-white flex items-center gap-2 text-sm`}
                >
                  <IconComponent className="w-4 h-4" />
                  {command.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Mission Status */}
        <div className="mt-6 p-4 bg-gradient-to-r from-lime-50 to-green-50 rounded-lg border border-lime-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-lime-600" />
            <span className="font-semibold text-lime-800">MISSION STATUS: OPERATIONAL</span>
          </div>
          <p className="text-sm text-slate-700">
            All systems nominal. Multi-agent formation ready for tactical deployment.
            Awaiting operational commands from Flight Director.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
