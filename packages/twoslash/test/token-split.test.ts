import type { Node } from 'hast'
import { transformerTwoslash } from '@codelex/twoslash'
import { codeToHast, codeToTokensBase } from 'codelex'
import { visit } from 'unist-util-visit'
import { expect, it } from 'vitest'

const code = `import { ref, computed } from "vue"`

it('verify theme behavior', async () => {
  const tokens = await codeToTokensBase(code, {
    lang: 'ts',
    theme: 'min-dark',
  })

  // `min-dark` is less fine-grained, so that the import statement is a single token
  expect
    .soft(tokens.find(i => i.find(j => j.content === ' { ref')))
    .toBeDefined()
  expect
    .soft(tokens.find(i => i.find(j => j.content === 'ref')))
    .not
    .toBeDefined()
})

it('should split tokens correctly', async () => {
  const hast = await codeToHast(code, {
    lang: 'ts',
    theme: 'min-dark',
    transformers: [
      transformerTwoslash(),
    ],
  })

  let found: Node | undefined
  visit(hast, 'text', (node) => {
    if (node.value === 'ref')
      found = node
  })
  expect(found).toBeDefined()

  found = undefined
  visit(hast, 'text', (node) => {
    if (node.value === 'computed')
      found = node
  })
  expect(found).toBeDefined()
})
