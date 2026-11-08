import { AIProvider } from './aiProvider.js'

export const MOCK_PROMPT_VERSION = 'mock-v1'

/**
 * Deterministic mock provider for tests.
 * Pass `claims` to constructor to control what extract() returns.
 */
export class MockProvider extends AIProvider {
  #claims
  #explicitClaims

  constructor(claims = null) {
    super()
    this.#explicitClaims = claims !== null
    this.#claims = claims ?? []
  }

  async extract(input) {
    if (this.#explicitClaims) {
      return {
        claims: this.#claims,
        summary: 'Mock extraction summary',
        promptVersion: MOCK_PROMPT_VERSION,
      }
    }

    const rawText = (input?.text ?? '').trim()
    if (!rawText) {
      return {
        claims: [],
        summary: 'No text provided',
        promptVersion: MOCK_PROMPT_VERSION,
      }
    }

    const lower = rawText.toLowerCase()
    let type = 'announcement'
    if (lower.includes('cat ') || lower.includes('test')) type = 'cat'
    else if (lower.includes('exam')) type = 'exam'
    else if (lower.includes('assignment') || lower.includes('lab') || lower.includes('submit')) type = 'assignment'
    else if (lower.includes('venue') || lower.includes('moved to') || lower.includes('hall') || lower.includes('lt-')) type = 'venue_change'
    else if (lower.includes('deadline') || lower.includes('due')) type = 'deadline'
    else if (lower.includes('lecture') || lower.includes('class')) type = 'lecture'

    const courseMatch = rawText.match(/\b([A-Z]{3}\s?\d{4})\b/i)
    const courseHint = courseMatch
      ? courseMatch[1].toUpperCase().replace(/\s+/, ' ')
      : input?.courses?.[0] ?? undefined

    const firstSentence = rawText.split(/[.!?\n]/)[0]?.trim() || rawText.slice(0, 80)
    const title = firstSentence.length >= 3
      ? firstSentence.slice(0, 120)
      : `Academic Update (${courseHint ?? 'General'})`

    const proposedDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()

    return {
      claims: [
        {
          type,
          title,
          description: rawText,
          courseHint,
          proposedDates: [proposedDate],
          confidence: 0.88,
          evidenceSnippet: rawText.slice(0, 280),
        },
      ],
      summary: `Extracted 1 ${type} claim from submitted source.`,
      promptVersion: MOCK_PROMPT_VERSION,
    }
  }

  async classify(_input) {
    return { label: 'announcement', confidence: 1.0 }
  }

  async answer(_input) {
    return { answer: 'Mock answer', sources: [] }
  }
}
