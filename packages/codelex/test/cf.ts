import type { LanguageRegistration } from '@codelexjs/types'
import { createOnigurumaEngine } from '@codelexjs/engine-oniguruma'
import js from '@codelexjs/langs/javascript'
import nord from '@codelexjs/themes/nord'

import { createHighlighterCore } from 'codelex/core'
// @ts-expect-error no types
// eslint-disable-next-line antfu/no-import-dist
import wasm from '../dist/onig.wasm'

export default {
  async fetch() {
    const highlighter = await createHighlighterCore({
      themes: [nord],
      langs: [js as LanguageRegistration[]],
      // cloudflare also supports dynamic import
      // engine: createOnigurumaEngine(import('codelex/onig.wasm')),
      engine: createOnigurumaEngine(wasm),
    })

    return new Response(
      highlighter.codeToHtml('console.log(\'codelex\');', { lang: 'js', theme: 'nord' }),
      {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      },
    )
  },
}
