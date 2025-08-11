'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting capacitor replacements based on a given resistor combination.
 *
 * - suggestCapacitorReplacements - A function that takes resistor values as input and returns suggested capacitor values.
 * - SuggestCapacitorReplacementsInput - The input type for the suggestCapacitorReplacements function.
 * - SuggestCapacitorReplacementsOutput - The return type for the suggestCapacitorReplacements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCapacitorReplacementsInputSchema = z.object({
  resistor1Value: z.string().describe('The value of the first resistor (e.g., 1k, 10k, 100k).'),
  resistor2Value: z.string().describe('The value of the second resistor (e.g., 1k, 10k, 100k).'),
  applicationNeeds: z
    .string()
    .optional()
    .describe('Optional: Specific application needs or requirements for the circuit.'),
});
export type SuggestCapacitorReplacementsInput = z.infer<typeof SuggestCapacitorReplacementsInputSchema>;

const SuggestCapacitorReplacementsOutputSchema = z.object({
  suggestedCapacitorValues: z
    .string()
    .describe('A list of suggested capacitor values that could be used with the given resistor combination.'),
  reasoning: z.string().describe('The reasoning behind the suggested capacitor values.'),
});
export type SuggestCapacitorReplacementsOutput = z.infer<typeof SuggestCapacitorReplacementsOutputSchema>;

export async function suggestCapacitorReplacements(
  input: SuggestCapacitorReplacementsInput
): Promise<SuggestCapacitorReplacementsOutput> {
  return suggestCapacitorReplacementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCapacitorReplacementsPrompt',
  input: {schema: SuggestCapacitorReplacementsInputSchema},
  output: {schema: SuggestCapacitorReplacementsOutputSchema},
  prompt: `You are an experienced electrical engineer. A user is designing a circuit with two resistors, and needs a suitable capacitor value.

The resistor values are:
Resistor 1: {{{resistor1Value}}}
Resistor 2: {{{resistor2Value}}}

{% if applicationNeeds %}The user has specified the following application needs: {{{applicationNeeds}}}{% endif %}

Based on this information, suggest suitable capacitor values, explaining your reasoning.
`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const suggestCapacitorReplacementsFlow = ai.defineFlow(
  {
    name: 'suggestCapacitorReplacementsFlow',
    inputSchema: SuggestCapacitorReplacementsInputSchema,
    outputSchema: SuggestCapacitorReplacementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
