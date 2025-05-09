import type { HighlighterCore, HighlighterCoreOptions } from '@codelexjs/types'

import { codeToHast } from '../highlight/code-to-hast'
import { codeToHtml } from '../highlight/code-to-html'
import { codeToTokens } from '../highlight/code-to-tokens'
import { codeToTokensBase, getLastGrammarState } from '../highlight/code-to-tokens-base'
import { codeToTokensWithThemes } from '../highlight/code-to-tokens-themes'

import { createCodelexInternal } from './internal'
import { createCodelexInternalSync } from './internal-sync'

/**
 * Create a Codelex core highlighter instance, with no languages or themes bundled.
 * Wasm and each language and theme must be loaded manually.
 *
 * @see http://codelex.style/guide/bundles#fine-grained-bundle
 */
export async function createHighlighterCore(options: HighlighterCoreOptions<false>): Promise<HighlighterCore> {
  const internal = await createCodelexInternal(options)

  return {
    getLastGrammarState: (...args: any[]) => getLastGrammarState(internal, ...args as [any])!,
    codeToTokensBase: (code, options) => codeToTokensBase(internal, code, options),
    codeToTokensWithThemes: (code, options) => codeToTokensWithThemes(internal, code, options),
    codeToTokens: (code, options) => codeToTokens(internal, code, options),
    codeToHast: (code, options) => codeToHast(internal, code, options),
    codeToHtml: (code, options) => codeToHtml(internal, code, options),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...internal,
    getInternalContext: () => internal,
  }
}

/**
 * Create a Codelex core highlighter instance, with no languages or themes bundled.
 * Wasm and each language and theme must be loaded manually.
 *
 * Synchronous version of `createHighlighterCore`, which requires to provide the engine and all themes and languages upfront.
 *
 * @see http://codelex.style/guide/bundles#fine-grained-bundle
 */
export function createHighlighterCoreSync(options: HighlighterCoreOptions<true>): HighlighterCore {
  const internal = createCodelexInternalSync(options)

  return {
    getLastGrammarState: (...args: any[]) => getLastGrammarState(internal, ...args as [any, any]),
    codeToTokensBase: (code, options) => codeToTokensBase(internal, code, options),
    codeToTokensWithThemes: (code, options) => codeToTokensWithThemes(internal, code, options),
    codeToTokens: (code, options) => codeToTokens(internal, code, options),
    codeToHast: (code, options) => codeToHast(internal, code, options),
    codeToHtml: (code, options) => codeToHtml(internal, code, options),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...internal,
    getInternalContext: () => internal,
  }
}

export function makeSingletonHighlighterCore(
  createHighlighter: typeof createHighlighterCore,
): (options: HighlighterCoreOptions) => Promise<HighlighterCore> {
  let _codelex: ReturnType<typeof createHighlighterCore>

  async function getSingletonHighlighterCore(
    options: HighlighterCoreOptions,
  ): Promise<HighlighterCore> {
    if (!_codelex) {
      _codelex = createHighlighter({
        ...options,
        themes: options.themes || [],
        langs: options.langs || [],
      })
      return _codelex
    }
    else {
      const s = await _codelex
      await Promise.all([
        s.loadTheme(...(options.themes || [])),
        s.loadLanguage(...(options.langs || [])),
      ])
      return s
    }
  }

  return getSingletonHighlighterCore
}

export const getSingletonHighlighterCore = /* @__PURE__ */ makeSingletonHighlighterCore(createHighlighterCore)
