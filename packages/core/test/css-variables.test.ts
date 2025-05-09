import { createJavaScriptRegexEngine } from '@codelexjs/engine-javascript'
import { codeToHtml } from 'codelex/bundle/full'
import { describe, expect, it } from 'vitest'
import { createCssVariablesTheme, createHighlighterCore } from '../src'

describe('css-variables', () => {
  it('theme auto-patch', async () => {
    using codelex = await createHighlighterCore({
      themes: [
        Object.freeze({
          name: 'my-css-variables',
          bg: 'var(--bg)',
          fg: 'var(--fg)',
          settings: [
            {
              scope: 'keyword',
              settings: {
                foreground: 'var(--keyword)',
              },
            },
            {
              scope: [
                'string',
              ],
              settings: {
                foreground: 'var(--string)',
              },
            },
          ],
        }),
      ],
      langs: [
        import('@codelexjs/langs/js'),
      ],
      engine: createJavaScriptRegexEngine(),
    })

    const theme = codelex.getTheme('my-css-variables')

    expect(theme).toMatchInlineSnapshot(`
      {
        "bg": "var(--bg)",
        "colorReplacements": {
          "#00000001": "var(--fg)",
          "#00000002": "var(--bg)",
          "#00000003": "var(--keyword)",
          "#00000004": "var(--string)",
        },
        "fg": "var(--fg)",
        "name": "my-css-variables",
        "settings": [
          {
            "settings": {
              "background": "#00000002",
              "foreground": "#00000001",
            },
          },
          {
            "scope": "keyword",
            "settings": {
              "foreground": "#00000003",
            },
          },
          {
            "scope": [
              "string",
            ],
            "settings": {
              "foreground": "#00000004",
            },
          },
        ],
        "type": "dark",
      }
    `)

    expect(codelex.codeToHtml('if ("Hello") {}', { lang: 'js', theme: 'my-css-variables' }))
      .toMatchInlineSnapshot(`"<pre class="codelex my-css-variables" style="background-color:var(--bg);color:var(--fg)" tabindex="0"><code><span class="line"><span style="color:var(--keyword)">if</span><span style="color:var(--fg)"> (</span><span style="color:var(--string)">"Hello"</span><span style="color:var(--fg)">) {}</span></span></code></pre>"`)

    expect(codelex.codeToHtml('if ("Hello") {}', {
      lang: 'js',
      theme: 'my-css-variables',
      colorReplacements: {
        '#00000003': 'var(--keyword-override)',
      },
    }))
      .toMatchInlineSnapshot(`"<pre class="codelex my-css-variables" style="background-color:var(--bg);color:var(--fg)" tabindex="0"><code><span class="line"><span style="color:var(--keyword-override)">if</span><span style="color:var(--fg)"> (</span><span style="color:var(--string)">"Hello"</span><span style="color:var(--fg)">) {}</span></span></code></pre>"`)
  })

  it('css-variable-factory', async () => {
    const theme = createCssVariablesTheme({
      variablePrefix: '--my-',
      variableDefaults: {
        background: '#000',
      },
    })

    const html = await codeToHtml('const a = 1', {
      lang: 'js',
      theme,
    })

    expect(html)
      .toMatchInlineSnapshot(`"<pre class="codelex css-variables" style="background-color:var(--my-background, #000);color:var(--my-foreground)" tabindex="0"><code><span class="line"><span style="color:var(--my-token-keyword)">const</span><span style="color:var(--my-token-constant)"> a</span><span style="color:var(--my-token-keyword)"> =</span><span style="color:var(--my-token-constant)"> 1</span></span></code></pre>"`)
  })

  it('css-variable-factory 2', async () => {
    const theme = createCssVariablesTheme({
      name: 'foo',
      variableDefaults: {
        background: '#000',
      },
      fontStyle: false,
    })

    const html = await codeToHtml('const a = 1', {
      lang: 'js',
      theme,
    })

    expect(html)
      .toMatchInlineSnapshot(`"<pre class="codelex foo" style="background-color:var(--codelex-background, #000);color:var(--codelex-foreground)" tabindex="0"><code><span class="line"><span style="color:var(--codelex-token-keyword)">const</span><span style="color:var(--codelex-token-constant)"> a</span><span style="color:var(--codelex-token-keyword)"> =</span><span style="color:var(--codelex-token-constant)"> 1</span></span></code></pre>"`)
  })
})
