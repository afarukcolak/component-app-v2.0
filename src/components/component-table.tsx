'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ResistorVisualization } from './resistor-visualization';
import { CapacitorVisualization } from './capacitor-visualization';
import { useComponentContext } from '@/contexts/component-context';
import { cn } from '@/lib/utils';
import { Edit, Trash2, Package, PackageCheck } from 'lucide-react';
import { Component } from '@/types';

export function ComponentTable() {
  const { components, toggleTaken, setDialogState, removeComponent } = useComponentContext();

  if (components.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium font-headline">No Components Yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a resistor or capacitor to get started.
        </p>
      </div>
    );
  }

  const handleEdit = (component: Component) => {
    setDialogState({ isOpen: true, type: component.type, component });
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {components.map((component) => (
          <Card key={component.uid} className={cn(
              "transition-all",
              component.taken ? "bg-secondary/50" : "bg-card"
          )}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`check-mobile-${component.uid}`}
                    checked={component.taken}
                    onCheckedChange={() => toggleTaken(component.uid)}
                    aria-label={`Mark ${component.id} as taken`}
                  />
                  <div>
                    <p className={cn(
                        "font-bold font-code text-lg",
                        component.taken && "italic text-muted-foreground line-through"
                    )}>{component.id}</p>
                    <p className={cn(
                        "font-code text-sm text-muted-foreground",
                         component.taken && "italic line-through"
                    )}>{component.value}</p>
                  </div>
                </div>
                 {component.type === 'resistor' ? (
                    <ResistorVisualization value={component.value} />
                  ) : (
                    <CapacitorVisualization value={component.value} />
                  )}
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(component)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => removeComponent(component.uid)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="w-[150px] font-headline">Component</TableHead>
              <TableHead className="font-headline">Value</TableHead>
              <TableHead className="font-headline text-center">Visualization</TableHead>
              <TableHead className="w-[150px] text-right font-headline">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((component) => (
              <TableRow
                key={component.uid}
                className={cn(
                  'transition-colors',
                  component.taken && 'bg-secondary/50 hover:bg-secondary/60'
                )}
              >
                <TableCell>
                  <Checkbox
                    id={`check-desktop-${component.uid}`}
                    checked={component.taken}
                    onCheckedChange={() => toggleTaken(component.uid)}
                    aria-label={`Mark ${component.id} as taken`}
                  />
                </TableCell>
                <TableCell
                  className={cn(
                    'font-code font-semibold',
                    component.taken && 'italic text-muted-foreground line-through'
                  )}
                >
                  {component.id}
                </TableCell>
                <TableCell
                  className={cn(
                    'font-code',
                    component.taken && 'italic text-muted-foreground line-through'
                  )}
                >
                  {component.value}
                </TableCell>
                <TableCell className="flex justify-center">
                  {component.type === 'resistor' ? (
                    <ResistorVisualization value={component.value} />
                  ) : (
                    <CapacitorVisualization value={component.value} />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(component)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeComponent(component.uid)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
