import { createJavaScriptRegexEngine, createOnigurumaEngine, getSingletonHighlighter } from 'codelex'
import { expect, it } from 'vitest'
import { getSingletonHighlighterCore } from '../src/core'
import js from '../src/langs/javascript.mjs'
import mtp from '../src/themes/material-theme-palenight.mjs'
import nord from '../src/themes/nord.mjs'

it('getSingletonHighlighterCore', async () => {
  const codelex1 = await getSingletonHighlighterCore({
    themes: [nord],
    langs: [js as any],
    engine: createOnigurumaEngine(import('@codelexjs/engine-oniguruma/wasm-inlined')),
  })

  expect(codelex1.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'nord' }))
    .toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#D8DEE9">console</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">log</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Hi</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF">)</span></span></code></pre>"`)

  const codelex2 = await getSingletonHighlighterCore({
    themes: [mtp],
    engine: createJavaScriptRegexEngine(),
  })

  expect(codelex1).toBe(codelex2)

  expect(codelex2.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'material-theme-palenight' }))
    .toMatchInlineSnapshot(`"<pre class="codelex material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#BABED8">console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D">Hi</span><span style="color:#89DDFF">"</span><span style="color:#BABED8">)</span></span></code></pre>"`)
})

it('getSingletonHighlighter', async () => {
  const codelex1 = await getSingletonHighlighter({
    themes: ['nord'],
    langs: ['javascript'],
  })

  expect(codelex1.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'nord' }))
    .toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#D8DEE9">console</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">log</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Hi</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF">)</span></span></code></pre>"`)

  const codelex2 = await getSingletonHighlighter({
    themes: ['material-theme-palenight'],
  })

  expect(codelex1).toBe(codelex2)

  expect(codelex2.getLoadedThemes())
    .toMatchInlineSnapshot(`
      [
        "nord",
        "material-theme-palenight",
      ]
    `)

  expect(codelex2.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'material-theme-palenight' }))
    .toMatchInlineSnapshot(`"<pre class="codelex material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#BABED8">console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D">Hi</span><span style="color:#89DDFF">"</span><span style="color:#BABED8">)</span></span></code></pre>"`)
})
