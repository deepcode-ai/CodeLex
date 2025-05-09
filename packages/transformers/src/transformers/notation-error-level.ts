import type { CodelexTransformer } from '@codelexjs/types'
import type { MatchAlgorithmOptions } from '../shared/notation-transformer'
import { transformerNotationMap } from './notation-map'

export interface TransformerNotationErrorLevelOptions extends MatchAlgorithmOptions {
  classMap?: Record<string, string | string[]>
  /**
   * Class added to the <pre> element when the current code has diff
   */
  classActivePre?: string
}

/**
 * Allow using `[!code error]` `[!code warning]` notation in code to mark highlighted lines.
 */
export function transformerNotationErrorLevel(
  options: TransformerNotationErrorLevelOptions = {},
): CodelexTransformer {
  const {
    classMap = {
      error: ['highlighted', 'error'],
      warning: ['highlighted', 'warning'],
    },
    classActivePre = 'has-highlighted',
  } = options

  return transformerNotationMap(
    {
      classMap,
      classActivePre,
      matchAlgorithm: options.matchAlgorithm,
    },
    '@codelexjs/transformers:notation-error-level',
  )
}
