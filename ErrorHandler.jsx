import React from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ErrorNotification = ({ type = 'error', message, onClose, autoClose = true }) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const config = {
    error: {
      icon: AlertTriangle,
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      text: 'text-red-300',
      iconColor: 'text-red-400'
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      text: 'text-green-300',
      iconColor: 'text-green-400'
    },
    info: {
      icon: Info,
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      text: 'text-blue-300',
      iconColor: 'text-blue-400'
    }
  };

  const { icon: Icon, bg, border, text, iconColor } = config[type];

  return (
    <Card className={`fixed top-4 right-4 z-50 ${bg} ${border} shadow-lg`}>
      <CardContent className="p-4 flex items-center gap-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <p className={`${text} font-medium flex-1`}>{message}</p>
        {onClose && (
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onClose}
            className={`${text} hover:bg-white/10 h-6 w-6`}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorNotification;