---
outline: deep
---

# @codelex/rehype

<Badges name="@codelex/rehype" />

[rehype](https://github.com/rehypejs/rehype) plugin for Codelex.

## Install

::: code-group

```sh [npm]
npm i -D @codelex/rehype
```

```sh [yarn]
yarn add -D @codelex/rehype
```

```sh [pnpm]
pnpm add -D @codelex/rehype
```

```sh [bun]
bun add -D @codelex/rehype
```

:::

## Usage

```ts twoslash
// @noErrors: true
import rehypeCodelex from '@codelex/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeCodelex, {
    // or `theme` for a single theme
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .process(await fs.readFile('./input.md'))
```

The default export of `@codelex/rehype` uses a shared instance of `codelex` from `getSingletonHighlighter`, which will persist across processes. If you want full control over the highlighter lifecycle, use [Fine-grained Bundle `@codelex/rehype/core`](#fine-grained-bundle) instead.

## Fine-grained Bundle

By default, the full bundle of `codelex` will be imported. If you are using a [fine-grained bundle](/guide/bundles#fine-grained-bundle), you can import `rehypeCodelexFromHighlighter` from `@codelex/rehype/core` and pass your own highlighter:

```ts twoslash
// @noErrors: true
import rehypeCodelexFromHighlighter from '@codelex/rehype/core'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { createHighlighterCore } from 'codelex/core'
import { createOnigurumaEngine } from 'codelex/engine/oniguruma'

import { unified } from 'unified'

const highlighter = await createHighlighterCore({
  themes: [
    import('@codelex/themes/vitesse-light')
  ],
  langs: [
    import('@codelex/langs/javascript'),
  ],
  engine: createOnigurumaEngine(() => import('codelex/wasm'))
})

const raw = await fs.readFile('./input.md')
const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeCodelexFromHighlighter, highlighter, {
    // or `theme` for a single theme
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .processSync(raw) // it's also possible to process synchronously
```

## Features

### Line Highlight

::: warning
This is deprecated. It's disabled by default in `v0.10.0` and will be removed in the next minor. Consider use [`transformerNotationHighlight`](https://codelex.style/packages/transformers#transformernotationhighlight) instead.
:::

In addition to the features of `codelex`, this plugin also supports line highlighting. You can specify line numbers to highlight after the language name in the format `{<line-numbers>}` - a comma separated list of `<line-number>`s, wrapped in curly braces. Each line number can be a single number (e.g. `{2}` highlights line 2 and `{1,4}` highlights lines 1 and 4) or a range (e.g. `{1-7}` highlights lines 1 through 7, and `{1-3,5-6}` highlights lines 1 through 3 and 5 through 6). For example:

````md
```js {1,3-4}
console.log('1') // highlighted
console.log('2')
console.log('3') // highlighted
console.log('4') // highlighted
```
````

### Inline Code

You can also highlight inline codes with the `inline` option.

| Option                  | Example          | Description                                                 |
| ----------------------- | ---------------- | ----------------------------------------------------------- |
| `false`                 | -                | Disable inline code highlighting (default)                  |
| `'tailing-curly-colon'` | `let a = 1{:js}` | Highlight with a `{:language}` marker inside the code block |

Enable `inline` on the Rehype plugin:

```ts twoslash
// @noErrors: true
import rehypeCodelex from '@codelex/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeCodelex, {
    inline: 'tailing-curly-colon', // or other options
    // ...
  })
  .use(rehypeStringify)
  .process(await fs.readFile('./input.md'))
```

Then you can use inline code in markdown:

```md
This code `console.log("Hello World"){:js}` will be highlighted.
```
