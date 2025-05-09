import { codeToHtml, createCodelexInternal } from '@codelexjs/core'
import { createJavaScriptRawEngine } from '@codelexjs/engine-javascript/raw'

const codelex = createCodelexInternal(
  {
    langs: [
      import('@codelexjs/langs-precompiled/ts'),
    ],
    themes: [
      import('@codelexjs/themes/vitesse-dark'),
    ],
    engine: createJavaScriptRawEngine(),
  },
)

export async function highlight(code: string): Promise<string> {
  return codeToHtml(await codelex, code, { lang: 'ts', theme: 'vitesse-dark' })
}
