
'use server';

import type {z} from 'zod';
import {suggestCapacitorReplacements as suggestCapacitorReplacementsFlow} from '@/ai/flows/suggest-capacitor-replacements';
import type {SuggestCapacitorReplacementsInput} from '@/ai/flows/suggest-capacitor-replacements';

export async function suggestCapacitorReplacements(
  input: SuggestCapacitorReplacementsInput
) {
  try {
    const result = await suggestCapacitorReplacementsFlow(input);
    return {success: true, data: result};
  } catch (error) {
    console.error('Error in suggestCapacitorReplacements action:', error);
    return {success: false, error: 'Failed to get suggestions.'};
  }
}
