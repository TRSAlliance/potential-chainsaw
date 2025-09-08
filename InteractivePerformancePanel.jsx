import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Cpu, 
  Database, 
  Zap, 
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield,
  Target,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Monitor,
  Gauge
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const generateTrendData = (value, points = 12) => {
  const data = [];
  for (let i = 0; i < points; i++) {
    data.push({
      time: `${14 + Math.floor(i / 5)}:${(i % 5) * 12}`.padEnd(5, '0'),
      value: Math.max(0, value + (Math.random() - 0.5) * 20)
    });
  }
  return data;
};

export default function InteractivePerformancePanel({ metrics, activeAgents, workflowStatus }) {
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.critical) return 'text-red-400 bg-red-400/20';
    if (value >= thresholds.warning) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-green-400 bg-green-400/20';
  };

  const systemHealthScore = Math.round(
    (100 - metrics.systemLoad) * 0.3 +
    (100 - (metrics.responseTime / 300) * 100) * 0.25 +
    (metrics.throughput / 1500 * 100) * 0.25 +
    (100 - metrics.errorRate * 100) * 0.2
  );

  const performanceMetrics = [
    {
      id: 'system_load',
      title: 'System Load',
      value: `${metrics.systemLoad.toFixed(1)}%`,
      icon: Cpu,
      color: getStatusColor(metrics.systemLoad, { warning: 70, critical: 85 }),
      trend: generateTrendData(metrics.systemLoad),
      target: 75,
      description: 'Current system resource utilization'
    },
    {
      id: 'response_time',
      title: 'Response Time',
      value: `${metrics.responseTime.toFixed(0)}ms`,
      icon: Clock,
      color: getStatusColor(metrics.responseTime, { warning: 250, critical: 300 }),
      trend: generateTrendData(metrics.responseTime, 12),
      target: 200,
      description: 'Average API response latency'
    },
    {
      id: 'throughput',
      title: 'Throughput',
      value: `${metrics.throughput} ops/s`,
      icon: Zap,
      color: 'text-blue-400 bg-blue-400/20',
      trend: generateTrendData(metrics.throughput, 12),
      target: 1500,
      description: 'Operations processed per second'
    },
    {
      id: 'error_rate',
      title: 'Error Rate',
      value: `${metrics.errorRate.toFixed(2)}%`,
      icon: AlertTriangle,
      color: getStatusColor(metrics.errorRate, { warning: 0.3, critical: 0.5 }),
      trend: generateTrendData(metrics.errorRate * 100, 12),
      target: 0.1,
      description: 'System error percentage'
    },
    {
      id: 'connections',
      title: 'Active Connections',
      value: metrics.activeConnections,
      icon: Users,
      color: 'text-cyan-400 bg-cyan-400/20',
      trend: generateTrendData(metrics.activeConnections, 12),
      target: 1000,
      description: 'Current active user connections'
    },
    {
      id: 'efficiency',
      title: 'Agent Efficiency',
      value: `${metrics.agentEfficiency.toFixed(1)}%`,
      icon: Target,
      color: 'text-green-400 bg-green-400/20',
      trend: generateTrendData(metrics.agentEfficiency, 12),
      target: 95,
      description: 'AI agent operational efficiency'
    }
  ];

  const selectedMetricData = performanceMetrics.find(m => m.id === selectedMetric);

  return (
    <div className="space-y-4">
      {/* System Health Overview */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Monitor className="w-5 h-5 text-lime-400" />
              SYSTEM HEALTH
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRefresh}
              className="text-slate-400 hover:text-white"
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall Health Score */}
          <div className="text-center p-4 bg-slate-900 rounded-lg">
            <div className="text-3xl font-bold text-lime-400 mb-2">{systemHealthScore}%</div>
            <p className="text-slate-300 text-sm">Overall System Health</p>
            <Progress value={systemHealthScore} className="mt-2 h-2" />
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-900 rounded-lg text-center">
              <div className="text-xl font-bold text-cyan-400">{activeAgents.length}</div>
              <p className="text-slate-400 text-xs">Active Agents</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg text-center">
              <div className="text-xl font-bold text-purple-400">{workflowStatus.toUpperCase()}</div>
              <p className="text-slate-400 text-xs">Workflow</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg text-center">
              <div className="text-xl font-bold text-orange-400">{metrics.memoryUsage.toFixed(0)}%</div>
              <p className="text-slate-400 text-xs">Memory</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg text-center">
              <div className="text-xl font-bold text-green-400">{metrics.cpuUtilization.toFixed(0)}%</div>
              <p className="text-slate-400 text-xs">CPU Usage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Metrics Selection */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            PERFORMANCE METRICS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Metric Selection Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {performanceMetrics.map(metric => {
              const IconComponent = metric.icon;
              const isSelected = selectedMetric === metric.id;
              return (
                <Button
                  key={metric.id}
                  size="sm"
                  variant={isSelected ? "default" : "ghost"}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`justify-start text-left h-auto p-3 ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <IconComponent className="w-4 h-4" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs truncate">{metric.title}</div>
                      <div className="text-xs opacity-75">{metric.value}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Selected Metric Details */}
          {selectedMetricData && (
            <div className="p-4 bg-slate-900 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">{selectedMetricData.title}</h4>
                <Badge className={selectedMetricData.color}>
                  {selectedMetricData.value}
                </Badge>
              </div>
              
              <p className="text-slate-400 text-sm">{selectedMetricData.description}</p>

              {/* Mini Trend Chart */}
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedMetricData.trend}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Target vs Current */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Target: {selectedMetricData.target}</span>
                <span className="text-slate-400">Current: {selectedMetricData.value}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agent Status Quick View */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            AGENT STATUS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {activeAgents.slice(0, 3).map((agent, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-slate-900 rounded">
                <span className="text-slate-300 text-sm truncate">{agent.name || `Agent-${i + 1}`}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-xs">ONLINE</span>
                </div>
              </div>
            ))}
            {activeAgents.length > 3 && (
              <div className="text-center pt-2">
                <Badge variant="outline" className="border-slate-600 text-slate-400">
                  +{activeAgents.length - 3} more agents
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}