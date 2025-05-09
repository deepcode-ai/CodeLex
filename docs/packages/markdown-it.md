# @codelexjs/markdown-it

<Badges name="@codelexjs/markdown-it" />

[markdown-it](https://markdown-it.github.io/) plugin for Codelex.

## Install

::: code-group

```sh [npm]
npm i -D @codelexjs/markdown-it
```

```sh [yarn]
yarn add -D @codelexjs/markdown-it
```

```sh [pnpm]
pnpm add -D @codelexjs/markdown-it
```

```sh [bun]
bun add -D @codelexjs/markdown-it
```

:::

## Usage

```ts twoslash
import Codelex from '@codelexjs/markdown-it'
import MarkdownIt from 'markdown-it'

const md = MarkdownIt()

md.use(await Codelex({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
}))
```

## Fine-grained Bundle

By default, the full bundle of `codelex` will be imported. If you are using a [fine-grained bundle](/guide/bundles#fine-grained-bundle), you can import from `@codelexjs/markdown-it/core` and pass your own highlighter:

```ts twoslash
// @noErrors: true
import { fromHighlighter } from '@codelexjs/markdown-it/core'
import MarkdownIt from 'markdown-it'
import { createHighlighterCore } from 'codelex/core'
import { createOnigurumaEngine } from 'codelex/engine/oniguruma'

const highlighter = await createHighlighterCore({
  themes: [
    import('@codelexjs/themes/vitesse-light')
  ],
  langs: [
    import('@codelexjs/langs/javascript'),
  ],
  engine: createOnigurumaEngine(() => import('codelex/wasm'))
})

const md = MarkdownIt()

md.use(fromHighlighter(highlighter, { /* options */ }))
```

## With Shorthands

Codelex's [shorthands](/guide/shorthands) provides on-demand loading of themes and languages, but also makes the highlighting process asynchronous. Unfortunately, `markdown-it` itself [does NOT support async highlighting](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md#i-need-async-rule-how-to-do-it) out of the box.

To workaround this, you can use [`markdown-it-async`](https://github.com/antfu/markdown-it-async) by [Anthony Fu](https://github.com/antfu). Where Codelex also provides an integration with it, you can import `fromAsyncCodeToHtml` from `@codelexjs/markdown-it/async`.

````ts twoslash
import { fromAsyncCodeToHtml } from '@codelexjs/markdown-it/async'
import MarkdownItAsync from 'markdown-it-async'
import { codeToHtml } from 'codelex' // Or your custom shorthand bundle

// Initialize MarkdownIt instance with markdown-it-async
const md = MarkdownItAsync()

md.use(
  fromAsyncCodeToHtml(
    // Pass the codeToHtml function
    codeToHtml,
    {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      }
    }
  )
)

// Use `md.renderAsync` instead of `md.render`
const html = await md.renderAsync('# Title\n```ts\nconsole.log("Hello, World!")\n```')
````
