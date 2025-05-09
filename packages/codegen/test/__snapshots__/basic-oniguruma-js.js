/* Generate by @codelex/codegen */
import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from '@codelex/core'
import { createOnigurumaEngine } from '@codelex/engine-oniguruma'

const bundledLanguages = {
  javascript: () => import('@codelex/langs/javascript'),
  js: () => import('@codelex/langs/javascript'),
  typescript: () => import('@codelex/langs/typescript'),
  ts: () => import('@codelex/langs/typescript'),
  tsx: () => import('@codelex/langs/tsx'),
}

const bundledThemes = {
  nord: () => import('@codelex/themes/nord'),
  'vitesse-dark': () => import('@codelex/themes/vitesse-dark'),
}

const createHighlighter = /* @__PURE__ */ createdBundledHighlighter({
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
} = /* @__PURE__ */ createSingletonShorthands(createHighlighter)

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
