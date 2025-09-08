import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const severityColors = {
  low: "text-blue-500 bg-blue-50",
  medium: "text-yellow-500 bg-yellow-50",
  high: "text-red-500 bg-red-50",
  critical: "text-red-700 bg-red-100"
};

export default function SecurityAlerts({ events, isLoading }) {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-900">Security Alerts</CardTitle>
      </CardHeader>
      <div className="divide-y divide-gray-200">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="p-6"><Skeleton className="h-16 bg-gray-200" /></div>
          ))
        ) : (
          events.slice(0, 3).map((event) => (
            <div key={event.id} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="font-semibold text-gray-900">{event.event_type.replace(/_/g, ' ')}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${severityColors[event.severity]}`}>
                  {event.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <span>{event.source}</span>
                <span className="mx-2">•</span>
                <span>{format(new Date(event.created_date), "MMM d, HH:mm")}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}