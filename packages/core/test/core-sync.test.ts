import { createJavaScriptRegexEngine } from '@codelex/engine-javascript'
import js from '@codelex/langs/javascript'
import nord from '@codelex/themes/nord'
import { describe, expect, it } from 'vitest'
import { createHighlighterCoreSync } from '../src'

describe('should', () => {
  const engine = createJavaScriptRegexEngine()

  it('works', () => {
    using codelex = createHighlighterCoreSync({
      themes: [nord],
      langs: [js],
      engine,
    })

    expect(codelex.codeToHtml('console.log("Hi")', { lang: 'javascript', theme: 'nord' }))
      .toMatchInlineSnapshot(`"<pre class="codelex nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#D8DEE9">console</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">log</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Hi</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF">)</span></span></code></pre>"`)
  })

  it('dynamic load sync theme and lang', async () => {
    using codelex = createHighlighterCoreSync({
      themes: [nord],
      langs: [
        js,
        // Load the grammar upfront (await outside of the function)
        await import('@codelex/langs/c').then(r => r.default),
      ],
      engine,
    })

    codelex.loadLanguageSync(await import('@codelex/langs/python').then(m => m.default))
    codelex.loadThemeSync(await import('@codelex/themes/vitesse-light').then(m => m.default))

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
})
