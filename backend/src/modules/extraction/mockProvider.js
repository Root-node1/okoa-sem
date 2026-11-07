import { AIProvider } from './aiProvider.js'

export const MOCK_PROMPT_VERSION = 'mock-v1'

/**
 * Deterministic mock provider for tests.
 * Pass `claims` to constructor to control what extract() returns.
 */
export class MockProvider extends AIProvider {
  #claims

  constructor(claims = []) {
    super()
    this.#claims = claims
  }

  async extract(_input) {
    return {
      claims: this.#claims,
      summary: 'Mock extraction summary',
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
