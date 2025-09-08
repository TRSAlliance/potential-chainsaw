import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Zap, TrendingUp, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value, icon: Icon, trend, trendColor, iconColor, isLoading }) => (
  <Card className="bg-white border border-gray-200">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          {isLoading ? (
            <Skeleton className="h-9 w-24 mt-1 bg-gray-200" />
          ) : (
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          )}
          {trend && !isLoading && <p className={`text-sm ${trendColor}`}>{trend}</p>}
        </div>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
    </CardContent>
  </Card>
);

export default function SystemOverview({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="System Operational"
        value="+12%"
        icon={TrendingUp}
        trendColor="text-green-600"
        iconColor="text-green-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Active Agents"
        value={stats.activeAgents}
        icon={Users}
        trend="+8%"
        trendColor="text-green-500"
        iconColor="text-blue-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Running Tasks"
        value={stats.runningTasks}
        icon={Activity}
        trend="+3"
        trendColor="text-green-500"
        iconColor="text-purple-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Avg Response Time"
        value={`${Math.round(stats.avgResponseTime)}ms`}
        icon={Zap}
        trend="-15%"
        trendColor="text-red-500"
        iconColor="text-orange-500"
        isLoading={isLoading}
      />
    </div>
  );
}