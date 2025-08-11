'use client';

import React from 'react';
import { CapacitorSymbol } from './icons';
import { cn } from '@/lib/utils';

interface CapacitorVisualizationProps {
  value: string;
  className?: string;
  isTaken?: boolean;
}

export function CapacitorVisualization({ value, className, isTaken }: CapacitorVisualizationProps) {
  return (
    <div className={cn("relative flex items-center justify-center w-32 h-10", className)}>
       <div className={cn("absolute left-0 h-px w-[calc(50%-1.25rem)]", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground')}></div>
      <div className={cn("absolute right-0 h-px w-[calc(50%-1.25rem)]", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground')}></div>
      <div className={cn("h-5 w-[1px]", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground', 'absolute left-[calc(50%-1.25rem)]')}></div>
      <div className={cn("h-5 w-[1px]", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground', 'absolute right-[calc(50%-1.25rem)]')}></div>

      <span className={cn(
        "absolute font-code text-xs font-semibold text-foreground",
        isTaken && "text-muted-foreground"
      )}>
        {value || '...'}
      </span>
    </div>
  );
}
