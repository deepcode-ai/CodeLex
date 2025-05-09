/* Generate by @codelexjs/codegen */
import type {
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterGeneric,
} from '@codelexjs/types'
import { createdBundledHighlighter } from '@codelexjs/core'
import { createJavaScriptRawEngine } from '@codelexjs/engine-javascript/raw'

type BundledLanguage = 'javascript' | 'js' | 'typescript' | 'ts' | 'tsx'
type BundledTheme = 'nord' | 'vitesse-dark'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
  javascript: () => import('@codelexjs/langs-precompiled/javascript'),
  js: () => import('@codelexjs/langs-precompiled/javascript'),
  typescript: () => import('@codelexjs/langs-precompiled/typescript'),
  ts: () => import('@codelexjs/langs-precompiled/typescript'),
  tsx: () => import('@codelexjs/langs-precompiled/tsx'),
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
  engine: () => createJavaScriptRawEngine(),
})

export { bundledLanguages, bundledThemes, createHighlighter }
export type { BundledLanguage, BundledTheme, Highlighter }
