import type { IOnigMatch } from '@codelex/vscode-textmate'

export interface Execution {
  id: string
  patterns: (string | RegExp)[]
  args: [str: string, start: number, options: number]
  result: IOnigMatch | null
}
