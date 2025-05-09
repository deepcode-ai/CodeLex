---
outline: deep
---

# Migration

We suggest you to migrate step by step, following each version's migration guide.

## Migrate from v2.0

If you are on v2.0 and there is no warning in your usage, you should be able to directly bump to v3.0, read [Codelex v3.0](/blog/v3) for more details.

## Migrate from v1.0

We recommend you to [migrate to v2.0 first](/blog/v2), then to v3.0.

## Migrate from v0.14

The v1.0 release of Codelex is a major rewrite that we took the chance to revise every design decision we made in the past. We originally had a separate package name as [Codelexji](https://github.com/antfu/codelexji) to experiment with the new design, now it's merged back to Codelex as v1.0.

> [!TIP] Learn more
> Interested in the story behind v1.0? Check out this [blog post](https://nuxt.com/blog/codelex-v1) for more details.

Compare to [`codelex@0.14.3`](https://github.com/deepcode-ai/codelex/releases/tag/v0.14.3), the list of breaking changes are:

### Hard Breaking Changes

Breaking changes that you need to migrate manually:

- CJS and IIFE builds are dropped. See [CJS Usage](/guide/install#cjs-usage) and [CDN Usage](/guide/install#cdn-usage) for more details.
- `codeToHtml` uses [`hast`](https://github.com/syntax-tree/hast) internally. The generated HTML will be a bit different but should behave the same.
- `css-variables` theme is no longer supported. Use the [dual themes](/guide/dual-themes) approach instead, or learn more at the [Theme Colors Manipulation](/guide/theme-colors) page.

### Soft Breaking Changes

Breaking changes applies to main package `codelex`, but are shimmed by the [compatible build `@codelex/compat`](/guide/compat#compatibility-build):

- Top-level named exports `setCDN`, `loadLanguage`, `loadTheme`, `setWasm` are dropped as they are not needed anymore.
- `BUNDLED_LANGUAGES`, `BUNDLED_THEMES` are moved to `@codelex/langs` and `@codelex/themes` and renamed to `bundledLanguages` and `bundledThemes` respectively.
- `theme` option for `createHighlighter` is dropped, use `themes` with an array instead.
- Highlighter does not maintain an internal default theme context. `theme` option is required for `codeToHtml` and `codeToTokens`.
- `codeToThemedTokens` is renamed to `codeToTokensBase`, a higher level `codeToTokens` is added.
- `codeToTokens` sets `includeExplanation` to `false` by default.
- `.ansiToHtml` is merged into `.codeToHtml` as a special language, `ansi`. Use `.codeToHtml(code, { lang: 'ansi' })` instead.
- `lineOptions` is dropped in favor of the fully customizable `transforms` option.
- `LanguageRegistration`'s `grammar` field is flattened to `LanguageRegistration` itself, refer to the types for more details.

### Ecosystem Packages

- `codelex-twoslash` has been completely rewritten. It's no longer a wrapper around Codelex highlighter, but instead, it's now a Codelex transformer that can be plugged in any integrations that supports SHiki transformers. The package is now [`@codelex/twoslash`](/packages/twoslash).
- Integrations of `codelex-twoslash`, like `gatsby-remark-codelex-twoslash` etc, will be slowly moved to a general Codelex version. Before that, you can use [`@codelex/rehype`](/packages/rehype) or [`@codelex/markdown-it`](/packages/markdown-it) to integrate Codelex into those meta-frameworks.
- New official integrations like [`@codelex/monaco`](/packages/monaco), [`@codelex/cli`](/packages/cli), [`@codelex/rehype`](/packages/rehype), [`@codelex/markdown-it`](/packages/markdown-it) are introduced.
- `codelex-renderer-path` and `codelex-renderer-svg` packages are being deprecated due to low usage. If need them, please open an issue with your use case, we are open to bring them back.
- `vuepress-plugin-codelex` is deprecated as [VuePress](https://github.com/vuejs/vuepress#status) is no longer recommended. Its successor [VitePress](https://vitepress.dev/) has a built-in Codelex integration.

## Migrate from Codelexji

If you are already using [Codelexji](https://github.com/antfu/codelexji), first make sure you are on the latest minor v0.10. Then the migration should be very straightforward by renaming the packages:

- `codelexji` -> `codelex`
- `codelexji-core` -> `@codelex/core`
- `codelexji-twoslash` -> `@codelex/twoslash`
- `codelexji-transformers` -> `@codelex/transformers`
- `codelexji-monaco` -> `@codelex/monaco`
- `codelexji-cli` -> `@codelex/cli`
- `markdown-it-codelexji` -> `@codelex/markdown-it`
- `rehype-codelexji` -> `@codelex/rehype`
