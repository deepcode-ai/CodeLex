# Synchronous Usage

The `await createHighlighter()` and `highlighter.codeToHtml()` are already the effort to do the seperations of asynchronism and synchronism. For most of the cases, you should be able to resolve the async part in the initialization phase and use the highlighter synchronously later.

In some extreme cases that you need to run Codelex completely synchronously, since v1.16, we provide a synchronous version of the core API. You can use `createHighlighterCoreSync` to create a highlighter instance synchronously.

```ts
import js from '@codelexjs/langs/javascript'
import nord from '@codelexjs/themes/nord'
import { createHighlighterCoreSync } from 'codelex/core'
import { createJavaScriptRegexEngine } from 'codelex/engine/javascript'

const codelex = createHighlighterCoreSync({
  themes: [nord],
  langs: [js],
  engine: createJavaScriptRegexEngine()
})

const html = codelex.highlight('console.log(1)', { lang: 'js', theme: 'nord' })
```

When doing so, it requires all `themes` and `langs` to be provide as plain objects. Also an explicit `engine` is required to be provided. With the new [JavaScript RegExp engine](/guide/regex-engines#javascript-regexp-engine) you are able to create an engine instance synchronously as well.

The [Oniguruma Engine](/guide/regex-engines#oniguruma-engine) can only be created asynchronously, so you need to resolve the engine promise before creating the sync highlighter.

```ts
import js from '@codelexjs/langs/javascript'
import nord from '@codelexjs/themes/nord'
import { createHighlighterCoreSync } from 'codelex/core'
import { createOnigurumaEngine } from 'codelex/engine/oniguruma'

// Load this somewhere beforehand
const engine = await createOnigurumaEngine(import('codelex/wasm'))

const codelex = createHighlighterCoreSync({
  themes: [nord],
  langs: [js],
  engine, // if a resolved engine passed in, the rest can still be synced.
})

const html = codelex.highlight('console.log(1)', { lang: 'js', theme: 'nord' })
```
