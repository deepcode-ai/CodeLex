import type { CodeToTokensOptions, GrammarState, CodelexInternal, ThemedToken, TokensResult } from '@codelexjs/types'
import { CodelexError } from '@codelexjs/types'
import { getLastGrammarStateFromMap, setLastGrammarStateToMap } from '../textmate/grammar-state'
import { applyColorReplacements, flatTokenVariants, resolveColorReplacements } from '../utils'
import { codeToTokensBase } from './code-to-tokens-base'
import { codeToTokensWithThemes } from './code-to-tokens-themes'

/**
 * High-level code-to-tokens API.
 *
 * It will use `codeToTokensWithThemes` or `codeToTokensBase` based on the options.
 */
export function codeToTokens(
  internal: CodelexInternal,
  code: string,
  options: CodeToTokensOptions,
): TokensResult {
  let bg: string
  let fg: string
  let tokens: ThemedToken[][]
  let themeName: string
  let rootStyle: string | undefined
  let grammarState: GrammarState | undefined

  if ('themes' in options) {
    const {
      defaultColor = 'light',
      cssVariablePrefix = '--codelex-',
    } = options

    const themes = Object
      .entries(options.themes)
      .filter(i => i[1])
      .map(i => ({ color: i[0], theme: i[1]! }))
      .sort((a, b) => a.color === defaultColor ? -1 : b.color === defaultColor ? 1 : 0)

    if (themes.length === 0)
      throw new CodelexError('`themes` option must not be empty')

    const themeTokens = codeToTokensWithThemes(
      internal,
      code,
      options,
    )

    grammarState = getLastGrammarStateFromMap(themeTokens)

    if (defaultColor && !themes.find(t => t.color === defaultColor))
      throw new CodelexError(`\`themes\` option must contain the defaultColor key \`${defaultColor}\``)

    const themeRegs = themes.map(t => internal.getTheme(t.theme))
    const themesOrder = themes.map(t => t.color)
    tokens = themeTokens
      .map(line => line.map(token => flatTokenVariants(token, themesOrder, cssVariablePrefix, defaultColor)))

    if (grammarState)
      setLastGrammarStateToMap(tokens, grammarState)

    const themeColorReplacements = themes.map(t => resolveColorReplacements(t.theme, options))

    fg = themes.map((t, idx) => (idx === 0 && defaultColor
      ? ''
      : `${cssVariablePrefix + t.color}:`) + (applyColorReplacements(themeRegs[idx].fg, themeColorReplacements[idx]) || 'inherit')).join(';')
    bg = themes.map((t, idx) => (idx === 0 && defaultColor
      ? ''
      : `${cssVariablePrefix + t.color}-bg:`) + (applyColorReplacements(themeRegs[idx].bg, themeColorReplacements[idx]) || 'inherit')).join(';')
    themeName = `codelex-themes ${themeRegs.map(t => t.name).join(' ')}`
    rootStyle = defaultColor ? undefined : [fg, bg].join(';')
  }
  else if ('theme' in options) {
    const colorReplacements = resolveColorReplacements(options.theme, options)

    tokens = codeToTokensBase(
      internal,
      code,
      options,
    )

    const _theme = internal.getTheme(options.theme)
    bg = applyColorReplacements(_theme.bg, colorReplacements)
    fg = applyColorReplacements(_theme.fg, colorReplacements)
    themeName = _theme.name
    grammarState = getLastGrammarStateFromMap(tokens)
  }
  else {
    throw new CodelexError('Invalid options, either `theme` or `themes` must be provided')
  }

  return {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle,
    grammarState,
  }
}
