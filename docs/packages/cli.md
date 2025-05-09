# @codelex/cli

<Badges name="@codelex/cli" />

Codelex in the command line.

## Usage

The Codelex CLI works like `cat` command, but with syntax highlighting.

```bash
npx @codelex/cli README.md
```

## Install

You can also install it globally. Command aliases `@codelex/cli`, `codelex`, `skat` are registered.

::: code-group

```sh [npm]
npm i -g @codelex/cli
```

```sh [yarn]
yarn global add @codelex/cli
```

```sh [pnpm]
pnpm add -g @codelex/cli
```

```sh [bun]
bun add -g @codelex/cli
```

:::

```sh
skat src/index.ts
```

## Options

### `--theme`

Specify the theme to use. Defaults to `vitesse-dark`.

```bash
npx @codelex/cli README.md --theme=nord
```

### `--lang`

Language is auto-inferred from the file extension. You can override it with `--lang`.

```bash
npx @codelex/cli src/index.js --lang=ts
```
