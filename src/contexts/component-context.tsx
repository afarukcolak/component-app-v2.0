'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Component, Resistor, Capacitor } from '@/types';

type ComponentType = 'resistor' | 'capacitor';

interface DialogState {
  isOpen: boolean;
  type?: ComponentType;
  component?: Component;
}

interface ComponentContextType {
  components: Component[];
  addComponent: (type: ComponentType, data: { id: string; value: string }) => void;
  updateComponent: (uid: string, data: Partial<Omit<Component, 'uid' | 'type'>>) => void;
  removeComponent: (uid:string) => void;
  toggleTaken: (uid: string) => void;
  getNextId: (type: ComponentType) => string;
  dialogState: DialogState;
  setDialogState: (state: DialogState) => void;
  suggestionToolOpen: boolean;
  setSuggestionToolOpen: (isOpen: boolean) => void;
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

const initialComponents: Component[] = [
    { uid: '1', type: 'resistor', id: 'R-1', value: '10k', taken: false },
    { uid: '2', type: 'resistor', id: 'R-2', value: '470', taken: true },
    { uid: '3', type: 'capacitor', id: 'C-1', value: '100nF', taken: false },
];


export const ComponentProvider = ({ children }: { children: ReactNode }) => {
  const [components, setComponents] = useState<Component[]>(initialComponents);
  const [dialogState, setDialogState] = useState<DialogState>({ isOpen: false });
  const [suggestionToolOpen, setSuggestionToolOpen] = useState(false);
  const { toast } = useToast();

  const addComponent = (type: ComponentType, data: { id: string; value: string }) => {
    // Check for duplicate ID
    if (components.some(c => c.id.toLowerCase() === data.id.toLowerCase())) {
        toast({
            variant: 'destructive',
            title: 'Duplicate ID',
            description: `A component with ID ${data.id} already exists.`,
        });
        return;
    }
    const newComponent: Component = {
      ...data,
      uid: crypto.randomUUID(),
      type,
      taken: false,
    };
    setComponents(prev => [...prev, newComponent]);
    toast({
        title: 'Component Added',
        description: `${data.id} has been added to your list.`,
    })
  };

  const updateComponent = (uid: string, data: Partial<Omit<Component, 'uid' | 'type'>>) => {
     // Check for duplicate ID if ID is being changed
    if (data.id && components.some(c => c.uid !== uid && c.id.toLowerCase() === data.id!.toLowerCase())) {
        toast({
            variant: 'destructive',
            title: 'Duplicate ID',
            description: `A component with ID ${data.id} already exists.`,
        });
        return;
    }
    setComponents(prev =>
      prev.map(c => (c.uid === uid ? { ...c, ...data } : c))
    );
     toast({
        title: 'Component Updated',
        description: `${data.id || 'Component'} has been updated.`,
    })
  };

  const removeComponent = (uid: string) => {
    setComponents(prev => prev.filter(c => c.uid !== uid));
    toast({
        title: 'Component Removed',
        description: `The component has been removed from your list.`,
        variant: 'destructive'
    })
  };

  const toggleTaken = (uid: string) => {
    setComponents(prev =>
      prev.map(c => (c.uid === uid ? { ...c, taken: !c.taken } : c))
    );
  };

  const getNextId = (type: ComponentType): string => {
    const prefix = type === 'resistor' ? 'R-' : 'C-';
    const relevantComponents = components.filter(c => c.type === type);
    
    const ids = relevantComponents
      .map(c => parseInt(c.id.replace(prefix, ''), 10))
      .filter(n => !isNaN(n))
      .sort((a, b) => a - b);

    let nextNum = 1;
    for (const id of ids) {
      if (nextNum < id) {
        break;
      }
      nextNum = id + 1;
    }
    return `${prefix}${nextNum}`;
  };

  const value = {
    components,
    addComponent,
    updateComponent,
    removeComponent,
    toggleTaken,
    getNextId,
    dialogState,
    setDialogState,
    suggestionToolOpen,
    setSuggestionToolOpen
  };

  return (
    <ComponentContext.Provider value={value}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = (): ComponentContextType => {
  const context = useContext(ComponentContext);
  if (context === undefined) {
    throw new Error('useComponentContext must be used within a ComponentProvider');
  }
  return context;
};
