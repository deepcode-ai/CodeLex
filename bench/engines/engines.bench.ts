/* eslint-disable no-console */
import type { BundledLanguage } from 'codelex'
import type { ReportItem } from '../../scripts/report-engine-js-compat'
import fs from 'node:fs/promises'
import { createJavaScriptRawEngine, createJavaScriptRegexEngine } from '@codelexjs/engine-javascript'
import { createHighlighter, createOnigurumaEngine } from 'codelex'
import { bench, describe } from 'vitest'

const js = createJavaScriptRegexEngine()
const jsRaw = createJavaScriptRawEngine()
const wasm = await createOnigurumaEngine(() => import('codelex/wasm'))

const RANGE = [0, 20]

// Run `npx jiti scripts/report-engine-js-compat.ts` to generate the report first
const report = await fs.readFile(new URL('../../scripts/report-engine-js-compat.json', import.meta.url), 'utf-8').then(JSON.parse) as ReportItem[]
const langs = report.filter(i => i.highlightMatch === true).map(i => i.lang).slice(...RANGE) as BundledLanguage[]
// Clone https://github.com/deepcode-ai/textmate-grammars-themes to `../tm-grammars-themes`
const samples = await Promise.all(langs.map(lang => fs.readFile(new URL(`../../tm-grammars-themes/samples/${lang}.sample`, import.meta.url), 'utf-8')))

console.log('Benchmarking engines with', langs.length, 'languages')

const codelexJs = await createHighlighter({
  langs,
  themes: ['vitesse-dark'],
  engine: js,
})

const codelexWasm = await createHighlighter({
  langs,
  themes: ['vitesse-dark'],
  engine: wasm,
})

const codelexJsPrecompiled = await createHighlighter({
  langs: await Promise.all(langs.map(lang => import(`@codelexjs/langs-precompiled/${lang}`))),
  themes: ['vitesse-dark'],
  engine: jsRaw,
})

for (const lang of langs) {
  describe(lang, () => {
    const code = samples[langs.indexOf(lang)]

    bench('js', () => {
      codelexJs.codeToTokensBase(code, { lang, theme: 'vitesse-dark' })
    })

    bench('js-precompiled', () => {
      codelexJsPrecompiled.codeToTokensBase(code, { lang, theme: 'vitesse-dark' })
    })

    bench('wasm', () => {
      codelexWasm.codeToTokensBase(code, { lang, theme: 'vitesse-dark' })
    })
  })
}
