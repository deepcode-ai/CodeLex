import { codeToHtml, createCodelexInternal } from '@codelexjs/core'
import { createOnigurumaEngine } from '@codelexjs/engine-oniguruma'

const codelex = createCodelexInternal(
  {
    langs: [
      import('@codelexjs/langs/ts'),
    ],
    themes: [
      import('@codelexjs/themes/vitesse-dark'),
    ],
    engine: createOnigurumaEngine(import('@codelexjs/engine-oniguruma/wasm-inlined')),
  },
)

export async function highlight(code: string): Promise<string> {
  return codeToHtml(await codelex, code, { lang: 'ts', theme: 'vitesse-dark' })
}
