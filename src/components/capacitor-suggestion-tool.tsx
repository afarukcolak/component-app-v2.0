'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { suggestCapacitorReplacements } from '@/app/actions';
import { Sparkles, Loader2 } from 'lucide-react';
import { useComponentContext } from '@/contexts/component-context';

const suggestionSchema = z.object({
  resistor1Value: z.string().min(1, 'Resistor 1 value is required.'),
  resistor2Value: z.string().min(1, 'Resistor 2 value is required.'),
  applicationNeeds: z.string().optional(),
});

type SuggestionFormValues = z.infer<typeof suggestionSchema>;
type SuggestionOutput = {
  suggestedCapacitorValues: string;
  reasoning: string;
}

export function CapacitorSuggestionTool() {
  const { suggestionToolOpen, setSuggestionToolOpen } = useComponentContext();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      resistor1Value: '',
      resistor2Value: '',
      applicationNeeds: '',
    },
  });

  const onSubmit = async (values: SuggestionFormValues) => {
    setIsLoading(true);
    setSuggestion(null);
    const result = await suggestCapacitorReplacements(values);
    setIsLoading(false);

    if (result.success && result.data) {
      setSuggestion(result.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'An unknown error occurred.',
      });
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    setSuggestionToolOpen(open);
    if (!open) {
      form.reset();
      setSuggestion(null);
    }
  }

  return (
    <Sheet open={suggestionToolOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <SheetHeader className="px-6 pt-6 pb-4">
              <SheetTitle className="font-headline flex items-center gap-2">
                <Sparkles className="text-primary" /> AI Capacitor Suggestions
              </SheetTitle>
              <SheetDescription>
                Enter two resistor values to get AI-powered capacitor suggestions for your circuit.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 px-6 space-y-4">
              <FormField
                control={form.control}
                name="resistor1Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resistor 1 Value (e.g., 10k)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resistor2Value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resistor 2 Value (e.g., 4.7k)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicationNeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Needs (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., timing circuit, filter, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {suggestion && (
                <div className="space-y-4 rounded-md border bg-secondary/50 p-4 text-sm">
                  <h3 className="font-bold text-lg font-headline">Suggestions</h3>
                  <div>
                    <h4 className="font-semibold">Suggested Values:</h4>
                    <p>{suggestion.suggestedCapacitorValues}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Reasoning:</h4>
                    <p>{suggestion.reasoning}</p>
                  </div>
                </div>
              )}
            </div>
            <SheetFooter className="px-6 py-4 bg-background sticky bottom-0">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Suggestions...
                  </>
                ) : (
                  'Get Suggestions'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
