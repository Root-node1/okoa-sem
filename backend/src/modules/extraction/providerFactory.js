import { env } from '../../config/env.js'
import { MockProvider } from './mockProvider.js'

let _provider = null

export function getProvider() {
  if (_provider) return _provider
  _provider = createProvider()
  return _provider
}

/** Override provider — used in tests. */
export function setProvider(provider) {
  _provider = provider
}

function createProvider() {
  const name = env.aiProvider

  if (name === 'mock' || env.nodeEnv === 'test') {
    return new MockProvider()
  }

  if (name === 'gemini') {
    if (!env.geminiApiKey) throw new Error('GEMINI_API_KEY is required when AI_PROVIDER=gemini')
    // Lazy import to avoid loading @google/generative-ai in test environments
    return import('./geminiProvider.js').then(({ GeminiProvider }) =>
      new GeminiProvider(env.geminiApiKey, env.aiModel),
    )
  }

  throw new Error(`Unknown AI_PROVIDER: "${name}". Supported: gemini, mock`)
}
