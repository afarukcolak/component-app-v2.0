'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ComponentTable } from '@/components/component-table';
import { ComponentDialog } from '@/components/component-dialog';
import { CapacitorSuggestionTool } from '@/components/capacitor-suggestion-tool';
import { useComponentContext } from '@/contexts/component-context';
import { PlusCircle, Cpu } from 'lucide-react';

export default function Home() {
  const {
    setDialogState,
    setSuggestionToolOpen
  } = useComponentContext();

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            CircuitBase
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your component workbench
          </p>
        </header>

        <main>
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            <Button onClick={() => setDialogState({ isOpen: true, type: 'resistor' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Resistor
            </Button>
            <Button onClick={() => setDialogState({ isOpen: true, type: 'capacitor' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Capacitor
            </Button>
            <Button variant="outline" onClick={() => setSuggestionToolOpen(true)}>
              <Cpu className="mr-2 h-4 w-4" /> AI Suggestions
            </Button>
          </div>

          <ComponentTable />
        </main>
      </div>
      <ComponentDialog />
      <CapacitorSuggestionTool />
    </>
  );
}
