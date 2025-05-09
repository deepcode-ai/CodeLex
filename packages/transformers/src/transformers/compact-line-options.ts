import type { CodelexTransformer } from '@codelex/types'

export interface TransformerCompactLineOption {
  /**
   * 1-based line number.
   */
  line: number
  classes?: string[]
}

/**
 * Transformer for `codelex`'s legacy `lineOptions`
 */
export function transformerCompactLineOptions(
  lineOptions: TransformerCompactLineOption[] = [],
): CodelexTransformer {
  return {
    name: '@codelex/transformers:compact-line-options',
    line(node, line) {
      const lineOption = lineOptions.find(o => o.line === line)
      if (lineOption?.classes)
        this.addClassToHast(node, lineOption.classes)
      return node
    },
  }
}
