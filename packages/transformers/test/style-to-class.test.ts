import { createHighlighter } from 'codelex'
import { expect, it } from 'vitest'
import { transformerStyleToClass } from '../src/transformers/style-to-class'

it('transformerStyleToClass', async () => {
  using codelex = await createHighlighter({
    themes: ['vitesse-dark', 'vitesse-light', 'nord'],
    langs: ['typescript'],
  })

  const transformer = transformerStyleToClass()

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
  })

  expect(result.replace(/<span/g, '\n<span'))
    .toMatchInlineSnapshot(`
      "<pre class="codelex codelex-themes vitesse-dark vitesse-light nord __codelex_uywmyh" tabindex="0"><code>
      <span class="line">
      <span class="__codelex_223nhr">const</span>
      <span class="__codelex_u5wfov"> a</span>
      <span class="__codelex_26darv"> =</span>
      <span class="__codelex_u5wfov"> Math</span>
      <span class="__codelex_17lqoe">.</span>
      <span class="__codelex_6u0ar0">random</span>
      <span class="__codelex_k92bfk">()</span>
      <span class="__codelex_26darv"> ></span>
      <span class="__codelex_1328cg"> 0.5</span>
      <span class="__codelex_223nhr"> ?</span>
      <span class="__codelex_1328cg"> 1</span>
      <span class="__codelex_223nhr"> :</span>
      <span class="__codelex_ga6n9x"> \`</span>
      <span class="__codelex_23isjw">foo</span>
      <span class="__codelex_ga6n9x">\`</span></span></code></pre>"
    `)

  expect(transformer.getCSS()).toMatchInlineSnapshot(`".__codelex_223nhr{--codelex-dark:#CB7676;--codelex-light:#AB5959;--codelex-nord:#81A1C1}.__codelex_u5wfov{--codelex-dark:#BD976A;--codelex-light:#B07D48;--codelex-nord:#D8DEE9}.__codelex_26darv{--codelex-dark:#666666;--codelex-light:#999999;--codelex-nord:#81A1C1}.__codelex_17lqoe{--codelex-dark:#666666;--codelex-light:#999999;--codelex-nord:#ECEFF4}.__codelex_6u0ar0{--codelex-dark:#80A665;--codelex-light:#59873A;--codelex-nord:#88C0D0}.__codelex_k92bfk{--codelex-dark:#666666;--codelex-light:#999999;--codelex-nord:#D8DEE9FF}.__codelex_1328cg{--codelex-dark:#4C9A91;--codelex-light:#2F798A;--codelex-nord:#B48EAD}.__codelex_ga6n9x{--codelex-dark:#C98A7D77;--codelex-light:#B5695977;--codelex-nord:#ECEFF4}.__codelex_23isjw{--codelex-dark:#C98A7D;--codelex-light:#B56959;--codelex-nord:#A3BE8C}.__codelex_uywmyh{--codelex-dark:#dbd7caee;--codelex-light:#393a34;--codelex-nord:#d8dee9ff;--codelex-dark-bg:#121212;--codelex-light-bg:#ffffff;--codelex-nord-bg:#2e3440ff}"`)
})
