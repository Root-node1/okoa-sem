/**
 * @typedef {{ text: string, sourceId: string, courses?: string[], contextHint?: string }} ExtractionInput
 * @typedef {{ claims: import('./extraction.schema.js').ExtractedClaim[], summary: string }} ExtractionResult
 *
 * @typedef {{ text: string, candidates: string[] }} ClassificationInput
 * @typedef {{ label: string, confidence: number }} ClassificationResult
 *
 * @typedef {{ question: string, userId: string, courseIds?: string[] }} AssistantInput
 * @typedef {{ answer: string, sources: string[] }} AssistantResult
 */

export class AIProvider {
  /** @param {ExtractionInput} _input @returns {Promise<ExtractionResult>} */
  async extract(_input) { throw new Error('extract() not implemented') }

  /** @param {ClassificationInput} _input @returns {Promise<ClassificationResult>} */
  async classify(_input) { throw new Error('classify() not implemented') }

  /** @param {AssistantInput} _input @returns {Promise<AssistantResult>} */
  async answer(_input) { throw new Error('answer() not implemented') }
}
