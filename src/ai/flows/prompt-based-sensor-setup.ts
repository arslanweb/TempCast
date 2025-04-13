'use server';

/**
 * @fileOverview A flow that takes a prompt describing a sensor setup and generates configuration files and code snippets.
 *
 * - generateSensorSetup - A function that handles the sensor setup generation process.
 * - GenerateSensorSetupInput - The input type for the generateSensorSetup function.
 * - GenerateSensorSetupOutput - The return type for the generateSensorSetup function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateSensorSetupInputSchema = z.object({
  sensorSetupPrompt: z.string().describe('A detailed description of the sensor setup, including sensor type, connection details, and desired data format.'),
});
export type GenerateSensorSetupInput = z.infer<typeof GenerateSensorSetupInputSchema>;

const GenerateSensorSetupOutputSchema = z.object({
  configurationFiles: z.string().describe('The generated configuration files needed to connect the sensor to the application.'),
  codeSnippets: z.string().describe('The generated code snippets for data collection and transfer.'),
  securityRules: z.string().optional().describe('Suggested security rules for data access, if applicable.'),
});
export type GenerateSensorSetupOutput = z.infer<typeof GenerateSensorSetupOutputSchema>;

export async function generateSensorSetup(input: GenerateSensorSetupInput): Promise<GenerateSensorSetupOutput> {
  return generateSensorSetupFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSensorSetupPrompt',
  input: {
    schema: z.object({
      sensorSetupPrompt: z.string().describe('A detailed description of the sensor setup, including sensor type, connection details, and desired data format.'),
    }),
  },
  output: {
    schema: z.object({
      configurationFiles: z.string().describe('The generated configuration files needed to connect the sensor to the application.'),
      codeSnippets: z.string().describe('The generated code snippets for data collection and transfer.'),
      securityRules: z.string().optional().describe('Suggested security rules for data access, if applicable.'),
    }),
  },
  prompt: `You are an expert in setting up sensor integrations with Firebase.

You will receive a description of the sensor setup and generate the necessary configuration files, code snippets, and security rules to connect the sensor to the application.

Sensor Setup Description: {{{sensorSetupPrompt}}}

Provide the configuration files, code snippets, and security rules in a well-formatted and easy-to-understand manner.
`,
});

const generateSensorSetupFlow = ai.defineFlow<
  typeof GenerateSensorSetupInputSchema,
  typeof GenerateSensorSetupOutputSchema
>({
  name: 'generateSensorSetupFlow',
  inputSchema: GenerateSensorSetupInputSchema,
  outputSchema: GenerateSensorSetupOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});

