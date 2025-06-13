import React from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  time: string;
  label: string;
  color: string;
}

export function CountdownTimer({ time, label, color }: CountdownTimerProps) {
  const isUrgent = time.startsWith('00h 0');
  
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-4 shadow-md border ${isUrgent ? 'animate-pulse' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <Clock className="h-5 w-5 text-white" />
        <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-white font-mono">{time}</p>
        <p className="text-xs text-white/80 mt-1">Until Restock</p>
      </div>
    </div>
  );
}