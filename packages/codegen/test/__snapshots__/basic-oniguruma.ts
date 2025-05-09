/* Generate by @codelexjs/codegen */
import type {
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterGeneric,
} from '@codelexjs/types'
import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from '@codelexjs/core'
import { createOnigurumaEngine } from '@codelexjs/engine-oniguruma'

type BundledLanguage = 'javascript' | 'js' | 'typescript' | 'ts' | 'tsx'
type BundledTheme = 'nord' | 'vitesse-dark'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
  javascript: () => import('@codelexjs/langs/javascript'),
  js: () => import('@codelexjs/langs/javascript'),
  typescript: () => import('@codelexjs/langs/typescript'),
  ts: () => import('@codelexjs/langs/typescript'),
  tsx: () => import('@codelexjs/langs/tsx'),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>

const bundledThemes = {
  nord: () => import('@codelexjs/themes/nord'),
  'vitesse-dark': () => import('@codelexjs/themes/vitesse-dark'),
} as Record<BundledTheme, DynamicImportThemeRegistration>

const createHighlighter = /* @__PURE__ */ createdBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createOnigurumaEngine(import('codelex/wasm')),
})

const {
  codeToHtml,
  codeToHast,
  codeToTokensBase,
  codeToTokens,
  codeToTokensWithThemes,
  getSingletonHighlighter,
  getLastGrammarState,
} = /* @__PURE__ */ createSingletonShorthands<BundledLanguage, BundledTheme>(
  createHighlighter,
)

export {
  bundledLanguages,
  bundledThemes,
  codeToHast,
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  createHighlighter,
  getLastGrammarState,
  getSingletonHighlighter,
}
export type { BundledLanguage, BundledTheme, Highlighter }
