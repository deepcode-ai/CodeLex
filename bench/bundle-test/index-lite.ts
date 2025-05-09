import { codeToHtml, createCodelexInternal } from '@codelex/core'
import { createJavaScriptRawEngine } from '@codelex/engine-javascript/raw'

const codelex = createCodelexInternal(
  {
    langs: [
      import('@codelex/langs-precompiled/ts'),
    ],
    themes: [
      import('@codelex/themes/vitesse-dark'),
    ],
    engine: createJavaScriptRawEngine(),
  },
)

export async function highlight(code: string): Promise<string> {
  return codeToHtml(await codelex, code, { lang: 'ts', theme: 'vitesse-dark' })
}
