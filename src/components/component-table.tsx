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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ResistorVisualization } from './resistor-visualization';
import { CapacitorVisualization } from './capacitor-visualization';
import { useComponentContext } from '@/contexts/component-context';
import { cn } from '@/lib/utils';
import { Edit, Trash2, Package, PackageCheck, ChevronsRight } from 'lucide-react';
import { Component } from '@/types';
import { Separator } from '@/components/ui/separator';

const ComponentRow = ({ component, onEdit, onRemove, onToggle, isMobile }: { component: Component, onEdit: (component: Component) => void, onRemove: (uid: string) => void, onToggle: (uid: string) => void, isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <Card className={cn(
          "transition-all",
          component.taken ? "bg-secondary/50" : "bg-card"
      )}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id={`check-mobile-${component.uid}`}
                checked={component.taken}
                onCheckedChange={() => onToggle(component.uid)}
                aria-label={`Mark ${component.id} as taken`}
              />
              <div>
                <p className={cn(
                    "font-bold font-code text-lg",
                    component.taken && "italic text-muted-foreground"
                )}>{component.id}</p>
                <p className={cn(
                    "font-code text-sm text-muted-foreground",
                     component.taken && "italic"
                )}>{component.value}</p>
              </div>
            </div>
             {component.type === 'resistor' ? (
                <ResistorVisualization value={component.value} isTaken={component.taken} />
              ) : (
                <CapacitorVisualization value={component.value} isTaken={component.taken} />
              )}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="ghost" size="sm" onClick={() => onEdit(component)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => onRemove(component.uid)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TableRow
      className={cn(
        'transition-colors',
        component.taken && 'bg-secondary/50 hover:bg-secondary/60'
      )}
    >
      <TableCell>
        <Checkbox
          id={`check-desktop-${component.uid}`}
          checked={component.taken}
          onCheckedChange={() => onToggle(component.uid)}
          aria-label={`Mark ${component.id} as taken`}
        />
      </TableCell>
      <TableCell
        className={cn(
          'font-code font-semibold',
          component.taken && 'italic text-muted-foreground'
        )}
      >
        {component.id}
      </TableCell>
      <TableCell
        className={cn(
          'font-code',
          component.taken && 'italic text-muted-foreground'
        )}
      >
        {component.value}
      </TableCell>
      <TableCell className="flex justify-center">
        {component.type === 'resistor' ? (
          <ResistorVisualization value={component.value} isTaken={component.taken} />
        ) : (
          <CapacitorVisualization value={component.value} isTaken={component.taken} />
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" onClick={() => onEdit(component)}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive"
          onClick={() => onRemove(component.uid)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}


export function ComponentTable() {
  const { components, toggleTaken, setDialogState, removeComponent } = useComponentContext();

  const availableComponents = components.filter(c => !c.taken);
  const takenComponents = components.filter(c => c.taken);

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
    <div className="space-y-8">
      {/* Available Components */}
      <Card>
         <CardHeader>
           <CardTitle className="font-headline text-2xl flex items-center gap-2">
             <Package className="h-6 w-6 text-primary" />
             Available Components
            </CardTitle>
        </CardHeader>
        <CardContent>
           {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {availableComponents.length > 0 ? (
                availableComponents.map((component) => (
                    <ComponentRow key={component.uid} component={component} onEdit={handleEdit} onRemove={removeComponent} onToggle={toggleTaken} isMobile />
                ))
            ) : (
                <p className="text-muted-foreground text-center py-4">No available components.</p>
            )}
          </div>
          {/* Desktop View */}
          <div className="hidden md:block">
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
                {availableComponents.length > 0 ? (
                    availableComponents.map((component) => (
                       <ComponentRow key={component.uid} component={component} onEdit={handleEdit} onRemove={removeComponent} onToggle={toggleTaken} />
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                            No available components.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Taken Components */}
      {takenComponents.length > 0 && (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <PackageCheck className="h-6 w-6 text-muted-foreground" />
                    Taken Components
                </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                  {takenComponents.map((component) => (
                      <ComponentRow key={component.uid} component={component} onEdit={handleEdit} onRemove={removeComponent} onToggle={toggleTaken} isMobile />
                  ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
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
                    {takenComponents.map((component) => (
                        <ComponentRow key={component.uid} component={component} onEdit={handleEdit} onRemove={removeComponent} onToggle={toggleTaken} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
