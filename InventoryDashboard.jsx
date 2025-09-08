import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Wrench, XCircle, AlertTriangle, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const metricCards = [
  { key: 'total', label: 'Total Assets', icon: Package, color: 'text-slate-100' },
  { key: 'active', label: 'Active', icon: CheckCircle, color: 'text-green-400' },
  { key: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'text-yellow-400' },
  { key: 'underutilized', label: 'Underutilized', icon: AlertTriangle, color: 'text-orange-400' },
  { key: 'decommissioned', label: 'Decommissioned', icon: XCircle, color: 'text-red-400' }
];

export default function InventoryDashboard({ statusCounts, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {metricCards.map((_, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-20 mb-2 bg-slate-600" />
              <Skeleton className="h-8 w-12 bg-slate-600" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metricCards.map((metric) => {
        const Icon = metric.icon;
        const count = statusCounts[metric.key] || 0;
        
        return (
          <Card key={metric.key} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{count}</p>
                </div>
                <Icon className={`w-8 h-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}