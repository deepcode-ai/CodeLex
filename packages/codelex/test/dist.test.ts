import { expect, it } from 'vitest'
// eslint-disable-next-line antfu/no-import-dist
import { createHighlighter } from '../dist/index.mjs'

it('should works', async () => {
  using codelex = await createHighlighter({
    themes: ['vitesse-light'],
    langs: ['javascript'],
  })

  expect(codelex.codeToHtml('console.log', { lang: 'js', theme: 'vitesse-light' }))
    .toMatchInlineSnapshot(`"<pre class="codelex vitesse-light" style="background-color:#ffffff;color:#393a34" tabindex="0"><code><span class="line"><span style="color:#B07D48">console</span><span style="color:#999999">.</span><span style="color:#B07D48">log</span></span></code></pre>"`)
})
