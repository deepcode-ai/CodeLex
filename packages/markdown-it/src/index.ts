import type MarkdownIt from 'markdown-it'
import type { BuiltinLanguage, BuiltinTheme, LanguageInput } from 'codelex'
import type { MarkdownItCodelexSetupOptions } from './common'
import { bundledLanguages, createHighlighter } from 'codelex'
import { setupMarkdownIt } from './core'

export * from './core'

export type MarkdownItCodelexOptions = MarkdownItCodelexSetupOptions & {
  /**
   * Language names to include.
   *
   * @default Object.keys(bundledLanguages)
   */
  langs?: Array<LanguageInput | BuiltinLanguage>
}

export default async function markdownItCodelex(options: MarkdownItCodelexOptions) {
  const themeNames = ('themes' in options
    ? Object.values(options.themes)
    : [options.theme]).filter(Boolean) as BuiltinTheme[]

  const highlighter = await createHighlighter({
    themes: themeNames,
    langs: options.langs || Object.keys(bundledLanguages) as BuiltinLanguage[],
  })

  return function (markdownit: MarkdownIt) {
    setupMarkdownIt(markdownit, highlighter, options)
  }
}
