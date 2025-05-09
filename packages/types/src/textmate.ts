import type {
  IGrammar,
  IRawGrammar as RawGrammar,
  IRawTheme as RawTheme,
  IRawThemeSetting as RawThemeSetting,
} from '@codelex/vscode-textmate'

export type {
  RawGrammar,
  RawTheme,
  RawThemeSetting,
}

export interface Grammar extends IGrammar {
  name: string
}
