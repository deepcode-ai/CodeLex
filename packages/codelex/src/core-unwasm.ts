/**
 * In environments where WebAssembly can be treated as native ESM and https://github.com/unjs/unwasm,
 * We add the wasm file as the dependency so users don't need to call `loadWasm` manually.
 */

import { setDefaultWasmLoader } from '@codelexjs/engine-oniguruma'

setDefaultWasmLoader(() => import('codelex/wasm'))

export * from '@codelexjs/core'
