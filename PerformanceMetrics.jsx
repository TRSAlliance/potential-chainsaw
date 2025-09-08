import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Metric = ({ label, value, isLoading }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    {isLoading ? (
       <Skeleton className="h-8 w-24 mt-1 bg-gray-200" />
    ) : (
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    )}
  </div>
);

export default function PerformanceMetrics({ stats, isLoading }) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Metric 
            label="System Uptime"
            value={`${Math.round(stats.avgUptime || 0)}%`}
            isLoading={isLoading}
          />
          <Metric 
            label="Success Rate"
            value={`${Math.round(stats.avgSuccessRate || 0)}%`}
            isLoading={isLoading}
          />
          <Metric 
            label="Response Time"
            value={`${Math.round(stats.avgResponseTime || 0)}ms`}
            isLoading={isLoading}
          />
          <div>
            <p className="text-sm text-gray-600">Performance Trend</p>
            {isLoading ? (
               <Skeleton className="h-8 w-24 mt-1 bg-gray-200" />
            ) : (
              <>
                <p className="text-2xl font-bold text-green-600">+15%</p>
                <p className="text-xs text-gray-500">trending up this week</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}