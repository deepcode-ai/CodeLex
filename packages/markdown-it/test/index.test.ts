import fs from 'node:fs/promises'
import { transformerMetaHighlight } from '@codelex/transformers'
import MarkdownIt from 'markdown-it'
import { createHighlighter } from 'codelex'
import { expect, it } from 'vitest'
import Codelex from '../src'
import { fromHighlighter } from '../src/core'

it('run for base', { timeout: 10_000 }, async () => {
  const md = MarkdownIt()
  using codelex = await createHighlighter({
    langs: ['js'],
    themes: ['vitesse-light', 'vitesse-dark'],
  })
  md.use(fromHighlighter(codelex, {
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    transformers: [
      transformerMetaHighlight(),
    ],
  }))

  const result = md.render(await fs.readFile(new URL('./fixtures/a.md', import.meta.url), 'utf-8'))

  await expect(result).toMatchFileSnapshot('./fixtures/a.out.html')
})

it('run for fallback language', { timeout: 10_000 }, async () => {
  const md = MarkdownIt()
  md.use(await Codelex({
    langs: ['js'],
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    fallbackLanguage: 'js',
    transformers: [
      transformerMetaHighlight(),
    ],
  }))

  const result = md.render(await fs.readFile(new URL('./fixtures/b.md', import.meta.url), 'utf-8'))

  await expect(result).toMatchFileSnapshot('./fixtures/b.out.html')
})

it('run for default language', { timeout: 10_000 }, async () => {
  const md = MarkdownIt()
  md.use(await Codelex({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    langs: ['js', 'ts'],
    defaultLanguage: 'js',
    transformers: [
      transformerMetaHighlight(),
    ],
  }))

  const result = md.render(await fs.readFile(new URL('./fixtures/c.md', import.meta.url), 'utf-8'))

  await expect(result).toMatchFileSnapshot('./fixtures/c.out.html')
})
