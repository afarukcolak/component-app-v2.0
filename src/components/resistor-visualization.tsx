'use client';

import React from 'react';
import { getResistorBands } from '@/lib/component-utils';
import { cn } from '@/lib/utils';

interface ResistorVisualizationProps {
  value: string;
  className?: string;
}

const colorMap: { [key: string]: string } = {
  black: 'bg-black',
  brown: 'bg-yellow-800',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-400',
  green: 'bg-green-600',
  blue: 'bg-blue-600',
  violet: 'bg-purple-600',
  gray: 'bg-gray-500',
  white: 'bg-white',
  gold: 'bg-yellow-500',
  silver: 'bg-gray-400',
  none: 'bg-transparent',
};

export function ResistorVisualization({ value, className }: ResistorVisualizationProps) {
  const bands = getResistorBands(value);

  return (
    <div className={cn("flex items-center justify-center w-40 h-10", className)}>
      <div className="w-4 h-px bg-muted-foreground"></div>
      <div className="w-28 h-8 bg-[#F0EAD6] dark:bg-yellow-200/20 rounded-lg flex items-center justify-center space-x-1.5 px-2 shadow-inner border border-black/10">
        <div className={cn("w-2 h-8 rounded-sm", colorMap[bands.band1])}></div>
        <div className={cn("w-2 h-8 rounded-sm", colorMap[bands.band2])}></div>
        <div className={cn("w-2 h-8 rounded-sm", colorMap[bands.multiplier])}></div>
        <div className="w-6"></div> {/* Spacer */}
        <div className={cn("w-2 h-8 rounded-sm", colorMap[bands.tolerance])}></div>
      </div>
      <div className="w-4 h-px bg-muted-foreground"></div>
    </div>
  );
}
