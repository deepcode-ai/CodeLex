import { expect, it } from 'vitest'

it('bundle-full', async () => {
  const highlighter = await import('codelex/bundle/full').then(r => r.createHighlighter({
    langs: Object.keys(r.bundledLanguages),
    themes: [],
  }))

  expect(highlighter.getLoadedLanguages().length)
    .toMatchInlineSnapshot(`322`)
})

it('bundle-web', async () => {
  const highlighter = await import('codelex/bundle/web').then(r => r.createHighlighter({
    langs: Object.keys(r.bundledLanguages),
    themes: [],
  }))

  expect(highlighter.getLoadedLanguages().length)
    .toMatchInlineSnapshot(`88`)
})
