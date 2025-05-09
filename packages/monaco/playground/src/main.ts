import { codelexToMonaco } from '@codelexjs/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighter } from 'codelex'

// Create the highlighter, it can be reused
// eslint-disable-next-line antfu/no-top-level-await
const highlighter = await createHighlighter({
  themes: [
    'min-dark',
  ],
  langs: [
    'javascript',
    'typescript',
    'vue',
  ],
})

// Register the languageIds first. Only registered languages will be highlighted.
monaco.languages.register({ id: 'vue' })
monaco.languages.register({ id: 'typescript' })
monaco.languages.register({ id: 'javascript' })

// Register the themes from Codelex, and provide syntax highlighting for Monaco. // [!code highlight:2]
codelexToMonaco(highlighter, monaco)

// Create the editor
monaco.editor.create(document.getElementById('app')!, {
  value: 'const a = 1',
  language: 'javascript',
  theme: 'min-dark',
})
