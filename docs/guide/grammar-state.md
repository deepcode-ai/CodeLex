# Grammar State

`GrammarState` is a special token that holds the grammar context and allows you to highlight from an intermediate grammar state, making it easier to highlight code snippets.

For example, if we want to highlight the type annotation `Pick<MyObject, string>[]`, we can get the grammar state with the `getLastGrammarState` method, and pass into the `grammarState` option:

```ts
import { createHighlighter } from 'codelex'

const codelex = await createHighlighter({ langs: ['ts'], themes: ['github-dark'] })

const stateTypeAnnotation = codelex.getLastGrammarState('let a:', { lang: 'ts', theme: 'github-dark' })

const highlightedType = codelex.codeToHtml(
  'Pick<MyObject, string>[]',
  {
    lang: 'ts',
    theme: 'github-dark',
    grammarState: stateTypeAnnotation // <--- this
  }
)
```

Now Codelex would highlight correctly as it knows to start as the type annotation. You can keep that grammar state object for multiple uses as well.

<img width="223" alt="image" src="https://github.com/deepcode-ai/codelex/assets/11247099/c896c2ae-2a88-428b-9d06-2d2552eaae8b">

### Grammar Context Code

For one-off grammar context shifting, we also provide a shorthand by the `grammarContextCode` option:

```ts
const highlightedType = codelex.codeToHtml(
  'Pick<MyObject, string>[]',
  {
    lang: 'ts',
    theme: 'github-dark',
    grammarContextCode: 'let a:' // same as above, a temporary grammar state is created internally
  }
)
```

### Get Grammar State from HAST

The `getLastGrammarState` method runs the highlighting process internally and returns the grammar state. It might result in executing highlighting twice if you are working on something like pausable highlighting. In that case, you can pass the highlighted `hast` node to the `getLastGrammarState` to get the grammar state we stored in an internal WeakMap:

```ts
const codelex = await getHighlighter(/* ... */)

const root = codelex.codeToHast(/* ... */)

const grammarState = codelex.getLastGrammarState(root) // pass the hast root instead of code
```
