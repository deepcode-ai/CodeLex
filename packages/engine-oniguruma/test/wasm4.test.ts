import { createHighlighterCore } from '@codelexjs/core'
import js from '@codelexjs/langs/js'
import nord from '@codelexjs/themes/nord'
import { expect, it } from 'vitest'

// eslint-disable-next-line antfu/no-import-dist
import { wasmBinary } from '../dist/wasm-inlined.mjs'
import { createOnigurumaEngine } from '../src/index'

it('wasm', async () => {
  const codelex = await createHighlighterCore({
    themes: [nord],
    langs: [js as any],
    engine: createOnigurumaEngine(Promise.resolve().then(() => obj => WebAssembly.instantiate(wasmBinary, obj).then(r => r.instance))),
  })

  expect(codelex.codeToHtml('1 + 1', { lang: 'javascript', theme: 'nord' }))
    .toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#B48EAD">1</span><span style="color:#81A1C1"> +</span><span style="color:#B48EAD"> 1</span></span></code></pre>"`)
})
