import type { MarkdownItAsync } from 'markdown-it-async'
import type { CodeToHastOptions, CodelexTransformer } from 'codelex'
import type { MarkdownItCodelexSetupOptions } from './core'

export type { MarkdownItCodelexExtraOptions, MarkdownItCodelexSetupOptions } from './common'

export function setupMarkdownWithCodeToHtml(
  markdownit: MarkdownItAsync,
  codeToHtml: (code: string, options: CodeToHastOptions<any, any>) => Promise<string>,
  options: MarkdownItCodelexSetupOptions,
): void {
  const {
    parseMetaString,
    trimEndingNewline = true,
    defaultLanguage = 'text',
  } = options

  markdownit.options.highlight = async (code, lang = 'text', attrs) => {
    if (lang === '') {
      lang = defaultLanguage as string
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

    return await codeToHtml(
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

/**
 * Create a markdown-it-async plugin from a codeToHtml function.
 *
 * This plugin requires to be installed against a markdown-it-async instance.
 */
export function fromAsyncCodeToHtml(
  codeToHtml: (code: string, options: CodeToHastOptions<any, any>) => Promise<string>,
  options: MarkdownItCodelexSetupOptions,
) {
  return async function (markdownit: MarkdownItAsync) {
    return setupMarkdownWithCodeToHtml(markdownit, codeToHtml, options)
  }
}
