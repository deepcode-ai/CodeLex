import type { CodelexTransformer } from '@codelex/types'

/**
 * Remove notation escapes.
 * Useful when you want to write `// [!code` in markdown.
 * If you process `// [\!code ...]` expression, you can get `// [!code ...]` in the output.
 */
export function transformerRemoveNotationEscape(): CodelexTransformer {
  return {
    name: '@codelex/transformers:remove-notation-escape',
    postprocess(code) {
      return code.replace(/\[\\!code/g, '[!code')
    },
  }
}
