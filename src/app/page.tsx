'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ComponentTable } from '@/components/component-table';
import { ComponentDialog } from '@/components/component-dialog';
import { useComponentContext } from '@/contexts/component-context';
import { PlusCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Home() {
  const { setDialogState, clearAllComponents } = useComponentContext();

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Resistor App
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your component workbench
          </p>
        </header>

        <main>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setDialogState({ isOpen: true, type: 'resistor' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Resistor
              </Button>
              <Button
                onClick={() =>
                  setDialogState({ isOpen: true, type: 'capacitor' })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Capacitor
              </Button>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all components from your list.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => clearAllComponents()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <ComponentTable />
        </main>
      </div>
      <ComponentDialog />
    </>
  );
}
