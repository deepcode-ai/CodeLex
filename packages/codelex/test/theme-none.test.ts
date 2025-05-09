import { describe, expect, it } from 'vitest'
import { createHighlighter } from '../src'

describe('none theme', () => {
  it('works', async () => {
    using codelex = await createHighlighter({
      themes: ['vitesse-light'],
      langs: ['javascript'],
    })

    expect(codelex.codeToHtml('console.log', { lang: 'js', theme: 'none' }))
      .toMatchInlineSnapshot(`"<pre class="codelex none" style="background-color:;color:" tabindex="0"><code><span class="line"><span>console.log</span></span></code></pre>"`)
  })

  it('multiple-themes', async () => {
    using codelex = await createHighlighter({
      themes: ['vitesse-light'],
      langs: ['javascript', 'ts'],
    })

    expect(codelex.codeToHtml('console.log', {
      lang: 'ts',
      themes: {
        light: 'vitesse-light',
        dark: 'none',
      },
    }))
      .toMatchInlineSnapshot(`"<pre class="codelex codelex-themes vitesse-light none" style="background-color:#ffffff;--codelex-dark-bg:inherit;color:#393a34;--codelex-dark:inherit" tabindex="0"><code><span class="line"><span style="color:#B07D48;--codelex-dark:inherit">console</span><span style="color:#999999;--codelex-dark:inherit">.</span><span style="color:#B07D48;--codelex-dark:inherit">log</span></span></code></pre>"`)
  })
})
