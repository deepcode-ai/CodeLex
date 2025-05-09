import { codeToHtml, createCodelexInternal } from '@codelex/core'
import { createOnigurumaEngine } from '@codelex/engine-oniguruma'

const codelex = createCodelexInternal(
  {
    langs: [
      import('@codelex/langs/ts'),
    ],
    themes: [
      import('@codelex/themes/vitesse-dark'),
    ],
    engine: createOnigurumaEngine(import('@codelex/engine-oniguruma/wasm-inlined')),
  },
)

export async function highlight(code: string): Promise<string> {
  return codeToHtml(await codelex, code, { lang: 'ts', theme: 'vitesse-dark' })
}
