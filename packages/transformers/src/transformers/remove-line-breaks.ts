import type { CodelexTransformer } from '@codelex/types'

/**
 * Remove line breaks between lines.
 * Useful when you override `display: block` to `.line` in CSS.
 */
export function transformerRemoveLineBreak(): CodelexTransformer {
  return {
    name: '@codelex/transformers:remove-line-break',
    code(code) {
      code.children = code.children.filter(line => !(line.type === 'text' && line.value === '\n'))
    },
  }
}
