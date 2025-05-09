# Theme Colors Manipulation

## Arbitrary Color Values

Usually, TextMate themes expect the color values of each token to be a valid hex color value. This limitation is inherited from [`vscode-textmate`](https://github.com/microsoft/vscode-textmate). However, in Codelex v0.9.15 we introduced an automatic workaround by replacing non-hex color values with a placeholder and replacing them back on tokenization. This would allows you to use themes with arbitrary color values for rendering without worrying about the technical details:

```ts twoslash
import { createHighlighter } from 'codelex'

const highlighter = await createHighlighter({
  langs: ['javascript'],
  themes: [
    {
      name: 'my-theme',
      settings: [
        {
          scope: ['comment'],
          settings: {
            // use `rgb`, `hsl`, `hsla`, // [!code hl:3]
            // or any anything supported by your renderer
            foreground: 'rgb(128, 128, 128)'
          }
        },
        {
          scope: ['string'],
          settings: {
            foreground: 'var(--code-string)' // CSS variable // [!code hl:1]
          }
        },
        // ...more
      ],
      // Background and foreground colors // [!code hl:3]
      bg: 'var(--code-bg)',
      fg: 'var(--code-fg)'
    }
  ]
})

const html = highlighter.codeToHtml('const foo = "bar"', { lang: 'javascript', theme: 'my-theme' })
```

::: info Notice
Use this carefully as this will diverge from TextMate theme compatibility.

This may make the theme incompatible with non-web usage such as [`codelex-cli`](/packages/cli) and [`codelex-monaco`](/packages/monaco).
:::

Learn more about how to [load themes](./load-theme).

## Color Replacements

You can also use the `colorReplacements` option to replace the color values of the theme. This is useful when you want to use a theme with a different color palette. It can be provided on both the theme object and the `codeToHast` `codeToHtml` options.

The `colorReplacements` object should follow a color-to-color format, where the keys represent the color to be replaced and the value represents the new color:

```js
const html = await codeToHtml(
  code,
  {
    lang: 'js',
    theme: 'min-dark',
    colorReplacements: {
      '#ff79c6': '#189eff'
    }
  }
)
```

In addition, `colorReplacements` may contain scoped replacements. This is useful when you provide multiple themes and want to replace the colors of a specific theme:

```js
const html = await codeToHtml(
  code,
  {
    lang: 'js',
    themes: { dark: 'min-dark', light: 'min-light' },
    colorReplacements: {
      'min-dark': {
        '#ff79c6': '#189eff'
      },
      'min-light': {
        '#ff79c6': '#defdef'
      }
    }
  }
)
```

This is only allowed for the `colorReplacements` option and not for the theme object.

## CSS Variables Theme

Codelex provides a factory function helper `createCssVariablesTheme` for creating a theme that uses CSS variables easier. Note that this theme is a lot less granular than most of the other themes and requires to define the CSS variables in your app. This is provided for easier migration from Codelex's [`css-variables theme`](https://github.com/deepcode-ai/codelex/blob/main/docs/themes.md#theming-with-css-variables). For better highlighting result, we recommend construct the theme manually with [Arbitrary Color Values](#arbitrary-color-values) or use [Color Replacements](#color-replacements) to override an existing theme.

This theme is **not included by default** and must be registered explicitly:

```ts twoslash
import { createHighlighter } from 'codelex'
import { createCssVariablesTheme } from 'codelex/core'

// Create a custom CSS variables theme, the following are the default values
const myTheme = createCssVariablesTheme({ // [!code hl:6]
  name: 'css-variables',
  variablePrefix: '--codelex-',
  variableDefaults: {},
  fontStyle: true
})

const highlighter = await createHighlighter({
  langs: ['javascript'],
  themes: [myTheme] // register the theme // [!code hl]
})

const html = highlighter.codeToHtml('const foo = "bar"', {
  lang: 'javascript',
  theme: 'css-variables' // use the theme // [!code hl]
})
```

CSS variables example:

```css
:root {
  --codelex-foreground: #eeeeee;
  --codelex-background: #333333;
  --codelex-token-constant: #660000;
  --codelex-token-string: #770000;
  --codelex-token-comment: #880000;
  --codelex-token-keyword: #990000;
  --codelex-token-parameter: #aa0000;
  --codelex-token-function: #bb0000;
  --codelex-token-string-expression: #cc0000;
  --codelex-token-punctuation: #dd0000;
  --codelex-token-link: #ee0000;

  /* Only required if using lang: 'ansi' */
  --codelex-ansi-black: #000000;
  --codelex-ansi-black-dim: #00000080;
  --codelex-ansi-red: #bb0000;
  --codelex-ansi-red-dim: #bb000080;
  --codelex-ansi-green: #00bb00;
  --codelex-ansi-green-dim: #00bb0080;
  --codelex-ansi-yellow: #bbbb00;
  --codelex-ansi-yellow-dim: #bbbb0080;
  --codelex-ansi-blue: #0000bb;
  --codelex-ansi-blue-dim: #0000bb80;
  --codelex-ansi-magenta: #ff00ff;
  --codelex-ansi-magenta-dim: #ff00ff80;
  --codelex-ansi-cyan: #00bbbb;
  --codelex-ansi-cyan-dim: #00bbbb80;
  --codelex-ansi-white: #eeeeee;
  --codelex-ansi-white-dim: #eeeeee80;
  --codelex-ansi-bright-black: #555555;
  --codelex-ansi-bright-black-dim: #55555580;
  --codelex-ansi-bright-red: #ff5555;
  --codelex-ansi-bright-red-dim: #ff555580;
  --codelex-ansi-bright-green: #00ff00;
  --codelex-ansi-bright-green-dim: #00ff0080;
  --codelex-ansi-bright-yellow: #ffff55;
  --codelex-ansi-bright-yellow-dim: #ffff5580;
  --codelex-ansi-bright-blue: #5555ff;
  --codelex-ansi-bright-blue-dim: #5555ff80;
  --codelex-ansi-bright-magenta: #ff55ff;
  --codelex-ansi-bright-magenta-dim: #ff55ff80;
  --codelex-ansi-bright-cyan: #55ffff;
  --codelex-ansi-bright-cyan-dim: #55ffff80;
  --codelex-ansi-bright-white: #ffffff;
  --codelex-ansi-bright-white-dim: #ffffff80;
}
```

If you are migrating from Codelex v0, some variables are renamed:

| Codelex v0                   | Codelex v1.0           |
| -------------------------- | -------------------- |
| `--codelex-color-text`       | `--codelex-foreground` |
| `--codelex-color-background` | `--codelex-background` |
| `--codelex-color-ansi-*`     | `--codelex-ansi-*`     |
