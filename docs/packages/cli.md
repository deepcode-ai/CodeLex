# @codelexjs/cli

<Badges name="@codelexjs/cli" />

Codelex in the command line.

## Usage

The Codelex CLI works like `cat` command, but with syntax highlighting.

```bash
npx @codelexjs/cli README.md
```

## Install

You can also install it globally. Command aliases `@codelexjs/cli`, `codelex`, `skat` are registered.

::: code-group

```sh [npm]
npm i -g @codelexjs/cli
```

```sh [yarn]
yarn global add @codelexjs/cli
```

```sh [pnpm]
pnpm add -g @codelexjs/cli
```

```sh [bun]
bun add -g @codelexjs/cli
```

:::

```sh
skat src/index.ts
```

## Options

### `--theme`

Specify the theme to use. Defaults to `vitesse-dark`.

```bash
npx @codelexjs/cli README.md --theme=nord
```

### `--lang`

Language is auto-inferred from the file extension. You can override it with `--lang`.

```bash
npx @codelexjs/cli src/index.js --lang=ts
```
