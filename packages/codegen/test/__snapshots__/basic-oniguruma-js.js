/* Generate by @codelexjs/codegen */
import {
  createSingletonShorthands,
  createdBundledHighlighter,
} from '@codelexjs/core'
import { createOnigurumaEngine } from '@codelexjs/engine-oniguruma'

const bundledLanguages = {
  javascript: () => import('@codelexjs/langs/javascript'),
  js: () => import('@codelexjs/langs/javascript'),
  typescript: () => import('@codelexjs/langs/typescript'),
  ts: () => import('@codelexjs/langs/typescript'),
  tsx: () => import('@codelexjs/langs/tsx'),
}

const bundledThemes = {
  nord: () => import('@codelexjs/themes/nord'),
  'vitesse-dark': () => import('@codelexjs/themes/vitesse-dark'),
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
