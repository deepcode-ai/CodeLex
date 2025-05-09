import { createJavaScriptRegexEngine } from '@codelexjs/engine-javascript'
import { createOnigurumaEngine } from '@codelexjs/engine-oniguruma'

import { wasmBinary } from '@codelexjs/engine-oniguruma/wasm-inlined'
import js from '@codelexjs/langs/javascript'
import ts from '@codelexjs/langs/typescript'
import mtp from '@codelexjs/themes/material-theme-palenight'
import nord from '@codelexjs/themes/nord'
import { describe, expect, it } from 'vitest'
import { createHighlighterCore } from '../src'

describe('should', () => {
  it('works', async () => {
    using codelex = await createHighlighterCore({
      themes: [nord],
      langs: [js],
      engine: createOnigurumaEngine({
        instantiator: obj => WebAssembly.instantiate(wasmBinary, obj),
      }),
    })

    expect(codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'nord' }))
      .toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#D8DEE9">console</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">log</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Hi</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF">)</span></span></code></pre>"`)
  })

  it('dynamic load theme and lang', async () => {
    using codelex = await createHighlighterCore({
      themes: [nord],
      langs: [
        js,
        import('@codelexjs/langs/c'),
      ],
      engine: createOnigurumaEngine({
        // https://github.com/WebAssembly/esm-integration/tree/main/proposals/esm-integration
        instantiator: obj => WebAssembly.instantiate(wasmBinary, obj).then(r => r.instance.exports),
      }),
    })

    await codelex.loadLanguage(() => import('@codelexjs/langs/python'))
    await codelex.loadTheme(() => import('@codelexjs/themes/vitesse-light').then(m => m.default))

    expect(codelex.getLoadedLanguages())
      .toMatchInlineSnapshot(`
        [
          "javascript",
          "c",
          "python",
          "js",
          "py",
        ]
      `)
    expect(codelex.getLoadedThemes())
      .toMatchInlineSnapshot(`
        [
          "nord",
          "vitesse-light",
        ]
      `)

    expect(codelex.codeToHtml('print 1', { lang: 'python', theme: 'vitesse-light' }))
      .toMatchInlineSnapshot(`"<pre class="codelex vitesse-light" style="background-color:#ffffff;color:#393a34" tabindex="0"><code><span class="line"><span style="color:#998418">print</span><span style="color:#2F798A"> 1</span></span></code></pre>"`)
  })

  it('requires nested lang', async () => {
    using codelex = await createHighlighterCore({
      themes: [nord],
      langs: [
        import('@codelexjs/langs/cpp'),
      ],
      engine: createJavaScriptRegexEngine(),
    })

    expect(codelex.getLoadedLanguages().sort())
      .toMatchInlineSnapshot(`
        [
          "c",
          "c++",
          "cpp",
          "cpp-macro",
          "glsl",
          "regex",
          "regexp",
          "sql",
        ]
      `)
  })

  it('works without no initial langs and themes', async () => {
    using codelex = await createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
    })

    await codelex.loadLanguage(js)
    await codelex.loadTheme(nord)

    const code = codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'nord' })

    expect(code).toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#D8DEE9">console</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">log</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Hi</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF">)</span></span></code></pre>"`)
  })

  it('works with alias', async () => {
    using codelex = await createHighlighterCore({
      langAlias: {
        mylang: 'javascript',
        mylang2: 'js', // nested alias
      },
      engine: createJavaScriptRegexEngine(),
    })

    await codelex.loadLanguage(js)
    await codelex.loadTheme(nord)

    const code = codelex.codeToHtml('console.log("Hi")', { lang: 'mylang', theme: 'nord' })
    const code2 = codelex.codeToHtml('console.log("Hi")', { lang: 'mylang2', theme: 'nord' })
    expect(code).toBe(code2)
    expect(code).toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#D8DEE9">console</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">log</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Hi</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF">)</span></span></code></pre>"`)
  })

  it('works with alias override', async () => {
    using codelex = await createHighlighterCore({
      langAlias: {
        js: 'typescript',
      },
      engine: createJavaScriptRegexEngine(),
    })

    await codelex.loadLanguage(ts)
    await codelex.loadTheme(nord)

    const code = codelex.codeToHtml('const a: Foo = 1', { lang: 'js', theme: 'nord' })
    expect(code).toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#81A1C1">const</span><span style="color:#D8DEE9"> a</span><span style="color:#81A1C1">:</span><span style="color:#8FBCBB"> Foo</span><span style="color:#81A1C1"> =</span><span style="color:#B48EAD"> 1</span></span></code></pre>"`)
  })
})

describe('errors', () => {
  it('throw on invalid theme', async () => {
    using codelex = await createHighlighterCore({
      themes: [nord],
      langs: [js as any],
      engine: createJavaScriptRegexEngine(),
    })

    await expect(() => codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'invalid' }))
      .toThrowErrorMatchingInlineSnapshot(`[CodelexError: Theme \`invalid\` not found, you may need to load it first]`)
  })

  it('throw on invalid lang', async () => {
    using codelex = await createHighlighterCore({
      themes: [nord],
      langs: [js as any],
      engine: createJavaScriptRegexEngine(),
    })

    await expect(() => codelex.codeToHtml('console.log("Hi")', { lang: 'abc', theme: 'nord' }))
      .toThrowErrorMatchingInlineSnapshot(`[CodelexError: Language \`abc\` not found, you may need to load it first]`)
  })

  it('highlight with raw theme registation', async () => {
    using codelex = await createHighlighterCore({
      themes: [nord],
      langs: [js as any],
      engine: createOnigurumaEngine({
        instantiator: obj => WebAssembly.instantiate(wasmBinary, obj),
      }),
    })

    const code = codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: mtp })

    expect
      .soft(code)
      .toMatchInlineSnapshot(`"<pre class="codelex material-theme-palenight" style="background-color:#292D3E;color:#babed8" tabindex="0"><code><span class="line"><span style="color:#BABED8">console</span><span style="color:#89DDFF">.</span><span style="color:#82AAFF">log</span><span style="color:#BABED8">(</span><span style="color:#89DDFF">"</span><span style="color:#C3E88D">Hi</span><span style="color:#89DDFF">"</span><span style="color:#BABED8">)</span></span></code></pre>"`)

    expect.soft(codelex.getLoadedThemes()).toContain('material-theme-palenight')

    const code2 = codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'material-theme-palenight' })
    expect.soft(code2).toBe(code)
  })

  it('throw on circular alias', async () => {
    using codelex = await createHighlighterCore({
      langAlias: {
        mylang: 'mylang2',
        mylang2: 'mylang',
      },
      engine: createJavaScriptRegexEngine(),
    })

    await codelex.loadLanguage(js)
    await codelex.loadTheme(nord)

    await expect(() => codelex.codeToHtml('console.log("Hi")', { lang: 'mylang', theme: 'nord' }))
      .toThrowErrorMatchingInlineSnapshot(`[CodelexError: Circular alias \`mylang -> mylang2 -> mylang\`]`)
  })

  it('throw on using disposed instance', async () => {
    using codelex = await createHighlighterCore({
      themes: [nord],
      langs: [js],
      engine: createJavaScriptRegexEngine(),
    })

    expect(codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'nord' }))
      .toContain('console')

    codelex.dispose()

    expect(() => codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'nord' }))
      .toThrowErrorMatchingInlineSnapshot(`[CodelexError: Codelex instance has been disposed]`)
  })
})
