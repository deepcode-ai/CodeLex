---
outline: deep
---

# Light/Dark Dual Themes

Codelex supports outputting light/dark dual or multiple themes. Codelex's dual themes approach uses CSS variables to store the colors on each token.

Change the `theme` option in `codeToHtml` to `options` with `light` and `dark` keys to generate two themes.

```ts twoslash
import { codeToHtml } from 'codelex'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: { // [!code hl:4]
    light: 'min-light',
    dark: 'nord',
  }
})
```

The following HTML will be generated ([demo preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/codelexjs/codelex/main/packages/codelex/test/out/dual-themes.html)):

```html
<pre
  class="codelex codelex-themes min-light nord"
  style="background-color:#ffffff;--codelex-dark-bg:#2e3440ff;color:#24292eff;--codelex-dark:#d8dee9ff"
  tabindex="0"
>
  <code>
    <span class="line">
      <span style="color:#1976D2;--codelex-dark:#D8DEE9">console</span>
      <span style="color:#6F42C1;--codelex-dark:#ECEFF4">.</span>
      <span style="color:#6F42C1;--codelex-dark:#88C0D0">log</span>
      <span style="color:#24292EFF;--codelex-dark:#D8DEE9FF">(</span>
      <span style="color:#22863A;--codelex-dark:#ECEFF4">"</span>
      <span style="color:#22863A;--codelex-dark:#A3BE8C">hello</span>
      <span style="color:#22863A;--codelex-dark:#ECEFF4">"</span>
      <span style="color:#24292EFF;--codelex-dark:#D8DEE9FF">)</span>
      </span>
    </code>
</pre>
```

To make it reactive to your site's theme, you need to add a short CSS snippet:

## Query-based Dark Mode

```css
@media (prefers-color-scheme: dark) {
  .codelex,
  .codelex span {
    color: var(--codelex-dark) !important;
    background-color: var(--codelex-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--codelex-dark-font-style) !important;
    font-weight: var(--codelex-dark-font-weight) !important;
    text-decoration: var(--codelex-dark-text-decoration) !important;
  }
}
```

## Class-based Dark Mode

```css
html.dark .codelex,
html.dark .codelex span {
  color: var(--codelex-dark) !important;
  background-color: var(--codelex-dark-bg) !important;
  /* Optional, if you also want font styles */
  font-style: var(--codelex-dark-font-style) !important;
  font-weight: var(--codelex-dark-font-weight) !important;
  text-decoration: var(--codelex-dark-text-decoration) !important;
}
```

## Multiple Themes

It's also possible to support more than two themes. In the `themes` object, you can have an arbitrary number of themes, and specify the default theme with `defaultColor` option.

```ts twoslash
import { codeToHtml } from 'codelex'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'github-light',
    dark: 'github-dark',
    dim: 'github-dimmed',
    // any number of themes
  },

  // optional customizations
  defaultColor: 'light',
  cssVariablePrefix: '--codelex-'
})
```

`span` tokens would be generated with respective theme's css variables:

```html
<span style="color:#1976D2;--codelex-dark:#D8DEE9;--codelex-dim:#566575">console</span>
```

After that, you need to apply theme's css variables on element with `codelex` class and tokens under it, for example, based on parent's `data-theme` property:

```css
[data-theme='dark'] .codelex,
[data-theme='dark'] .codelex span {
  background-color: var(--s-dark-bg) !important;
  color: var(--s-dark) !important;
}

[data-theme='dim'] .codelex,
[data-theme='dim'] .codelex span {
  background-color: var(--s-dim-bg) !important;
  color: var(--s-dim) !important;
}
```

[Demo preview](https://htmlpreview.github.io/?https://raw.githubusercontent.com/codelexjs/codelex/main/packages/codelex/test/out/multiple-themes.html)

### Without Default Color

If you want to take full control of the colors or avoid using `!important` to override, you can optionally disable the default color by setting `defaultColor` to `false`.

```ts twoslash
import { codeToHtml } from 'codelex'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  defaultColor: false, // <--
})
```

With it, a token would be generated like:

```html
<span style="--codelex-dark:#D8DEE9;--codelex-light:#2E3440">console</span>
```

In that case, the generated HTML would have no style out of the box, you need to add your own CSS to control the colors.

It's also possible to control the theme in CSS variables. For more, refer to the great research and examples by [@mayank99](https://github.com/mayank99) in [this issue #6](https://github.com/antfu/codelexji/issues/6).
