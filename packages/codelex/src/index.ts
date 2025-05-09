export * from './bundle-full'

export type { BuiltinLanguage, BuiltinTheme } from './types'
export { createJavaScriptRegexEngine, defaultJavaScriptRegexConstructor } from '@codelex/engine-javascript'
export { createOnigurumaEngine, loadWasm } from '@codelex/engine-oniguruma'
