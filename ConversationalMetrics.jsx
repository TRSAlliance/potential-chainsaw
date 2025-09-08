import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Users, 
  BarChart3, 
  Clock, 
  Zap, 
  AlertTriangle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

export default function ConversationalMetrics({ metrics, onMetricAction }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const IconComponent = metric.icon;
        
        return (
          <Card 
            key={metric.id} 
            className={`bg-white border-slate-300 hover:border-lime-500 transition-all duration-300 group cursor-pointer ${
              metric.status === 'alert' ? 'ring-2 ring-yellow-400/50' : 
              metric.status === 'success' ? 'ring-2 ring-lime-400/50' : ''
            }`}
            onClick={() => onMetricAction && onMetricAction(metric.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-full bg-slate-100 ${
                  metric.status === 'alert' ? 'ring-2 ring-yellow-400/30' :
                  metric.status === 'success' ? 'ring-2 ring-lime-400/30' : 'ring-2 ring-slate-300'
                }`}>
                  <IconComponent className={`w-6 h-6 ${metric.color}`} />
                </div>
                {metric.status === 'alert' && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-black text-slate-900 mb-2">
                    {metric.value}
                  </p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm text-slate-700 font-medium mb-3 leading-relaxed">
                    {metric.context}
                  </p>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMetricAction && onMetricAction(metric.id);
                    }}
                  >
                    {metric.actionText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}