'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useComponentContext } from '@/contexts/component-context';
import { ResistorVisualization } from './resistor-visualization';
import { CapacitorVisualization } from './capacitor-visualization';

const formSchema = z.object({
  id: z.string().min(1, 'Component ID is required'),
  value: z.string().min(1, 'Value is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function ComponentDialog() {
  const { dialogState, setDialogState, addComponent, updateComponent, getNextId } = useComponentContext();
  const { isOpen, type, component } = dialogState;
  const isEditMode = !!component;

  const [liveValue, setLiveValue] = useState(component?.value || '');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: '', value: '' },
  });

  useEffect(() => {
    if (isOpen) {
      const initialValue = component ? component.value : '';
      form.reset({
        id: component ? component.id : getNextId(type || 'resistor'),
        value: initialValue,
      });
      setLiveValue(initialValue);
    }
  }, [isOpen, component, type, form, getNextId]);
  
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('value', e.target.value);
    setLiveValue(e.target.value);
  }

  const onSubmit = (values: FormValues) => {
    if (isEditMode && component) {
      updateComponent(component.uid, values);
    } else if (type) {
      addComponent(type, values);
    }
    handleClose();
  };

  const handleClose = () => {
    setDialogState({ isOpen: false });
    form.reset();
    setLiveValue('');
  };

  const title = isEditMode
    ? `Edit ${type?.charAt(0).toUpperCase()}${type?.slice(1)}`
    : `Add New ${type?.charAt(0).toUpperCase()}${type?.slice(1)}`;
  
  const description = isEditMode
    ? `Update the details for component ${component?.id}.`
    : `Add a new ${type} to your project.`;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle className="font-headline">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Number</FormLabel>
                    <FormControl>
                      <Input placeholder={isEditMode ? component?.id : getNextId(type || 'resistor')} {...field} className="font-code"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={type === 'resistor' ? "e.g., 4.7k, 1M" : "e.g., 100n, 22p"}
                        {...field}
                        onChange={handleValueChange}
                        className="font-code"
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center rounded-lg bg-secondary/50 p-4 min-h-[80px]">
                {type === 'resistor' ? (
                  <ResistorVisualization value={liveValue} />
                ) : (
                  <CapacitorVisualization value={liveValue} />
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">{isEditMode ? 'Save Changes' : 'Add Component'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
