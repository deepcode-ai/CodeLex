import { createHighlighter } from 'codelex'
import { expect, it } from 'vitest'
import { transformerRenderWhitespace } from '../src/transformers/render-whitespace'

it('transformerRenderWhitespace', async () => {
  using codelex = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light', 'nord'],
    langs: ['typescript'],
  })

  const transformer = transformerRenderWhitespace()

  const code = `
    const a = Math.random() > 0.5 ? 1 : \`foo\`
  `.trim()

  const result = codelex.codeToHtml(code, {
    lang: 'typescript',
    themes: {
      dark: 'vitesse-dark',
      light: 'vitesse-light',
      nord: 'nord',
    },
    defaultColor: false,
    transformers: [transformer],
    structure: 'inline',
  })

  expect(result.replace(/<span/g, '\n<span'))
    .toMatchInlineSnapshot(`
      "
      <span style="--codelex-dark:#CB7676;--codelex-light:#AB5959;--codelex-nord:#81A1C1">const</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#BD976A;--codelex-light:#B07D48;--codelex-nord:#D8DEE9">a</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#666666;--codelex-light:#999999;--codelex-nord:#81A1C1">=</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#BD976A;--codelex-light:#B07D48;--codelex-nord:#D8DEE9">Math</span>
      <span style="--codelex-dark:#666666;--codelex-light:#999999;--codelex-nord:#ECEFF4">.</span>
      <span style="--codelex-dark:#80A665;--codelex-light:#59873A;--codelex-nord:#88C0D0">random</span>
      <span style="--codelex-dark:#666666;--codelex-light:#999999;--codelex-nord:#D8DEE9FF">()</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#666666;--codelex-light:#999999;--codelex-nord:#81A1C1">></span>
      <span class="space"> </span>
      <span style="--codelex-dark:#4C9A91;--codelex-light:#2F798A;--codelex-nord:#B48EAD">0.5</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#CB7676;--codelex-light:#AB5959;--codelex-nord:#81A1C1">?</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#4C9A91;--codelex-light:#2F798A;--codelex-nord:#B48EAD">1</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#CB7676;--codelex-light:#AB5959;--codelex-nord:#81A1C1">:</span>
      <span class="space"> </span>
      <span style="--codelex-dark:#C98A7D77;--codelex-light:#B5695977;--codelex-nord:#ECEFF4">\`</span>
      <span style="--codelex-dark:#C98A7D;--codelex-light:#B56959;--codelex-nord:#A3BE8C">foo</span>
      <span style="--codelex-dark:#C98A7D77;--codelex-light:#B5695977;--codelex-nord:#ECEFF4">\`</span>"
    `)
})
