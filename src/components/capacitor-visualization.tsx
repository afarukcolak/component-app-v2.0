'use client';

import React from 'react';
import { CapacitorSymbol } from './icons';
import { cn } from '@/lib/utils';

interface CapacitorVisualizationProps {
  value: string;
  className?: string;
}

export function CapacitorVisualization({ value, className }: CapacitorVisualizationProps) {
  return (
    <div className={cn("relative flex items-center justify-center w-24 h-10", className)}>
      <CapacitorSymbol className="h-full w-auto text-muted-foreground" />
      <span className="absolute font-code text-xs font-semibold text-foreground">
        {value || '...'}
      </span>
    </div>
  );
}
