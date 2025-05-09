import type { CodelexTransformer } from '@codelexjs/types'
import type { MatchAlgorithmOptions } from '../shared/notation-transformer'
import { transformerNotationMap } from './notation-map'

export interface TransformerNotationDiffOptions extends MatchAlgorithmOptions {
  /**
   * Class for added lines
   */
  classLineAdd?: string
  /**
   * Class for removed lines
   */
  classLineRemove?: string
  /**
   * Class added to the <pre> element when the current code has diff
   */
  classActivePre?: string
}

/**
 * Use `[!code ++]` and `[!code --]` to mark added and removed lines.
 */
export function transformerNotationDiff(
  options: TransformerNotationDiffOptions = {},
): CodelexTransformer {
  const {
    classLineAdd = 'diff add',
    classLineRemove = 'diff remove',
    classActivePre = 'has-diff',
  } = options

  return transformerNotationMap(
    {
      classMap: {
        '++': classLineAdd,
        '--': classLineRemove,
      },
      classActivePre,
      matchAlgorithm: options.matchAlgorithm,
    },
    '@codelexjs/transformers:notation-diff',
  )
}
