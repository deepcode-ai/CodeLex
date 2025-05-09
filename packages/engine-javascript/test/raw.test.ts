import { createHighlighterCore } from '@codelex/core'
import { expect, it } from 'vitest'
import { createJavaScriptRawEngine } from '../src/engine-raw'

// Only run this test on Node.js 20+
it.runIf(
  process.version.replace(/^v/, '').split('.').map(Number)[0] >= 20,
)('work with precompile grammar', async () => {
  const codelex = await createHighlighterCore({
    themes: [
      import('@codelex/themes/vitesse-light'),
    ],
    langs: [
      import('@codelex/langs-precompiled/js'),
    ],
    engine: createJavaScriptRawEngine(),
  })

  expect(
    codelex.codeToHtml('console.log', { lang: 'js', theme: 'vitesse-light' }),
  )
    .toMatchInlineSnapshot(`"<pre class="codelex vitesse-light" style="background-color:#ffffff;color:#393a34" tabindex="0"><code><span class="line"><span style="color:#B07D48">console</span><span style="color:#999999">.</span><span style="color:#B07D48">log</span></span></code></pre>"`)
})
