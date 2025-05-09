import type { CodeToHastOptions, CodelexTransformerContext } from '@codelexjs/types'
import type { Element, ElementContent, Text } from 'hast'
import type {
  NodeCompletion,
  NodeError,
  NodeHighlight,
  NodeHover,
  NodeQuery,
  NodeTag,
  TwoslashExecuteOptions,
  TwoslashGenericFunction,
  TwoslashOptions,
  TwoslashReturn,
} from 'twoslash'

// We only pick necessary types to Codelex, making passing custom twoslash implementation easier
export type TwoslashCodelexReturn =
  Pick<TwoslashReturn, 'nodes' | 'code'> & {
    meta?: Partial<Pick<TwoslashReturn['meta'], 'extension'>>
  }

export type TwoslashCodelexFunction = (code: string, lang?: string, options?: TwoslashExecuteOptions) => TwoslashCodelexReturn

declare module '@codelexjs/core' {
  interface CodelexTransformerContextMeta {
    twoslash?: TwoslashCodelexReturn
  }
}

export interface TransformerTwoslashOptions {
  /**
   * Languages to apply this transformer to
   */
  langs?: string[]
  /**
   * Requires `twoslash` to be presented in the code block meta to apply this transformer
   *
   * @default false
   */
  explicitTrigger?: boolean | RegExp
  /**
   * Triggers that skip Twoslash transformation on the code block meta
   *
   * @default ['notwoslash', 'no-twoslash']
   */
  disableTriggers?: (string | RegExp)[]
  /**
   * Mapping from language alias to language name
   */
  langAlias?: Record<string, string>
  /**
   * Custom filter function to apply this transformer to
   * When specified, `langs`, `explicitTrigger`, and `disableTriggers` will be ignored
   */
  filter?: (lang: string, code: string, options: CodeToHastOptions) => boolean
  /**
   * Custom instance of twoslasher function
   */
  twoslasher?: TwoslashCodelexFunction | TwoslashGenericFunction
  /**
   * Options to pass to twoslash
   */
  twoslashOptions?: TwoslashOptions
  /**
   * Custom renderers to decide how each info should be rendered
   */
  renderer?: TwoslashRenderer
  /**
   * A map to store code for `@include` directive
   * Provide your own instance if you want to clear the map between each transformation
   */
  includesMap?: Map<string, string>
  /**
   * Strictly throw when there is an error
   * @default true
   */
  throws?: boolean
  /**
   * Custom error handler for twoslash errors
   * When specified, `throws` will be ignored
   * Optionally return a string to replace the code
   */
  onTwoslashError?: (error: unknown, code: string, lang: string, options: CodeToHastOptions) => string | void
  /**
   * Custom error handler for Codelex errors
   * When specified, `throws` will be ignored
   */
  onCodelexError?: (error: unknown, code: string, lang: string) => void
}

export interface TwoslashRenderer {
  lineError?: (this: CodelexTransformerContext, error: NodeError) => ElementContent[]
  lineCustomTag?: (this: CodelexTransformerContext, tag: NodeTag) => ElementContent[]
  lineQuery?: (this: CodelexTransformerContext, query: NodeQuery, targetNode?: Element | Text) => ElementContent[]
  lineCompletion?: (this: CodelexTransformerContext, query: NodeCompletion) => ElementContent[]

  nodeStaticInfo: (this: CodelexTransformerContext, info: NodeHover, node: Element | Text) => Partial<ElementContent>
  nodeError?: (this: CodelexTransformerContext, error: NodeError, node: Element | Text) => Partial<ElementContent>
  nodeQuery?: (this: CodelexTransformerContext, query: NodeQuery, node: Element | Text) => Partial<ElementContent>
  nodeCompletion?: (this: CodelexTransformerContext, query: NodeCompletion, node: Element | Text) => Partial<ElementContent>

  nodesError?: (this: CodelexTransformerContext, error: NodeError, nodes: ElementContent[]) => ElementContent[]
  nodesHighlight?: (this: CodelexTransformerContext, highlight: NodeHighlight, nodes: ElementContent[]) => ElementContent[]
}
