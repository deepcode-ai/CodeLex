import { createJavaScriptRegexEngine } from '@codelex/engine-javascript'
import { expect, it } from 'vitest'
import { createHighlighterCore } from '../src'

it('transformers tokens', async () => {
  using codelex = await createHighlighterCore({
    themes: [
      import('@codelex/themes/vitesse-light'),
    ],
    langs: [
      import('@codelex/langs/javascript'),
    ],
    engine: createJavaScriptRegexEngine(),
  })

  expect(codelex.codeToHtml('console.log', {
    lang: 'js',
    theme: 'vitesse-light',
    transformers: [
      {
        name: 'test',
        tokens(tokens) {
          for (const line of tokens) {
            for (const token of line) {
              token.htmlAttrs = { class: 'test' }
              if (typeof token.htmlStyle !== 'string') {
                token.htmlStyle ||= {}
                token.htmlStyle.display = 'block'
              }
            }
          }
          return tokens
        },
      },
    ],
  }))
    .toMatchInlineSnapshot(`"<pre class="codelex vitesse-light" style="background-color:#ffffff;color:#393a34" tabindex="0"><code><span class="line"><span class="test" style="display:block">console</span><span class="test" style="display:block">.</span><span class="test" style="display:block">log</span></span></code></pre>"`)
})
