'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getCapacitorCode } from '@/lib/component-utils';
import { Heart } from 'lucide-react';

interface CapacitorVisualizationProps {
  value: string;
  className?: string;
  isTaken?: boolean;
}

export function CapacitorVisualization({ value, className, isTaken }: CapacitorVisualizationProps) {
  if (value === '<3') {
    return (
      <div className={cn("relative flex items-center justify-center w-32 h-10 text-primary", className, isTaken && "opacity-50")}>
        <Heart className="w-8 h-8 fill-current" />
        <span className="absolute text-xs font-bold text-primary-foreground select-none">FI</span>
      </div>
    );
  }

  const code = getCapacitorCode(value);

  return (
    <div className={cn("relative flex items-center justify-center w-32 h-10", className)}>
       <div className={cn("absolute left-0 h-px w-[calc(50%-1.25rem)]", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground')}></div>
      <div className={cn("absolute right-0 h-px w-[calc(50%-1.25rem)]", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground')}></div>
      <div className={cn("absolute flex items-center justify-center w-10 h-10")}>
        <div className={cn("h-5 w-[1px] absolute left-0", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground')}></div>
        <div className={cn("h-5 w-[1px] absolute right-0", isTaken ? 'bg-muted-foreground/50' : 'bg-muted-foreground')}></div>
      </div>

      <span className={cn(
        "font-code text-xs font-semibold text-foreground z-10",
        isTaken && "text-muted-foreground"
      )}>
        {code || '...'}
      </span>
    </div>
  );
}
