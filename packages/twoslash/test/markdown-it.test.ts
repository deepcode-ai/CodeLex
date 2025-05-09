import Codelex from '@codelex/markdown-it'
import { transformerMetaHighlight } from '@codelex/transformers'
import { rendererRich, transformerTwoslash } from '@codelex/twoslash'
import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

const styleTag = `
<link rel="stylesheet" href="../../../style-rich.css" />
<style>
.dark .codelex,
.dark .codelex span {
  color: var(--codelex-dark, inherit);
  background-color: var(--codelex-dark-bg, inherit);
  --twoslash-popup-bg: var(--codelex-dark-bg, inherit);
}

html:not(.dark) .codelex,
html:not(.dark) .codelex span {
  color: var(--codelex-light, inherit);
  background-color: var(--codelex-light-bg, inherit);
  --twoslash-popup-bg: var(--codelex-light-bg, inherit);
}
</style>
`

describe('markdown-it', () => {
  it('works', async () => {
    const md = MarkdownIt()

    md.use(await Codelex({
      langs: ['ts'],
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      defaultColor: false,
      transformers: [
        transformerTwoslash({
          explicitTrigger: true,
          renderer: rendererRich(),
        }),
      ],
    }))

    const html = md.render(`
# Hello

Code block with twoslash:

\`\`\`ts twoslash
const a = 123
//    ^?
\`\`\`

Code block without twoslash:

\`\`\`ts
const a = 123
//    ^?
\`\`\`
    `.trim())

    await expect(styleTag + html).toMatchFileSnapshot('./out/markdown-it/works.html')
  })

  it('with highlight lines', async () => {
    const md = MarkdownIt()

    md.use(await Codelex({
      langs: ['ts'],
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      defaultColor: false,
      transformers: [
        transformerMetaHighlight(),
        transformerTwoslash({
          explicitTrigger: true,
          renderer: rendererRich(),
        }),
      ],
    }))

    const html = md.render(`
# Hello

\`\`\`ts {1,3} twoslash
const a = 123
const b = 123
const v = 123
//    ^?
\`\`\`

\`\`\`ts twoslash {2}
const a = 123
const b = 123
const v = 123
//    ^?
\`\`\`
    `.trim())

    await expect(styleTag + html).toMatchFileSnapshot('./out/markdown-it/highlight-lines.html')
  })

  it('with disable triggers', async () => {
    const md = MarkdownIt()

    md.use(await Codelex({
      langs: ['ts'],
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      defaultColor: false,
      transformers: [
        transformerMetaHighlight(),
        transformerTwoslash({
          explicitTrigger: false,
          renderer: rendererRich(),
        }),
      ],
    }))

    const html = md.render(`
# Hello

\`\`\`ts {1,3}
const a = 123
const b = 123
const v = 123
//    ^?
\`\`\`

\`\`\`ts no-twoslash {2}
const a = 123
const b = 123
const v = 123
//    ^?
\`\`\`
    `.trim())

    await expect(styleTag + html).toMatchFileSnapshot('./out/markdown-it/highlight-disable-triggers.html')
  })
})
