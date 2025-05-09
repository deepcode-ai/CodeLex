import type MarkdownIt from 'markdown-it'
import type {
  CodeToHastOptions,
  HighlighterGeneric,
  CodelexTransformer,
} from 'codelex'
import type { MarkdownItCodelexSetupOptions } from './common'

export type { MarkdownItCodelexExtraOptions, MarkdownItCodelexSetupOptions } from './common'

export function setupMarkdownIt(
  markdownit: MarkdownIt,
  highlighter: HighlighterGeneric<any, any>,
  options: MarkdownItCodelexSetupOptions,
): void {
  const {
    parseMetaString,
    trimEndingNewline = true,
    defaultLanguage = 'text',
    fallbackLanguage,
  } = options
  const langs = highlighter.getLoadedLanguages()
  markdownit.options.highlight = (code, lang = 'text', attrs) => {
    if (lang === '') {
      lang = defaultLanguage as string
    }
    if (fallbackLanguage && !langs.includes(lang)) {
      lang = fallbackLanguage as string
    }
    const meta = parseMetaString?.(attrs, code, lang) || {}
    const codeOptions: CodeToHastOptions = {
      ...options,
      lang,
      meta: {
        ...options.meta,
        ...meta,
        __raw: attrs,
      },
    }

    const builtInTransformer: CodelexTransformer[] = []

    builtInTransformer.push({
      name: '@codelexjs/markdown-it:block-class',
      code(node) {
        node.properties.class = `language-${lang}`
      },
    })

    if (trimEndingNewline) {
      if (code.endsWith('\n'))
        code = code.slice(0, -1)
    }

    return highlighter.codeToHtml(
      code,
      {
        ...codeOptions,
        transformers: [
          ...builtInTransformer,
          ...codeOptions.transformers || [],
        ],
      },
    )
  }
}

export function fromHighlighter(
  highlighter: HighlighterGeneric<any, any>,
  options: MarkdownItCodelexSetupOptions,
) {
  return function (markdownit: MarkdownIt) {
    setupMarkdownIt(markdownit, highlighter, options)
  }
}
