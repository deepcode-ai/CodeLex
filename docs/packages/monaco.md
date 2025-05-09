# @codelex/monaco

<Badges name="@codelex/monaco" />

Use Codelex to highlight [Monaco Editor](https://microsoft.github.io/monaco-editor/).

Monaco's built-in highlighter does not use the full TextMate grammar, which in some cases is not accurate enough. This package allows you to use Codelex's syntax highlighting engine to highlight Monaco, with shared grammars and themes from Codelex.

Heavily inspired by [`monaco-editor-textmate`](https://github.com/zikaari/monaco-editor-textmate).

## Install

::: code-group

```sh [npm]
npm i -D @codelex/monaco
```

```sh [yarn]
yarn add -D @codelex/monaco
```

```sh [pnpm]
pnpm add -D @codelex/monaco
```

```sh [bun]
bun add -D @codelex/monaco
```

:::

```ts
import { codelexToMonaco } from '@codelex/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighter } from 'codelex'

// Create the highlighter, it can be reused
const highlighter = await createHighlighter({
  themes: [
    'vitesse-dark',
    'vitesse-light',
  ],
  langs: [
    'javascript',
    'typescript',
    'vue'
  ],
})

// Register the languageIds first. Only registered languages will be highlighted.
monaco.languages.register({ id: 'vue' })
monaco.languages.register({ id: 'typescript' })
monaco.languages.register({ id: 'javascript' })

// Register the themes from Codelex, and provide syntax highlighting for Monaco. // [!code highlight:2]
codelexToMonaco(highlighter, monaco)

// Create the editor
const editor = monaco.editor.create(document.getElementById('container'), {
  value: 'const a = 1',
  language: 'javascript',
  theme: 'vitesse-dark',
})

// ...As you use the editor normally
```
