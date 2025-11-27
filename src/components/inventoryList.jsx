import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function InventoryList({ items, onUpdateItem, isLoading, statusConfig }) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border border-slate-700 rounded-lg">
            <Skeleton className="w-16 h-16 rounded-lg bg-slate-600" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48 bg-slate-600" />
              <Skeleton className="h-3 w-64 bg-slate-600" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-slate-600" />
                <Skeleton className="h-6 w-20 rounded-full bg-slate-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-16">
        <Package className="mx-auto w-16 h-16 text-slate-600 mb-4" />
        <p className="text-slate-400">No assets found matching your criteria.</p>
        <p className="text-slate-500 text-sm">Add your first asset to get started.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {items.map((item) => {
          const statusInfo = statusConfig[item.status];
          const StatusIcon = statusInfo.icon;
          
          return (
            <div key={item.id} className="flex items-start gap-4 p-4 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
              <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Package className="w-8 h-8 text-slate-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-100 text-lg">{item.name}</h3>
                    <p className="text-slate-300 text-sm">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Select
                      value={item.status}
                      onValueChange={(newStatus) => onUpdateItem(item.id, { status: newStatus })}
                    >
                      <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-slate-100 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="decommissioned">Decommissioned</SelectItem>
                        <SelectItem value="underutilized">Underutilized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {item.status}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {item.type}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    Used {item.usage_count || 0} times
                  </Badge>
                </div>
                
                {item.ai_maintenance_suggestion && (
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-200 text-sm">
                      <strong>AI Suggestion:</strong> {item.ai_maintenance_suggestion}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
