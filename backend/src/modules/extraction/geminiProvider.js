import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { AIProvider } from './aiProvider.js';
import { extractionResultSchema } from './extraction.schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPT_VERSION = 'extract-v1';
const systemPrompt = readFileSync(
  join(__dirname, '../../../prompts/extract-v1.md'), 'utf8'
);

// Mirrors extractionResultSchema for Gemini structured output
const EXTRACTION_RESPONSE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    claims: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          type: { type: SchemaType.STRING },
          title: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          courseHint: { type: SchemaType.STRING },
          proposedDates: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          venue: { type: SchemaType.STRING },
          confidence: { type: SchemaType.NUMBER },
          evidenceSnippet: { type: SchemaType.STRING },
        },
        required: ['type', 'title', 'confidence', 'evidenceSnippet'],
      },
    },
    summary: { type: SchemaType.STRING },
  },
  required: ['claims', 'summary'],
};

export class GeminiProvider extends AIProvider {
  #model;

  constructor(apiKey, modelName = 'gemini-1.5-flash') {
    super();
    const genAI = new GoogleGenerativeAI(apiKey);
    this.#model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: EXTRACTION_RESPONSE_SCHEMA,
      },
    });
  }

  async extract(input) {
    const userMessage = buildExtractionPrompt(input);
    const raw = await this.#callWithRetry(userMessage);
    return { ...raw, promptVersion: PROMPT_VERSION };
  }

  async classify(_input) { throw new Error('classify() not implemented in GeminiProvider') }
  async answer(_input) { throw new Error('answer() not implemented in GeminiProvider') }

  async #callWithRetry(prompt, attempt = 1) {
    const result = await this.#model.generateContent(prompt);
    const text = result.response.text();

    const parsed = extractionResultSchema.safeParse(JSON.parse(text));
    if (parsed.success) return parsed.data;

    if (attempt < 2) {
      const correctionPrompt =
        `${prompt}\n\nYour previous response failed schema validation: ${parsed.error.message}\nCorrect and return valid JSON only.`;
      return this.#callWithRetry(correctionPrompt, 2);
    }

    throw Object.assign(new Error('AI output failed schema validation after retry'), {
      cause: parsed.error,
    });
  }
}

function buildExtractionPrompt({ text, courses, contextHint }) {
  const parts = [`Source text:\n"""\n${text}\n"""`];
  if (courses?.length) parts.push(`Known courses: ${courses.join(', ')}`);
  if (contextHint) parts.push(`Context: ${contextHint}`);
  return parts.join('\n\n');
}
