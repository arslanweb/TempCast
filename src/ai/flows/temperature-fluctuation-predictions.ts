// Temperature fluctuation prediction flow using Genkit.
'use server';

/**
 * @fileOverview Predicts potential temperature fluctuations based on historical data.
 *
 * - predictTemperatureFluctuations - A function that predicts temperature fluctuations.
 * - PredictTemperatureFluctuationsInput - The input type for the predictTemperatureFluctuations function.
 * - PredictTemperatureFluctuationsOutput - The return type for the predictTemperatureFluctuations function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getTemperatureHistory} from '@/services/temperature-sensor';

const PredictTemperatureFluctuationsInputSchema = z.object({
  startTime: z.number().describe('The start timestamp for historical data.'),
  endTime: z.number().describe('The end timestamp for historical data.'),
});
export type PredictTemperatureFluctuationsInput = z.infer<
  typeof PredictTemperatureFluctuationsInputSchema
>;

const PredictTemperatureFluctuationsOutputSchema = z.object({
  prediction: z
    .string()
    .describe('A prediction of potential temperature fluctuations.'),
});
export type PredictTemperatureFluctuationsOutput = z.infer<
  typeof PredictTemperatureFluctuationsOutputSchema
>;

export async function predictTemperatureFluctuations(
  input: PredictTemperatureFluctuationsInput
): Promise<PredictTemperatureFluctuationsOutput> {
  return predictTemperatureFluctuationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'temperatureFluctuationPredictionPrompt',
  input: {
    schema: z.object({
      historicalData: z
        .string()
        .describe('Historical temperature data as a JSON string.'),
    }),
  },
  output: {
    schema: z.object({
      prediction: z
        .string()
        .describe('A prediction of potential temperature fluctuations.'),
    }),
  },
  prompt: `You are an AI assistant specializing in predicting temperature fluctuations.

  Analyze the provided historical temperature data and predict potential temperature fluctuations.

  Historical Data: {{{historicalData}}}
  Please provide a concise prediction.
  `,
});

const predictTemperatureFluctuationsFlow = ai.defineFlow<
  typeof PredictTemperatureFluctuationsInputSchema,
  typeof PredictTemperatureFluctuationsOutputSchema
>(
  {
    name: 'predictTemperatureFluctuationsFlow',
    inputSchema: PredictTemperatureFluctuationsInputSchema,
    outputSchema: PredictTemperatureFluctuationsOutputSchema,
  },
  async input => {
    const temperatureHistory = await getTemperatureHistory(
      input.startTime,
      input.endTime
    );
    const historicalData = JSON.stringify(temperatureHistory);
    const {output} = await prompt({historicalData});
    return output!;
  }
);
