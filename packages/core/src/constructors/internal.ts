import type { HighlighterCoreOptions, CodelexInternal } from '@codelex/types'
import { resolveLangs, resolveThemes } from '../textmate/getters-resolve'
import { warnDeprecated } from '../warn'
import { createCodelexInternalSync } from './internal-sync'

/**
 * Get the minimal codelex context for rendering.
 */
export async function createCodelexInternal(options: HighlighterCoreOptions): Promise<CodelexInternal> {
  if (!options.engine) {
    warnDeprecated('`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.')
  }

  const [
    themes,
    langs,
    engine,
  ] = await Promise.all([
    resolveThemes(options.themes || []),
    resolveLangs(options.langs || []),
    options.engine,
  ] as const)

  return createCodelexInternalSync({
    ...options,
    themes,
    langs,
    engine,
  })
}
