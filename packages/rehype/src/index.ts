/// <reference types="mdast-util-to-hast" />

import type { LanguageInput } from '@codelexjs/types'
import type { Root } from 'hast'
import type { BuiltinLanguage, BuiltinTheme } from 'codelex'
import type { Plugin } from 'unified'
import type { RehypeCodelexCoreOptions } from './types'
import { bundledLanguages, getSingletonHighlighter } from 'codelex'
import rehypeCodelexFromHighlighter from './core'

export type RehypeCodelexOptions = RehypeCodelexCoreOptions
  & {
    /**
     * Language names to include.
     *
     * @default Object.keys(bundledLanguages)
     */
    langs?: Array<LanguageInput | BuiltinLanguage>
  }

const rehypeCodelex: Plugin<[RehypeCodelexOptions], Root> = function (
  options = {} as RehypeCodelexOptions,
) {
  const themeNames = ('themes' in options ? Object.values(options.themes) : [options.theme]).filter(Boolean) as BuiltinTheme[]
  const langs = options.langs || Object.keys(bundledLanguages)

  let getHandler: Promise<any>

  return async (tree) => {
    if (!getHandler) {
      getHandler = getSingletonHighlighter({
        themes: themeNames,
        langs,
      })
        .then(highlighter => rehypeCodelexFromHighlighter.call(this, highlighter, options))
    }
    const handler = await getHandler
    return handler!(tree) as Root
  }
}

export default rehypeCodelex
