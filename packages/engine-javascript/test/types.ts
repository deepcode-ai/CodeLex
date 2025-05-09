import type { IOnigMatch } from '@codelexjs/vscode-textmate'

export interface Execution {
  id: string
  patterns: (string | RegExp)[]
  args: [str: string, start: number, options: number]
  result: IOnigMatch | null
}
