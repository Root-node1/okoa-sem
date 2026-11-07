import { createRequire } from 'module'

const require = createRequire(import.meta.url)

/**
 * Extract and normalize text from a source.
 * @param {{ sourceType: string, textContent?: string, fileBuffer?: Buffer, mimeType?: string }} input
 * @returns {Promise<string>}
 */
export async function extractText({ sourceType, textContent, fileBuffer, mimeType }) {
  let raw = ''

  if (sourceType === 'text' || sourceType === 'whatsapp_export') {
    if (!textContent) throw Object.assign(new Error('No text content provided'), { code: 'NO_TEXT' })
    raw = textContent
  } else if (sourceType === 'document') {
    if (!fileBuffer) throw Object.assign(new Error('No file buffer provided'), { code: 'NO_BUFFER' })
    const mime = mimeType ?? ''
    if (mime === 'application/pdf' || mime.endsWith('/pdf')) {
      raw = await extractPdf(fileBuffer)
    } else if (mime.startsWith('text/')) {
      raw = fileBuffer.toString('utf8')
    } else {
      throw Object.assign(new Error(`Unsupported document type: ${mime}`), { code: 'UNSUPPORTED_TYPE' })
    }
  } else {
    throw Object.assign(new Error(`Unknown source type: ${sourceType}`), { code: 'UNKNOWN_SOURCE_TYPE' })
  }

  return normalizeText(raw)
}

async function extractPdf(buffer) {
  let pdfParse
  try {
    pdfParse = require('pdf-parse')
  } catch {
    throw Object.assign(new Error('pdf-parse is not installed; run: npm install pdf-parse'), { code: 'PDF_PARSE_MISSING' })
  }
  const result = await pdfParse(buffer)
  if (!result.text?.trim()) {
    throw Object.assign(new Error('PDF appears to be scanned or image-only; OCR not supported'), { code: 'PDF_NO_TEXT' })
  }
  return result.text
}

/** Normalize whitespace and encoding artifacts. */
function normalizeText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
