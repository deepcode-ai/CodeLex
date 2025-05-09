import type { Element, Root } from 'hast'
import type { CodeToHastOptions } from './options'
import type { CodeToTokensOptions, ThemedToken, TokensResult } from './tokens'

export interface TransformerOptions {
  /**
   * Transformers for the Codelex pipeline.
   */
  transformers?: CodelexTransformer[]
}

export interface CodelexTransformerContextMeta { }

/**
 * Common transformer context for all transformers hooks
 */
export interface CodelexTransformerContextCommon {
  meta: CodelexTransformerContextMeta
  options: CodeToHastOptions
  codeToHast: (code: string, options: CodeToHastOptions) => Root
  codeToTokens: (code: string, options: CodeToTokensOptions) => TokensResult
}

export interface CodelexTransformerContextSource extends CodelexTransformerContextCommon {
  readonly source: string
}

/**
 * Transformer context for HAST related hooks
 */
export interface CodelexTransformerContext extends CodelexTransformerContextSource {
  readonly tokens: ThemedToken[][]
  readonly root: Root
  readonly pre: Element
  readonly code: Element
  readonly lines: Element[]

  readonly structure: CodeToHastOptions['structure']

  /**
   * Utility to append class to a hast node
   *
   * If the `property.class` is a string, it will be splitted by space and converted to an array.
   */
  addClassToHast: (hast: Element, className: string | string[]) => Element
}

export interface CodelexTransformer {
  /**
   * Name of the transformer
   */
  name?: string
  /**
   * Transform the raw input code before passing to the highlighter.
   */
  preprocess?: (this: CodelexTransformerContextCommon, code: string, options: CodeToHastOptions) => string | void
  /**
   * Transform the full tokens list before converting to HAST.
   * Return a new tokens list will replace the original one.
   */
  tokens?: (this: CodelexTransformerContextSource, tokens: ThemedToken[][]) => ThemedToken[][] | void
  /**
   * Transform the entire generated HAST tree. Return a new Node will replace the original one.
   */
  root?: (this: CodelexTransformerContext, hast: Root) => Root | void
  /**
   * Transform the `<pre>` element. Return a new Node will replace the original one.
   */
  pre?: (this: CodelexTransformerContext, hast: Element) => Element | void
  /**
   * Transform the `<code>` element. Return a new Node will replace the original one.
   */
  code?: (this: CodelexTransformerContext, hast: Element) => Element | void
  /**
   * Transform each line `<span class="line">` element.
   *
   * @param hast
   * @param line 1-based line number
   */
  line?: (this: CodelexTransformerContext, hast: Element, line: number) => Element | void
  /**
   * Transform each token `<span>` element.
   */
  span?: (this: CodelexTransformerContext, hast: Element, line: number, col: number, lineElement: Element, token: ThemedToken) => Element | void
  /**
   * Transform the generated HTML string before returning.
   * This hook will only be called with `codeToHtml`.
   */
  postprocess?: (this: CodelexTransformerContextCommon, html: string, options: CodeToHastOptions) => string | void
}
