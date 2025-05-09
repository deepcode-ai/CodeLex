/* Generate by @codelex/codegen */
import type {
  DynamicImportLanguageRegistration,
  DynamicImportThemeRegistration,
  HighlighterGeneric,
} from '@codelex/types'
import { createdBundledHighlighter } from '@codelex/core'
import { createJavaScriptRawEngine } from '@codelex/engine-javascript/raw'

type BundledLanguage = 'javascript' | 'js' | 'typescript' | 'ts' | 'tsx'
type BundledTheme = 'nord' | 'vitesse-dark'
type Highlighter = HighlighterGeneric<BundledLanguage, BundledTheme>

const bundledLanguages = {
  javascript: () => import('@codelex/langs-precompiled/javascript'),
  js: () => import('@codelex/langs-precompiled/javascript'),
  typescript: () => import('@codelex/langs-precompiled/typescript'),
  ts: () => import('@codelex/langs-precompiled/typescript'),
  tsx: () => import('@codelex/langs-precompiled/tsx'),
} as Record<BundledLanguage, DynamicImportLanguageRegistration>

const bundledThemes = {
  nord: () => import('@codelex/themes/nord'),
  'vitesse-dark': () => import('@codelex/themes/vitesse-dark'),
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
