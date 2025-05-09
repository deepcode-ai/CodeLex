import type { CodelexTransformer, TransformerOptions } from '@codelexjs/types'
import { transformerDecorations } from '../transformer-decorations'

const builtInTransformers: CodelexTransformer[] = [
  /* @__PURE__ */ transformerDecorations(),
]

export function getTransformers(options: TransformerOptions): CodelexTransformer[] {
  return [
    ...options.transformers || [],
    ...builtInTransformers,
  ]
}
